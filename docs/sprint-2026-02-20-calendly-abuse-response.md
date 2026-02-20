# Sprint Notes: Calendly Abuse Response

Date: February 20, 2026

## Objective

Reduce Calendly spam/abuse while preserving a smooth booking flow for real users.

## Problem Summary

1. Client reported recurring spam bookings and conflict/cancellation noise.
2. Legacy public Calendly links and discoverable booking paths increased abuse surface.
3. Turnstile alone was not sufficient against higher-effort abuse.

## What Was Implemented

### 1) Booking flow hardening

1. Standardized CTAs to route through `/vip-consultation/vip/`.
2. Removed legacy `?access=vip` defaults in CTA components.
3. Added one-shot frontend guard to prevent duplicate booking-link requests per page load.

### 2) Server-side abuse controls

1. Kept origin/referer allowlist checks.
2. Enforced rate limiting on booking-link generation.
3. Added nonce-based 2-step server verification:
   - `/.netlify/functions/get-booking-nonce` issues short-lived signed nonce.
   - `/.netlify/functions/get-calendly-link` requires and verifies nonce.
4. Added nonce replay protection (single-use burn on successful link generation).
5. Added strict fallback mode for Turnstile outage/null token:
   - only accepted with `turnstileStatus: "unavailable"`
   - stricter per-IP fallback limits.

### 3) Calendly event routing and UX

1. Kept GTM/analytics event as `calendly_booked`.
2. Updated post-booking UX to return home with `/?appointment=scheduled`.
3. Added homepage confirmation modal (“Appointment Scheduled...”) with auto-dismiss.
4. Removed obsolete standalone `/thank-you/` page.

### 4) Configuration & rotation guidance

1. Rotated to new event type UUID when needed:
   - update `CALENDLY_EVENT_UUID` in Netlify env.
2. Clarified that URL slug changes do not always create a new UUID.
3. Recommended deactivating old Calendly event types once rotated.

## Files Touched (Sprint Scope)

1. `netlify/functions/get-calendly-link.js`
2. `netlify/functions/get-booking-nonce.js`
3. `netlify/functions/_bookingNonce.js`
4. `src/pages/vip-consultation.js`
5. `src/utils/openCalendly.js`
6. `src/pages/index.js`
7. `src/components/ExitIntentPopup.js`
8. `docs/calendly-turnstile-setup.md`

## Environment Variables

1. `CALENDLY_EVENT_UUID` (active event type)
2. `CALENDLY_API_TOKEN`
3. `GATSBY_TURNSTILE_SITE_KEY`
4. `TURNSTILE_SECRET_KEY`
5. `BOOKING_NONCE_SECRET` (recommended dedicated secret)

Generate a secure secret:

```bash
openssl rand -hex 32
```

## Deployment Checklist

1. Set/verify all env vars in Netlify.
2. Confirm `CALENDLY_EVENT_UUID` points to active event type.
3. Disable old public Calendly event types.
4. Deploy and test:
   - normal Turnstile booking path
   - fallback path when Turnstile unavailable
   - `calendly_booked` event in GTM preview
   - homepage scheduled modal behavior.

## Known Limits

1. In-memory rate limits/nonce stores are per warm function instance, not globally shared.
2. Turnstile reduces basic bot traffic but cannot fully block human abuse.
3. For stronger global abuse defense, move counters/nonce replay state to shared storage (Redis/KV).
