# Mesob House — Capstone Plan

Written from a read of the code (`app/`, `src/`, `package.json`). Anything marked
**UNVERIFIED** has not been tested on the live Netlify URL yet.

## Where the app stands today

| Area | State |
|---|---|
| Menu, Specials, Dish detail, Cart | Working. Data comes from an external API (`addis-eats-backend.onrender.com`). Error, empty and not-found states exist. |
| Login | One demo user from env vars (`MESOB_DEMO_EMAIL`, `MESOB_DEMO_PASSWORD_HASH`). Passwords hashed with scrypt, session is an HMAC-signed cookie (httpOnly, sameSite=lax, secure in production). |
| Logout / who-am-I | Working (`/api/auth/logout`, `/api/auth/me`). Only the Account screen uses them. |
| Registration | **Missing.** "Sign up" is a placeholder. |
| Route protection | **Missing.** No middleware/proxy file. `/checkout` and `/cart` open without login; `/account` only redirects client-side. |
| Orders | **Missing.** Checkout clears the cart and shows "confirmed"; nothing is stored. |
| Login rate limiting | **Missing.** Unlimited password guesses. |
| Fonts | Fraunces and Work Sans are named in CSS but never loaded, so users see fallback fonts. |
| Leftovers | `react-router-dom`, `vite`, `@vitejs/plugin-react`, `"preview": "vite preview"`, `src/App.jsx`, `src/main.jsx`, `src/store/useAuthStore.js` (all Vite-era, unused by Next). |
| Docs / config | No README, `.env.example`, `.gitignore` or `netlify.toml` in the zip. |

## Triage

### MUST (the deliverable fails without these)
1. **Decide where users and orders live** (see open question below), then create the tables: `users`, `orders`, `order_items`.
2. **Registration + login against stored users** (replace the single env-var user). Keep scrypt and the signed cookie; store `user_id` in the session, not just email.
3. **Protect routes server-side**: `/checkout`, `/account`, `/orders`, `/orders/[id]` redirect to `/login` without a valid session; protected API routes return 401.
4. **Complete the main flow end to end on the live URL**: browse → add to cart → log in → checkout → order saved → order confirmation page → order appears in history.
5. **Order history + `/orders/[id]`** that only the owner can open (404 for anyone else, not 403, so ids can't be probed).
6. **Every state written**: loading, empty (new account with zero orders), error, not-found, offline/slow backend, form validation, disabled/sending.
7. **Verification evidence for AUTH.md**: three failed attacks + one changed-id attempt, each with what was sent and what came back (see protocol below).
8. **Deploy config**: env vars set in Netlify, production build passes, live URL smoke-tested.
9. **Docs**: AUTH.md, DATA.md, PERF.md, README (followable from a clean clone).

### SHOULD (do after the Musts, in this order)
1. Login rate limiting / lockout, so attack #3 is actually stopped, not just failed.
2. Load Fraunces + Work Sans with `next/font` (removes the font gap, helps Lighthouse).
3. Timeout + friendly fallback when the menu API is slow (free-tier hosts cold-start); consider short caching for the menu.
4. Keyboard pass: tab order, visible focus, labels on every control, Esc/Enter behaviour.
5. Real-phone pass (touch targets, bottom-nav safe area, keyboard covering inputs).
6. Delete Vite leftovers and unused dependencies; add `.gitignore` and `.env.example`.

### COULD → moved to FUTURE.md
Cut. Do not start these before every Must is done.

## Build order
1. Data layer + migrations → 2. Register/login on stored users → 3. Route protection → 4. Save orders → 5. Order history + owner-only detail → 6. States sweep with a brand-new account → 7. Deploy and run the live checks → 8. Lighthouse / keyboard / phone, record numbers → 9. Write docs → 10. Rehearse 8 minutes aloud.

## Verification protocol (fill in results as you go)

Run each against the **live URL**, not localhost.

| # | Attack | How | Expected | Actual |
|---|---|---|---|---|
| 1 | Forged session | Edit the cookie payload (change user id/email), keep old signature | 401 / treated as logged out | _fill in_ |
| 2 | No / expired session | Call a protected API and open `/checkout` with no cookie, then with an expired one | 401 / redirect to `/login` | _fill in_ |
| 3 | Password guessing | Send many wrong passwords for one account | Generic error every time, then throttled | _fill in_ |
| 4 | Changed id in private URL | Logged in as user B, open `/orders/<A's id>` | 404, no data leaked | _fill in_ |

## Performance evidence (PERF.md inputs)
Record, from the live URL: Lighthouse (mobile) Performance / Accessibility / Best Practices / SEO, LCP, CLS, TBT; the same pages on a real phone over mobile data; and the cold-start delay of the menu API. **Do not write numbers you did not measure.**

## Open questions
- Is `addis-eats-backend.onrender.com` yours? If yes, users and orders can live there; if not, add a Postgres database to this Next app.
- Which database host will you use for the live app (it must be reachable from Netlify; local files won't persist)?
