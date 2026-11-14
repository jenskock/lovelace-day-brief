export const CARD_VERSION = "1.1.0";
export const CARD_NAME = "Day Brief";
export const CARD_TYPE = "day-brief-card";
export const EDITOR_NAME = "day-brief-card-editor";

export const DEFAULT_SUMMARY_PROMPT = [
  "Summarize only. Do not control devices, call tools, or ask follow-up questions.",
  "Write 1-3 short sentences for a home dashboard day brief.",
  "Use the date, weather, agenda, and extra entity context below.",
].join("\n");
