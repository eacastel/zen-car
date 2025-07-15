# Analytics & Conversion Tracking Documentation

This file documents the current analytics, advertising, and event tracking implementation for Zen Car Buying, including Google Ads, GA4, Meta (Facebook) Pixel + CAPI, and Calendly integration.

---

## ✅ Google Tag Manager (GTM)

### Tags:

* **Google Tag – GA4 (with traffic\_type)** – Fires on all pages
* **Google Ads – Purchase Success** – Fires on `/success` after Stripe payment
* **Google Ads – Calendly Booked** – Fires on `calendly.event_scheduled`
* **GA4 Event – Purchase Success (checkout\_success)**
* **GA4 Event – Calendly Booked (calendly\_booked)**
* **Microsoft Clarity** – Custom HTML tag

### Variables:

* `DL - value` → `value` from DataLayer (purchase amount)
* `DL - currency` → `currency` from DataLayer (e.g. USD)
* `DL - transaction_id` → Stripe payment intent ID
* `DL - calendly_url` → URL passed from Calendly event

---

## ✅ Meta (Facebook) Conversions API (CAPI)

**Server-side Netlify function:** `/.netlify/functions/meta-capi`

### Fired on:

* **checkout\_success** (Stripe success page)
* **calendly\_booked** (Calendly booking via GTM)

### Tracked fields:

* Event Name: `Purchase` or `Lead`
* Event ID: `stripe_${intentId}` or `calendly_${timestamp}`
* Email, first name, last name → Hashed via SHA256

### Notes:

* Uses `TEST98035` for test events
* Production traffic sends hashed `em`, `fn`, `ln`

---

## ✅ Calendly Integration

### Triggered by:

* `message` event `calendly.event_scheduled` in browser

### Data pushed to DataLayer:

```js
window.dataLayer.push({
  event: "calendly_booked",
  calendly_url: event.data.payload.event.uri,
});
```

### Tracked by:

* GA4 Event: `calendly_booked`
* Google Ads Conversion: `Google Ads - Calendly Booked`
* Meta CAPI: `Lead`

---

## ✅ Google Analytics 4 (GA4)

### Custom Events:

* `checkout_success` (parameters: value, currency, transaction\_id)
* `calendly_booked` (parameters: calendly\_url)

### Debugging:

* Use GA4 DebugView (in GA4 Admin)
* Use GTM Preview mode to confirm event parameter passing

### Marked as Conversions:

* [ ] checkout\_success
* [ ] calendly\_booked

*(Mark manually in GA4 → Admin → Events or Conversions)*

---

## 🔧 Testing Scripts

### Fire `checkout_success` manually (console):

```js
window.dataLayer.push({
  event: "checkout_success",
  value: 100,
  currency: "USD",
  transaction_id: "test_intent_123"
});
```

### Fire `calendly_booked` manually (console):

```js
window.dataLayer.push({
  event: "calendly_booked",
  calendly_url: "https://calendly.com/zen-booking/test-session"
});
```

---

## TODO / Improvements

* [ ] Create a standalone public-facing docs page
* [ ] Include screenshots of GTM tag setups
* [ ] Confirm all custom GA4 events are marked as conversions
