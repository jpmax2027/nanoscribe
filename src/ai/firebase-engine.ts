import { initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  InferenceMode,
  type GenerativeModel,
} from "firebase/ai";
import { appCheckSiteKey } from "../firebase-config";
import { buildPrompt } from "./prompts";
import { mapInferenceSource } from "./engine-shared";
import type {
  AssistantEngine,
  RoutingMode,
  RunResult,
  TaskRequest,
} from "./types";

/**
 * Cloud fallback model. This is also the Firebase AI Logic default for
 * hybrid mode in JS SDK v13+, but we pass it explicitly via `inCloudParams`
 * so the behaviour does not silently change with SDK defaults.
 */
export const CLOUD_MODEL = "gemini-3.5-flash-lite";

const ROUTING_TO_INFERENCE_MODE: Record<RoutingMode, InferenceMode> = {
  hybrid: InferenceMode.PREFER_ON_DEVICE,
  device: InferenceMode.ONLY_ON_DEVICE,
  cloud: InferenceMode.ONLY_IN_CLOUD,
};

/**
 * The real engine: Firebase AI Logic hybrid inference.
 *
 * One `GenerativeModel` is created per routing mode, configured with a
 * hybrid `InferenceMode`. The SDK itself decides per request whether the
 * on-device Gemini Nano (via Chrome's Prompt API) or the cloud Gemini model
 * answers, and reports the winner on `response.inferenceSource` — which is
 * what powers NanoScribe's on-screen badge.
 */
export class FirebaseEngine implements AssistantEngine {
  readonly kind = "firebase" as const;

  private readonly config: FirebaseOptions;
  private app: FirebaseApp | null = null;
  private readonly models = new Map<RoutingMode, GenerativeModel>();
  private deviceModelReady: Promise<void> | null = null;
  private progressListener: ((fraction: number) => void) | null = null;

  constructor(config: FirebaseOptions) {
    this.config = config;
  }

  private ensureApp(): FirebaseApp {
    if (this.app) {
      return this.app;
    }
    const app = initializeApp(this.config);

    // Firebase AI Logic requires App Check. On localhost we use the debug
    // provider (the token printed in the dev console must be registered in
    // the Firebase console once). On hosted deployments a reCAPTCHA
    // Enterprise site key can be supplied in firebase-config.ts.
    const isLocalhost =
      typeof location !== "undefined" &&
      (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    if (isLocalhost) {
      (
        globalThis as { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }
      ).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    if (appCheckSiteKey) {
      initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
        isTokenAutoRefreshEnabled: true,
      });
    } else if (!isLocalhost) {
      console.info(
        "[NanoScribe] App Check site key not set — AI Logic requests may be " +
          "rejected while App Check enforcement is on. See README.md.",
      );
    }

    this.app = app;
    return app;
  }

  private modelFor(routing: RoutingMode): GenerativeModel {
    const cached = this.models.get(routing);
    if (cached) {
      return cached;
    }
    const ai = getAI(this.ensureApp(), { backend: new GoogleAIBackend() });
    const model = getGenerativeModel(ai, {
      mode: ROUTING_TO_INFERENCE_MODE[routing],
      inCloudParams: { model: CLOUD_MODEL },
    });
    this.models.set(routing, model);
    return model;
  }

  /**
   * `initializeDeviceModel()` must be called after/on a user interaction and
   * before the first prompt. It triggers the Gemini Nano download in Chrome
   * if needed. Failures are non-fatal in hybrid mode (the SDK falls back to
   * the cloud), so they are logged rather than thrown.
   */
  async prepareDeviceModel(onProgress: (fraction: number) => void): Promise<void> {
    this.progressListener = onProgress;
    await this.ensureDeviceModel();
  }

  private ensureDeviceModel(): Promise<void> {
    if (!this.deviceModelReady) {
      this.deviceModelReady = (async () => {
        try {
          await this.modelFor("hybrid").initializeDeviceModel((value) => {
            this.progressListener?.(value);
          });
        } catch (error) {
          console.info(
            "[NanoScribe] On-device model could not be initialised; " +
              "hybrid requests will use the cloud model.",
            error,
          );
        }
      })();
    }
    return this.deviceModelReady;
  }

  async run(
    request: TaskRequest,
    routing: RoutingMode,
    onChunk: (cumulativeText: string) => void,
  ): Promise<RunResult> {
    // The Run click is a user interaction, so this satisfies Chrome's
    // user-activation requirement for the on-device model.
    await this.ensureDeviceModel();

    const model = this.modelFor(routing);
    const prompt = buildPrompt(request);
    const started = performance.now();

    const { stream, response } = await model.generateContentStream(prompt);
    let text = "";
    for await (const chunk of stream) {
      const piece = chunk.text();
      if (piece) {
        text += piece;
        onChunk(text);
      }
    }
    const finalResponse = await response;
    if (!text) {
      text = finalResponse.text();
    }

    const path = mapInferenceSource(finalResponse.inferenceSource);
    return {
      text,
      path,
      modelLabel:
        path === "on-device"
          ? "Gemini Nano — on-device (Chrome Prompt API)"
          : `${CLOUD_MODEL} — cloud (Firebase AI Logic)`,
      latencyMs: Math.max(1, Math.round(performance.now() - started)),
    };
  }
}
