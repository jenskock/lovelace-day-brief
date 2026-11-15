import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    --day-brief-pad: 22px;
    padding: var(--day-brief-pad);
    background: linear-gradient(
      165deg,
      var(--ha-card-background, var(--card-background-color, #fff)) 0%,
      color-mix(
          in srgb,
          var(--primary-color, #03a9f4) 8%,
          var(--ha-card-background, var(--card-background-color, #fff))
        )
        100%
    );
    overflow: hidden;
  }

  .header {
    margin-bottom: 14px;
  }

  .header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .header-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .eyebrow {
    margin: 0;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  .title {
    margin: 0;
    font-size: 2rem;
    font-weight: 650;
    line-height: 1.15;
    color: var(--primary-text-color);
  }

  .clock {
    margin: 8px 0 0;
    font-size: 3rem;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .icon-btn {
    flex: 0 0 auto;
    width: 42px;
    height: 42px;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    color: var(--primary-text-color);
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
  }

  .icon-btn:hover {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
  }

  .icon-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .icon-btn.active {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 22%, transparent);
  }

  .spin {
    display: inline-block;
    animation: day-brief-spin 0.8s linear infinite;
  }

  @keyframes day-brief-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .brief {
    margin: 0 0 14px;
    font-size: 1.35rem;
    line-height: 1.45;
    color: var(--primary-text-color);
  }

  .brief strong {
    font-weight: 700;
    color: var(--primary-text-color);
  }

  .split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 14px;
    align-items: stretch;
  }

  @media (max-width: 720px) {
    .split {
      grid-template-columns: 1fr;
    }
  }

  .panel {
    min-width: 0;
    padding: 16px;
    border-radius: 18px;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 1.5%,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    border: 1px solid
      color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    box-shadow: none;
  }

  .section-title {
    margin: 0 0 12px;
    font-size: 0.78rem;
    font-weight: 650;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 25%,
      var(--secondary-text-color)
    );
  }

  .weather-hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
  }

  .condition {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 600;
    line-height: 1.2;
    text-transform: capitalize;
    color: var(--primary-text-color);
  }

  .weather-place {
    margin: 4px 0 0;
    font-size: 0.9rem;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 20%,
      var(--secondary-text-color)
    );
  }

  .temp {
    margin: 0;
    font-size: 3.1rem;
    font-weight: 650;
    letter-spacing: -0.04em;
    line-height: 0.9;
    color: var(--primary-text-color);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }

  .chip {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.82rem;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 25%,
      var(--secondary-text-color)
    );
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }

  .forecast {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(58px, 1fr));
    gap: 8px;
    margin-top: 16px;
  }

  .forecast-item {
    min-width: 0;
    padding: 8px 6px;
    border-radius: 12px;
    text-align: center;
    background: color-mix(in srgb, var(--primary-text-color) 3.5%, transparent);
    border: 1px solid
      color-mix(in srgb, var(--primary-text-color) 3%, transparent);
  }

  .forecast-day,
  .forecast-cond {
    display: block;
    font-size: 0.75rem;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 20%,
      var(--secondary-text-color)
    );
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .forecast-temp {
    display: block;
    margin: 4px 0 2px;
    font-size: 0.95rem;
    font-weight: 650;
    color: var(--primary-text-color);
  }

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 320px;
    overflow: auto;
  }

  .event-day {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .event-day + .event-day {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid
      color-mix(in srgb, var(--primary-text-color) 8%, transparent);
  }

  .event-day-label {
    margin: 0 0 6px;
    font-size: 0.78rem;
    font-weight: 650;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 30%,
      var(--secondary-text-color)
    );
  }

  .event-day-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .event {
    display: grid;
    grid-template-columns: 78px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    padding: 8px 0;
    border-top: 1px solid
      color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }

  .event-day-list .event:first-child {
    padding-top: 0;
    border-top: none;
  }

  .event-time {
    font-size: 1rem;
    font-variant-numeric: tabular-nums;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 25%,
      var(--secondary-text-color)
    );
  }

  .event-body {
    min-width: 0;
  }

  .event-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 550;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .event-cal {
    margin: 3px 0 0;
    font-size: 0.9rem;
    color: color-mix(
      in srgb,
      var(--primary-text-color) 20%,
      var(--secondary-text-color)
    );
  }

  .context-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  .context-toggle .section-title {
    margin: 0;
  }

  .context-meta {
    margin-left: auto;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .context-chevron {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .entity-list {
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }

  .entity-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: baseline;
  }

  .entity-name {
    font-size: 1.05rem;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-state {
    flex: 0 0 auto;
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    text-align: right;
  }

  .cameras,
  .context {
    margin-top: 16px;
  }

  .camera-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  @media (min-width: 900px) {
    .camera-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .camera-tile {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    cursor: pointer;
    aspect-ratio: 16 / 10;
  }

  .camera-feed {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .camera-missing {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .camera-label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px 10px 6px;
    font-size: 0.75rem;
    font-weight: 500;
    color: #fff;
    text-align: left;
    background: linear-gradient(
      transparent,
      color-mix(in srgb, #000 65%, transparent)
    );
  }

  .footer-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 14px;
  }

  .keep-awake {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    padding: 4px 10px;
    border: 1px solid color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    border-radius: 999px;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    cursor: pointer;
    opacity: 0.7;
  }

  .keep-awake:hover {
    opacity: 1;
  }

  .keep-awake.on {
    border-color: color-mix(in srgb, var(--primary-color, #03a9f4) 35%, transparent);
    color: var(--secondary-text-color);
    opacity: 0.55;
  }

  .keep-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--disabled-text-color, #9e9e9e);
  }

  .keep-awake.on .keep-dot {
    background: var(--primary-color, #03a9f4);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
  }

  .empty,
  .error-chip {
    margin: 0;
    font-size: 1rem;
    color: var(--secondary-text-color);
  }

  .errors {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 16px;
  }

  .error-chip {
    padding: 4px 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent);
    color: var(--error-color, #db4437);
    font-size: 0.75rem;
  }

  .loading {
    opacity: 0.7;
  }
`;
