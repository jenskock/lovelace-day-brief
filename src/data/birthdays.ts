export interface BirthdayConfig {
  name: string;
  /** ISO date `YYYY-MM-DD` (year used for age). */
  date: string;
}

export interface UpcomingBirthday {
  name: string;
  date: string;
  daysUntil: number;
  ageTurning: number;
}

function parseIsoDate(value: string): { month: number; day: number; year: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  return { year, month, day };
}

function zonedYmd(
  now: Date,
  timeZone: string,
): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day") };
}

function dayNumber(year: number, month: number, day: number): number {
  return Date.UTC(year, month - 1, day) / 86_400_000;
}

/** Birthdays within the next `withinDays` days (including today). */
export function upcomingBirthdays(
  birthdays: BirthdayConfig[],
  now: Date,
  timeZone: string,
  withinDays = 14,
): UpcomingBirthday[] {
  const today = zonedYmd(now, timeZone);
  const todayNum = dayNumber(today.year, today.month, today.day);
  const results: UpcomingBirthday[] = [];

  for (const entry of birthdays) {
    const parsed = parseIsoDate(entry.date);
    if (!parsed || !entry.name.trim()) {
      continue;
    }

    let nextYear = today.year;
    let nextNum = dayNumber(nextYear, parsed.month, parsed.day);
    if (nextNum < todayNum) {
      nextYear += 1;
      nextNum = dayNumber(nextYear, parsed.month, parsed.day);
    }

    const daysUntil = nextNum - todayNum;
    if (daysUntil < 0 || daysUntil > withinDays) {
      continue;
    }

    results.push({
      name: entry.name.trim(),
      date: `${String(parsed.month).padStart(2, "0")}-${String(parsed.day).padStart(2, "0")}`,
      daysUntil,
      ageTurning: nextYear - parsed.year,
    });
  }

  return results.sort((a, b) => a.daysUntil - b.daysUntil);
}

export function formatBirthdayLine(
  birthday: UpcomingBirthday,
  german: boolean,
): string {
  if (german) {
    if (birthday.daysUntil === 0) {
      return `- ${birthday.name}: heute (${birthday.ageTurning})`;
    }
    if (birthday.daysUntil === 1) {
      return `- ${birthday.name}: morgen (${birthday.ageTurning})`;
    }
    return `- ${birthday.name}: in ${birthday.daysUntil} Tagen (${birthday.ageTurning})`;
  }
  if (birthday.daysUntil === 0) {
    return `- ${birthday.name}: today (turns ${birthday.ageTurning})`;
  }
  if (birthday.daysUntil === 1) {
    return `- ${birthday.name}: tomorrow (turns ${birthday.ageTurning})`;
  }
  return `- ${birthday.name}: in ${birthday.daysUntil} days (turns ${birthday.ageTurning})`;
}

/** Parse editor lines like `Name: 2018-12-28` or `Name,2018-12-28`. */
export function parseBirthdayLines(raw: string): BirthdayConfig[] {
  const results: BirthdayConfig[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    const match =
      /^(.+?)[\s,|:;-]+(\d{4}-\d{2}-\d{2})$/.exec(trimmed) ??
      /^(\d{4}-\d{2}-\d{2})[\s,|:;-]+(.+)$/.exec(trimmed);
    if (!match) {
      continue;
    }
    const a = match[1]?.trim() ?? "";
    const b = match[2]?.trim() ?? "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(a)) {
      results.push({ name: b, date: a });
    } else {
      results.push({ name: a, date: b });
    }
  }
  return results;
}

export function serializeBirthdayLines(birthdays: BirthdayConfig[]): string {
  return birthdays
    .map((entry) => `${entry.name}: ${entry.date}`)
    .join("\n");
}
