import type { CalendarEvent, HomeAssistant } from "../types";

interface RawCalendarEvent {
  summary?: string;
  description?: string;
  location?: string;
  start?: string | { date?: string; dateTime?: string };
  end?: string | { date?: string; dateTime?: string };
}

function normalizeInstant(
  value: string | { date?: string; dateTime?: string } | undefined,
): { iso: string; allDay: boolean } | null {
  if (!value) {
    return null;
  }
  if (typeof value === "string") {
    const allDay = /^\d{4}-\d{2}-\d{2}$/.test(value);
    return { iso: value, allDay };
  }
  if (value.dateTime) {
    return { iso: value.dateTime, allDay: false };
  }
  if (value.date) {
    return { iso: value.date, allDay: true };
  }
  return null;
}

function calendarDisplayName(hass: HomeAssistant, entityId: string): string {
  return (
    hass.entities?.[entityId]?.name ??
    (typeof hass.states[entityId]?.attributes.friendly_name === "string"
      ? (hass.states[entityId].attributes.friendly_name as string)
      : entityId.replace(/^calendar\./, "").replace(/_/g, " "))
  );
}

export async function fetchCalendarEvents(
  hass: HomeAssistant,
  calendars: string[],
  horizonHours: number,
): Promise<{ events: CalendarEvent[]; errors: string[] }> {
  const unique = [...new Set(calendars.filter(Boolean))];
  if (unique.length === 0) {
    return { events: [], errors: [] };
  }

  const errors: string[] = [];
  let response: Record<string, { events?: RawCalendarEvent[]; error?: string }> =
    {};

  try {
    const result = await hass.callService(
      "calendar",
      "get_events",
      {
        duration: { hours: horizonHours },
      },
      { entity_id: unique },
      true,
      true,
    );

    const raw = result && "response" in result ? result.response : undefined;
    if (raw && typeof raw === "object") {
      response = raw as Record<
        string,
        { events?: RawCalendarEvent[]; error?: string }
      >;
    }
  } catch (error) {
    errors.push(
      error instanceof Error ? error.message : "Failed to load calendar events",
    );
    return { events: [], errors };
  }

  const events: CalendarEvent[] = [];

  for (const entityId of unique) {
    const bucket = response[entityId];
    if (!bucket) {
      errors.push(`No response for ${entityId}`);
      continue;
    }
    if (bucket.error) {
      errors.push(`${entityId}: ${bucket.error}`);
      continue;
    }

    const name = calendarDisplayName(hass, entityId);
    for (const raw of bucket.events ?? []) {
      const start = normalizeInstant(raw.start);
      const end = normalizeInstant(raw.end);
      if (!start || !end) {
        continue;
      }
      events.push({
        summary: raw.summary || "Busy",
        description: raw.description,
        location: raw.location,
        start: start.iso,
        end: end.iso,
        all_day: start.allDay || end.allDay,
        calendar_id: entityId,
        calendar_name: name,
      });
    }
  }

  events.sort((a, b) => a.start.localeCompare(b.start));
  return { events, errors };
}

/** Local calendar day key YYYY-MM-DD in the given time zone. */
export function localDayKey(now: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Day key for grouping/filtering an event (all-day uses the date part). */
export function eventDayKey(event: CalendarEvent, timeZone: string): string {
  if (event.all_day) {
    const match = /^(\d{4}-\d{2}-\d{2})/.exec(event.start);
    if (match) {
      return match[1];
    }
  }
  const start = new Date(event.start);
  if (Number.isNaN(start.getTime())) {
    return event.start.slice(0, 10);
  }
  return localDayKey(start, timeZone);
}

export function filterTodaysEvents(
  events: CalendarEvent[],
  now: Date,
  timeZone: string,
): CalendarEvent[] {
  const today = localDayKey(now, timeZone);
  return events.filter((event) => eventDayKey(event, timeZone) === today);
}

export function formatEventDayLabel(
  dayKey: string,
  locale: string,
  timeZone: string,
  now: Date,
): string {
  const today = localDayKey(now, timeZone);
  const tomorrowDate = new Date(now.getTime() + 36 * 60 * 60 * 1000);
  const tomorrow = localDayKey(tomorrowDate, timeZone);

  if (dayKey === today) {
    return locale.toLowerCase().startsWith("de") ? "Heute" : "Today";
  }
  if (dayKey === tomorrow) {
    return locale.toLowerCase().startsWith("de") ? "Morgen" : "Tomorrow";
  }

  const date = new Date(`${dayKey}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return dayKey;
  }
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone,
  }).format(date);
}

export function groupEventsByDay(
  events: CalendarEvent[],
  locale: string,
  timeZone: string,
  now: Date,
): Array<{ key: string; label: string; events: CalendarEvent[] }> {
  const groups = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const key = eventDayKey(event, timeZone);
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(event);
    } else {
      groups.set(key, [event]);
    }
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, dayEvents]) => ({
      key,
      label: formatEventDayLabel(key, locale, timeZone, now),
      events: dayEvents,
    }));
}

export function formatEventTime(
  event: CalendarEvent,
  locale: string,
  timeZone: string,
): string {
  if (event.all_day) {
    return locale.toLowerCase().startsWith("de") ? "Ganztägig" : "All day";
  }

  const start = new Date(event.start);
  if (Number.isNaN(start.getTime())) {
    return event.start;
  }

  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(start);
}
