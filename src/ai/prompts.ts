import type { RewriteStyle, TaskRequest } from "./types";

const REWRITE_INSTRUCTIONS: Record<RewriteStyle, string> = {
  formal:
    "Rewrite it in a formal, professional tone suitable for a business email. " +
    "Use complete sentences and polite, precise wording.",
  casual:
    "Rewrite it in a friendly, casual tone, like a message to a colleague you know well. " +
    "Keep it natural and warm, but still clear.",
  concise:
    "Rewrite it to be as concise as possible without losing any key information. " +
    "Cut filler words and redundant phrases.",
  grammar:
    "Fix all grammar, spelling, and punctuation errors. Keep the original wording, " +
    "tone, and meaning as close as possible — only correct what is wrong.",
};

/**
 * Build the single-turn prompt for a task. On-device inference through
 * Firebase AI Logic supports single-turn text generation only (no chat),
 * so every task is expressed as one self-contained prompt.
 */
export function buildPrompt(request: TaskRequest): string {
  const text = request.text.trim();

  switch (request.kind) {
    case "summarize":
      return [
        "Summarize the text below. Respond in the same language as the text.",
        "Format your answer exactly like this:",
        "First a summary paragraph of at most 3 sentences, then a blank line,",
        'then the line "Key points:" followed by 3 to 5 short bullet points,',
        "each starting with '- '.",
        "",
        "Text to summarize:",
        '"""',
        text,
        '"""',
      ].join("\n");

    case "rewrite":
      return [
        `Rewrite the text below. ${REWRITE_INSTRUCTIONS[request.rewriteStyle]}`,
        "Output only the rewritten text — no explanations, no quotation marks around it.",
        "",
        "Text to rewrite:",
        '"""',
        text,
        '"""',
      ].join("\n");

    case "translate": {
      const from = request.direction === "en-id" ? "English" : "Bahasa Indonesia";
      const to = request.direction === "en-id" ? "Bahasa Indonesia" : "English";
      return [
        `Translate the text below from ${from} into natural, fluent ${to}.`,
        "Preserve the tone and formatting. Output only the translation.",
        "",
        "Text to translate:",
        '"""',
        text,
        '"""',
      ].join("\n");
    }
  }
}
