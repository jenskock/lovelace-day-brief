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

export function formatEventTime(
  event: CalendarEvent,
  locale: string,
  timeZone: string,
): string {
  if (event.all_day) {
    return "All day";
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
