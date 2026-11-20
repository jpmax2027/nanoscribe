/** The three writing tasks NanoScribe performs. */
export type TaskKind = "summarize" | "rewrite" | "translate";

/** Rewrite flavours offered when the task is "rewrite". */
export type RewriteStyle = "formal" | "casual" | "concise" | "grammar";

/** Translation directions (English <-> Bahasa Indonesia). */
export type TranslateDirection = "en-id" | "id-en";

/**
 * How a request should be routed. These map 1:1 onto Firebase AI Logic's
 * hybrid `InferenceMode` values in the Firebase engine:
 *   hybrid -> PREFER_ON_DEVICE (on-device first, cloud fallback)
 *   device -> ONLY_ON_DEVICE   (never leaves the device; errors if absent)
 *   cloud  -> ONLY_IN_CLOUD    (always the cloud model)
 */
export type RoutingMode = "hybrid" | "device" | "cloud";

export interface TaskRequest {
  kind: TaskKind;
  text: string;
  rewriteStyle: RewriteStyle;
  direction: TranslateDirection;
}

/** Which execution path actually produced an answer. */
export type InferencePath = "on-device" | "cloud" | "demo";

export interface RunResult {
  /** The generated text. */
  text: string;
  /** The path that served the request — the heart of the hybrid story. */
  path: InferencePath;
  /** Human-readable label of the model/engine that answered. */
  modelLabel: string;
  /** Wall-clock latency of the whole request, in milliseconds. */
  latencyMs: number;
}

/**
 * Common interface implemented by the real Firebase hybrid engine and by the
 * local demo engine, so the UI never cares which one is active.
 */
export interface AssistantEngine {
  readonly kind: "firebase" | "demo";
  /**
   * Prepare the on-device model (may trigger a download in Chrome).
   * `onProgress` receives download progress as a fraction between 0 and 1.
   * Must be called from/after a user interaction in the browser.
   */
  prepareDeviceModel(onProgress: (fraction: number) => void): Promise<void>;
  /**
   * Run one task. `onChunk` is called with the *cumulative* text as it
   * streams in, so the UI can simply replace its content on every call.
   */
  run(
    request: TaskRequest,
    routing: RoutingMode,
    onChunk: (cumulativeText: string) => void,
  ): Promise<RunResult>;
}
