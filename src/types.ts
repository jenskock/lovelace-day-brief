export type ForecastType = "daily" | "hourly" | "twice_daily" | "none";
export type SummaryMode = "auto" | "ai" | "local";

export interface DayBriefCardConfig {
  type?: string;
  title?: string;
  weather_entity?: string;
  calendars?: string[];
  entities?: string[];
  forecast_type?: ForecastType;
  horizon_hours?: number;
  agent_id?: string;
  summary_mode?: SummaryMode;
  summary_prompt?: string;
  cache_minutes?: number;
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
