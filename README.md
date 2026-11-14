# Day Brief Card

AI-first Home Assistant Lovelace card for today: weather, meetings from your calendars, extra entities, and a short narrative brief.

![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.4%2B-blue.svg)

## Install (HACS)

1. HACS → **Frontend** → ⋮ → **Custom repositories**
2. Add `https://github.com/jenskock/lovelace-day-brief` as category **Lovelace**
3. Install **Day Brief Card**
4. Reload the browser (clear cache if needed)

Manual resource (YAML mode):

```yaml
resources:
  - url: /hacsfiles/lovelace-day-brief/day-brief.js
    type: module
```

## Usage

```yaml
type: custom:day-brief-card
weather_entity: weather.zuhause
calendars:
  - calendar.kalender
  - calendar.jenny
entities:
  - person.jens_2
  - person.jenny
  - sensor.abfallrestmuell
forecast_type: daily
horizon_hours: 24
agent_id: conversation.openai
summary_mode: auto
summary_prompt: |
  Schreibe auf Deutsch 1–3 kurze Sätze für ein Home-Dashboard.
  Nur zusammenfassen. Keine Geräte steuern, keine Rückfragen.
cache_minutes: 30
title: Day Brief
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `weather_entity` | string | — | Weather entity for current conditions |
| `calendars` | string[] | `[]` | Calendar entities to merge for today’s agenda |
| `entities` | string[] | `[]` | Any extra HA entities to include in the brief + Context section |
| `forecast_type` | `daily` \| `hourly` \| `twice_daily` \| `none` | `daily` | Forecast subscription type |
| `horizon_hours` | number | `24` | How far ahead to fetch calendar events |
| `agent_id` | string | — | Conversation agent for the AI brief |
| `summary_mode` | `auto` \| `ai` \| `local` | `auto` | `auto` uses AI when available, else local text |
| `summary_prompt` | string | built-in default | System/instruction prompt; weather, agenda, entities are appended |
| `cache_minutes` | number | `30` | Cache AI responses for identical digests |
| `title` | string | — | Optional card title override |

Tap the **↻** button on the card to force a refresh (clears cache and re-runs the brief).

## How it works

- **Weather** reads the entity state and (optionally) subscribes to `weather/subscribe_forecast`.
- **Meetings** call `calendar.get_events` for every configured calendar, then merge and sort.
- **Entities** snapshot any configured states into the prompt and a Context list.
- **Brief** uses your `summary_prompt` (or the default), digests weather + events + entities, and in `auto`/`ai` mode calls `conversation/process`. If AI is unavailable or fails, a local template summary is shown.

No API keys live in the card — AI goes through Home Assistant’s conversation agent only.

## Sample dashboard view

```yaml
title: Heute
path: heute
type: panel
cards:
  - type: custom:day-brief-card
    weather_entity: weather.zuhause
    calendars:
      - calendar.kalender
      - calendar.jenny
      - calendar.geburtstage
      - calendar.mullmax_2
    entities:
      - person.jens_2
      - person.jenny
    forecast_type: daily
    summary_mode: auto
```

## Development

```bash
npm install
npm run build
```

Output: `dist/day-brief.js`

## License

MIT
