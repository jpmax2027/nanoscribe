import { describe, expect, it, vi } from "vitest";
import type { TaskRequest } from "../src/ai/types";

/**
 * These tests exercise the Firebase engine's routing/label logic without a
 * real Firebase project: the whole `firebase/*` module layer is mocked with
 * a fake GenerativeModel whose responses carry a chosen `inferenceSource`,
 * which is exactly the value the real SDK sets from the execution path.
 */
const fake = vi.hoisted(() => ({
  source: "on_device" as string,
  fail: false,
  deviceModelCalls: 0,
}));

vi.mock("firebase/app", () => ({
  initializeApp: () => ({}),
}));

vi.mock("firebase/app-check", () => ({
  initializeAppCheck: () => ({}),
  ReCaptchaEnterpriseProvider: class {
    constructor(_siteKey: string) {}
  },
}));

vi.mock("firebase/ai", () => ({
  getAI: () => ({}),
  GoogleAIBackend: class {},
  InferenceMode: {
    PREFER_ON_DEVICE: "prefer_on_device",
    ONLY_ON_DEVICE: "only_on_device",
    ONLY_IN_CLOUD: "only_in_cloud",
    PREFER_IN_CLOUD: "prefer_in_cloud",
  },
  InferenceSource: { ON_DEVICE: "on_device", IN_CLOUD: "in_cloud" },
  getGenerativeModel: () => ({
    initializeDeviceModel: async () => {
      fake.deviceModelCalls += 1;
    },
    generateContentStream: async () => {
      if (fake.fail) {
        throw new Error("fake SDK failure");
      }
      return {
        stream: (async function* () {
          yield { text: () => "Hybrid " };
          yield { text: () => "answer" };
        })(),
        response: Promise.resolve({
          text: () => "Hybrid answer",
          inferenceSource: fake.source,
        }),
      };
    },
  }),
}));

import { CLOUD_MODEL, FirebaseEngine } from "../src/ai/firebase-engine";

const CONFIG = {
  apiKey: "test-key",
  projectId: "test-project",
  appId: "1:1:web:test",
};

const REQUEST: TaskRequest = {
  kind: "summarize",
  text: "Some text to summarize.",
  rewriteStyle: "formal",
  direction: "en-id",
};

describe("FirebaseEngine (mocked SDK)", () => {
  it("labels a response served on-device and aggregates streamed chunks", async () => {
    fake.source = "on_device";
    fake.fail = false;
    const engine = new FirebaseEngine(CONFIG);
    const chunks: string[] = [];
    const result = await engine.run(REQUEST, "hybrid", (c) => chunks.push(c));
    expect(result.path).toBe("on-device");
    expect(result.text).toBe("Hybrid answer");
    expect(chunks).toEqual(["Hybrid ", "Hybrid answer"]);
    expect(result.modelLabel).toContain("Gemini Nano");
    expect(result.latencyMs).toBeGreaterThan(0);
  });

  it("labels a response served in the cloud with the cloud model name", async () => {
    fake.source = "in_cloud";
    fake.fail = false;
    const engine = new FirebaseEngine(CONFIG);
    const result = await engine.run(REQUEST, "hybrid", () => {});
    expect(result.path).toBe("cloud");
    expect(result.modelLabel).toContain(CLOUD_MODEL);
  });

  it("initializes the device model once across runs", async () => {
    fake.fail = false;
    fake.deviceModelCalls = 0;
    const engine = new FirebaseEngine(CONFIG);
    await engine.run(REQUEST, "hybrid", () => {});
    await engine.run(REQUEST, "cloud", () => {});
    expect(fake.deviceModelCalls).toBe(1);
  });

  it("propagates SDK errors to the caller", async () => {
    fake.fail = true;
    const engine = new FirebaseEngine(CONFIG);
    await expect(engine.run(REQUEST, "hybrid", () => {})).rejects.toThrow(
      "fake SDK failure",
    );
    fake.fail = false;
  });
});
