export type ForecastType = "daily" | "hourly" | "twice_daily" | "none";
export type SummaryMode = "auto" | "ai" | "local";

export interface BirthdayConfig {
  name: string;
  date: string;
}

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

export interface DayBriefCardConfig {
  type?: string;
  title?: string;
  weather_entity?: string;
  calendars?: string[];
  entities?: string[];
  cameras?: string[];
  birthdays?: BirthdayConfig[];
  schedules?: DayBriefSchedule[];
  forecast_type?: ForecastType;
  horizon_hours?: number;
  agent_id?: string;
  summary_mode?: SummaryMode;
  summary_prompt?: string;
  context_notes?: string;
  cache_minutes?: number;
  /** TTS engine entity (e.g. Requesty OpenAI TTS). Plays on the dashboard device. */
  tts_entity?: string;
  /** Optional extra media_player to also announce on. */
  tts_media_player?: string;
  /** Silent keep-awake audio for Echo Show / Silk (default on; set false to hide). */
  keep_awake?: boolean;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, { name?: string; entity_id?: string }>;
  locale: {
    language: string;
  };
  config: {
    time_zone: string;
    language?: string;
    unit_system?: {
      temperature: string;
    };
  };
  connection: {
    subscribeMessage: <T>(
      callback: (message: T) => void,
      subscribeMessage: Record<string, unknown>,
    ) => Promise<() => Promise<void>>;
  };
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
    notifyOnError?: boolean,
    returnResponse?: boolean,
  ) => Promise<{ response?: Record<string, unknown> } | void>;
  callWS: <T>(message: Record<string, unknown>) => Promise<T>;
  callApi?: <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    data?: Record<string, unknown>,
  ) => Promise<T>;
  hassUrl?: (path?: string) => string;
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: DayBriefCardConfig): void;
  getCardSize?(): number | Promise<number>;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: DayBriefCardConfig): void;
}

export interface WeatherForecastEntry {
  datetime?: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation_probability?: number;
}

export interface CalendarEvent {
  summary?: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
  all_day?: boolean;
  calendar_id: string;
  calendar_name?: string;
}

export interface ConversationProcessResult {
  conversation_id?: string;
  response?: {
    response_type?: string;
    speech?: {
      plain?: {
        speech?: string;
      };
    };
  };
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
