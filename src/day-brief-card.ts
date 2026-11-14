import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CARD_NAME, CARD_TYPE, CARD_VERSION, EDITOR_NAME } from "./const";
import { fetchCalendarEvents, formatEventTime } from "./data/calendar";
import {
  readEntitySnapshots,
  type EntitySnapshot,
} from "./data/entities";
import { KeepAwakeController } from "./data/keep-awake";
import {
  buildSummaryDigest,
  invalidateSummaryCache,
  resolveSummary,
} from "./data/summary";
import { speakSummary, stopSpeaking } from "./data/tts";
import {
  entityChanged,
  formatTemperature,
  readWeatherEntity,
  subscribeForecast,
  weatherConditionLabel,
  type WeatherSnapshot,
} from "./data/weather";
import { cardStyles } from "./styles";
import type {
  CalendarEvent,
  DayBriefCardConfig,
  ForecastType,
  HomeAssistant,
  LovelaceCard,
  SummaryMode,
  WeatherForecastEntry,
} from "./types";

const DEFAULT_FORECAST: ForecastType = "daily";
const DEFAULT_HORIZON = 24;
const DEFAULT_CACHE = 15;
const DEFAULT_MODE: SummaryMode = "auto";
const REFRESH_MS = 15 * 60_000;

@customElement(CARD_TYPE)
export class DayBriefCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: DayBriefCardConfig;
  @state() private _weather: WeatherSnapshot | null = null;
  @state() private _forecast: WeatherForecastEntry[] = [];
  @state() private _events: CalendarEvent[] = [];
  @state() private _entities: EntitySnapshot[] = [];
  @state() private _summary = "";
  @state() private _summarySource: "ai" | "local" | "loading" = "loading";
  @state() private _errors: string[] = [];
  @state() private _loadingEvents = false;
  @state() private _refreshing = false;
  @state() private _contextOpen = false;
  @state() private _now = new Date();
  @state() private _speaking = false;
  @state() private _keepAwakeOn = false;

  private _unsubForecast?: () => void;
  private _refreshTimer?: number;
  private _clockTimer?: number;
  private _lastWeatherEntity?: string;
  private _lastForecastType?: ForecastType;
  private _fetchGeneration = 0;
  private _keepAwake = new KeepAwakeController();

  public static getStubConfig(): DayBriefCardConfig {
    return {
      weather_entity: "weather.home",
      calendars: ["calendar.home"],
      entities: [],
      cameras: [],
      forecast_type: "daily",
      summary_mode: "auto",
    };
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    await import("./editor");
    return document.createElement(EDITOR_NAME);
  }

  public setConfig(config: DayBriefCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = {
      forecast_type: DEFAULT_FORECAST,
      horizon_hours: DEFAULT_HORIZON,
      summary_mode: DEFAULT_MODE,
      cache_minutes: DEFAULT_CACHE,
      calendars: [],
      entities: [],
      cameras: [],
      birthdays: [],
      schedules: [],
      ...config,
    };
  }

  public getCardSize(): number {
    return 5;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._startRefreshLoop();
    this._startClock();
    document.addEventListener("visibilitychange", this._onVisibility);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopRefreshLoop();
    this._stopClock();
    this._teardownForecast();
    this._keepAwake.stop();
    this._keepAwakeOn = false;
    stopSpeaking();
    document.removeEventListener("visibilitychange", this._onVisibility);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (!this._config || !this.hass) {
      return;
    }

    if (changed.has("hass") || changed.has("_config")) {
      this._syncWeatherFromHass();
      this._syncEntitiesFromHass();
      void this._ensureForecastSubscription();
    }

    if (changed.has("_config") && this.isConnected) {
      void this._refreshData(true);
    }
  }

  protected shouldUpdate(changed: Map<string, unknown>): boolean {
    if (
      changed.has("_config") ||
      changed.has("_weather") ||
      changed.has("_forecast") ||
      changed.has("_entities")
    ) {
      return true;
    }
    if (
      changed.has("_events") ||
      changed.has("_summary") ||
      changed.has("_summarySource") ||
      changed.has("_errors") ||
      changed.has("_loadingEvents") ||
      changed.has("_refreshing") ||
      changed.has("_contextOpen") ||
      changed.has("_now") ||
      changed.has("_speaking") ||
      changed.has("_keepAwakeOn")
    ) {
      return true;
    }
    if (changed.has("hass")) {
      const prev = changed.get("hass") as HomeAssistant | undefined;
      if (
        this._config?.weather_entity &&
        entityChanged(
          prev?.states?.[this._config.weather_entity],
          this.hass?.states?.[this._config.weather_entity],
        )
      ) {
        return true;
      }
      for (const entityId of this._config?.entities ?? []) {
        if (
          entityChanged(prev?.states?.[entityId], this.hass?.states?.[entityId])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private _onVisibility = (): void => {
    if (document.visibilityState === "visible") {
      this._now = new Date();
      this._startClock();
      void this._refreshData(false);
    } else {
      this._stopClock();
    }
  };

  private _startRefreshLoop(): void {
    this._stopRefreshLoop();
    void this._refreshData(true);
    this._refreshTimer = window.setInterval(() => {
      void this._refreshData(false);
    }, REFRESH_MS);
  }

  private _stopRefreshLoop(): void {
    if (this._refreshTimer) {
      window.clearInterval(this._refreshTimer);
      this._refreshTimer = undefined;
    }
  }

  private _startClock(): void {
    this._stopClock();
    this._now = new Date();
    this._clockTimer = window.setInterval(() => {
      this._now = new Date();
    }, 1000);
  }

  private _stopClock(): void {
    if (this._clockTimer) {
      window.clearInterval(this._clockTimer);
      this._clockTimer = undefined;
    }
  }

  private _clockLabel(): string {
    const locale = this.hass?.locale?.language ?? "en";
    const timeZone = this.hass?.config.time_zone;
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
    }).format(this._now);
  }

  private _cameraName(entityId: string): string {
    const state = this.hass?.states[entityId];
    return (
      this.hass?.entities?.[entityId]?.name ??
      (typeof state?.attributes.friendly_name === "string"
        ? state.attributes.friendly_name
        : entityId.replace(/^camera\./, "").replace(/_/g, " "))
    );
  }

  private _cameraSrc(entityId: string): string | null {
    const state = this.hass?.states[entityId];
    if (!state) {
      return null;
    }
    const token = state.attributes.access_token;
    if (typeof token !== "string" || !token) {
      return null;
    }
    return `/api/camera_proxy_stream/${entityId}?token=${encodeURIComponent(token)}`;
  }

  private _openMoreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _cacheKey(): string {
    return [
      this._config.weather_entity ?? "",
      ...(this._config.calendars ?? []),
      ...(this._config.entities ?? []),
      this._config.summary_mode ?? DEFAULT_MODE,
      this._config.agent_id ?? "",
      this._config.summary_prompt ?? "",
      this._config.context_notes ?? "",
      JSON.stringify(this._config.birthdays ?? []),
      JSON.stringify(this._config.schedules ?? []),
    ].join("|");
  }

  private _syncWeatherFromHass(): void {
    const entityId = this._config.weather_entity;
    if (!entityId) {
      this._weather = null;
      return;
    }
    const snapshot = readWeatherEntity(this.hass, entityId);
    if (!snapshot) {
      this._weather = null;
      this._pushError(`Weather entity not found: ${entityId}`);
      return;
    }
    this._weather = { ...snapshot, forecast: this._forecast };
  }

  private _syncEntitiesFromHass(): void {
    const { entities, missing } = readEntitySnapshots(
      this.hass,
      this._config.entities ?? [],
    );
    this._entities = entities;
    for (const entityId of missing) {
      this._pushError(`Entity not found: ${entityId}`);
    }
  }

  private async _ensureForecastSubscription(): Promise<void> {
    const entityId = this._config.weather_entity;
    const forecastType = this._config.forecast_type ?? DEFAULT_FORECAST;

    if (
      this._unsubForecast &&
      this._lastWeatherEntity === entityId &&
      this._lastForecastType === forecastType
    ) {
      return;
    }

    this._teardownForecast();
    this._lastWeatherEntity = entityId;
    this._lastForecastType = forecastType;

    if (!entityId || forecastType === "none" || !this.hass) {
      this._forecast = [];
      return;
    }

    try {
      this._unsubForecast = await subscribeForecast(
        this.hass,
        entityId,
        forecastType,
        (forecast) => {
          this._forecast = forecast.slice(0, 6);
          if (this._weather) {
            this._weather = { ...this._weather, forecast: this._forecast };
          }
        },
      );
    } catch (error) {
      this._forecast = [];
      this._pushError(
        error instanceof Error
          ? `Forecast: ${error.message}`
          : "Forecast unavailable",
      );
    }
  }

  private _teardownForecast(): void {
    if (this._unsubForecast) {
      this._unsubForecast();
      this._unsubForecast = undefined;
    }
  }

  private _pushError(message: string): void {
    if (!this._errors.includes(message)) {
      this._errors = [...this._errors, message].slice(-4);
    }
  }

  private async _onManualRefresh(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this._refreshing) {
      return;
    }
    this._refreshing = true;
    invalidateSummaryCache(this._cacheKey());
    try {
      await this._refreshData(true, true);
    } finally {
      this._refreshing = false;
    }
  }

  private async _onSpeak(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (!this._summary || this._summarySource === "loading") {
      return;
    }
    if (this._speaking) {
      stopSpeaking();
      this._speaking = false;
      return;
    }
    this._speaking = true;
    try {
      await speakSummary({
        hass: this.hass,
        text: this._summary,
        language: this.hass?.locale?.language?.startsWith("de")
          ? "de-DE"
          : this.hass?.locale?.language,
        mediaPlayer: this._config.tts_entity,
      });
    } catch (error) {
      this._pushError(
        error instanceof Error ? `TTS: ${error.message}` : "TTS failed",
      );
    } finally {
      // Browser utterance has no reliable end hook across Silk; clear soon.
      window.setTimeout(() => {
        this._speaking = false;
      }, 1500);
    }
  }

  private _onKeepAwake(ev: Event): void {
    ev.stopPropagation();
    if (this._keepAwakeOn) {
      this._keepAwake.stop();
      this._keepAwakeOn = false;
      return;
    }
    this._keepAwakeOn = this._keepAwake.start();
  }

  private async _refreshData(
    forceSummary: boolean,
    forceAi = false,
  ): Promise<void> {
    if (!this.hass || !this._config) {
      return;
    }

    const generation = ++this._fetchGeneration;
    const errors: string[] = [];
    this._loadingEvents = true;
    this._syncWeatherFromHass();
    this._syncEntitiesFromHass();

    const calendars = this._config.calendars ?? [];
    const horizon = this._config.horizon_hours ?? DEFAULT_HORIZON;
    const { events, errors: calendarErrors } = await fetchCalendarEvents(
      this.hass,
      calendars,
      horizon,
    );

    if (generation !== this._fetchGeneration) {
      return;
    }

    this._events = events;
    errors.push(...calendarErrors);
    this._loadingEvents = false;

    if (!this._config.weather_entity) {
      errors.push("No weather_entity configured");
    } else if (!this.hass.states[this._config.weather_entity]) {
      errors.push(`Weather entity not found: ${this._config.weather_entity}`);
    }

    for (const entityId of this._config.entities ?? []) {
      if (!this.hass.states[entityId]) {
        errors.push(`Entity not found: ${entityId}`);
      }
    }

    this._errors = [...new Set(errors)].slice(-6);
    await this._refreshSummary(forceSummary, forceAi);
  }

  private async _refreshSummary(
    force: boolean,
    forceAi = false,
  ): Promise<void> {
    if (!this.hass || !this._config) {
      return;
    }

    const mode = this._config.summary_mode ?? DEFAULT_MODE;
    const cacheMinutes = this._config.cache_minutes ?? DEFAULT_CACHE;
    const locale = this.hass.locale?.language ?? "en";
    const timeZone = this.hass.config.time_zone;
    const digest = buildSummaryDigest({
      weather: this._weather,
      forecast: this._forecast,
      events: this._events,
      entities: this._entities,
      birthdays: this._config.birthdays,
      schedules: this._config.schedules,
      now: new Date(),
      locale,
      timeZone,
      summaryPrompt: this._config.summary_prompt,
      contextNotes: this._config.context_notes,
    });
    const cacheKey = this._cacheKey();

    if (force || forceAi || !this._summary || this._summarySource === "loading") {
      this._summarySource = "loading";
    }

    try {
      const result = await resolveSummary({
        hass: this.hass,
        mode,
        agentId: this._config.agent_id,
        digest,
        cacheKey,
        cacheMinutes,
        force: forceAi,
      });
      this._summary = result.text;
      this._summarySource = result.source;
    } catch {
      this._summary = digest.local;
      this._summarySource = "local";
    }
  }

  private _dayTitle(): string {
    if (this._config.title) {
      return this._config.title;
    }
    const locale = this.hass?.locale?.language ?? "en";
    const timeZone = this.hass?.config.time_zone;
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone,
    }).format(this._now);
  }

  private _forecastLabel(entry: WeatherForecastEntry): string {
    if (!entry.datetime) {
      return "";
    }
    const locale = this.hass.locale?.language ?? "en";
    const timeZone = this.hass.config.time_zone;
    const type = this._config.forecast_type ?? DEFAULT_FORECAST;
    const date = new Date(entry.datetime);
    if (type === "hourly") {
      return new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        timeZone,
      }).format(date);
    }
    return new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone,
    }).format(date);
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    const locale = this.hass?.locale?.language ?? "en";
    const timeZone = this.hass?.config.time_zone ?? "UTC";
    const weather = this._weather;

    return html`
      <ha-card>
        <div class="header">
          <div class="header-row">
            <div>
              <p class="eyebrow">Today</p>
              <h2 class="title">${this._dayTitle()}</h2>
              <p class="clock" aria-live="polite">${this._clockLabel()}</p>
            </div>
            <div class="header-actions">
              <button
                class="icon-btn"
                type="button"
                title="Refresh brief"
                aria-label="Refresh brief"
                ?disabled=${this._refreshing}
                @click=${this._onManualRefresh}
              >
                <span class=${this._refreshing ? "spin" : ""}>↻</span>
              </button>
              <button
                class="icon-btn ${this._speaking ? "active" : ""}"
                type="button"
                title="Read summary aloud"
                aria-label="Read summary aloud"
                ?disabled=${!this._summary || this._summarySource === "loading"}
                @click=${this._onSpeak}
              >
                ♪
              </button>
            </div>
          </div>
        </div>

        <p
          class="brief ${this._summarySource === "loading" || this._refreshing
            ? "loading"
            : ""}"
          data-source=${this._summarySource}
        >
          ${this._summarySource === "loading" && !this._summary
            ? "Preparing your day brief…"
            : this._summary}
        </p>

        ${this._summary && this._summarySource !== "loading"
          ? html`
              <div class="meta">
                <span
                  class="dot ${this._summarySource === "local" ? "local" : ""}"
                ></span>
                <span
                  >${this._summarySource === "ai"
                    ? "AI brief"
                    : "Local brief"}</span
                >
              </div>
            `
          : nothing}

        <div class="sections">
          <section>
            <h3 class="section-title">Weather</h3>
            ${weather
              ? html`
                  <div class="weather-row">
                    <p class="condition">
                      ${weatherConditionLabel(weather.condition)}
                    </p>
                    <p class="temp">
                      ${formatTemperature(
                        weather.temperature,
                        weather.temperature_unit,
                      )}
                    </p>
                  </div>
                  <p class="weather-meta">
                    ${weather.friendly_name ?? weather.entity_id}
                    ${typeof weather.humidity === "number"
                      ? html` · ${weather.humidity}% humidity`
                      : nothing}
                  </p>
                  ${this._forecast.length
                    ? html`
                        <div class="forecast">
                          ${this._forecast.map(
                            (entry) => html`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(entry)}</span
                                >
                                <span class="forecast-cond"
                                  >${weatherConditionLabel(
                                    entry.condition ?? "",
                                  )}</span
                                >
                                <span class="forecast-temp"
                                  >${formatTemperature(
                                    entry.temperature,
                                    weather.temperature_unit,
                                  )}</span
                                >
                              </div>
                            `,
                          )}
                        </div>
                      `
                    : nothing}
                `
              : html`<p class="empty">Configure a weather entity to begin.</p>`}
          </section>

          <section>
            <h3 class="section-title">Meetings</h3>
            ${this._loadingEvents && this._events.length === 0
              ? html`<p class="empty loading">Loading calendars…</p>`
              : this._events.length === 0
                ? html`<p class="empty">
                    No meetings in the next
                    ${this._config.horizon_hours ?? DEFAULT_HORIZON} hours.
                  </p>`
                : html`
                    <ul class="events">
                      ${this._events.map(
                        (event) => html`
                          <li class="event">
                            <span class="event-time"
                              >${formatEventTime(
                                event,
                                locale,
                                timeZone,
                              )}</span
                            >
                            <div class="event-body">
                              <p class="event-title">${event.summary}</p>
                              ${event.calendar_name
                                ? html`<p class="event-cal">
                                    ${event.calendar_name}${event.location
                                      ? ` · ${event.location}`
                                      : ""}
                                  </p>`
                                : nothing}
                            </div>
                          </li>
                        `,
                      )}
                    </ul>
                  `}
          </section>

          ${this._entities.length
            ? html`
                <section class="context">
                  <button
                    class="context-toggle"
                    type="button"
                    aria-expanded=${this._contextOpen ? "true" : "false"}
                    @click=${() => {
                      this._contextOpen = !this._contextOpen;
                    }}
                  >
                    <span class="section-title">Context</span>
                    <span class="context-meta"
                      >${this._entities.length}
                      ${this._entities.length === 1 ? "entity" : "entities"}</span
                    >
                    <span class="context-chevron" aria-hidden="true"
                      >${this._contextOpen ? "▾" : "▸"}</span
                    >
                  </button>
                  ${this._contextOpen
                    ? html`
                        <ul class="entity-list">
                          ${this._entities.map(
                            (entity) => html`
                              <li class="entity-row">
                                <span class="entity-name">${entity.name}</span>
                                <span class="entity-state">${entity.state}</span>
                              </li>
                            `,
                          )}
                        </ul>
                      `
                    : nothing}
                </section>
              `
            : nothing}

          ${(this._config.cameras ?? []).length
            ? html`
                <section class="cameras">
                  <h3 class="section-title">Cameras</h3>
                  <div class="camera-grid">
                    ${(this._config.cameras ?? []).map((entityId) => {
                      const src = this._cameraSrc(entityId);
                      return html`
                        <button
                          class="camera-tile"
                          type="button"
                          @click=${() => this._openMoreInfo(entityId)}
                        >
                          ${src
                            ? html`<img
                                class="camera-feed"
                                src=${src}
                                alt=${this._cameraName(entityId)}
                              />`
                            : html`<div class="camera-missing">No feed</div>`}
                          <span class="camera-label"
                            >${this._cameraName(entityId)}</span
                          >
                        </button>
                      `;
                    })}
                  </div>
                </section>
              `
            : nothing}
        </div>

        ${this._errors.length
          ? html`
              <div class="errors">
                ${this._errors.map(
                  (err) => html`<span class="error-chip">${err}</span>`,
                )}
              </div>
            `
          : nothing}

        ${this._config.keep_awake !== false
          ? html`
              <div class="footer-bar">
                <button
                  class="keep-awake ${this._keepAwakeOn ? "on" : ""}"
                  type="button"
                  title=${this._keepAwakeOn
                    ? "Keep-awake active (tap to stop)"
                    : "Tap once to keep Echo Show / Silk open"}
                  @click=${this._onKeepAwake}
                >
                  <span class="keep-dot"></span>
                  <span>${this._keepAwakeOn ? "Awake" : "Keep awake"}</span>
                </button>
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  static styles = cardStyles;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  description:
    "AI-first day brief with weather, calendars, extra entities, and a short narrative.",
  preview: true,
  documentationURL: "https://github.com/jenskock/lovelace-day-brief",
});

console.info(
  `%c ${CARD_NAME} %c ${CARD_VERSION} `,
  "color:#fff;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:transparent;font-weight:700",
);
