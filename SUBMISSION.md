# Devpost Submission — NanoScribe (#BuildHybridAI 2026)

> Everything below the "Raymond's remaining steps" section is ready to paste into
> Devpost. Deadline: **30 Nov 2026, 17:00 ET** (= 1 Dec 2026, 05:00 WIB). Do not miss it.

---

## Project name

**NanoScribe**

## One-line pitch (tagline)

An offline-first AI writing assistant that thinks on your device first — on-device
Gemini Nano answers in milliseconds with total privacy, and Firebase AI Logic quietly
falls back to cloud Gemini only when it has to. Every answer proves which path served
it.

## Category claim

- **Best Web/Chrome App** ($3,000) — primary category. Platform to select on the
  submission form: **Web (Chrome)**.
- Also entered for the **Grand Prize** ($10,000) and runner-up prizes — same submission.

## Full description (paste into "Project description")

### Inspiration

Every writing app today ships your words to a data centre — even for a ten-word
translation. That costs latency, money, and privacy, and it dies completely the moment
you lose signal. But the fix isn't "on-device only" either: many devices have no local
model, and some requests deserve a bigger brain. We wanted an app that refuses to
choose — and that *shows* you, on every single answer, where the work happened.

### What it does

NanoScribe is a writing & translation assistant with three single-turn tasks:

- **Summarize** any text into a short paragraph plus key-point bullets (in the text's
  own language),
- **Rewrite** it — formal, casual, more concise, or grammar-fix only,
- **Translate** between English and Bahasa Indonesia.

Under the hood it is one Firebase AI Logic `GenerativeModel` configured with
`InferenceMode.PREFER_ON_DEVICE`. Chrome's built-in Gemini Nano answers when it can;
the cloud Gemini model (`gemini-3.5-flash-lite`, via the Gemini Developer API) answers
when it can't. The result panel displays a badge — **ON-DEVICE** or **CLOUD** — taken
from the response's `inferenceSource`, plus the request latency, so the hybrid routing
is never a black box. A routing switch also lets you force On-device only or Cloud
only and feel the difference. A session history tracks how many answers were served
on-device: *"9 of 12 runs on-device — every one is a cloud call that never happened."*

Because hybrid mode still works offline for on-device requests, NanoScribe keeps
summarizing and translating on a plane, in a tunnel, or on a flaky connection — the
demo video shows exactly that, in airplane mode.

And before any Firebase project exists, the app boots into a clearly-labelled demo
mode (a tiny local extractive/dictionary engine — *not* an AI model) so anyone can
explore the full UX with zero setup.

### How we built it

- **Firebase AI Logic JS SDK (firebase v13)** — `getAI` with `GoogleAIBackend`,
  `getGenerativeModel` with hybrid `HybridParams` (`mode` + `inCloudParams`),
  `initializeDeviceModel()` on user interaction with download-progress reporting,
  and streaming via `generateContentStream`.
- **Vite + vanilla TypeScript** — no framework; the whole app is ~115 KB of JS
  (29 KB gzipped) so it loads instantly and can be hosted anywhere static.
- **Two engines, one interface** — `FirebaseEngine` (real hybrid inference) and
  `DemoEngine` (deterministic local stand-in) both implement `AssistantEngine`;
  a factory picks based on whether `src/firebase-config.ts` holds a real config.
- **App Check** — debug provider wired for localhost; reCAPTCHA Enterprise supported
  via config for hosted deployments.
- **Tests** — 30 Vitest tests covering prompt construction, the demo engine, the
  `inferenceSource` → badge mapping, engine selection, and the Firebase engine's
  routing labels against a mocked SDK.

### Challenges we ran into

- On-device inference is **single-turn only** (no chat), so every feature had to be
  expressed as one self-contained prompt — including output formatting instructions.
- `initializeDeviceModel()` requires a **user activation** first; we call it from the
  Run click and added a "Prepare on-device model" button with a progress bar so the
  one-time Gemini Nano download is a visible, understandable step.
- Knowing *which* path answered is the whole point of the app, so we built the badge
  strictly on `response.inferenceSource` rather than guessing from availability.

### Accomplishments we're proud of

- A complete, coherent product (not a tech demo): tasks, routing control, streaming,
  history, stats, status pills, offline awareness, and an honest demo mode.
- The hybrid split is *measurable in the UI*: path, model name, and latency on every
  answer, and an on-device share percentage over the session.
- The production build is tiny and dependency-light, and the test suite pins the
  routing behaviour without needing a live Firebase project.

### What we learned

Hybrid inference changes product design, not just plumbing: once the marginal cost of
an AI call can be zero, you design features you'd never dare build cloud-only — and
you owe the user a receipt (the badge) every time you do spend a cloud call.

### What's next

- Long-document handling: chunk on-device, escalate only the hard parts to the cloud.
- More language pairs and a tone-aware translate.
- Android/iOS siblings on the same Firebase AI Logic hybrid SDK, sharing this prompt
  and routing design.

## Built with

Firebase AI Logic · Firebase App Check · Gemini Nano (Chrome Prompt API) · Gemini
(gemini-3.5-flash-lite) · TypeScript · Vite · Vitest

---

## Demo video script (≤ 3 minutes, English narration)

*Record in Chrome 139+ on desktop with the on-device model prepared. Total ≈ 2:45.*

| # | Time | On screen | Narration |
| --- | --- | --- | --- |
| 1 | 0:00–0:15 | NanoScribe home; status pills visible (Engine: live, On-device: ready, Network: online) | "This is NanoScribe — a writing assistant that runs AI on your device first, and only uses the cloud when it has to. It's built on Firebase AI Logic hybrid inference." |
| 2 | 0:15–0:40 | Click "Try a sample (EN)", task = Summarize, routing = Hybrid, press Run | "I'll summarize this article in Hybrid mode. Firebase AI Logic tries Gemini Nano, right here in Chrome, before anything else." |
| 3 | 0:40–0:55 | Result streams in; badge reads ON-DEVICE with latency | "See the badge: ON-DEVICE, answered in well under a second. That label isn't a guess — it's the `inferenceSource` of the response. My text never left this laptop." |
| 4 | 0:55–1:20 | Switch routing to Cloud only, Run again on the same text | "Now I'll force Cloud only. Same prompt, same app — but this time the badge says CLOUD, served by Gemini through Firebase AI Logic, and you can compare the latency." |
| 5 | 1:20–1:50 | Turn on airplane mode / disable network (show the Network pill flip to offline), routing back to Hybrid, Translate the Indonesian sample ID→EN, Run | "Now the real test: I'm offline. Watch the network pill. Hybrid mode doesn't care — Gemini Nano translates locally, badge ON-DEVICE, while cloud-only apps would just fail." |
| 6 | 1:50–2:15 | Scroll the session history; stats line shows on-device share | "The history keeps score: most of my requests were answered on-device. Every one of those is a cloud call that never happened — faster, private, and free." |
| 7 | 2:15–2:45 | Back online; show Rewrite (formal) on a casual draft; end on the badge row | "One SDK, two execution paths, zero backend code. NanoScribe: device first, cloud when it counts — and a receipt on every answer. Thanks for watching." |

*Upload to YouTube as Public, in English (narration above), title:
"NanoScribe — Offline-First AI Writing with Firebase AI Logic Hybrid Inference".*

---

## Raymond's remaining steps (exact)

1. **Create a Devpost account** (if you don't have one) and open the
   #BuildHybridAI 2026 hackathon page: <https://firebasehybridaihackathon.devpost.com>
2. **Create a free Firebase project** at <https://console.firebase.google.com> under
   your Google account:
   - Create project (Google Analytics not needed) →
   - Build → **AI Logic** → *Get started* → choose the **Gemini Developer API**
     provider →
   - Project settings → register a **Web app** (`</>`) → copy the `firebaseConfig`
     object →
   - Paste it into **`src/firebase-config.ts`** in this repo, replacing every
     `REPLACE_WITH_…` value (that one file is the whole integration).
3. **Tell ALBI** the config is in. ALBI will re-run the tests + production build,
   verify the live engine activates (the "demo mode" banner disappears), help deploy
   the hosted build (Firebase Hosting or any static host), and give you the live URL
   for the submission form.
4. **Record and upload the demo video** to YouTube (Public, ≤ 3 minutes) using the
   script above.
5. **Submit on Devpost before 30 Nov 2026, 17:00 ET** (= 1 Dec 2026, 05:00 WIB):
   paste the description from this file, select platform **Web (Chrome)**, add the
   public repo URL (with this code + the MIT `LICENSE`), the hosted app URL, and the
   YouTube link.

### Submission-requirements checklist (from the official rules)

- [x] GenAI app built on Firebase AI Logic, Web (Chrome) platform — imported and
      actually called at runtime (`src/ai/firebase-engine.ts`)
- [x] Public repo contents complete: source, instructions (README), value proposition
- [x] Open-source licence file included (MIT — `LICENSE`)
- [ ] Repo pushed to a public GitHub/GitLab URL — *Raymond, at submit time*
- [ ] Demo video ≤ 3 min, public on YouTube, English narration — *Raymond (script above)*
- [ ] Hosted app URL — *encouraged; ALBI deploys after step 3*
- [x] Text description incl. how Firebase AI Logic is used — *above, ready to paste*
- [x] App is free of charge; submission materials in English
