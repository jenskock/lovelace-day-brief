import { html, nothing, type TemplateResult } from "lit";

/** Normalize common LLM markdown quirks before render/strip. */
function normalizeBriefMarkup(text: string): string {
  return text
    .replace(/\\([*_])/g, "$1")
    .replace(/＊/g, "*")
    .replace(/＿/g, "_")
    .replace(/<(?:b|strong)>(.*?)<\/(?:b|strong)>/gi, "**$1**")
    .replace(/__([^_\n]+?)__/g, "**$1**")
    .replace(/\*{3,}/g, "**");
}

/** Strip markdown emphasis for TTS / plain text. */
export function stripBriefMarkdown(text: string): string {
  return normalizeBriefMarkup(text)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}

/**
 * Render a light markdown subset: **bold** / __bold__ and blank-line paragraphs.
 * Everything else is escaped as text.
 */
export function renderBriefMarkdown(text: string): TemplateResult | typeof nothing {
  const raw = normalizeBriefMarkup(text).trim();
  if (!raw) {
    return nothing;
  }

  const paragraphs = raw.split(/\n{2,}/);
  return html`${paragraphs.map((paragraph, index) => {
    const parts = renderInline(paragraph.trim().replace(/\n/g, " "));
    return html`${index > 0 ? html`<br /><br />` : nothing}${parts}`;
  })}`;
}

function renderInline(text: string): TemplateResult {
  const nodes: Array<TemplateResult | string> = [];
  // Double asterisks first; no lookbehind (older WebViews / Silk).
  const pattern = /\*\*([^*]+?)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const bold = match[1].trim();
    if (bold) {
      nodes.push(html`<strong>${bold}</strong>`);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return html`${nodes}`;
}
