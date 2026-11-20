import { describe, expect, it } from "vitest";
import {
  DemoEngine,
  dictionaryTranslate,
  extractiveSummarize,
  ruleRewrite,
  splitSentences,
} from "../src/ai/demo-engine";
import type { TaskRequest } from "../src/ai/types";

const ARTICLE = [
  "Cats are small animals that people keep as pets in many countries.",
  "The weather today is hot and the sun is big in the sky.",
  "Cats sleep for many hours every day and cats like warm places.",
  "A dog is a friend animal but a dog needs work and time from people.",
  "People who keep cats say cats are easy and good friends at home.",
].join(" ");

describe("splitSentences", () => {
  it("splits on terminal punctuation", () => {
    expect(splitSentences("One. Two! Three?")).toEqual(["One.", "Two!", "Three?"]);
  });
});

describe("extractiveSummarize", () => {
  it("returns a shorter extract with key points, using the source's own sentences", () => {
    const summary = extractiveSummarize(ARTICLE);
    expect(summary).toContain("Key points:");
    expect(summary.length).toBeLessThan(ARTICLE.length);
    // The most topical sentence (about cats, the most frequent content word)
    // must survive the ranking.
    expect(summary).toContain("Cats are small animals");
  });

  it("is deterministic", () => {
    expect(extractiveSummarize(ARTICLE)).toBe(extractiveSummarize(ARTICLE));
  });

  it("returns short input unchanged", () => {
    expect(extractiveSummarize("Only one sentence here.")).toBe("Only one sentence here.");
  });
});

describe("ruleRewrite", () => {
  it("formal style expands contractions and informal words", () => {
    const out = ruleRewrite("hi, i don't wanna miss the meeting", "formal");
    expect(out).toContain("do not");
    expect(out).toContain("want to");
    expect(out).not.toContain("don't");
    expect(out.endsWith(".")).toBe(true);
  });

  it("casual style contracts phrases", () => {
    const out = ruleRewrite("I do not know the answer", "casual");
    expect(out).toContain("don't");
  });

  it("concise style drops filler words and long phrases", () => {
    const out = ruleRewrite("I really just study in order to learn", "concise");
    expect(out).not.toContain("really");
    expect(out).toContain("to learn");
    expect(out).not.toContain("in order to");
  });

  it("grammar style capitalizes and punctuates", () => {
    expect(ruleRewrite("hello world", "grammar")).toBe("Hello world.");
  });
});

describe("dictionaryTranslate", () => {
  it("translates known English words to Indonesian and drops articles", () => {
    const out = dictionaryTranslate("the cat is good", "en-id");
    expect(out).toContain("kucing");
    expect(out).toContain("adalah");
    expect(out).toContain("baik");
    expect(out).not.toContain("cat");
  });

  it("translates Indonesian back to English", () => {
    const out = dictionaryTranslate("kucing adalah baik", "id-en");
    expect(out).toContain("cat");
    expect(out).toContain("good");
  });

  it("passes unknown words through unchanged", () => {
    const out = dictionaryTranslate("the zebra sleeps", "en-id");
    expect(out).toContain("zebra");
  });

  it("preserves capitalization of the first word", () => {
    const out = dictionaryTranslate("Cat is good", "en-id");
    expect(out.startsWith("Kucing")).toBe(true);
  });
});

describe("DemoEngine", () => {
  it("runs a translation end-to-end, streams chunks, and labels the demo path", async () => {
    const engine = new DemoEngine();
    const chunks: string[] = [];
    const request: TaskRequest = {
      kind: "translate",
      text: "the cat is good",
      rewriteStyle: "formal",
      direction: "en-id",
    };
    const result = await engine.run(request, "hybrid", (cumulative) => {
      chunks.push(cumulative);
    });
    expect(engine.kind).toBe("demo");
    expect(result.path).toBe("demo");
    expect(result.text).toBe(dictionaryTranslate("the cat is good", "en-id"));
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[chunks.length - 1]).toBe(result.text);
    expect(result.latencyMs).toBeGreaterThan(0);
    expect(result.modelLabel).toContain("demo engine");
  });
});
