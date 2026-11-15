export type WeekdayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface ScheduleLesson {
  start: string;
  end: string;
  subject: string;
}

export interface DayBriefSchedule {
  name: string;
  note?: string;
  valid_from?: string;
  monday?: ScheduleLesson[];
  tuesday?: ScheduleLesson[];
  wednesday?: ScheduleLesson[];
  thursday?: ScheduleLesson[];
  friday?: ScheduleLesson[];
  saturday?: ScheduleLesson[];
  sunday?: ScheduleLesson[];
}

const WEEKDAY_KEYS: WeekdayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const WEEKDAY_DE: Record<WeekdayKey, string> = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

const SCHOOL_WEEKDAYS: WeekdayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

function zonedWeekday(now: Date, timeZone: string): WeekdayKey {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone,
  }).format(now);
  switch (weekday) {
    case "Mon":
      return "monday";
    case "Tue":
      return "tuesday";
    case "Wed":
      return "wednesday";
    case "Thu":
      return "thursday";
    case "Fri":
      return "friday";
    case "Sat":
      return "saturday";
    case "Sun":
      return "sunday";
    default:
      return "monday";
  }
}

function zonedMinutes(now: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? 0,
  );
  return hour * 60 + minute;
}

function parseHm(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) {
    return null;
  }
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) {
    return null;
  }
  return hour * 60 + minute;
}

function isActive(schedule: DayBriefSchedule, now: Date, timeZone: string): boolean {
  if (!schedule.valid_from) {
    return true;
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(schedule.valid_from.trim());
  if (!match) {
    return true;
  }
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  const today =
    get("year") * 10_000 + get("month") * 100 + get("day");
  const from =
    Number(match[1]) * 10_000 + Number(match[2]) * 100 + Number(match[3]);
  return today >= from;
}

export function todaysLessons(
  schedule: DayBriefSchedule,
  now: Date,
  timeZone: string,
): { weekday: WeekdayKey; lessons: ScheduleLesson[] } {
  const weekday = zonedWeekday(now, timeZone);
  const lessons = [...(schedule[weekday] ?? [])].sort((a, b) =>
    a.start.localeCompare(b.start),
  );
  return { weekday, lessons };
}

export function currentOrNextLesson(
  lessons: ScheduleLesson[],
  now: Date,
  timeZone: string,
): { current?: ScheduleLesson; next?: ScheduleLesson } {
  const minutes = zonedMinutes(now, timeZone);
  let current: ScheduleLesson | undefined;
  let next: ScheduleLesson | undefined;

  for (const lesson of lessons) {
    const start = parseHm(lesson.start);
    const end = parseHm(lesson.end);
    if (start === null || end === null) {
      continue;
    }
    if (minutes >= start && minutes < end) {
      current = lesson;
    } else if (minutes < start && !next) {
      next = lesson;
    }
  }

  return { current, next };
}

function nextSchoolDayLessons(
  schedule: DayBriefSchedule,
  weekday: WeekdayKey,
): { weekday: WeekdayKey; lessons: ScheduleLesson[] } | null {
  const start = WEEKDAY_KEYS.indexOf(weekday);
  for (let offset = 1; offset <= 7; offset += 1) {
    const key = WEEKDAY_KEYS[(start + offset) % 7];
    if (!SCHOOL_WEEKDAYS.includes(key)) {
      continue;
    }
    const lessons = [...(schedule[key] ?? [])].sort((a, b) =>
      a.start.localeCompare(b.start),
    );
    if (lessons.length) {
      return { weekday: key, lessons };
    }
  }
  return null;
}

function lastLessonEnd(lessons: ScheduleLesson[]): string | null {
  if (!lessons.length) {
    return null;
  }
  const sorted = [...lessons].sort((a, b) => a.end.localeCompare(b.end));
  return sorted[sorted.length - 1]?.end ?? null;
}

export function buildSchedulePromptLines(
  schedules: DayBriefSchedule[],
  now: Date,
  timeZone: string,
  german: boolean,
): { lines: string[]; hasLessonsToday: boolean } {
  const lines: string[] = [];
  let hasLessonsToday = false;

  for (const schedule of schedules) {
    if (!schedule.name?.trim()) {
      continue;
    }
    if (!isActive(schedule, now, timeZone)) {
      continue;
    }

    const { weekday, lessons } = todaysLessons(schedule, now, timeZone);
    const dayLabel = german ? WEEKDAY_DE[weekday] : weekday;
    lines.push(
      german
        ? `Schüler/in: ${schedule.name} · heute ${dayLabel}`
        : `Student: ${schedule.name} · today ${dayLabel}`,
    );
    if (schedule.note) {
      lines.push(german ? `Hinweis: ${schedule.note}` : `Note: ${schedule.note}`);
    }

    if (lessons.length === 0) {
      lines.push(
        german
          ? `Heute kein Unterricht für ${schedule.name}.`
          : `No lessons today for ${schedule.name}.`,
      );
      const upcoming = nextSchoolDayLessons(schedule, weekday);
      if (upcoming) {
        const nextLabel = german
          ? WEEKDAY_DE[upcoming.weekday]
          : upcoming.weekday;
        const until = lastLessonEnd(upcoming.lessons);
        lines.push(
          german
            ? `Nächster Schultag: ${nextLabel} für ${schedule.name}${until ? ` (bis ${until})` : ""}.`
            : `Next school day: ${nextLabel} for ${schedule.name}${until ? ` (until ${until})` : ""}.`,
        );
        lines.push(
          german
            ? `Plan ${nextLabel}:`
            : `${nextLabel} plan:`,
        );
        for (const lesson of upcoming.lessons.slice(0, 8)) {
          lines.push(`- ${lesson.start}-${lesson.end}: ${lesson.subject}`);
        }
      }
      continue;
    }

    hasLessonsToday = true;
    const { current, next } = currentOrNextLesson(lessons, now, timeZone);
    const until = lastLessonEnd(lessons);
    if (until) {
      lines.push(
        german
          ? `Schule heute bis ${until} (${schedule.name}).`
          : `School today until ${until} (${schedule.name}).`,
      );
    }
    if (current) {
      lines.push(
        german
          ? `Jetzt: ${current.start}-${current.end} ${current.subject}`
          : `Now: ${current.start}-${current.end} ${current.subject}`,
      );
    }
    if (next) {
      lines.push(
        german
          ? `Als Nächstes: ${next.start}-${next.end} ${next.subject}`
          : `Next: ${next.start}-${next.end} ${next.subject}`,
      );
    }

    lines.push(german ? "Heutiger Plan:" : "Today's schedule:");
    for (const lesson of lessons) {
      lines.push(`- ${lesson.start}-${lesson.end}: ${lesson.subject}`);
    }
  }

  return { lines, hasLessonsToday };
}

/** Keep type export aligned with WEEKDAY_KEYS for editors/tests. */
export const SCHEDULE_WEEKDAYS = WEEKDAY_KEYS;
