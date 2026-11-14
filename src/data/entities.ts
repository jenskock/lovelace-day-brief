import type { HassEntity, HomeAssistant } from "../types";

export interface EntitySnapshot {
  entity_id: string;
  name: string;
  state: string;
  unit?: string;
  domain: string;
}

function entityName(hass: HomeAssistant, state: HassEntity): string {
  return (
    hass.entities?.[state.entity_id]?.name ??
    (typeof state.attributes.friendly_name === "string"
      ? state.attributes.friendly_name
      : state.entity_id)
  );
}

function formatState(hass: HomeAssistant, state: HassEntity): string {
  if (hass.formatEntityState) {
    try {
      return hass.formatEntityState(state);
    } catch {
      // Fall through to raw state.
    }
  }
  const unit =
    typeof state.attributes.unit_of_measurement === "string"
      ? state.attributes.unit_of_measurement
      : undefined;
  return unit ? `${state.state} ${unit}` : state.state;
}

export function readEntitySnapshots(
  hass: HomeAssistant,
  entityIds: string[],
): { entities: EntitySnapshot[]; missing: string[] } {
  const unique = [...new Set(entityIds.filter(Boolean))];
  const entities: EntitySnapshot[] = [];
  const missing: string[] = [];

  for (const entityId of unique) {
    const state = hass.states[entityId];
    if (!state) {
      missing.push(entityId);
      continue;
    }
    entities.push({
      entity_id: entityId,
      name: entityName(hass, state),
      state: formatState(hass, state),
      unit:
        typeof state.attributes.unit_of_measurement === "string"
          ? state.attributes.unit_of_measurement
          : undefined,
      domain: entityId.split(".")[0] ?? "unknown",
    });
  }

  return { entities, missing };
}
