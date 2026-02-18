# Calendly + Turnstile Secure Booking Setup

This documents the booking hardening pattern used in this project so you can replicate it in another project.

## Goal

Only allow real users from your website to generate a Calendly booking link, and reduce automated spam.

## Architecture

1. User clicks any "book" CTA on site.
2. CTA routes to a protected page: `/vip-consultation/vip/`.
3. Protected page runs Cloudflare Turnstile challenge.
4. On successful challenge, frontend calls `/.netlify/functions/get-calendly-link` with Turnstile token.
5. Netlify function verifies:
   - request method
   - origin/referer host allowlist
   - rate limit by client IP
   - Turnstile token validity, expected hostname, expected action
6. Function asks Calendly API for a single-use scheduling link (`max_event_count: 1`).
7. Frontend embeds returned URL inline.

## Required Accounts

1. Calendly (API access enabled).
2. Cloudflare Turnstile.
3. Netlify (Functions + env vars).

## Environment Variables

Set these in Netlify Site settings and your local `.env.*` as needed.

1. `GATSBY_TURNSTILE_SITE_KEY`
2. `TURNSTILE_SECRET_KEY`
3. `CALENDLY_API_TOKEN`
4. `CALENDLY_EVENT_UUID`

## Calendly Setup

1. Create or select the event type you want to use.
2. Get an API token from Calendly and store it as `CALENDLY_API_TOKEN`.
3. Get the event type UUID for that event and store it as `CALENDLY_EVENT_UUID`.
4. Keep your normal public event URL private where possible; generate booking links server-side instead.

## Turnstile Setup

1. Create a Turnstile widget in Cloudflare.
2. Add allowed hostnames:
   - production domain(s), e.g. `zencarbuying.com`, `www.zencarbuying.com`
   - optional preview/dev domains (for this project, `*.netlify.app` is accepted server-side)
   - localhost for local testing
3. Save site key to `GATSBY_TURNSTILE_SITE_KEY`.
4. Save secret key to `TURNSTILE_SECRET_KEY`.
5. Use a fixed action in the widget:
   - frontend uses `action="vip_consultation"`
   - backend enforces this action.

## Frontend Requirements

### 1) Route all booking CTAs through protected page

`src/utils/openCalendly.js` should not open a hardcoded Calendly URL directly.

Current pattern:

```js
export const openCalendlyPopup = async () => {
  if (typeof window === "undefined") return
  window.location.assign("/vip-consultation/vip/")
}
```

### 2) Protected page with Turnstile

In `src/pages/vip-consultation.js`, verify Turnstile and pass token to backend:

```jsx
<Turnstile
  sitekey={SITE_KEY}
  onVerify={handleTurnstileVerify}
  action="vip_consultation"
  theme="light"
  appearance="interaction-only"
/>
```

Then call:

```js
fetch("/.netlify/functions/get-calendly-link", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token }),
})
```

## Netlify Function Hardening

`netlify/functions/get-calendly-link.js` enforces:

1. `POST` only.
2. Origin/referer hostname allowlist.
3. IP-based rate limiting in memory:
   - window: 10 minutes
   - max: 8 requests per IP per window
   - responds `429` + `Retry-After: 600`
4. Turnstile verify API (`siteverify`) with `secret`, `response`, and `remoteip`.
5. Turnstile `hostname` allowlist check.
6. Turnstile `action` check (`vip_consultation`).
7. Calendly single-use link creation via `max_event_count: 1`.

Important: in-memory rate limiting works per warm serverless instance. It is effective for burst reduction but not globally consistent across all instances.

## Validation Checklist

1. Open site and click a booking CTA:
   - should route to `/vip-consultation/vip/`.
2. Complete Turnstile:
   - should load Calendly inline.
3. Attempt direct call to function without proper headers/token:
   - should return `403`.
4. Repeatedly hit function from same IP:
   - should eventually return `429`.
5. Use generated scheduling link twice:
   - second attempt should fail in Calendly because link is single-use.

## Local Testing Notes

1. Start with Netlify dev flow so Functions run locally.
2. Include `localhost` in Turnstile allowed domains.
3. Ensure all four env vars are loaded locally.

## Operational Recommendations

1. Rotate `CALENDLY_API_TOKEN` periodically.
2. Monitor function responses for spikes in `403`/`429`.
3. If spam persists, add one or more:
   - stricter rate limits
   - bot score / WAF rules at CDN edge
   - persistent distributed rate-limit storage (Redis/KV)
   - additional hidden-field or proof-of-work checks.

## Files In This Project

1. `netlify/functions/get-calendly-link.js`
2. `src/pages/vip-consultation.js`
3. `src/utils/openCalendly.js`
