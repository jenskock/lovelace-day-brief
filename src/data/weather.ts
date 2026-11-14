import type {
  ForecastType,
  HassEntity,
  HomeAssistant,
  WeatherForecastEntry,
} from "../types";

export interface WeatherSnapshot {
  entity_id: string;
  condition: string;
  temperature?: number;
  temperature_unit?: string;
  humidity?: number;
  wind_speed?: number;
  wind_speed_unit?: string;
  friendly_name?: string;
  forecast: WeatherForecastEntry[];
}

export function readWeatherEntity(
  hass: HomeAssistant,
  entityId: string,
): WeatherSnapshot | null {
  const state = hass.states[entityId];
  if (!state) {
    return null;
  }

  const attrs = state.attributes;
  const name =
    hass.entities?.[entityId]?.name ??
    (typeof attrs.friendly_name === "string" ? attrs.friendly_name : entityId);

  return {
    entity_id: entityId,
    condition: state.state,
    temperature:
      typeof attrs.temperature === "number" ? attrs.temperature : undefined,
    temperature_unit:
      typeof attrs.temperature_unit === "string"
        ? attrs.temperature_unit
        : hass.config.unit_system?.temperature,
    humidity: typeof attrs.humidity === "number" ? attrs.humidity : undefined,
    wind_speed:
      typeof attrs.wind_speed === "number" ? attrs.wind_speed : undefined,
    wind_speed_unit:
      typeof attrs.wind_speed_unit === "string"
        ? attrs.wind_speed_unit
        : undefined,
    friendly_name: name,
    forecast: [],
  };
}

export async function subscribeForecast(
  hass: HomeAssistant,
  entityId: string,
  forecastType: Exclude<ForecastType, "none">,
  onChange: (forecast: WeatherForecastEntry[]) => void,
): Promise<() => void> {
  const unsub = await hass.connection.subscribeMessage<{
    type?: string;
    forecast?: WeatherForecastEntry[] | null;
  }>(
    (message) => {
      onChange(Array.isArray(message.forecast) ? message.forecast : []);
    },
    {
      type: "weather/subscribe_forecast",
      entity_id: entityId,
      forecast_type: forecastType,
    },
  );

  return () => {
    void unsub();
  };
}

export function weatherConditionLabel(condition: string): string {
  if (!condition || condition === "unknown" || condition === "unavailable") {
    return "Weather unavailable";
  }
  return condition.replace(/_/g, " ");
}

export function formatTemperature(
  value: number | undefined,
  unit: string | undefined,
): string {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "—";
  }
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(1);
  if (!unit) {
    return `${rounded}°`;
  }
  // HA may provide "°C", "°F", or bare "C"/"F".
  const normalized = unit.includes("°") ? unit : `°${unit}`;
  return `${rounded}${normalized}`;
}

export function entityChanged(
  prev: HassEntity | undefined,
  next: HassEntity | undefined,
): boolean {
  if (prev === next) {
    return false;
  }
  if (!prev || !next) {
    return true;
  }
  return (
    prev.state !== next.state ||
    prev.last_updated !== next.last_updated ||
    prev.attributes.temperature !== next.attributes.temperature ||
    prev.attributes.humidity !== next.attributes.humidity
  );
}
