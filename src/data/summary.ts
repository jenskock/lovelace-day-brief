import { DEFAULT_SUMMARY_PROMPT } from "../const";
import type {
  BirthdayConfig,
  CalendarEvent,
  ConversationProcessResult,
  DayBriefSchedule,
  HomeAssistant,
  SummaryMode,
  WeatherForecastEntry,
} from "../types";
import {
  formatBirthdayLine,
  upcomingBirthdays,
  type UpcomingBirthday,
} from "./birthdays";
import type { EntitySnapshot } from "./entities";
import { buildSchedulePromptLines } from "./schedule";
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

function friendlyGreeting(part: DayPart, german: boolean): string {
  if (!german) {
    switch (part) {
      case "morgen":
        return "Good morning, family!";
      case "vormittag":
        return "Hi family!";
      case "nachmittag":
        return "Good afternoon, family!";
      case "abend":
        return "Good evening, family!";
      case "nacht":
        return "Hey family — still up?";
      default: {
        const _exhaustive: never = part;
        return _exhaustive;
      }
    }
  }
  switch (part) {
    case "morgen":
      return "Guten Morgen, Familie!";
    case "vormittag":
      return "Moin, Familie!";
    case "nachmittag":
      return "Hallo Familie!";
    case "abend":
      return "Guten Abend, Familie!";
    case "nacht":
      return "Hey Familie — noch wach?";
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

function needsApplianceAttention(entity: EntitySnapshot): boolean {
  const state = entity.state.trim().toLowerCase();
  const idle = new Set([
    "docked",
    "idle",
    "home",
    "off",
    "unavailable",
    "unknown",
    "charging",
    "paused",
    "standby",
  ]);
  return !idle.has(state);
}

function isOpenWindow(entity: EntitySnapshot): boolean {
  const state = entity.state.trim().toLowerCase();
  return state === "on" || state === "open" || state === "opened";
}

function categorizeEntities(entities: EntitySnapshot[]): {
  people: EntitySnapshot[];
  solar: EntitySnapshot[];
  trash: EntitySnapshot[];
  sun: EntitySnapshot[];
  alerts: EntitySnapshot[];
  windows: EntitySnapshot[];
  heating: EntitySnapshot[];
  appliances: EntitySnapshot[];
  other: EntitySnapshot[];
} {
  const people: EntitySnapshot[] = [];
  const solar: EntitySnapshot[] = [];
  const trash: EntitySnapshot[] = [];
  const sun: EntitySnapshot[] = [];
  const alerts: EntitySnapshot[] = [];
  const windows: EntitySnapshot[] = [];
  const heating: EntitySnapshot[] = [];
  const appliances: EntitySnapshot[] = [];
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
    } else if (
      id.includes("fenster") ||
      id.includes("window") ||
      name.includes("fenster") ||
      name.includes("window")
    ) {
      if (isOpenWindow(entity)) {
        windows.push(entity);
      }
    } else if (
      id.includes("heizoel") ||
      id.includes("heizöl") ||
      id.includes("oil") ||
      name.includes("heizöl") ||
      name.includes("heizoel")
    ) {
      heating.push(entity);
    } else if (
      entity.domain === "vacuum" ||
      entity.domain === "lawn_mower" ||
      id.includes("vacuum") ||
      id.includes("lawn_mower") ||
      name.includes("mäher") ||
      name.includes("maeh") ||
      name.includes("sauger")
    ) {
      if (needsApplianceAttention(entity)) {
        appliances.push(entity);
      }
    } else {
      other.push(entity);
    }
  }

  return {
    people,
    solar,
    trash,
    sun,
    alerts,
    windows,
    heating,
    appliances,
    other,
  };
}

function isSchoolDay(
  now: Date,
  timeZone: string,
  contextNotes: string | undefined,
  part: DayPart,
): boolean {
  const notes = (contextNotes ?? "").toLowerCase();
  const mentionsSchool =
    notes.includes("schule") ||
    notes.includes("school") ||
    notes.includes("schultag");
  if (!mentionsSchool) {
    return false;
  }
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone,
  }).format(now);
  const isWeekday = !["Sat", "Sun"].includes(weekday);
  return isWeekday && (part === "morgen" || part === "vormittag");
}

function calendarBirthdayHints(
  events: CalendarEvent[],
  german: boolean,
): string[] {
  return events
    .filter((event) => {
      const summary = (event.summary ?? "").toLowerCase();
      return (
        summary.includes("geburtstag") ||
        summary.includes("birthday") ||
        summary.includes("bday")
      );
    })
    .slice(0, 5)
    .map((event) => eventLine(event, german));
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

/** Best-effort days-until from waste sensors (number, ISO date, or German phrases). */
function trashDaysUntil(state: string, now: Date, timeZone: string): number | null {
  const raw = state.trim().toLowerCase();
  if (!raw || isUnavailable(raw)) {
    return null;
  }
  if (/^(heute|today|0)$/.test(raw)) {
    return 0;
  }
  if (/^(morgen|tomorrow)$/.test(raw) || /\bin 1 day\b/.test(raw)) {
    return 1;
  }
  const dayMatch = raw.match(/\b(?:in\s+)?(\d+)\s*(?:tag|tage|days?)\b/);
  if (dayMatch) {
    return Number(dayMatch[1]);
  }
  if (/^\d+(\.\d+)?$/.test(raw)) {
    return Math.round(Number(raw));
  }
  const parsed = Date.parse(state.trim());
  if (!Number.isNaN(parsed)) {
    const target = new Date(parsed);
    const todayKey = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
    const targetKey = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(target);
    const todayUtc = Date.parse(`${todayKey}T00:00:00Z`);
    const targetUtc = Date.parse(`${targetKey}T00:00:00Z`);
    return Math.round((targetUtc - todayUtc) / 86_400_000);
  }
  return null;
}

function trashActionLines(
  trash: EntitySnapshot[],
  now: Date,
  timeZone: string,
  german: boolean,
): string[] {
  const lines: string[] = [];
  for (const entity of trash) {
    const days = trashDaysUntil(entity.state, now, timeZone);
    if (days === null) {
      continue;
    }
    if (days === 0) {
      lines.push(
        german
          ? `AKTION HEUTE: ${entity.name} — Abholung heute → Tonne muss draußen sein.`
          : `ACTION TODAY: ${entity.name} — pickup today → bin must be out.`,
      );
    } else if (days === 1) {
      lines.push(
        german
          ? `AKTION HEUTE ABEND: ${entity.name} — Abholung morgen → HEUTE RAUSSTELLEN.`
          : `ACTION TONIGHT: ${entity.name} — pickup tomorrow → PUT OUT TODAY.`,
      );
    }
  }
  if (!lines.length && trash.length) {
    lines.push(
      german
        ? "Keine Abholung heute/morgen erkannt — Müll im Brief weglassen."
        : "No pickup today/tomorrow detected — omit trash from the brief.",
    );
  }
  return lines;
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
  part: DayPart;
  now: Date;
  timeZone: string;
  weather: WeatherSnapshot | null;
  weatherLine: string;
  clothing: string | null;
  rainLine: string | null;
  schoolDay: boolean;
  birthdays: UpcomingBirthday[];
  events: CalendarEvent[];
  people: EntitySnapshot[];
  solar: EntitySnapshot[];
  trash: EntitySnapshot[];
  alerts: EntitySnapshot[];
  windows: EntitySnapshot[];
  heating: EntitySnapshot[];
  appliances: EntitySnapshot[];
}): string {
  const {
    german,
    dayLabel,
    part,
    now,
    timeZone,
    weather,
    weatherLine,
    clothing,
    rainLine,
    schoolDay,
    birthdays,
    events,
    people,
    solar,
    trash,
    alerts,
    windows,
    heating,
    appliances,
  } = options;

  const parts: string[] = [];

  if (german) {
    parts.push(`${friendlyGreeting(part, true)} ${dayLabel}.`);
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
    if (schoolDay && (part === "morgen" || part === "vormittag")) {
      parts.push("Schultag — morgens an die Schule denken.");
    }
    if (birthdays.length) {
      const first = birthdays[0];
      parts.push(
        first.daysUntil === 0
          ? `Heute hat ${first.name} Geburtstag (${first.ageTurning})!`
          : `Bald Geburtstag: ${first.name} in ${first.daysUntil} Tag(en).`,
      );
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
    {
      const actions = trashActionLines(trash, now, timeZone, true);
      const urgent = actions.filter((line) => line.startsWith("AKTION"));
      if (urgent.length) {
        parts.push(
          urgent
            .map((line) => line.replace(/^AKTION (HEUTE(?: ABEND)?: )/, ""))
            .join(" "),
        );
      }
    }
    if (windows.length) {
      parts.push(
        `Fenster offen: ${windows.map((e) => e.name).join(", ")}.`,
      );
    }
    if (heating.length) {
      parts.push(
        `Heizöl: ${heating.map((e) => `${e.name} ${e.state}`).join(", ")}.`,
      );
    }
    if (appliances.length) {
      parts.push(
        `Geräte: ${appliances
          .map((e) => `${e.name} ${e.state}`)
          .join(", ")}.`,
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
    parts.push(`${friendlyGreeting(part, false)} ${dayLabel}.`);
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
    if (schoolDay && (part === "morgen" || part === "vormittag")) {
      parts.push("School day — keep the morning routine in mind.");
    }
    if (birthdays.length) {
      const first = birthdays[0];
      parts.push(
        first.daysUntil === 0
          ? `Today is ${first.name}'s birthday (${first.ageTurning})!`
          : `Birthday soon: ${first.name} in ${first.daysUntil} day(s).`,
      );
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
    {
      const actions = trashActionLines(trash, now, timeZone, false);
      const urgent = actions.filter((line) => line.startsWith("ACTION"));
      if (urgent.length) {
        parts.push(
          urgent
            .map((line) =>
              line.replace(/^ACTION (TODAY|TONIGHT): /, ""),
            )
            .join(" "),
        );
      }
    }
    if (windows.length) {
      parts.push(`Open windows: ${windows.map((e) => e.name).join(", ")}.`);
    }
    if (heating.length) {
      parts.push(
        `Heating oil: ${heating.map((e) => `${e.name} ${e.state}`).join(", ")}.`,
      );
    }
    if (appliances.length) {
      parts.push(
        `Devices needing attention: ${appliances
          .map((e) => `${e.name} ${e.state}`)
          .join(", ")}.`,
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
  birthdays?: BirthdayConfig[];
  schedules?: DayBriefSchedule[];
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
    birthdays = [],
    schedules = [],
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
  const upcoming = upcomingBirthdays(birthdays, now, timeZone, 14);
  const birthdayLines = [
    ...upcoming.map((entry) => formatBirthdayLine(entry, german)),
    ...calendarBirthdayHints(events, german),
  ];
  const schoolDay = isSchoolDay(now, timeZone, contextNotes, part);
  const scheduleLines = buildSchedulePromptLines(
    schedules,
    now,
    timeZone,
    german,
  );

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
        german ? `Datum: ${dayLabel}` : `Date: ${dayLabel}`,
        german ? `Uhrzeit: ${timeLabel}` : `Time: ${timeLabel}`,
        german ? `Tageszeit: ${partLabel}` : `Time of day: ${partLabel}`,
      ],
      "",
    ),
    ...(household
      ? [
          section(
            german ? "HAUSHALT" : "HOUSEHOLD",
            household
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean),
            "",
          ),
        ]
      : []),
    section(
      german ? "SCHULTAG" : "SCHOOL_DAY",
      [
        schoolDay || scheduleLines.length
          ? german
            ? "ja — Wochentag und/oder Stundenplan vorhanden"
            : "yes — weekday and/or schedule present"
          : german
            ? "nein"
            : "no",
      ],
      "",
    ),
    section(
      german ? "STUNDENPLAN" : "SCHEDULE",
      scheduleLines,
      german ? "Kein Stundenplan konfiguriert." : "No schedule configured.",
    ),
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
      german ? "GEBURTSTAGE" : "BIRTHDAYS",
      birthdayLines,
      german
        ? "Keine Geburtstage in den nächsten 14 Tagen."
        : "No birthdays in the next 14 days.",
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
      german ? "MUELL-AKTION" : "TRASH-ACTION",
      trashActionLines(buckets.trash, now, timeZone, german),
      german
        ? "Keine Müll-Aktion heute/morgen."
        : "No trash action today/tomorrow.",
    ),
    section(
      german ? "SONNE" : "SUN",
      buckets.sun.map(entityLine),
      german ? "Keine Sonnenzeiten." : "No sun times.",
    ),
    section(
      german ? "FENSTER" : "WINDOWS",
      buckets.windows.map(entityLine),
      german ? "Keine offenen Fenster." : "No open windows.",
    ),
    section(
      german ? "HEIZOEL" : "HEATING_OIL",
      buckets.heating.map(entityLine),
      german ? "Kein Heizöl-Sensor." : "No heating-oil sensor.",
    ),
    section(
      german ? "GERAETE" : "APPLIANCES",
      buckets.appliances.map(entityLine),
      german
        ? "Keine Geräte mit Handlungsbedarf."
        : "No appliances needing attention.",
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
      ? "ANTWORT: Nur der fertige deutsche Fließtext (Markdown **fett** erlaubt), nichts sonst."
      : "RESPONSE: Only the finished brief text (Markdown **bold** allowed), nothing else.",
  ].join("\n");

  const local = buildLocalBrief({
    german,
    dayLabel,
    part,
    now,
    timeZone,
    weather,
    weatherLine,
    clothing,
    rainLine,
    schoolDay,
    birthdays: upcoming,
    events,
    people: buckets.people,
    solar: buckets.solar,
    trash: buckets.trash,
    alerts: buckets.alerts,
    windows: buckets.windows,
    heating: buckets.heating,
    appliances: buckets.appliances,
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
