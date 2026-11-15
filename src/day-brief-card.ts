import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CARD_NAME, CARD_TYPE, CARD_VERSION, EDITOR_NAME } from "./const";
import {
  fetchCalendarEvents,
  formatEventTime,
  groupEventsByDay,
} from "./data/calendar";
import {
  readEntitySnapshots,
  type EntitySnapshot,
} from "./data/entities";
import { KeepAwakeController } from "./data/keep-awake";
import { MicTestController, type MicTestStatus } from "./data/mic";
import {
  renderBriefMarkdown,
  stripBriefMarkdown,
} from "./data/brief-format";
import { t, weatherConditionLabel } from "./data/i18n";
import {
  buildSummaryDigest,
  invalidateSummaryCache,
  resolveSummary,
} from "./data/summary";
import {
  speakSummary,
  stopSpeaking,
  unlockAudioForGesture,
} from "./data/tts";
import {
  entityChanged,
  formatTemperature,
  readWeatherEntity,
  subscribeForecast,
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
  @state() private _cameraMode: Record<string, "stream" | "still"> = {};
  @state() private _cameraOffline: Record<string, boolean> = {};
  @state() private _cameraTick = 0;
  @state() private _micStatus: MicTestStatus = "idle";
  @state() private _micDevice = "";
  @state() private _micLevel = 0;

  private _unsubForecast?: () => void;
  private _refreshTimer?: number;
  private _clockTimer?: number;
  private _cameraStillTimer?: number;
  private _lastWeatherEntity?: string;
  private _lastForecastType?: ForecastType;
  private _fetchGeneration = 0;
  private _keepAwake = new KeepAwakeController();
  private _mic = new MicTestController();
  private _lastMicLevelAt = 0;

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
    this._startCameraStillLoop();
    document.addEventListener("visibilitychange", this._onVisibility);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopRefreshLoop();
    this._stopClock();
    this._stopCameraStillLoop();
    this._teardownForecast();
    this._keepAwake.stop();
    this._keepAwakeOn = false;
    this._mic.stop();
    this._micStatus = "idle";
    this._micLevel = 0;
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
      changed.has("_keepAwakeOn") ||
      changed.has("_cameraMode") ||
      changed.has("_cameraOffline") ||
      changed.has("_cameraTick") ||
      changed.has("_micStatus") ||
      changed.has("_micDevice") ||
      changed.has("_micLevel")
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
      // Camera access tokens rotate; re-render so feeds pick up the new token.
      for (const entityId of this._config?.cameras ?? []) {
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

  private _cameraToken(entityId: string): string | null {
    const token = this.hass?.states[entityId]?.attributes.access_token;
    return typeof token === "string" && token ? token : null;
  }

  private _cameraStreamSrc(entityId: string): string | null {
    const token = this._cameraToken(entityId);
    if (!token) {
      return null;
    }
    return `/api/camera_proxy_stream/${entityId}?token=${encodeURIComponent(token)}`;
  }

  private _cameraStillSrc(entityId: string): string | null {
    const token = this._cameraToken(entityId);
    if (!token) {
      return null;
    }
    // Cache-buster so snapshot-only cameras refresh while in still mode.
    return `/api/camera_proxy/${entityId}?token=${encodeURIComponent(token)}&t=${this._cameraTick}`;
  }

  private _onCameraError(entityId: string): void {
    const mode = this._cameraMode[entityId] ?? "stream";
    if (mode === "stream") {
      // Stream unsupported -> fall back to refreshed still snapshots.
      this._cameraMode = { ...this._cameraMode, [entityId]: "still" };
    } else {
      // Still failing (camera offline) -> flag overlay, but keep retrying
      // via the tick so the tile recovers when the camera comes back.
      this._cameraOffline = { ...this._cameraOffline, [entityId]: true };
    }
  }

  private _onCameraLoad(entityId: string): void {
    if (this._cameraOffline[entityId]) {
      this._cameraOffline = { ...this._cameraOffline, [entityId]: false };
    }
  }

  private _startCameraStillLoop(): void {
    this._stopCameraStillLoop();
    this._cameraStillTimer = window.setInterval(() => {
      if (Object.values(this._cameraMode).includes("still")) {
        this._cameraTick = this._cameraTick + 1;
      }
    }, 5000);
  }

  private _stopCameraStillLoop(): void {
    if (this._cameraStillTimer) {
      window.clearInterval(this._cameraStillTimer);
      this._cameraStillTimer = undefined;
    }
  }

  private async _onMicToggle(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this._mic.isActive()) {
      this._mic.stop();
      this._micStatus = "idle";
      this._micDevice = "";
      this._micLevel = 0;
      return;
    }
    const result = await this._mic.start((level) => {
      const now = Date.now();
      if (now - this._lastMicLevelAt < 100) {
        return;
      }
      this._lastMicLevelAt = now;
      const quantized = Math.round(level * 20) / 20;
      if (quantized !== this._micLevel) {
        this._micLevel = quantized;
      }
    });
    this._micStatus = result.status;
    this._micDevice = result.deviceLabel ?? "";
    if (result.status !== "listening") {
      this._micLevel = 0;
    }
  }

  private _micStatusText(locale: string): string {
    switch (this._micStatus) {
      case "listening":
        return this._micDevice
          ? `${t(locale, "mic_listening")} · ${this._micDevice}`
          : t(locale, "mic_listening");
      case "denied":
        return t(locale, "mic_denied");
      case "unsupported":
        return t(locale, "mic_unsupported");
      case "error":
        return t(locale, "mic_error");
      default:
        return "";
    }
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
      this._pushError(
        t(this.hass?.locale?.language, "weather_missing", { id: entityId }),
      );
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
      this._pushError(
        t(this.hass?.locale?.language, "entity_missing", { id: entityId }),
      );
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
    // Unlock WebKit audio during the tap — before awaiting TTS generate.
    unlockAudioForGesture();
    this._speaking = true;
    try {
      await speakSummary({
        hass: this.hass,
        text: stripBriefMarkdown(this._summary),
        // Engine locale catalog; spoken language comes from the text.
        language: "en",
        ttsEntity: this._config.tts_entity,
        mediaPlayer: this._config.tts_media_player,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
              error &&
              "message" in error &&
              typeof (error as { message: unknown }).message === "string"
            ? (error as { message: string }).message
            : "TTS failed";
      this._pushError(`TTS: ${message}`);
    } finally {
      this._speaking = false;
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
      errors.push(
        t(this.hass.locale?.language, "weather_missing", {
          id: this._config.weather_entity,
        }),
      );
    }

    for (const entityId of this._config.entities ?? []) {
      if (!this.hass.states[entityId]) {
        errors.push(
          t(this.hass.locale?.language, "entity_missing", { id: entityId }),
        );
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
              <p class="eyebrow">${t(locale, "today")}</p>
              <h2 class="title">${this._dayTitle()}</h2>
              <p class="clock" aria-live="polite">${this._clockLabel()}</p>
            </div>
            <div class="header-actions">
              <button
                class="icon-btn"
                type="button"
                title=${t(locale, "refresh")}
                aria-label=${t(locale, "refresh")}
                ?disabled=${this._refreshing}
                @click=${this._onManualRefresh}
              >
                <span class=${this._refreshing ? "spin" : ""}>↻</span>
              </button>
              <button
                class="icon-btn ${this._speaking ? "active" : ""}"
                type="button"
                title=${t(locale, "speak")}
                aria-label=${t(locale, "speak")}
                ?disabled=${!this._summary || this._summarySource === "loading"}
                @click=${this._onSpeak}
              >
                ♪
              </button>
            </div>
          </div>
        </div>

        <div
          class="brief ${this._summarySource === "loading" || this._refreshing
            ? "loading"
            : ""}"
        >
          ${this._summarySource === "loading" && !this._summary
            ? t(locale, "preparing")
            : renderBriefMarkdown(this._summary)}
        </div>

        <div class="split">
          <section class="panel">
            <h3 class="section-title">${t(locale, "weather")}</h3>
            ${weather
              ? html`
                  <div class="weather-hero">
                    <div>
                      <p class="condition">
                        ${weatherConditionLabel(weather.condition, locale)}
                      </p>
                      <p class="weather-place">
                        ${weather.friendly_name ?? weather.entity_id}
                      </p>
                    </div>
                    <p class="temp">
                      ${formatTemperature(
                        weather.temperature,
                        weather.temperature_unit,
                      )}
                    </p>
                  </div>
                  ${typeof weather.humidity === "number" ||
                  typeof weather.wind_speed === "number"
                    ? html`
                        <div class="chips">
                          ${typeof weather.humidity === "number"
                            ? html`<span class="chip"
                                >${weather.humidity}%
                                ${t(locale, "humidity")}</span
                              >`
                            : nothing}
                          ${typeof weather.wind_speed === "number"
                            ? html`<span class="chip"
                                >${weather.wind_speed}
                                ${weather.wind_speed_unit ?? ""}</span
                              >`
                            : nothing}
                        </div>
                      `
                    : nothing}
                  ${this._forecast.length
                    ? html`
                        <div class="forecast">
                          ${this._forecast.map(
                            (entry) => html`
                              <div class="forecast-item">
                                <span class="forecast-day"
                                  >${this._forecastLabel(entry)}</span
                                >
                                <span class="forecast-temp"
                                  >${formatTemperature(
                                    entry.temperature,
                                    weather.temperature_unit,
                                  )}</span
                                >
                                <span class="forecast-cond"
                                  >${weatherConditionLabel(
                                    entry.condition ?? "",
                                    locale,
                                  )}</span
                                >
                              </div>
                            `,
                          )}
                        </div>
                      `
                    : nothing}
                `
              : html`<p class="empty">${t(locale, "configure_weather")}</p>`}
          </section>

          <section class="panel">
            <h3 class="section-title">${t(locale, "calendar")}</h3>
            ${this._loadingEvents && this._events.length === 0
              ? html`<p class="empty loading">${t(locale, "loading_calendars")}</p>`
              : this._events.length === 0
                ? html`<p class="empty">
                    ${t(locale, "no_events", {
                      hours: this._config.horizon_hours ?? DEFAULT_HORIZON,
                    })}
                  </p>`
                : html`
                    <ul class="events">
                      ${groupEventsByDay(
                        this._events,
                        locale,
                        timeZone,
                        new Date(),
                      ).map(
                        (group) => html`
                          <li class="event-day" aria-label=${group.label}>
                            <p class="event-day-label">${group.label}</p>
                            <ul class="event-day-list">
                              ${group.events.map(
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
                                      <p class="event-title">
                                        ${event.summary}
                                      </p>
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
                          </li>
                        `,
                      )}
                    </ul>
                  `}
          </section>
        </div>

        ${(this._config.cameras ?? []).length
          ? html`
              <section class="cameras">
                <h3 class="section-title">${t(locale, "cameras")}</h3>
                <div class="camera-grid">
                  ${(this._config.cameras ?? []).map((entityId) => {
                    const mode = this._cameraMode[entityId] ?? "stream";
                    const offline = this._cameraOffline[entityId] === true;
                    const state = this.hass?.states[entityId];
                    const src =
                      mode === "still"
                        ? this._cameraStillSrc(entityId)
                        : this._cameraStreamSrc(entityId);
                    return html`
                      <button
                        class="camera-tile"
                        type="button"
                        @click=${() => this._openMoreInfo(entityId)}
                      >
                        ${src
                          ? html`
                              <img
                                class="camera-feed"
                                src=${src}
                                alt=${this._cameraName(entityId)}
                                @error=${() => this._onCameraError(entityId)}
                                @load=${() => this._onCameraLoad(entityId)}
                              />
                              ${offline
                                ? html`<div class="camera-offline">
                                    ${t(locale, "no_feed")}${state?.state
                                      ? ` · ${state.state}`
                                      : ""}
                                  </div>`
                                : nothing}
                              <span class="camera-badge"
                                >${mode === "still"
                                  ? t(locale, "camera_snapshot")
                                  : t(locale, "camera_live")}</span
                              >
                            `
                          : html`<div class="camera-missing">
                              ${t(locale, "no_feed")}${state?.state
                                ? ` · ${state.state}`
                                : ""}
                            </div>`}
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

        ${this._config.mic_test
          ? html`
              <section class="panel mic-panel">
                <h3 class="section-title">${t(locale, "mic_test")}</h3>
                <div class="mic-row">
                  <button class="mic-btn" type="button" @click=${this._onMicToggle}>
                    ${this._micStatus === "listening"
                      ? t(locale, "mic_stop")
                      : t(locale, "mic_start")}
                  </button>
                  <div
                    class="mic-level"
                    role="meter"
                    aria-label=${t(locale, "mic_test")}
                  >
                    <div
                      class="mic-level-fill"
                      style=${`width: ${Math.round(this._micLevel * 100)}%`}
                    ></div>
                  </div>
                </div>
                ${this._micStatus !== "idle"
                  ? html`<p class="mic-status ${this._micStatus}">
                      ${this._micStatusText(locale)}
                    </p>`
                  : nothing}
                <p class="mic-hint">${t(locale, "mic_hint")}</p>
              </section>
            `
          : nothing}

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
                  <span class="section-title">${t(locale, "context")}</span>
                  <span class="context-meta"
                    >${this._entities.length}
                    ${this._entities.length === 1
                      ? t(locale, "entity")
                      : t(locale, "entities")}</span
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
                  <span
                    >${this._keepAwakeOn
                      ? t(locale, "keep_awake_on")
                      : t(locale, "keep_awake")}</span
                  >
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
