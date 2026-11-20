import { firebaseConfig, isFirebaseConfigured } from "../firebase-config";
import { DemoEngine } from "./demo-engine";
import { FirebaseEngine } from "./firebase-engine";
import type { AssistantEngine } from "./types";

export { describePath, mapInferenceSource } from "./engine-shared";

/**
 * Pick the engine for this session: the real Firebase hybrid engine when a
 * Firebase project has been configured in src/firebase-config.ts, otherwise
 * the clearly-labelled local demo engine.
 */
export function createEngine(): AssistantEngine {
  return isFirebaseConfigured(firebaseConfig)
    ? new FirebaseEngine(firebaseConfig)
    : new DemoEngine();
}
