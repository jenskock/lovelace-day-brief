export function isGermanLocale(locale: string | undefined): boolean {
  return (locale ?? "en").toLowerCase().startsWith("de");
}

const WEATHER_DE: Record<string, string> = {
  "clear-night": "Klar (Nacht)",
  cloudy: "Bewölkt",
  fog: "Neblig",
  hail: "Hagel",
  lightning: "Gewitter",
  "lightning-rainy": "Gewitterregen",
  partlycloudy: "Teilweise bewölkt",
  pouring: "Starkregen",
  rainy: "Regnerisch",
  snowy: "Schnee",
  "snowy-rainy": "Schneeregen",
  sunny: "Sonnig",
  windy: "Windig",
  "windy-variant": "Windig und bewölkt",
  exceptional: "Außergewöhnliches Wetter",
};

const WEATHER_EN: Record<string, string> = {
  "clear-night": "Clear night",
  cloudy: "Cloudy",
  fog: "Fog",
  hail: "Hail",
  lightning: "Lightning",
  "lightning-rainy": "Thunderstorms",
  partlycloudy: "Partly cloudy",
  pouring: "Pouring rain",
  rainy: "Rainy",
  snowy: "Snowy",
  "snowy-rainy": "Wintry mix",
  sunny: "Sunny",
  windy: "Windy",
  "windy-variant": "Windy and cloudy",
  exceptional: "Severe weather",
};

export function weatherConditionLabel(
  condition: string,
  locale?: string,
): string {
  if (!condition || condition === "unknown" || condition === "unavailable") {
    return isGermanLocale(locale) ? "Wetter unklar" : "Weather unavailable";
  }
  const table = isGermanLocale(locale) ? WEATHER_DE : WEATHER_EN;
  return table[condition] ?? condition.replace(/_/g, " ");
}

type UiKey =
  | "today"
  | "weather"
  | "calendar"
  | "cameras"
  | "context"
  | "humidity"
  | "preparing"
  | "refresh"
  | "speak"
  | "loading_calendars"
  | "no_events"
  | "configure_weather"
  | "no_feed"
  | "entity"
  | "entities"
  | "keep_awake"
  | "keep_awake_on"
  | "weather_missing"
  | "entity_missing";

const UI_DE: Record<UiKey, string> = {
  today: "Heute",
  weather: "Wetter",
  calendar: "Kalender",
  cameras: "Kameras",
  context: "Kontext",
  humidity: "Luftfeuchtigkeit",
  preparing: "Tagesbrief wird erstellt…",
  refresh: "Brief aktualisieren",
  speak: "Brief vorlesen",
  loading_calendars: "Kalender werden geladen…",
  no_events: "Nichts in den nächsten {hours} Stunden.",
  configure_weather: "Wetter-Entity konfigurieren, um zu starten.",
  no_feed: "Kein Bild",
  entity: "Entity",
  entities: "Entities",
  keep_awake: "Wach halten",
  keep_awake_on: "Wachhalten an",
  weather_missing: "Wetter-Entity nicht gefunden: {id}",
  entity_missing: "Entity nicht gefunden: {id}",
};

const UI_EN: Record<UiKey, string> = {
  today: "Today",
  weather: "Weather",
  calendar: "Calendar",
  cameras: "Cameras",
  context: "Context",
  humidity: "humidity",
  preparing: "Preparing your day brief…",
  refresh: "Refresh brief",
  speak: "Read summary aloud",
  loading_calendars: "Loading calendars…",
  no_events: "Nothing in the next {hours} hours.",
  configure_weather: "Configure a weather entity to begin.",
  no_feed: "No feed",
  entity: "entity",
  entities: "entities",
  keep_awake: "Keep awake",
  keep_awake_on: "Keep awake on",
  weather_missing: "Weather entity not found: {id}",
  entity_missing: "Entity not found: {id}",
};

export function t(
  locale: string | undefined,
  key: UiKey,
  vars?: Record<string, string | number>,
): string {
  const table = isGermanLocale(locale) ? UI_DE : UI_EN;
  let text = table[key];
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

/** Re-export for summary prompts that need the German weather map. */
export const WEATHER_LABELS_DE = WEATHER_DE;
