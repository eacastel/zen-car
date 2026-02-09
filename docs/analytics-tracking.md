# Analytics & Conversion Tracking Documentation

This file documents the current analytics, advertising and event tracking implementation for Zen Car Buying, including Google Ads, GA4, Meta (Facebook) Pixel + CAPI and Calendly integration.

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

## ✅ CTA Click Tracking (DataLayer)

CTA clicks on the homepage and new-landing CTAs push a dedicated `cta_click` event so GTM can route to Ads/GA4/Meta as needed.

### Event payload:

```js
window.dataLayer.push({
  event: "cta_click",
  label: "hero_book_consultation", // CTA identifier
  location: "hero",                // component/section
  destination: "/vip-consultation/vip/",
  page_location: window.location.href
});
```

### Current labels (homepage + new landing):

* `hero_explore_services`
* `hero_book_consultation`
* `inline_inset_primary`
* `inline_split_left`
* `inline_split_right`
* `cta_band_primary`
* `cta_band_secondary`
* `final_cta_book_call`
* `micro_inline_primary`
* `micro_inline_secondary`
* `final_band_primary`
* `final_band_secondary`
* `decision_split_left`
* `decision_split_right`

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

---

## ✅ GTM Export Summary (Version 19)

**Export time:** 2026-02-09 11:23:48  
**Container:** `GTM-W2LQ7S42`  
**Workspace version:** `19` (name: "Removed CallRail")

### Tags (current)

* Google Tag – GA4 (with traffic_type)
* Google Tag AW-17034476300
* Google Ads – Purchase Success
* Google Ads – Calendly Booked
* GA4 Event – Purchase Success (checkout_success)
* GA4 Event – Calendly Booked (calendly_booked)
* GA4 – Purchase Event (purchase)
* GA4 – Exit Intent Call Click
* GA4 – Click to Call
* GA4 – Click to Text
* GA4 – share_click
* GA4 – share_copy
* Google Ads – Click to Call
* Google Ads – Click to Text
* Conversion Linker
* Microsoft Clarity
* LinkedIn Insight
* LinkedIn – Purchase (Checkout Success)
* LinkedIn – Lead (Calendly Booked)
* UTM – Last Touch Storage
* Store UTMs in Session Storage

### Triggers (current)

* Custom Event: `checkout_success`
* Custom Event: `calendly_booked`
* Custom Event: `enhanced_conversion_data`
* Custom Event: `exit_intent_call_click`
* Custom Event: `share_click`
* Custom Event: `share_copy`
* Link Click: `tel:` links
* Link Click: `sms:` links

### Variables (current)

* Data Layer: `value`, `currency`, `transaction_id`, `calendly_url`
* Data Layer: `page_title`, `page_path`, `copy_url`, `platform`
* Data Layer: `items`, `customer_email`
* Built-ins: Page URL, Page Hostname, Page Path, Referrer, Event, Click URL, Click Text
* UTM Query: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`
* Last-touch UTM: `utm_source_last`, `utm_medium_last`, `utm_campaign_last`

### Missing (needs to be added)

* Triggers for `cta_click` and `cta_contact_click`
* GA4 event tag(s) to forward those events + parameters
