/**
 * Probe Chrome's built-in AI (Prompt API / Gemini Nano) availability for the
 * status display. This is informational only — Firebase AI Logic does its
 * own routing at request time; the probe just lets the UI tell the user
 * whether on-device inference is even possible in this browser.
 *
 * Possible Prompt API states: "available", "downloadable", "downloading",
 * "unavailable". "unsupported" means this browser has no Prompt API at all
 * (anything other than Chrome 139+ on desktop).
 */
export type OnDeviceAvailability =
  | "available"
  | "downloadable"
  | "downloading"
  | "unavailable"
  | "unsupported";

interface LanguageModelLike {
  availability?: () => Promise<string>;
}

export async function probeOnDeviceAvailability(): Promise<OnDeviceAvailability> {
  const languageModel = (
    globalThis as { LanguageModel?: LanguageModelLike }
  ).LanguageModel;
  if (!languageModel || typeof languageModel.availability !== "function") {
    return "unsupported";
  }
  try {
    const status = await languageModel.availability();
    switch (status) {
      case "available":
      case "downloadable":
      case "downloading":
      case "unavailable":
        return status;
      default:
        return "unavailable";
    }
  } catch {
    return "unavailable";
  }
}

export function describeAvailability(status: OnDeviceAvailability): string {
  switch (status) {
    case "available":
      return "Gemini Nano ready on this device";
    case "downloadable":
      return "Gemini Nano can be downloaded (use “Prepare on-device model”)";
    case "downloading":
      return "Gemini Nano is downloading…";
    case "unavailable":
      return "On-device model not available on this device";
    case "unsupported":
      return "On-device needs Chrome 139+ on desktop";
  }
}
