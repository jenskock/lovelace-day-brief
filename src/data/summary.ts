import { DEFAULT_SUMMARY_PROMPT } from "../const";
import type {
  CalendarEvent,
  ConversationProcessResult,
  HomeAssistant,
  SummaryMode,
} from "../types";
import type { EntitySnapshot } from "./entities";
import type { WeatherForecastEntry } from "../types";
import {
  formatTemperature,
  type WeatherSnapshot,
} from "./weather";

const WET_CONDITIONS = new Set([
  "rainy",
  "pouring",
  "snowy",
  "snowy-rainy",
  "lightning-rainy",
  "hail",
]);

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

type DayPart = "morgen" | "vormittag" | "nachmittag" | "abend" | "nacht";

const summaryCache = new Map<string, CacheEntry>();

const WEATHER_DE: Record<string, string> = {
  "clear-night": "klar (Nacht)",
  cloudy: "bewölkt",
  fog: "neblig",
  hail: "Hagel",
  lightning: "Gewitter",
  "lightning-rainy": "Gewitterregen",
  partlycloudy: "teilweise bewölkt",
  pouring: "stark regnerisch",
  rainy: "regnerisch",
  snowy: "schneeig",
  "snowy-rainy": "Schneeregen",
  sunny: "sonnig",
  windy: "windig",
  "windy-variant": "windig und bewölkt",
  exceptional: "außergewöhnliches Wetter",
};

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

function isGerman(locale: string): boolean {
  return locale.toLowerCase().startsWith("de");
}

function dayPart(now: Date, timeZone: string): DayPart {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone,
    }).format(now),
  );
  if (hour < 5) return "nacht";
  if (hour < 10) return "morgen";
  if (hour < 12) return "vormittag";
  if (hour < 17) return "nachmittag";
  if (hour < 22) return "abend";
  return "nacht";
}

function dayPartLabel(part: DayPart, german: boolean): string {
  if (!german) {
    switch (part) {
      case "morgen":
        return "morning";
      case "vormittag":
        return "late morning";
      case "nachmittag":
        return "afternoon";
      case "abend":
        return "evening";
      case "nacht":
        return "night";
      default: {
        const _exhaustive: never = part;
        return _exhaustive;
      }
    }
  }
  switch (part) {
    case "morgen":
      return "Morgen";
    case "vormittag":
      return "Vormittag";
    case "nachmittag":
      return "Nachmittag";
    case "abend":
      return "Abend";
    case "nacht":
      return "Nacht";
    default: {
      const _exhaustive: never = part;
      return _exhaustive;
    }
  }
}

function weatherLabel(condition: string, german: boolean): string {
  if (!condition || condition === "unknown" || condition === "unavailable") {
    return german ? "Wetter unklar" : "Weather unavailable";
  }
  if (german) {
    return WEATHER_DE[condition] ?? condition.replace(/_/g, " ");
  }
  return condition.replace(/_/g, " ");
}

function clothingHint(
  weather: WeatherSnapshot | null,
  german: boolean,
): string | null {
  if (!weather || typeof weather.temperature !== "number") {
    return null;
  }
  const t = weather.temperature;
  const wet = ["rainy", "pouring", "snowy-rainy", "lightning-rainy"].includes(
    weather.condition,
  );
  const snow = weather.condition === "snowy";

  if (german) {
    if (snow) return "Winterkleidung und feste Schuhe";
    if (t <= 3) return wet ? "dicke Jacke und Regenschutz" : "dicke Jacke";
    if (t <= 10) return wet ? "warme Jacke und Regenschirm" : "warme Jacke";
    if (t <= 16) return wet ? "Übergangsjacke und Schirm" : "Übergangsjacke";
    if (t <= 22) return wet ? "leichte Jacke und Schirm" : "leichte Kleidung";
    return wet ? "luftige Kleidung und Schirm" : "leichte sommerliche Kleidung";
  }

  if (snow) return "winter clothes and sturdy shoes";
  if (t <= 3) return wet ? "heavy coat and rain gear" : "heavy coat";
  if (t <= 10) return wet ? "warm jacket and umbrella" : "warm jacket";
  if (t <= 16) return wet ? "light jacket and umbrella" : "light jacket";
  if (t <= 22) return wet ? "light layer and umbrella" : "light clothes";
  return wet ? "summer clothes and umbrella" : "summer clothes";
}

function isUnavailable(state: string): boolean {
  const value = state.trim().toLowerCase();
  return (
    value === "unavailable" ||
    value === "unknown" ||
    value === "none" ||
    value === "nicht verfügbar" ||
    value === "unbekannt"
  );
}

function categorizeEntities(entities: EntitySnapshot[]): {
  people: EntitySnapshot[];
  solar: EntitySnapshot[];
  trash: EntitySnapshot[];
  sun: EntitySnapshot[];
  alerts: EntitySnapshot[];
  other: EntitySnapshot[];
} {
  const people: EntitySnapshot[] = [];
  const solar: EntitySnapshot[] = [];
  const trash: EntitySnapshot[] = [];
  const sun: EntitySnapshot[] = [];
  const alerts: EntitySnapshot[] = [];
  const other: EntitySnapshot[] = [];

  for (const entity of entities) {
    if (isUnavailable(entity.state)) {
      continue;
    }
    const id = entity.entity_id.toLowerCase();
    const name = entity.name.toLowerCase();
    if (entity.domain === "person" || id.startsWith("person.")) {
      people.push(entity);
    } else if (
      id.includes("abfall") ||
      id.includes("muell") ||
      id.includes("mull") ||
      id.includes("trash") ||
      name.includes("abfall") ||
      name.includes("müll") ||
      name.includes("tonne")
    ) {
      trash.push(entity);
    } else if (
      id.includes("solar") ||
      id.includes("solaredge") ||
      id.includes("autark") ||
      id.includes("produziert") ||
      id.includes("exportiert") ||
      id.includes("verbrauch") ||
      id.includes("power_production") ||
      name.includes("solar") ||
      name.includes("autark") ||
      name.includes("leistung")
    ) {
      solar.push(entity);
    } else if (
      id.includes("sun_up") ||
      id.includes("sun_down") ||
      name.includes("sonnenaufgang") ||
      name.includes("sonnenuntergang")
    ) {
      sun.push(entity);
    } else if (
      id.includes("warn") ||
      name.includes("warn") ||
      name.includes("warnung")
    ) {
      alerts.push(entity);
    } else {
      other.push(entity);
    }
  }

  return { people, solar, trash, sun, alerts, other };
}

function eventLine(event: CalendarEvent, german: boolean): string {
  const when = event.all_day
    ? german
      ? "ganztägig"
      : "all day"
    : event.start;
  const cal = event.calendar_name ? ` (${event.calendar_name})` : "";
  return `- ${when}: ${event.summary ?? (german ? "Belegt" : "Busy")}${cal}`;
}

function entityLine(entity: EntitySnapshot): string {
  return `- ${entity.name}: ${entity.state}`;
}

function section(
  title: string,
  lines: string[],
  empty: string,
): string {
  return [`[${title}]`, lines.length ? lines.join("\n") : empty].join("\n");
}

function forecastDayLabel(
  entry: WeatherForecastEntry,
  locale: string,
  timeZone: string,
): string {
  if (!entry.datetime) {
    return "?";
  }
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone,
  }).format(new Date(entry.datetime));
}

function buildForecastLines(
  forecast: WeatherForecastEntry[],
  weather: WeatherSnapshot | null,
  locale: string,
  timeZone: string,
  german: boolean,
): string[] {
  return forecast.slice(0, 6).map((entry) => {
    const day = forecastDayLabel(entry, locale, timeZone);
    const condition = weatherLabel(entry.condition ?? "", german);
    const temp = formatTemperature(
      entry.temperature,
      weather?.temperature_unit,
    );
    const wet =
      entry.condition && WET_CONDITIONS.has(entry.condition)
        ? german
          ? " · nass"
          : " · wet"
        : "";
    return `- ${day}: ${condition}, ${temp}${wet}`;
  });
}

function rainOutlook(
  forecast: WeatherForecastEntry[],
  locale: string,
  timeZone: string,
  german: boolean,
): string | null {
  const wetDays = forecast
    .slice(0, 6)
    .filter((entry) => entry.condition && WET_CONDITIONS.has(entry.condition));
  if (wetDays.length === 0) {
    return null;
  }
  const labels = wetDays
    .map((entry) => forecastDayLabel(entry, locale, timeZone))
    .join(", ");
  return german
    ? `Regen/Schnee erwartet: ${labels}`
    : `Rain/snow expected: ${labels}`;
}

function buildLocalBrief(options: {
  german: boolean;
  dayLabel: string;
  partLabel: string;
  weather: WeatherSnapshot | null;
  weatherLine: string;
  clothing: string | null;
  rainLine: string | null;
  events: CalendarEvent[];
  people: EntitySnapshot[];
  solar: EntitySnapshot[];
  trash: EntitySnapshot[];
  alerts: EntitySnapshot[];
}): string {
  const {
    german,
    dayLabel,
    partLabel,
    weather,
    weatherLine,
    clothing,
    rainLine,
    events,
    people,
    solar,
    trash,
    alerts,
  } = options;

  const parts: string[] = [];

  if (german) {
    parts.push(`Guten ${partLabel} — ${dayLabel}.`);
    if (weather) {
      parts.push(
        clothing
          ? `Draußen ${weatherLine}. Empfehlung: ${clothing}.`
          : `Draußen ${weatherLine}.`,
      );
    }
    if (rainLine) {
      parts.push(`${rainLine}.`);
    }
    if (events.length === 0) {
      parts.push("Heute stehen keine Termine an.");
    } else {
      const names = events
        .slice(0, 3)
        .map((event) => event.summary)
        .filter(Boolean)
        .join(", ");
      parts.push(
        events.length === 1
          ? `Termin: ${names}.`
          : `${events.length} Termine, u.a. ${names}.`,
      );
    }
    if (solar.length) {
      parts.push(
        `Solar: ${solar
          .slice(0, 3)
          .map((e) => `${e.name} ${e.state}`)
          .join(", ")}.`,
      );
    }
    if (trash.length) {
      parts.push(
        `Müll: ${trash.map((e) => `${e.name} ${e.state}`).join(", ")}.`,
      );
    }
    if (alerts.length) {
      const active = alerts.filter((e) => e.state !== "0" && e.state !== "ok");
      if (active.length) {
        parts.push(
          `Hinweis: ${active.map((e) => `${e.name} ${e.state}`).join(", ")}.`,
        );
      }
    }
    if (people.length) {
      parts.push(
        `Zuhause/Status: ${people
          .map((e) => `${e.name} ${e.state}`)
          .join(", ")}.`,
      );
    }
  } else {
    parts.push(`Good ${partLabel} — ${dayLabel}.`);
    if (weather) {
      parts.push(
        clothing
          ? `Outside: ${weatherLine}. Wear: ${clothing}.`
          : `Outside: ${weatherLine}.`,
      );
    }
    if (rainLine) {
      parts.push(`${rainLine}.`);
    }
    parts.push(
      events.length === 0
        ? "No meetings scheduled."
        : `${events.length} event(s), starting with ${events[0]?.summary ?? "Busy"}.`,
    );
    if (solar.length) {
      parts.push(
        `Solar: ${solar
          .slice(0, 3)
          .map((e) => `${e.name} ${e.state}`)
          .join(", ")}.`,
      );
    }
    if (trash.length) {
      parts.push(
        `Trash: ${trash.map((e) => `${e.name} ${e.state}`).join(", ")}.`,
      );
    }
  }

  return parts.join(" ");
}

export function buildSummaryDigest(options: {
  weather: WeatherSnapshot | null;
  forecast?: WeatherForecastEntry[];
  events: CalendarEvent[];
  entities: EntitySnapshot[];
  now: Date;
  locale: string;
  timeZone: string;
  summaryPrompt?: string;
  contextNotes?: string;
}): SummaryDigest {
  const {
    weather,
    forecast = weather?.forecast ?? [],
    events,
    entities,
    now,
    locale,
    timeZone,
    summaryPrompt,
    contextNotes,
  } = options;

  const german = isGerman(locale);
  const part = dayPart(now, timeZone);
  const partLabel = dayPartLabel(part, german);

  const dayLabel = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone,
  }).format(now);

  const timeLabel = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(now);

  const weatherLine = weather
    ? `${weatherLabel(weather.condition, german)}, ${formatTemperature(
        weather.temperature,
        weather.temperature_unit,
      )}${
        typeof weather.humidity === "number"
          ? german
            ? `, Luftfeuchtigkeit ${weather.humidity}%`
            : `, humidity ${weather.humidity}%`
          : ""
      }`
    : german
      ? "Wetter nicht verfügbar"
      : "Weather unavailable";

  const clothing = clothingHint(weather, german);
  const buckets = categorizeEntities(entities);
  const forecastLines = buildForecastLines(
    forecast,
    weather,
    locale,
    timeZone,
    german,
  );
  const rainLine = rainOutlook(forecast, locale, timeZone, german);

  const agendaLines =
    events.length === 0
      ? []
      : events.slice(0, 12).map((event) => eventLine(event, german));

  const instructions = summaryPrompt?.trim() || DEFAULT_SUMMARY_PROMPT;
  const household = contextNotes?.trim();

  const dataBlocks = [
    section(
      german ? "ZEIT" : "TIME",
      [
        german
          ? `Datum: ${dayLabel}`
          : `Date: ${dayLabel}`,
        german ? `Uhrzeit: ${timeLabel}` : `Time: ${timeLabel}`,
        german
          ? `Tageszeit: ${partLabel}`
          : `Time of day: ${partLabel}`,
      ],
      "",
    ),
    ...(household
      ? [
          section(
            german ? "HAUSHALT" : "HOUSEHOLD",
            household.split("\n").map((line) => line.trim()).filter(Boolean),
            "",
          ),
        ]
      : []),
    section(
      german ? "WETTER" : "WEATHER",
      [
        weatherLine,
        clothing
          ? german
            ? `Kleidungshinweis: ${clothing}`
            : `Clothing hint: ${clothing}`
          : "",
        rainLine ?? "",
      ].filter(Boolean),
      german ? "Keine Wetterdaten." : "No weather data.",
    ),
    section(
      german ? "VORHERSAGE" : "FORECAST",
      forecastLines,
      german ? "Keine Vorhersage." : "No forecast.",
    ),
    section(
      german ? "TERMINE" : "AGENDA",
      agendaLines,
      german ? "Keine Termine." : "No meetings.",
    ),
    section(
      german ? "PERSONEN" : "PEOPLE",
      buckets.people.map(entityLine),
      german ? "Keine Personendaten." : "No people data.",
    ),
    section(
      "SOLAR",
      buckets.solar.map(entityLine),
      german ? "Keine Solarwerte (oder nicht verfügbar)." : "No solar data.",
    ),
    section(
      german ? "MUELL" : "TRASH",
      buckets.trash.map(entityLine),
      german ? "Keine Mülldaten." : "No trash data.",
    ),
    section(
      german ? "SONNE" : "SUN",
      buckets.sun.map(entityLine),
      german ? "Keine Sonnenzeiten." : "No sun times.",
    ),
    section(
      german ? "WARNUNGEN" : "ALERTS",
      buckets.alerts.map(entityLine),
      german ? "Keine Warnungen." : "No alerts.",
    ),
    section(
      german ? "SONSTIGES" : "OTHER",
      buckets.other.map(entityLine),
      german ? "Nichts weiteres." : "Nothing else.",
    ),
  ];

  const prompt = [
    instructions,
    "",
    german
      ? "DATEN (nur diese Fakten verwenden; fehlende/ungültige Werte weglassen):"
      : "DATA (use only these facts; skip missing/invalid values):",
    dataBlocks.join("\n\n"),
    "",
    german
      ? "ANTWORT: Nur der fertige deutsche Fließtext, nichts sonst."
      : "RESPONSE: Only the finished brief text, nothing else.",
  ].join("\n");

  const local = buildLocalBrief({
    german,
    dayLabel,
    partLabel,
    weather,
    weatherLine,
    clothing,
    rainLine,
    events,
    people: buckets.people,
    solar: buckets.solar,
    trash: buckets.trash,
    alerts: buckets.alerts,
  });

  return {
    hash: simpleHash(prompt),
    prompt,
    local,
  };
}

export function invalidateSummaryCache(cacheKey?: string): void {
  if (!cacheKey) {
    summaryCache.clear();
    return;
  }
  summaryCache.delete(cacheKey);
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
  force?: boolean;
}): Promise<{ text: string; source: "ai" | "local" }> {
  const { hass, mode, agentId, digest, cacheKey, cacheMinutes, force } =
    options;

  if (force) {
    invalidateSummaryCache(cacheKey);
  } else {
    const cached = getCachedSummary(cacheKey, digest.hash);
    if (cached) {
      return { text: cached.text, source: cached.source };
    }
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

  setCachedSummary(cacheKey, digest.hash, digest.local, "local", cacheMinutes);
  return { text: digest.local, source: "local" };
}
