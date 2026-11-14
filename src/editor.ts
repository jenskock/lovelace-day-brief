import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DEFAULT_SUMMARY_PROMPT, EDITOR_NAME } from "./const";
import type {
  DayBriefCardConfig,
  ForecastType,
  HomeAssistant,
  LovelaceCardEditor,
  SummaryMode,
} from "./types";

const FORECAST_OPTIONS: ForecastType[] = [
  "daily",
  "hourly",
  "twice_daily",
  "none",
];
const SUMMARY_OPTIONS: SummaryMode[] = ["auto", "ai", "local"];

function fireConfigChanged(
  target: HTMLElement,
  config: DayBriefCardConfig,
): void {
  target.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }),
  );
}

function parseEntityList(raw: string): string[] {
  return [
    ...new Set(
      raw
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

@customElement(EDITOR_NAME)
export class DayBriefCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: DayBriefCardConfig;

  public setConfig(config: DayBriefCardConfig): void {
    this._config = {
      ...config,
      calendars: [...(config.calendars ?? [])],
      entities: [...(config.entities ?? [])],
    };
  }

  private _update(partial: Partial<DayBriefCardConfig>): void {
    if (!this._config) {
      return;
    }
    const config: DayBriefCardConfig = {
      ...this._config,
      ...partial,
    };
    this._config = config;
    fireConfigChanged(this, config);
  }

  private _value(ev: Event): string {
    return (ev.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
      .value;
  }

  private _onWeather(ev: Event): void {
    this._update({ weather_entity: this._value(ev) || undefined });
  }

  private _onCalendars(ev: Event): void {
    this._update({ calendars: parseEntityList(this._value(ev)) });
  }

  private _onEntities(ev: Event): void {
    this._update({ entities: parseEntityList(this._value(ev)) });
  }

  private _onForecast(ev: Event): void {
    this._update({ forecast_type: this._value(ev) as ForecastType });
  }

  private _onHorizon(ev: Event): void {
    const n = Number(this._value(ev));
    this._update({
      horizon_hours: Number.isFinite(n) && n > 0 ? n : 24,
    });
  }

  private _onAgent(ev: Event): void {
    this._update({ agent_id: this._value(ev) || undefined });
  }

  private _onMode(ev: Event): void {
    this._update({ summary_mode: this._value(ev) as SummaryMode });
  }

  private _onPrompt(ev: Event): void {
    const value = this._value(ev).trim();
    this._update({ summary_prompt: value || undefined });
  }

  private _onContextNotes(ev: Event): void {
    const value = this._value(ev).trim();
    this._update({ context_notes: value || undefined });
  }

  private _onCache(ev: Event): void {
    const n = Number(this._value(ev));
    this._update({
      cache_minutes: Number.isFinite(n) && n > 0 ? n : 30,
    });
  }

  private _onTitle(ev: Event): void {
    this._update({ title: this._value(ev) || undefined });
  }

  private _weatherEntities(): string[] {
    if (!this.hass) {
      return [];
    }
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith("weather."))
      .sort();
  }

  private _calendarEntities(): string[] {
    if (!this.hass) {
      return [];
    }
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith("calendar."))
      .sort();
  }

  private _toggleCalendar(entityId: string): void {
    const current = new Set(this._config.calendars ?? []);
    if (current.has(entityId)) {
      current.delete(entityId);
    } else {
      current.add(entityId);
    }
    this._update({ calendars: [...current].sort() });
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    const calendars = this._config.calendars ?? [];
    const entities = this._config.entities ?? [];
    const weatherEntities = this._weatherEntities();
    const calendarEntities = this._calendarEntities();

    return html`
      <div class="form">
        <label>
          Title
          <input
            type="text"
            .value=${this._config.title ?? ""}
            placeholder="Day Brief"
            @change=${this._onTitle}
          />
        </label>

        <label>
          Weather entity
          <select
            .value=${this._config.weather_entity ?? ""}
            @change=${this._onWeather}
          >
            <option value="">Select weather…</option>
            ${weatherEntities.map(
              (id) =>
                html`<option
                  value=${id}
                  ?selected=${id === this._config.weather_entity}
                >
                  ${id}
                </option>`,
            )}
          </select>
        </label>

        <fieldset>
          <legend>Calendars</legend>
          ${calendarEntities.length === 0
            ? html`
                <textarea
                  rows="3"
                  placeholder="calendar.personal, calendar.work"
                  .value=${calendars.join("\n")}
                  @change=${this._onCalendars}
                ></textarea>
              `
            : html`
                <div class="checks">
                  ${calendarEntities.map(
                    (id) => html`
                      <label class="check">
                        <input
                          type="checkbox"
                          .checked=${calendars.includes(id)}
                          @change=${() => this._toggleCalendar(id)}
                        />
                        <span>${id}</span>
                      </label>
                    `,
                  )}
                </div>
              `}
        </fieldset>

        <label>
          Extra entities
          <textarea
            rows="4"
            placeholder="person.jens_2&#10;sensor.abfallrestmuell&#10;binary_sensor.haustur"
            .value=${entities.join("\n")}
            @change=${this._onEntities}
          ></textarea>
          <span class="hint"
            >One entity per line. Included in the brief and shown under
            Context.</span
          >
        </label>

        <label>
          Forecast type
          <select
            .value=${this._config.forecast_type ?? "daily"}
            @change=${this._onForecast}
          >
            ${FORECAST_OPTIONS.map(
              (opt) =>
                html`<option
                  value=${opt}
                  ?selected=${(this._config.forecast_type ?? "daily") === opt}
                >
                  ${opt}
                </option>`,
            )}
          </select>
        </label>

        <label>
          Horizon hours
          <input
            type="number"
            min="1"
            max="168"
            .value=${String(this._config.horizon_hours ?? 24)}
            @change=${this._onHorizon}
          />
        </label>

        <label>
          Conversation agent id
          <input
            type="text"
            .value=${this._config.agent_id ?? ""}
            placeholder="conversation.openai"
            @change=${this._onAgent}
          />
        </label>

        <label>
          Summary mode
          <select
            .value=${this._config.summary_mode ?? "auto"}
            @change=${this._onMode}
          >
            ${SUMMARY_OPTIONS.map(
              (opt) =>
                html`<option
                  value=${opt}
                  ?selected=${(this._config.summary_mode ?? "auto") === opt}
                >
                  ${opt}
                </option>`,
            )}
          </select>
        </label>

        <label>
          Household / context notes
          <textarea
            rows="3"
            placeholder="Familie: Jens, Jenny, Ella (Tochter). Hund: Milo."
            .value=${this._config.context_notes ?? ""}
            @change=${this._onContextNotes}
          ></textarea>
        </label>

        <label>
          System prompt
          <textarea
            rows="5"
            placeholder=${DEFAULT_SUMMARY_PROMPT}
            .value=${this._config.summary_prompt ?? ""}
            @change=${this._onPrompt}
          ></textarea>
          <span class="hint"
            >Leer = starkes deutsches Standard-Prompt. Wetter, Vorhersage,
            Termine, Solar, Müll und Entities werden strukturiert
            angehängt.</span
          >
        </label>

        <label>
          Cache minutes
          <input
            type="number"
            min="1"
            max="1440"
            .value=${String(this._config.cache_minutes ?? 30)}
            @change=${this._onCache}
          />
        </label>
      </div>
    `;
  }

  static styles = css`
    .form {
      display: grid;
      gap: 14px;
      padding: 4px 0 12px;
    }

    label,
    fieldset {
      display: grid;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--primary-text-color);
    }

    fieldset {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 10px 12px;
      margin: 0;
    }

    legend {
      padding: 0 4px;
      color: var(--secondary-text-color);
    }

    .hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }

    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #cfcfcf);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
    }

    textarea {
      resize: vertical;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.8rem;
      line-height: 1.4;
    }

    .checks {
      display: grid;
      gap: 6px;
      max-height: 180px;
      overflow: auto;
    }

    .check {
      display: flex;
      align-items: center;
      gap: 8px;
      grid-template-columns: none;
    }

    .check input {
      width: auto;
    }
  `;
}
