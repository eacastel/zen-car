# Car Broker Landing Page Strategy

Date: March 20, 2026

## Current State

`/car-broker/` and `/used-car-broker/` still exist as Gatsby pages in:

1. `src/pages/car-broker.js`
2. `src/pages/used-car-broker.js`

But production traffic does not reach them because Netlify redirects intercept first:

1. `netlify.toml`
2. `_redirects`

Both routes currently return `302` to `/`.

## Recommendation

Yes, we should separate paid traffic from the homepage.

That is the stronger setup here because:

1. Ad intent is narrower than homepage intent.
2. We can align headline, proof, CTA copy, schema, and tracking to the campaign.
3. We avoid diluting ad relevance by dropping paid users onto a broader homepage.
4. We can measure lead quality by landing page rather than mixing everything into `/`.

## Strategic Direction

Treat these as **campaign landing pages**, not secondary copies of the homepage.

### Shared system

They should reuse the new homepage design system:

1. same visual language
2. same section spacing and component quality
3. same CTA plumbing
4. same tracking conventions

### Different messaging

They should change:

1. hero headline/subheadline
2. proof/order of sections
3. FAQ content
4. benefit framing
5. CTA labels and tracking labels

Homepage should remain broad. These pages should be intent-specific.

## Page Roles

### `/car-broker/`

Use for broader search/social/ad intent around:

1. car broker
2. nationwide car broker
3. broker help buying a car
4. luxury + new + lightly used mix

Messaging focus:

1. dealer avoidance
2. nationwide sourcing
3. negotiation support
4. simple flat-fee process

### `/used-car-broker/`

Use for used-car-specific campaigns.

Messaging focus:

1. lightly used vehicles
2. value retention / avoiding depreciation
3. inspection / vetting / reliability
4. finding the right used inventory nationwide

This page should not feel like a find-replace version of `/car-broker/`.

## Content Architecture

Recommended structure for both pages:

1. Variant hero
2. Social proof row
3. Intent-specific benefit cards
4. Short CTA band
5. Process section
6. Testimonials
7. FAQ specific to page intent
8. Final CTA

Recommended reuse:

1. `new-landing-2026/Hero` as a base pattern, but create variant components or props
2. CTA components from `new-landing-2026`
3. shared footer/header/layout
4. shared Calendly and purchase flow

Recommended new work:

1. `CarBrokerHeroVariant`
2. `UsedCarBrokerHeroVariant`
3. page-specific benefit/FAQ data sources

## Tracking Plan

Each page should have its own CTA labels and page-specific UTM interpretation.

Examples:

1. `hero_book_consultation_car_broker`
2. `hero_book_consultation_used_car_broker`
3. `final_cta_book_call_car_broker`
4. `final_cta_book_call_used_car_broker`

At minimum, track:

1. `page_location`
2. page variant
3. CTA location
4. destination
5. campaign UTM values

## SEO / Indexing Guidance

We should decide whether these are:

1. paid-traffic-only landing pages
2. ad pages that are also organic entry pages

### If paid-only

Recommended:

1. keep them live
2. use `noindex`
3. remove sitemap priority
4. keep ad-specific copy

### If also organic

Recommended:

1. index them
2. remove redirects
3. give each page a clearly distinct title, H1, schema, and FAQ
4. avoid near-duplicate content with homepage

My recommendation:

Start with **indexable but distinct** if we are confident we can make the copy materially different. Otherwise launch them as `noindex` first, then revisit after content matures.

## Rollout Plan

### Phase 1

1. Remove Netlify redirects for `/car-broker/` and `/used-car-broker/`
2. Keep existing pages reachable again
3. Replace old layouts with new landing-2026-based variants

### Phase 2

1. Build shared landing framework for variant pages
2. Split data/content by page intent
3. Add variant-specific CTA tracking labels

### Phase 3

1. Update ad destinations to point directly to each matching page
2. Add page-specific GA4/GTM reporting segments
3. Review lead quality by route

## Technical Recommendation

Best implementation path:

1. keep page routes as `src/pages/car-broker.js` and `src/pages/used-car-broker.js`
2. migrate both to the new landing-2026 component system
3. extract shared landing sections into configurable components
4. drive variant text/content from page-local config objects

That gives us consistency without duplicating too much markup.

## What I Recommend We Do Next

1. Remove the redirects only when the new variants are ready to publish.
2. Rebuild both pages using the homepage component language, not the old legacy layouts.
3. Keep homepage as general-brand traffic destination.
4. Send ads to the dedicated landing page that matches the ad promise.

## Decision

My recommendation is:

Build both as real landing pages, aligned visually with the new homepage, but with distinct messaging and tracking. Use them for ads instead of `/`. That is the cleaner and more measurable setup.
