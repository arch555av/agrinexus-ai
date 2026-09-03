# AgriNexus AI Backend

The supplied frontend remains visually preserved under `client/src/sections`. The backend is registered from `server/agrinexusBackend.ts` and is available under `/api/v1` in the same deployment, so the browser can call it without a separate origin or CORS configuration.

## Implemented contracts

| Area | Routes | Authentication | Provider behavior |
|---|---|---:|---|
| Health and preview | `GET /health`, `GET /demo/:mode` | Public | Demo remains available without credentials |
| Farmer profile | `POST /profiles`, `GET /profiles/me` | Required | Scoped to the authenticated user |
| Farms and fields | `POST /farms`, `GET /farms`, `GET /farms/:farmId`, `POST /fields`, `GET /farms/:farmId/fields` | Required | Ownership enforced on every farm lookup |
| Gemini advisory | `POST /chat`, `POST /advisories` | Required | Uses Google Gemini when configured; returns safe fallback otherwise |
| Crop assessment | `POST /crop/assess` | Required | Accepts image URL or base64 metadata and returns structured findings/disclaimer |
| Farm intelligence | `POST /farms/:farmId/analyze`, `GET /farms/:farmId/satellite` | Required | Explicit satellite, weather, and soil availability fields |
| Alerts and nudges | `GET /alerts`, `POST /alerts/:alertId/read`, `GET /nudges`, `POST /nudges`, `POST /nudges/:nudgeId/complete`, `POST /nudges/:nudgeId/dismiss` | Required | Persisted status/read state and priority |
| Dashboard | `GET /dashboard` | Required | User-scoped summary and privacy framing |

## Environment

`GOOGLE_GEMINI_API_KEY` enables server-side Gemini 2.5 Flash calls. `GOOGLE_MAPS_API_KEY` and `GOOGLE_CLOUD_PROJECT_ID` are reserved for live map, Earth Engine, BigQuery, weather, and public-data adapters. The current implementation intentionally does not fabricate live provider observations when those credentials are absent.

Authentication uses the existing Manus OAuth session cookie or its supported bearer-session fallback. Never send another user's farm ID from the client and expect access: farm, field, advisory, assessment, alert, and nudge routes verify ownership server-side.

## Local verification

Run `pnpm test`, `pnpm check`, and `pnpm build`. The database migration is `drizzle/0001_certain_thunderbolt_ross.sql`; the domain tables are already applied in the project database. For local development, run `pnpm dev` and use `/api/v1/health` to confirm the service is mounted.

## Frontend connection

The preserved `InteractiveDemo` section now calls `GET /api/v1/demo/:mode` through `client/src/lib/agrinexus-api.ts`. Its layout, styling, copy structure, animation, and response panel are unchanged; only the response source moved from a client-side timer to a backend contract. Authenticated screens can consume the remaining routes with the existing session credentials.
