import type {
  AssistantEngine,
  RewriteStyle,
  RunResult,
  TaskRequest,
  TranslateDirection,
} from "./types";

/**
 * ---------------------------------------------------------------------------
 * DEMO ENGINE — read this before trusting its output.
 *
 * This engine exists so NanoScribe is fully explorable (and demoable) before
 * a real Firebase project is configured. It is NOT an AI model: it is a tiny
 * deterministic toolbox —
 *   summarize -> extractive sentence ranking (picks the source's own sentences)
 *   rewrite   -> a handful of string rules (contractions, filler words, casing)
 *   translate -> a small built-in English <-> Indonesian word dictionary
 * Unknown words pass through unchanged. Output quality is intentionally
 * modest; the moment a real Firebase config is pasted into
 * src/firebase-config.ts, this engine is never used again.
 * ---------------------------------------------------------------------------
 */

const EN_ID: Record<string, string> = {
  the: "", // handled by omission: Indonesian has no articles
  a: "",
  an: "",
  is: "adalah",
  are: "adalah",
  was: "adalah",
  and: "dan",
  or: "atau",
  of: "dari",
  to: "ke",
  in: "di",
  on: "di",
  at: "di",
  for: "untuk",
  with: "dengan",
  from: "dari",
  by: "oleh",
  this: "ini",
  that: "itu",
  it: "itu",
  i: "saya",
  you: "kamu",
  he: "dia",
  she: "dia",
  we: "kami",
  they: "mereka",
  my: "saya",
  your: "kamu",
  can: "bisa",
  will: "akan",
  not: "tidak",
  very: "sangat",
  good: "baik",
  big: "besar",
  small: "kecil",
  new: "baru",
  old: "lama",
  day: "hari",
  night: "malam",
  morning: "pagi",
  water: "air",
  food: "makanan",
  house: "rumah",
  book: "buku",
  school: "sekolah",
  teacher: "guru",
  student: "siswa",
  cat: "kucing",
  dog: "anjing",
  work: "kerja",
  learn: "belajar",
  read: "membaca",
  write: "menulis",
  speak: "berbicara",
  language: "bahasa",
  world: "dunia",
  life: "hidup",
  time: "waktu",
  year: "tahun",
  people: "orang",
  man: "pria",
  woman: "wanita",
  child: "anak",
  friend: "teman",
  family: "keluarga",
  city: "kota",
  country: "negara",
  sun: "matahari",
  moon: "bulan",
  star: "bintang",
  sea: "laut",
  mountain: "gunung",
  river: "sungai",
  tree: "pohon",
  flower: "bunga",
  happy: "senang",
  sad: "sedih",
  fast: "cepat",
  slow: "lambat",
  hot: "panas",
  cold: "dingin",
  eat: "makan",
  drink: "minum",
  sleep: "tidur",
  walk: "berjalan",
  run: "berlari",
  beautiful: "indah",
  important: "penting",
  easy: "mudah",
  difficult: "sulit",
  question: "pertanyaan",
  answer: "jawaban",
  story: "cerita",
  music: "musik",
  money: "uang",
  market: "pasar",
  price: "harga",
  buy: "membeli",
  sell: "menjual",
  help: "membantu",
  love: "cinta",
  like: "suka",
  want: "ingin",
  need: "butuh",
  go: "pergi",
  come: "datang",
  see: "melihat",
  make: "membuat",
  use: "menggunakan",
  device: "perangkat",
  phone: "ponsel",
  computer: "komputer",
  internet: "internet",
  data: "data",
  cloud: "awan",
  model: "model",
  text: "teks",
  today: "hari ini",
  tomorrow: "besok",
  yesterday: "kemarin",
  always: "selalu",
  never: "tidak pernah",
  often: "sering",
  now: "sekarang",
  here: "di sini",
  there: "di sana",
  where: "di mana",
  when: "kapan",
  because: "karena",
  but: "tetapi",
  so: "jadi",
  if: "jika",
  also: "juga",
  more: "lebih",
  many: "banyak",
  much: "banyak",
  one: "satu",
  two: "dua",
  three: "tiga",
  first: "pertama",
  every: "setiap",
  all: "semua",
  some: "beberapa",
  no: "tidak",
  yes: "ya",
  please: "tolong",
  thanks: "terima kasih",
  hello: "halo",
};

/** Invert the EN->ID map (first translation wins for duplicates). */
const ID_EN: Record<string, string> = (() => {
  const inverted: Record<string, string> = {};
  for (const [en, id] of Object.entries(EN_ID)) {
    if (id && !(id in inverted)) {
      inverted[id] = en;
    }
  }
  return inverted;
})();

/** Split text into sentences, keeping terminal punctuation. */
export function splitSentences(text: string): string[] {
  const matches = text
    .replace(/\s+/g, " ")
    .trim()
    .match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g);
  return (matches ?? []).map((s) => s.trim()).filter(Boolean);
}

function wordFrequencies(text: string): Map<string, number> {
  const freq = new Map<string, number>();
  for (const word of text.toLowerCase().match(/[a-zà-ÿ']+/g) ?? []) {
    if (word.length > 2) {
      freq.set(word, (freq.get(word) ?? 0) + 1);
    }
  }
  return freq;
}

/**
 * Extractive summary: score each sentence by the frequency of its words in
 * the whole text, with a small lead bias (opening sentences are usually the
 * most topical — a standard extractive-summarization heuristic). Keep the
 * top scorers in original order.
 */
export function extractiveSummarize(text: string): string {
  const sentences = splitSentences(text);
  if (sentences.length <= 2) {
    return sentences.join(" ");
  }
  const freq = wordFrequencies(text);
  const scored = sentences.map((sentence, index) => {
    // Score over content words only — the same set the frequency table uses.
    const words = (sentence.toLowerCase().match(/[a-zà-ÿ']+/g) ?? []).filter(
      (w) => w.length > 2,
    );
    const baseScore =
      words.reduce((sum, w) => sum + (freq.get(w) ?? 0), 0) / Math.max(words.length, 1);
    const leadBias = 1 + 0.25 * (1 - index / sentences.length);
    return { sentence, index, score: baseScore * leadBias };
  });
  const keepCount = Math.min(3, Math.max(1, Math.ceil(sentences.length / 3)));
  const chosen = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, keepCount)
    .sort((a, b) => a.index - b.index);
  const summary = chosen.map((c) => c.sentence).join(" ");
  const bullets = chosen.map((c) => `- ${c.sentence}`).join("\n");
  return `${summary}\n\nKey points:\n${bullets}`;
}

const EXPAND: Record<string, string> = {
  "don't": "do not",
  "doesn't": "does not",
  "can't": "cannot",
  "won't": "will not",
  "it's": "it is",
  "i'm": "I am",
  "we're": "we are",
  "they're": "they are",
  "that's": "that is",
  gonna: "going to",
  wanna: "want to",
  yeah: "yes",
  hi: "hello",
  thanks: "thank you",
};

const CONTRACT: Record<string, string> = {
  "do not": "don't",
  "does not": "doesn't",
  cannot: "can't",
  "will not": "won't",
  "it is": "it's",
  "that is": "that's",
  hello: "hi",
  "thank you": "thanks",
};

function replaceWords(text: string, map: Record<string, string>): string {
  let out = text;
  for (const [from, to] of Object.entries(map)) {
    const pattern = new RegExp(`\\b${from.replace(/'/g, "['’]")}\\b`, "gi");
    out = out.replace(pattern, (matched) =>
      matched[0] === matched[0]?.toUpperCase() && matched.length > 1
        ? to.charAt(0).toUpperCase() + to.slice(1)
        : to,
    );
  }
  return out;
}

function capitalizeSentences(text: string): string {
  return text.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (m) => m.toUpperCase());
}

function tidy(text: string): string {
  const out = text.replace(/\s+/g, " ").trim();
  return /[.!?]$/.test(out) ? out : `${out}.`;
}

/** Rule-based rewrite used by the demo engine. */
export function ruleRewrite(text: string, style: RewriteStyle): string {
  const trimmed = text.trim();
  switch (style) {
    case "formal":
      return tidy(capitalizeSentences(replaceWords(trimmed, EXPAND)));
    case "casual":
      return replaceWords(trimmed, CONTRACT).trim();
    case "concise": {
      const shorter = trimmed
        .replace(/\bin order to\b/gi, "to")
        .replace(/\bdue to the fact that\b/gi, "because")
        .replace(/\b(very|really|just|actually|basically)\s+/gi, "");
      return tidy(capitalizeSentences(shorter));
    }
    case "grammar":
      return tidy(capitalizeSentences(trimmed.replace(/\bi\b/g, "I")));
  }
}

/** Word-by-word dictionary translation used by the demo engine. */
export function dictionaryTranslate(text: string, direction: TranslateDirection): string {
  const dict = direction === "en-id" ? EN_ID : ID_EN;
  return text.replace(/[A-Za-zÀ-ÿ]+/g, (word) => {
    const hit = dict[word.toLowerCase()];
    if (hit === undefined) {
      return word; // unknown words pass through unchanged
    }
    if (hit === "") {
      return ""; // articles are dropped for Indonesian
    }
    return word[0] === word[0]?.toUpperCase()
      ? hit.charAt(0).toUpperCase() + hit.slice(1)
      : hit;
  }).replace(/\s{2,}/g, " ").replace(/\s+([.,!?])/g, "$1").trim();
}

/** The demo engine: deterministic, offline, and honest about what it is. */
export class DemoEngine implements AssistantEngine {
  readonly kind = "demo" as const;

  async prepareDeviceModel(): Promise<void> {
    // Nothing to prepare — the demo engine has no on-device model.
  }

  async run(
    request: TaskRequest,
    _routing: "hybrid" | "device" | "cloud",
    onChunk: (cumulativeText: string) => void,
  ): Promise<RunResult> {
    const started = performance.now();
    let output: string;
    switch (request.kind) {
      case "summarize":
        output = extractiveSummarize(request.text);
        break;
      case "rewrite":
        output = ruleRewrite(request.text, request.rewriteStyle);
        break;
      case "translate":
        output = dictionaryTranslate(request.text, request.direction);
        break;
    }
    // Emit word-by-word so the streaming UI behaves the same as with the
    // real engine. Latency is measured honestly around the whole run.
    const words = output.split(/(?<=\s)/);
    let cumulative = "";
    for (const word of words) {
      cumulative += word;
      onChunk(cumulative);
      await new Promise((resolve) => setTimeout(resolve, 12));
    }
    return {
      text: output,
      path: "demo",
      modelLabel: "Local demo engine (no AI model — add a Firebase config)",
      latencyMs: Math.max(1, Math.round(performance.now() - started)),
    };
  }
}
