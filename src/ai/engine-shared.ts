import type { InferencePath } from "./types";

/**
 * Map the Firebase AI Logic `inferenceSource` value of a response onto the
 * app's path labels. Kept in this dependency-free module (raw string
 * comparison instead of importing the SDK enum) so the mapping is unit
 * testable without loading Firebase. The SDK defaults a missing value to
 * in-cloud, and so do we.
 */
export function mapInferenceSource(source: string | undefined | null): InferencePath {
  return source === "on_device" ? "on-device" : "cloud";
}

export interface PathDescription {
  /** Short badge label, e.g. "ON-DEVICE". */
  label: string;
  /** CSS class used to colour the badge. */
  className: "badge-device" | "badge-cloud" | "badge-demo";
  /** One-line explanation shown next to the badge. */
  blurb: string;
}

export function describePath(path: InferencePath): PathDescription {
  switch (path) {
    case "on-device":
      return {
        label: "ON-DEVICE",
        className: "badge-device",
        blurb: "Answered by Gemini Nano inside Chrome. Nothing left this device — it works offline and costs nothing.",
      };
    case "cloud":
      return {
        label: "CLOUD",
        className: "badge-cloud",
        blurb: "Answered by a cloud Gemini model through Firebase AI Logic (on-device was unavailable or not selected).",
      };
    case "demo":
      return {
        label: "DEMO MODE",
        className: "badge-demo",
        blurb: "Answered by the built-in demo engine — no AI model and no network. Add a Firebase config to go live.",
      };
  }
}
