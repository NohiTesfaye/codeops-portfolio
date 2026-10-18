# Mesob House — Component and Security Boundaries

## App Router boundary

- app/layout.jsx owns the document shell and metadata.
- app/page.jsx owns the homepage route.
- Each app/*/page.jsx file owns its URL.
- React Router must not control routing after migration.
- app/error.jsx is a Client Component for route-level error recovery.
- app/not-found.jsx handles missing routes and dishes.

## Server and client boundaries

- Server Components load data that does not require browser state.
- Client Components own event handlers, interactive controls, and Zustand hooks.
- Browser-only APIs must stay inside Client Components.
- Reuse the existing src/components and src/store modules where appropriate.
- Use Next.js Link and navigation APIs instead of React Router navigation hooks.

## API boundary

- src/api.js provides the backend integration.
- Handle unsuccessful HTTP responses explicitly.
- Show a useful fallback when the backend is unavailable.
- Do not expose server secrets through NEXT_PUBLIC variables.

## State boundary

- The existing Zustand cart store represents client-side basket state.
- The existing auth store represents prototype/mock authentication.
- Mock client-side authentication does not provide server-side authorization.
- The current checkout must not claim to process real payments unless a real
  payment provider and trusted server-side integration exist.

## Verification

- Validate every route against STRATEGY.md.
- Verify missing-dish responses and API failure behavior.
- Test invalid input and browser-console tampering where applicable.
- Test the application with JavaScript disabled.
- Document any limitations honestly.
