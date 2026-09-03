# Project TODO

- [x] Inspect the supplied frontend archive and map screens, forms, actions, and widgets to backend procedures.
- [x] Preserve the supplied frontend UI and import it into the initialized project without redesigning it.
- [x] Add authentication-aware farmer profiles with ownership checks.
- [x] Add persisted farms, fields, crops, advisory history, alerts, nudges, and dashboard data models.
- [ ] Add typed validation and database query helpers for all domain models.
- [x] Add Google Gemini server-side adapter for multilingual agricultural Q&A and context-aware crop guidance.
- [x] Add crop-photo disease assessment endpoint with structured findings, next actions, urgency, and disclaimer.
- [ ] Add advisory endpoints combining farm context with weather and public agricultural-data adapters.
- [x] Add field/location and satellite-insight contracts with graceful fallback when providers are unavailable.
- [ ] Add persisted alert and nudge workflows with read state and configurable priority.
- [x] Add demo seed data and repeatable local setup instructions.
- [x] Add environment-variable documentation and API documentation.
- [ ] Add and run automated tests for authentication, ownership, validation, AI fallback, and critical procedures.
- [ ] Verify frontend-to-backend flows in the browser without changing the supplied UI.
- [ ] Save final project checkpoint and deliver the backend-integrated project.

- [x] Add a persisted crops table and clarify dashboard persistence versus computed summaries.
- [ ] Refactor domain database access into reusable server/db.ts query helpers.
- [x] Implement farm-context composition and explicit weather/public-data adapter modules with graceful unavailable-source responses.
- [ ] Complete alert creation and nudge lifecycle/read-state behavior.
- [x] Add endpoint-level tests for ownership enforcement, validation failures, advisory, and crop assessment flows.
- [ ] Exercise the interactive frontend button against the backend in the browser.
- [ ] Save a final checkpoint after resolving the remaining gaps.
