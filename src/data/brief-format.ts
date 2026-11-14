import { html, nothing, type TemplateResult } from "lit";

/** Strip markdown emphasis for TTS / plain text. */
export function stripBriefMarkdown(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}

/**
 * Render a light markdown subset: **bold** and blank-line paragraphs.
 * Everything else is escaped as text.
 */
export function renderBriefMarkdown(text: string): TemplateResult | typeof nothing {
  const raw = text.trim();
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
  const pattern = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    nodes.push(html`<strong>${match[1]}</strong>`);
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return html`${nodes}`;
}
