import { describe, expect, it } from "vitest";
import { createEngine, describePath, mapInferenceSource } from "../src/ai/engine";
import { firebaseConfig, isFirebaseConfigured } from "../src/firebase-config";

describe("isFirebaseConfigured", () => {
  it("is false for a placeholder config", () => {
    expect(
      isFirebaseConfigured({
        apiKey: "REPLACE_WITH_YOUR_API_KEY",
        authDomain: "REPLACE_WITH_YOUR_PROJECT.firebaseapp.com",
        projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
        appId: "REPLACE_WITH_YOUR_APP_ID",
      }),
    ).toBe(false);
  });

  it("is true for the shipped config (real project values)", () => {
    expect(isFirebaseConfigured(firebaseConfig)).toBe(true);
  });

  it("is true when every field holds a real value", () => {
    expect(
      isFirebaseConfigured({
        apiKey: "AIza-real-key",
        authDomain: "demo.firebaseapp.com",
        projectId: "demo-project",
        appId: "1:123:web:abc",
      }),
    ).toBe(true);
  });

  it("is false when a required field is missing", () => {
    expect(
      isFirebaseConfigured({ apiKey: "k", projectId: "p", appId: "" }),
    ).toBe(false);
  });
});

describe("mapInferenceSource", () => {
  it("maps the SDK's on_device value to the on-device path", () => {
    expect(mapInferenceSource("on_device")).toBe("on-device");
  });

  it("maps in_cloud to the cloud path", () => {
    expect(mapInferenceSource("in_cloud")).toBe("cloud");
  });

  it("defaults a missing value to cloud, matching the SDK default", () => {
    expect(mapInferenceSource(undefined)).toBe("cloud");
    expect(mapInferenceSource(null)).toBe("cloud");
  });
});

describe("createEngine", () => {
  it("selects the firebase engine now that a real config is shipped", () => {
    expect(createEngine().kind).toBe("firebase");
  });
});

describe("describePath", () => {
  it("gives each path a distinct badge class", () => {
    const classes = (["on-device", "cloud", "demo"] as const).map(
      (path) => describePath(path).className,
    );
    expect(new Set(classes).size).toBe(3);
  });
});
