import type { FirebaseOptions } from "firebase/app";

/**
 * ============================================================================
 *  FIREBASE WEB CONFIG — THE ONE FILE YOU NEED TO EDIT
 * ============================================================================
 *
 *  NanoScribe runs in a clearly-labelled DEMO MODE until a real Firebase
 *  project config is pasted below. In demo mode no data leaves the browser
 *  and answers come from a small built-in demo engine (not an AI model), so
 *  the app can be explored and screenshotted before Firebase is set up.
 *
 *  To go live (takes ~5 minutes, free):
 *
 *  1. Go to https://console.firebase.google.com and create a project
 *     (Google Analytics is NOT required).
 *  2. In the console: Build > AI Logic > "Get started", and choose the
 *     **Gemini Developer API** provider (free tier) when asked.
 *  3. Register a Web app in Project settings (the `</>` icon) and copy the
 *     `firebaseConfig` object it shows you into the object below.
 *  4. (Production only) App Check is enforced for AI Logic. For local
 *     development the app already enables the App Check *debug* provider on
 *     localhost — copy the debug token printed in the browser console and
 *     register it under App Check > Apps > Manage debug tokens. For a hosted
 *     production build, create a reCAPTCHA Enterprise key and paste it into
 *     `appCheckSiteKey` below.
 *  5. Rebuild / redeploy (`npm run build`) and tell ALBI — done.
 *
 *  The values below are placeholders on purpose. `isFirebaseConfigured()`
 *  detects them, so the app will stay in demo mode until every field is
 *  replaced with a real value.
 * ============================================================================
 */
export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCLEESUNF6sKoZbK0s5spF0pNQvlA1e2YA",
  authDomain: "nanoscribe-6c7a0.firebaseapp.com",
  projectId: "nanoscribe-6c7a0",
  storageBucket: "nanoscribe-6c7a0.firebasestorage.app",
  messagingSenderId: "359148709353",
  appId: "1:359148709353:web:a24f623fd746a8887f1778",
};

/**
 * Optional: reCAPTCHA Enterprise site key for Firebase App Check on a hosted
 * (non-localhost) deployment. Leave empty while developing locally — the
 * debug provider is used there instead.
 */
export const appCheckSiteKey = "";

/** True only when every placeholder above has been replaced with real values. */
export function isFirebaseConfigured(config: FirebaseOptions): boolean {
  const required = [config.apiKey, config.projectId, config.appId];
  if (required.some((value) => !value)) {
    return false;
  }
  return !Object.values(config).some(
    (value) => typeof value === "string" && value.startsWith("REPLACE_WITH"),
  );
}
