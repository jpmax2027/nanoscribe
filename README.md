# NanoScribe

**An offline-first AI writing & translation assistant that thinks on your device first — and only phones the cloud when it has to.**

NanoScribe summarizes, rewrites, and translates text (English ⇄ Bahasa Indonesia) using
**Firebase AI Logic hybrid inference**: prompts run **on-device** with Gemini Nano inside
Chrome when available — fast, private, free, and fully offline — and **fall back to a
cloud Gemini model** when the device can't. Every answer carries a badge that proves
which path served it, read from the response's `inferenceSource`, plus its latency.

Built for the **#BuildHybridAI 2026** hackathon (Web/Chrome category).

---

## Why hybrid, and why a writing assistant?

Writing help is requested dozens of times a day, and most of it is small: summarize this
paragraph, make this email formal, translate this sentence. Sending all of that to the
cloud wastes money, adds latency, and ships private text to a server. But some devices
have no local model at all, and some requests genuinely need a bigger brain.

NanoScribe's answer is to not choose. One Firebase AI Logic model, configured with
`InferenceMode.PREFER_ON_DEVICE`, routes each request:

| | On-device (Gemini Nano) | Cloud (Gemini via Firebase AI Logic) |
| --- | --- | --- |
| Latency | Milliseconds, no network round-trip | Network + model time |
| Privacy | Text never leaves the device | Text goes to Google's cloud |
| Offline | Works on a plane, in a tunnel, anywhere | Needs a connection |
| Cost | Free | Free tier within limits, then metered |
| Capability | Great at short, single-turn writing tasks | Better for long/complex input |

The session history makes the split visible over time: *"12 runs · 9 answered on-device
(75%) · every on-device answer is a cloud call that never happened."*

## Features

- **Summarize** — summary paragraph + key-point bullets, in the input's language.
- **Rewrite** — formal, casual, concise, or grammar-fix-only.
- **Translate** — English ⇄ Bahasa Indonesia.
- **Routing control** — Hybrid (on-device first), On-device only, or Cloud only, mapped
  1:1 onto Firebase AI Logic's `InferenceMode` values, so anyone can feel the difference.
- **Proof, not promises** — each result shows an `ON-DEVICE` / `CLOUD` / `DEMO MODE`
  badge and latency, driven by `response.inferenceSource`.
- **Streaming output** via `generateContentStream`.
- **Session history & stats** (localStorage): path, model, and latency of every run.
- **Live status pills** — engine mode, on-device availability (Chrome Prompt API probe),
  and online/offline state.
- **Demo mode** — with no Firebase config, the app runs on a small built-in demo engine
  (extractive summarizer, rule-based rewriter, word dictionary) that is *clearly
  labelled as not an AI model*, so the app can be explored before Firebase is set up.

## How hybrid inference works in this app

```
                 ┌──────────────────────────────────────────────┐
                 │  Firebase AI Logic GenerativeModel            │
   prompt ─────► │  mode: PREFER_ON_DEVICE                       │
                 │                                              │
                 │   1. try ──► Gemini Nano in Chrome           │──► ON-DEVICE badge
                 │        (Prompt API, single-turn text)        │
                 │                                              │
                 │   2. fallback ──► gemini-3.5-flash-lite      │──► CLOUD badge
                 │        (Gemini Developer API via AI Logic)   │
                 └──────────────────────────────────────────────┘
        response.inferenceSource tells the UI which branch answered
```

Key implementation details (see `src/ai/firebase-engine.ts`):

- `getAI(app, { backend: new GoogleAIBackend() })`, then
  `getGenerativeModel(ai, { mode, inCloudParams: { model: "gemini-3.5-flash-lite" } })`.
- `model.initializeDeviceModel(progressCallback)` is called on the Run click — Chrome
  requires a user interaction before the on-device model can be prepared/downloaded.
  A "Prepare on-device model" button shows the download progress explicitly.
- Results stream with `generateContentStream`; the final response's `inferenceSource`
  (`"on_device"` / `"in_cloud"`) is mapped to the badge by
  `mapInferenceSource()` in `src/ai/engine-shared.ts`.
- Firebase AI Logic is imported and actually called at runtime — see
  `src/ai/firebase-engine.ts` (initialization, model creation, streaming generation).
- App Check: the debug provider is enabled automatically on localhost; a reCAPTCHA
  Enterprise site key can be set in `src/firebase-config.ts` for hosted deployments
  (AI Logic enforces App Check; debug tokens are accepted for this hackathon).

## Quick start (demo mode — no Firebase needed)

```bash
npm install
npm run dev        # open the printed localhost URL
```

The app boots in demo mode: try the EN/ID samples, switch tasks and routing modes, and
watch the amber `DEMO MODE` badge. Nothing leaves the browser.

## Going live with Firebase (≈5 minutes, free)

1. Create a project at <https://console.firebase.google.com> (Analytics not required).
2. **Build → AI Logic → Get started**, and choose the **Gemini Developer API** provider.
3. Register a Web app (Project settings → `</>`) and copy its `firebaseConfig` object.
4. Paste it into **`src/firebase-config.ts`** (the only file you need to edit),
   replacing every `REPLACE_WITH_…` value.
5. Local development: run the app once, copy the *App Check debug token* printed in the
   browser console, and register it under **App Check → Apps → Manage debug tokens**.
   (For a hosted production build, instead create a reCAPTCHA Enterprise key and set
   `appCheckSiteKey` in the same config file.)
6. `npm run build` and deploy `dist/` to any static host — Firebase Hosting
   (`npm i -g firebase-tools && firebase deploy`) works out of the box.

### On-device requirements (end user)

- Chrome **139+ on desktop**, with `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input`
  set to **Enabled** (per the Firebase docs), and enough disk space for the one-time
  Gemini Nano download. Everywhere else, hybrid mode transparently uses the cloud.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check (`tsc --noEmit`) + production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Vitest suite (30 tests: prompts, demo engine, path mapping, engine selection, mocked-SDK routing) |

## Project structure

```
src/
  firebase-config.ts     ← the ONE file to edit: Firebase web config + App Check key
  main.ts                UI wiring, history, status pills
  style.css
  ai/
    types.ts             Task/routing/path types + the AssistantEngine interface
    prompts.ts           Single-turn prompt builders (summarize / rewrite / translate)
    firebase-engine.ts   Firebase AI Logic hybrid engine (the real thing)
    demo-engine.ts       Clearly-labelled local demo engine (no AI)
    engine.ts            Factory: Firebase engine if configured, demo engine otherwise
    engine-shared.ts     inferenceSource → badge mapping
    availability.ts      Chrome Prompt API availability probe for the status pill
tests/                   Vitest tests for all of the above
```

## Known limitations

- On-device inference is single-turn text only (no chat) — NanoScribe's tasks are
  designed as single-turn prompts accordingly.
- On-device requires Chrome on desktop; on other browsers every request uses the cloud
  model (the badge shows it honestly).
- Real cloud inference and a real Gemini Nano run can only be verified with a Firebase
  project configured and Chrome's model downloaded; the routing/label logic itself is
  covered by unit tests with a mocked SDK.

## License

MIT — see [LICENSE](LICENSE).
