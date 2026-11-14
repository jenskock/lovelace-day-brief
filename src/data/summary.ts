import type {
  CalendarEvent,
  ConversationProcessResult,
  HomeAssistant,
  SummaryMode,
} from "../types";
import {
  formatTemperature,
  weatherConditionLabel,
  type WeatherSnapshot,
} from "./weather";

export interface SummaryDigest {
  hash: string;
  prompt: string;
  local: string;
}

interface CacheEntry {
  hash: string;
  text: string;
  source: "ai" | "local";
  expiresAt: number;
}

const summaryCache = new Map<string, CacheEntry>();

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

function eventLine(event: CalendarEvent): string {
  const when = event.all_day ? "all day" : event.start;
  const cal = event.calendar_name ? ` (${event.calendar_name})` : "";
  return `- ${when}: ${event.summary ?? "Busy"}${cal}`;
}

export function buildSummaryDigest(
  weather: WeatherSnapshot | null,
  events: CalendarEvent[],
  now: Date,
  locale: string,
  timeZone: string,
): SummaryDigest {
  const dayLabel = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone,
  }).format(now);

  const weatherLine = weather
    ? `${weatherConditionLabel(weather.condition)}, ${formatTemperature(
        weather.temperature,
        weather.temperature_unit,
      )}${
        typeof weather.humidity === "number"
          ? `, humidity ${weather.humidity}%`
          : ""
      }`
    : "Weather unavailable";

  const agenda =
    events.length === 0
      ? "No meetings scheduled."
      : events.slice(0, 12).map(eventLine).join("\n");

  const localParts = [
    `Today is ${dayLabel}.`,
    `Weather: ${weatherLine}.`,
    events.length === 0
      ? "Your calendars look clear."
      : `You have ${events.length} event${events.length === 1 ? "" : "s"} ahead${
          events[0]?.summary ? `, starting with ${events[0].summary}` : ""
        }.`,
  ];

  const prompt = [
    "Summarize only. Do not control devices, call tools, or ask follow-up questions.",
    "Write 1-3 short sentences for a home dashboard day brief.",
    `Date: ${dayLabel}`,
    `Weather: ${weatherLine}`,
    "Agenda:",
    agenda,
  ].join("\n");

  return {
    hash: simpleHash(`${dayLabel}|${weatherLine}|${agenda}`),
    prompt,
    local: localParts.join(" "),
  };
}

export function getCachedSummary(
  cacheKey: string,
  hash: string,
): CacheEntry | null {
  const entry = summaryCache.get(cacheKey);
  if (!entry) {
    return null;
  }
  if (entry.hash !== hash || entry.expiresAt < Date.now()) {
    summaryCache.delete(cacheKey);
    return null;
  }
  return entry;
}

export function setCachedSummary(
  cacheKey: string,
  hash: string,
  text: string,
  source: "ai" | "local",
  cacheMinutes: number,
): void {
  summaryCache.set(cacheKey, {
    hash,
    text,
    source,
    expiresAt: Date.now() + Math.max(1, cacheMinutes) * 60_000,
  });
}

export async function fetchAiSummary(
  hass: HomeAssistant,
  agentId: string | undefined,
  prompt: string,
): Promise<string | null> {
  const result = await hass.callWS<ConversationProcessResult>({
    type: "conversation/process",
    text: prompt,
    language: hass.locale?.language ?? hass.config.language ?? "en",
    agent_id: agentId,
  });

  if (result.response?.response_type === "error") {
    return null;
  }

  const speech = result.response?.speech?.plain?.speech?.trim();
  return speech || null;
}

export async function resolveSummary(options: {
  hass: HomeAssistant;
  mode: SummaryMode;
  agentId?: string;
  digest: SummaryDigest;
  cacheKey: string;
  cacheMinutes: number;
}): Promise<{ text: string; source: "ai" | "local" }> {
  const { hass, mode, agentId, digest, cacheKey, cacheMinutes } = options;
  const cached = getCachedSummary(cacheKey, digest.hash);
  if (cached) {
    return { text: cached.text, source: cached.source };
  }

  if (mode === "local") {
    setCachedSummary(cacheKey, digest.hash, digest.local, "local", cacheMinutes);
    return { text: digest.local, source: "local" };
  }

  try {
    const ai = await fetchAiSummary(hass, agentId, digest.prompt);
    if (ai) {
      setCachedSummary(cacheKey, digest.hash, ai, "ai", cacheMinutes);
      return { text: ai, source: "ai" };
    }
  } catch {
    // Fall through to local summary.
  }

  if (mode === "ai") {
    setCachedSummary(cacheKey, digest.hash, digest.local, "local", cacheMinutes);
    return { text: digest.local, source: "local" };
  }

  setCachedSummary(cacheKey, digest.hash, digest.local, "local", cacheMinutes);
  return { text: digest.local, source: "local" };
}
