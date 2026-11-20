import { describe, expect, it } from "vitest";
import { buildPrompt } from "../src/ai/prompts";
import type { TaskRequest } from "../src/ai/types";

function request(partial: Partial<TaskRequest>): TaskRequest {
  return {
    kind: "summarize",
    text: "Some input text.",
    rewriteStyle: "formal",
    direction: "en-id",
    ...partial,
  };
}

describe("buildPrompt", () => {
  it("builds a summarize prompt with the required output format and the text", () => {
    const prompt = buildPrompt(request({ kind: "summarize", text: "A long article." }));
    expect(prompt).toContain("Summarize the text below");
    expect(prompt).toContain("Key points:");
    expect(prompt).toContain("A long article.");
  });

  it("builds a formal rewrite prompt", () => {
    const prompt = buildPrompt(request({ kind: "rewrite", rewriteStyle: "formal" }));
    expect(prompt).toContain("formal, professional tone");
    expect(prompt).toContain("Output only the rewritten text");
  });

  it("builds a grammar-only rewrite prompt", () => {
    const prompt = buildPrompt(request({ kind: "rewrite", rewriteStyle: "grammar" }));
    expect(prompt).toContain("Fix all grammar, spelling, and punctuation errors");
  });

  it("builds an English -> Indonesian translation prompt", () => {
    const prompt = buildPrompt(request({ kind: "translate", direction: "en-id" }));
    expect(prompt).toContain("from English into natural, fluent Bahasa Indonesia");
    expect(prompt).toContain("Output only the translation");
  });

  it("builds an Indonesian -> English translation prompt", () => {
    const prompt = buildPrompt(request({ kind: "translate", direction: "id-en" }));
    expect(prompt).toContain("from Bahasa Indonesia into natural, fluent English");
  });
});
