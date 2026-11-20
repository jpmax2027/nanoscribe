import {
  describeAvailability,
  probeOnDeviceAvailability,
} from "./ai/availability";
import { createEngine, describePath } from "./ai/engine";
import type {
  AssistantEngine,
  InferencePath,
  RoutingMode,
  RunResult,
  TaskKind,
  TaskRequest,
  TranslateDirection,
  RewriteStyle,
} from "./ai/types";

const SAMPLE_EN = [
  "Hybrid inference is changing how web apps use AI. Instead of sending every",
  "request to a distant data centre, the browser first asks the model that",
  "already lives on the user's device. That model answers in milliseconds,",
  "works on a plane with no connection, and never sees a server log. When a",
  "request is too hard, or the device has no local model, the same app quietly",
  "falls back to a large cloud model. For a writing assistant this split is",
  "ideal: quick summaries and translations stay private and free on the",
  "device, while the cloud is reserved for work that truly needs it. Users",
  "get speed and privacy, developers get lower bills, and nobody has to",
  "choose between the two.",
].join(" ");

const SAMPLE_ID = [
  "Kecerdasan buatan kini dapat berjalan langsung di perangkat pengguna.",
  "Model kecil di dalam peramban mampu meringkas teks dan menerjemahkan",
  "kalimat tanpa koneksi internet, sehingga data pribadi tidak pernah",
  "meninggalkan perangkat. Jika tugas terlalu berat, aplikasi yang sama",
  "dapat meminta bantuan model besar di awan. Bagi penulis dan pelajar,",
  "cara kerja ini sangat membantu: pekerjaan ringan selesai dengan cepat",
  "dan gratis, sedangkan pekerjaan sulit tetap ditangani dengan baik.",
  "Pengguna mendapat kecepatan dan privasi, dan pengembang menghemat biaya.",
].join(" ");

interface HistoryEntry {
  at: string;
  taskLabel: string;
  path: InferencePath;
  modelLabel: string;
  latencyMs: number;
}

const HISTORY_KEY = "nanoscribe-history";
const MAX_HISTORY = 20;

function el<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) {
    throw new Error(`Missing element #${id}`);
  }
  return node as T;
}

const inputText = el<HTMLTextAreaElement>("input-text");
const charCount = el<HTMLSpanElement>("char-count");
const rewriteOptions = el<HTMLDivElement>("rewrite-options");
const translateOptions = el<HTMLDivElement>("translate-options");
const rewriteStyleSelect = el<HTMLSelectElement>("rewrite-style");
const directionSelect = el<HTMLSelectElement>("translate-direction");
const routingSelect = el<HTMLSelectElement>("routing-mode");
const runBtn = el<HTMLButtonElement>("run-btn");
const prepareBtn = el<HTMLButtonElement>("prepare-btn");
const prepareNote = el<HTMLParagraphElement>("prepare-note");
const progress = el<HTMLProgressElement>("download-progress");
const badge = el<HTMLSpanElement>("result-badge");
const resultMeta = el<HTMLSpanElement>("result-meta");
const resultBlurb = el<HTMLParagraphElement>("result-blurb");
const errorBox = el<HTMLDivElement>("error-box");
const output = el<HTMLDivElement>("output");
const copyBtn = el<HTMLButtonElement>("copy-btn");
const statsLine = el<HTMLParagraphElement>("stats-line");
const historyList = el<HTMLUListElement>("history-list");
const pillConfig = el<HTMLSpanElement>("pill-config");
const pillDevice = el<HTMLSpanElement>("pill-device");
const pillNet = el<HTMLSpanElement>("pill-net");
const demoBanner = el<HTMLDivElement>("demo-banner");

const engine: AssistantEngine = createEngine();
let currentTask: TaskKind = "summarize";
let lastResult: RunResult | null = null;
let history: HistoryEntry[] = loadHistory();

/* ------------------------------ history ------------------------------ */

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {
    // Storage may be unavailable (private mode); history is a nicety only.
  }
}

function renderHistory(): void {
  historyList.replaceChildren();
  if (history.length === 0) {
    const li = document.createElement("li");
    li.className = "history-empty";
    li.textContent = "Nothing yet — your runs will be listed here.";
    historyList.append(li);
    statsLine.textContent = "No runs yet this session.";
    return;
  }
  for (const entry of history) {
    const li = document.createElement("li");
    const pathBadge = document.createElement("span");
    const desc = describePath(entry.path);
    pathBadge.className = `badge ${desc.className}`;
    pathBadge.textContent = desc.label;
    const text = document.createElement("span");
    text.textContent =
      `${entry.at} · ${entry.taskLabel} · ${entry.modelLabel} · ` +
      `${entry.latencyMs.toLocaleString()} ms`;
    li.append(pathBadge, text);
    historyList.append(li);
  }
  const total = history.length;
  const onDevice = history.filter((h) => h.path === "on-device").length;
  const avg = Math.round(history.reduce((sum, h) => sum + h.latencyMs, 0) / total);
  statsLine.textContent =
    `${total} run${total === 1 ? "" : "s"} recorded · ` +
    `${onDevice} answered on-device (${Math.round((onDevice / total) * 100)}%) · ` +
    `average latency ${avg.toLocaleString()} ms. ` +
    `Every on-device answer is a cloud call that never happened.`;
}

/* ------------------------------ status pills ------------------------------ */

function renderNetPill(): void {
  const online = navigator.onLine;
  pillNet.textContent = online ? "Network: online" : "Network: offline";
  pillNet.className = `pill ${online ? "pill-good" : "pill-bad"}`;
}

async function renderDevicePill(): Promise<void> {
  const status = await probeOnDeviceAvailability();
  pillDevice.textContent = `On-device: ${describeAvailability(status)}`;
  pillDevice.className = `pill ${
    status === "available" ? "pill-good" : status === "unsupported" ? "pill-bad" : "pill-warn"
  }`;
}

function renderConfigPill(): void {
  if (engine.kind === "firebase") {
    pillConfig.textContent = "Engine: Firebase AI Logic (live)";
    pillConfig.className = "pill pill-good";
    demoBanner.hidden = true;
    prepareBtn.disabled = false;
    prepareNote.textContent =
      "Downloads Gemini Nano in Chrome (once, ~1–2 GB) so hybrid requests can run on-device.";
  } else {
    pillConfig.textContent = "Engine: demo mode (no Firebase config)";
    pillConfig.className = "pill pill-warn";
    demoBanner.hidden = false;
    prepareBtn.disabled = true;
    prepareNote.textContent =
      "On-device preparation activates once a real Firebase config is added.";
  }
}

/* ------------------------------ task tabs ------------------------------ */

function selectTask(task: TaskKind): void {
  currentTask = task;
  document.querySelectorAll<HTMLButtonElement>(".task-tab").forEach((tab) => {
    const active = tab.dataset.task === task;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  rewriteOptions.hidden = task !== "rewrite";
  translateOptions.hidden = task !== "translate";
}

document.querySelectorAll<HTMLButtonElement>(".task-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const task = tab.dataset.task;
    if (task === "summarize" || task === "rewrite" || task === "translate") {
      selectTask(task);
    }
  });
});

document.querySelectorAll<HTMLButtonElement>(".sample-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    inputText.value = btn.dataset.sample === "id" ? SAMPLE_ID : SAMPLE_EN;
    updateCharCount();
    inputText.focus();
  });
});

function updateCharCount(): void {
  const n = inputText.value.length;
  charCount.textContent = `${n.toLocaleString()} character${n === 1 ? "" : "s"}`;
}
inputText.addEventListener("input", updateCharCount);

/* ------------------------------ run ------------------------------ */

function currentRequest(): TaskRequest {
  return {
    kind: currentTask,
    text: inputText.value,
    rewriteStyle: rewriteStyleSelect.value as RewriteStyle,
    direction: directionSelect.value as TranslateDirection,
  };
}

function taskLabel(request: TaskRequest): string {
  switch (request.kind) {
    case "summarize":
      return "Summarize";
    case "rewrite":
      return `Rewrite (${request.rewriteStyle})`;
    case "translate":
      return request.direction === "en-id" ? "Translate EN→ID" : "Translate ID→EN";
  }
}

function setBadgeIdle(text: string, busy = false): void {
  badge.textContent = text;
  badge.className = `badge${busy ? " badge-busy" : ""}`;
}

async function run(): Promise<void> {
  const request = currentRequest();
  errorBox.hidden = true;
  if (!request.text.trim()) {
    errorBox.textContent = "Please paste or type some text first — or use one of the sample buttons.";
    errorBox.hidden = false;
    inputText.focus();
    return;
  }

  runBtn.disabled = true;
  copyBtn.disabled = true;
  setBadgeIdle("WORKING…", true);
  resultMeta.textContent = "Streaming the answer…";
  resultBlurb.textContent = "";
  output.textContent = "";

  try {
    const routing = routingSelect.value as RoutingMode;
    const result = await engine.run(request, routing, (cumulative) => {
      output.textContent = cumulative;
    });
    lastResult = result;

    const desc = describePath(result.path);
    badge.textContent = desc.label;
    badge.className = `badge ${desc.className}`;
    resultMeta.textContent =
      `${result.modelLabel} · ${result.latencyMs.toLocaleString()} ms`;
    resultBlurb.textContent = desc.blurb;
    output.textContent = result.text;
    copyBtn.disabled = false;

    history.unshift({
      at: new Date().toLocaleTimeString(),
      taskLabel: taskLabel(request),
      path: result.path,
      modelLabel: result.modelLabel,
      latencyMs: result.latencyMs,
    });
    history = history.slice(0, MAX_HISTORY);
    saveHistory();
    renderHistory();
  } catch (error) {
    setBadgeIdle("ERROR");
    resultMeta.textContent = "The request failed.";
    resultBlurb.textContent = "";
    errorBox.textContent =
      error instanceof Error ? error.message : String(error);
    errorBox.hidden = false;
  } finally {
    runBtn.disabled = false;
  }
}

runBtn.addEventListener("click", () => {
  void run();
});

/* ------------------------------ prepare on-device ------------------------------ */

prepareBtn.addEventListener("click", () => {
  void (async () => {
    prepareBtn.disabled = true;
    progress.hidden = false;
    progress.value = 0;
    prepareNote.textContent = "Preparing the on-device model…";
    try {
      await engine.prepareDeviceModel((fraction) => {
        progress.value = fraction;
        prepareNote.textContent =
          fraction >= 1
            ? "On-device model ready."
            : `Downloading Gemini Nano… ${Math.round(fraction * 100)}%`;
      });
      prepareNote.textContent =
        "On-device model prepared. Run a task in Hybrid mode and watch the badge.";
    } catch (error) {
      prepareNote.textContent =
        `Could not prepare the on-device model: ${
          error instanceof Error ? error.message : String(error)
        }`;
    } finally {
      progress.hidden = true;
      prepareBtn.disabled = false;
      void renderDevicePill();
    }
  })();
});

/* ------------------------------ misc ------------------------------ */

copyBtn.addEventListener("click", () => {
  void (async () => {
    if (!lastResult) return;
    try {
      await navigator.clipboard.writeText(lastResult.text);
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1500);
    } catch {
      copyBtn.textContent = "Copy failed";
    }
  })();
});

el<HTMLButtonElement>("clear-history-btn").addEventListener("click", () => {
  history = [];
  saveHistory();
  renderHistory();
});

window.addEventListener("online", renderNetPill);
window.addEventListener("offline", renderNetPill);

/* ------------------------------ init ------------------------------ */

selectTask("summarize");
updateCharCount();
renderConfigPill();
renderNetPill();
renderHistory();
void renderDevicePill();
