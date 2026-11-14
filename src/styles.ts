import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    --day-brief-pad: 20px;
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
    margin-bottom: 16px;
  }

  .header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .eyebrow {
    margin: 0;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  .title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
  }

  .clock {
    margin: 6px 0 0;
    font-size: 2.4rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .refresh-btn {
    flex: 0 0 auto;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    color: var(--primary-text-color);
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
  }

  .refresh-btn:hover {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
  }

  .refresh-btn:disabled {
    opacity: 0.5;
    cursor: default;
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
    margin: 0 0 20px;
    font-size: 1.05rem;
    line-height: 1.45;
    color: var(--primary-text-color);
  }

  .brief[data-source="ai"]::before {
    content: "";
  }

  .meta {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 16px;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary-color, #03a9f4);
  }

  .dot.local {
    background: var(--disabled-text-color, #9e9e9e);
  }

  .sections {
    display: grid;
    gap: 18px;
  }

  .section-title {
    margin: 0 0 8px;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  .weather-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  .condition {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 500;
    text-transform: capitalize;
    color: var(--primary-text-color);
  }

  .temp {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .weather-meta {
    margin: 6px 0 0;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .forecast {
    display: flex;
    gap: 10px;
    margin-top: 12px;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .forecast-item {
    min-width: 64px;
    padding: 8px 10px;
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 6%,
      transparent
    );
  }

  .forecast-day,
  .forecast-cond {
    display: block;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    text-transform: capitalize;
  }

  .forecast-temp {
    display: block;
    margin-top: 4px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  .event {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 10px;
    align-items: start;
  }

  .event-time {
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
  }

  .event-body {
    min-width: 0;
  }

  .event-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .event-cal {
    margin: 2px 0 0;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
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
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  .context-chevron {
    font-size: 0.75rem;
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
    font-size: 0.9rem;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-state {
    flex: 0 0 auto;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    text-align: right;
  }

  .empty,
  .error-chip {
    margin: 0;
    font-size: 0.9rem;
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
