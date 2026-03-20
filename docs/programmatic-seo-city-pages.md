# Programmatic City Landing Pages

This document is the current source of truth for the Zen Car Buying service-page and city-page SEO system.

It covers:

- architecture
- routing
- tracking
- content model
- hero rules
- local context rules
- market insight rules
- copy style guardrails
- launch and scaling workflow

## Scope

This implementation powers:

- `/car-broker/`
- `/used-car-broker/`
- `/car-broker/[city-state]/`
- `/used-car-broker/[city-state]/`
- `/car-broker/service-areas/`

These pages are intended to do two jobs at once:

- convert paid and high-intent traffic
- build scalable, non-thin local SEO coverage

The service pages are broad offer pages.
The city pages are localized supporting pages with tighter market context.

## Architecture

- City data source: `src/data/cities/*.json`
- Gatsby JSON sourcing:
  - `gatsby-source-filesystem` named `cities`
  - `gatsby-transformer-json`
- Programmatic page creation: `gatsby-node.js`
- Shared city template: `src/templates/city-landing.js`
- Shared service page component: `src/components/landing/ServiceLandingPage.js`
- Shared landing components: `src/components/landing/*`
- Shared page, SEO, routing and content helpers: `src/utils/landingPages.js`

## URL Structure

- Service pages:
  - `/car-broker/`
  - `/used-car-broker/`
- City pages:
  - `/car-broker/[city-state]/`
  - `/used-car-broker/[city-state]/`

Examples:

- `/car-broker/los-angeles-ca/`
- `/used-car-broker/seattle-wa/`

## Tracking

City pages push:

- `page_context`
- `city_page_view`
- `scroll_depth`

Service pages push:

- `page_context`
- `scroll_depth`

CTA buttons use `ServiceButton` with `trackingPayload` so GTM receives:

- `service`
- `page_type`
- `city`
- `state`

## Booking + UTM Strategy

Primary CTA targets use the protected booking flow:

- `/vip-consultation/vip/?city={{slug}}&service={{serviceType}}`

Pricing CTAs use:

- `/pricing/?city={{slug}}&service={{serviceType}}`

Service types:

- `car_broker`
- `used_car_broker`

## Content Model

Each city file in `src/data/cities/*.json` should include:

- `slug`
- `city`
- `state`
- `stateCode`
- `region`
- `primaryKeyword`
- `primaryKeywordDisplay`
- `secondaryKeywords`
- `longTailKeywords`
- `usedPrimaryKeyword`
- `usedPrimaryKeywordDisplay`
- `usedSecondaryKeywords`
- `usedLongTailKeywords`
- `heroImage`
- `heroBadges`
- `localizedPainPoint`
- `localContextParagraphs`
- `localIntro`
- `supportingParagraphs`
- `marketInsights`
- `neighborhoods`
- `nearbyCities`
- `faq`

Notes:

- `primaryKeyword` is the exact SEO phrase.
- `primaryKeywordDisplay` is the sentence-safe display version for H1 and sentence starts.
- `localContextParagraphs` is now the primary field for the local context section.
- `localIntro` and `supportingParagraphs` can still exist for editing history and fallback, but the current template uses `localContextParagraphs` first.

## Hero System

Every service page and city page should use a two-layer hero:

1. H1
2. subheadline

### H1 Rules

- include the primary keyword exactly once
- keep it short and direct
- do not stack or repeat keywords
- do not use separators like `|`

Good:

- `Car broker in San Francisco`

Bad:

- `Car broker in San Francisco | Car buying concierge in San Francisco`

### Subheadline Rules

- one sentence maximum
- practical and outcome-focused
- explain what Zen Car Buying does for the user
- do not repeat the H1 phrase
- do not stuff keywords

Current implementation:

- city hero subheadlines are generated from `getCityHeroSubheadline()` in `src/utils/landingPages.js`
- service hero subheadlines are defined in `SERVICE_CONFIGS` in `src/utils/landingPages.js`

### Accent Line

Use one short reinforcing sentence only.

Purpose:

- emotional positioning
- trust
- differentiation

Do not repeat the subheadline.

### CTA Support Lines

Every hero should include both lines under the CTA buttons:

1. `We research, negotiate and coordinate delivery. You just choose the car.`
2. a market-aware support line

Examples:

- `Work with a trusted car broker in Seattle to compare, negotiate and secure the right vehicle.`
- `Work with a trusted used car broker in San Francisco to compare, negotiate and secure the right vehicle.`

## Hero Right Panel

Every city page must include exactly 3 hero badges.

These are conversion-focused value statements, not informational SEO blocks.

### Badge Rules

- title: max 8 words
- description: max 20 words
- one idea per badge
- concrete and practical
- no SEO language

Do not use:

- `keyword`
- `search`
- `buyers typing`
- `strategy`

Required mix:

1. pain removal
2. expanded opportunity
3. confidence / clarity

Current implementation:

- city hero badges come from `heroBadges` in each city JSON file
- service hero badges come from `SERVICE_CONFIGS` in `src/utils/landingPages.js`

## Friction-Reduction Block

Right after the hero, each landing page should include a short bridge section:

- heading: `Not sure where to start?`
- one sentence on what a consultation clarifies
- one sentence stating the core offer clearly

Purpose:

- reduce hesitation early
- make the offer concrete
- support conversion before the page gets more detailed

Current implementation:

- city pages: `src/templates/city-landing.js`
- service pages: `src/components/landing/ServiceLandingPage.js`

## Local Context Section

This section should be short, specific and localized.

### Rules

- target 120 to 160 words total
- maximum 2 paragraphs
- maximum 2 sentences per paragraph
- each sentence should introduce a new idea
- avoid repeating the same risk or value statement

### Must Include

1. one real local condition
2. one buyer risk or mistake
3. one clear value statement about how the service helps

### Avoid

- abstract phrasing like `complex market` or `high-friction`
- weak openings like `should do more than`
- generic AI phrasing like:
  - `many buyers`
  - `buyers often`
  - `it is common`

Current implementation:

- rendered from `localContextParagraphs` in `src/templates/city-landing.js`

## Market Insights

This section is one of the main SEO and relevance levers on city pages.

Each city must include exactly 3 insights.

### Structure

Each insight must be:

- `title`
- `description`

### Insight Rules

- title: 2 to 5 words
- description: 1 sentence
- each insight must include:
  - a local factor
  - a buyer consequence
- each insight should feel immediately recognizable to a local buyer

Good direction:

- `AWD is over-selected`
- `EV demand shifts pricing`
- `Convenience costs more`

Avoid:

- generic observations
- neutral filler
- repeating the same pricing point three times

Current implementation:

- stored as structured objects in each city JSON file
- rendered in `src/templates/city-landing.js`

## Keyword Placement Rules

Use keywords deliberately, not mechanically.

### H1

- primary keyword once

### Intro / local context

- primary keyword and secondary support naturally

### H2 Sections

- use secondary keywords where they fit naturally

### FAQ

- long-tail keywords belong here most often

### Hero Badges

- keyword use is optional and should stay minimal

Do not:

- stack keywords in headlines
- repeat the same phrase unnaturally
- force keywords into UI copy

## Copy Style Guardrails

All visible copy should feel:

- direct
- practical
- buyer-focused
- human

Avoid common AI tells:

- `buyers often`
- `many buyers`
- `buyers searching for`
- `it is common`
- `should do more than`

Prefer:

- concrete situations
- buyer mistakes
- price or time consequences
- clear statements of service value

The real offer should stay visible throughout the page:

- we research
- we source inventory
- we negotiate
- we coordinate delivery

Do not assume the reader already understands what a broker does.

## Internal Linking

Each city page should link to:

- `/car-broker/`
- `/used-car-broker/`
- `/pricing/`
- `/car-broker/service-areas/`
- 2 to 3 nearby cities

Service pages should link to:

- top city pages
- the alternate service page
- pricing
- service areas

Footer support:

- footer includes curated links to service hubs and top markets
- keep this curated, not exhaustive

## SEO Safety

To avoid thin or duplicate city pages:

- every city must have unique `heroBadges`
- every city must have unique `localContextParagraphs`
- every city must have unique `marketInsights`
- every city must have unique `faq`

If a page feels like a template with city names swapped in, it is not ready.

## Launch Checklist

1. Confirm no conflicting Netlify redirects remain for `/car-broker/` and `/used-car-broker/`.
2. Confirm all referenced `heroImage` files exist.
3. Validate GTM events in Preview mode:
   - `page_context`
   - `city_page_view`
   - `scroll_depth`
   - `cta_click`
4. Check generated sitemap entries for service and city routes.
5. Verify internal links on homepage, service pages and city pages.
6. Run a production build with Contentful/network access.
7. Spot-check at least 3 city pages on desktop and mobile.
8. Confirm hero badges render exactly 3 items.
9. Confirm local-context sections stay within the intended layout and do not overrun mobile.

## Scaling Workflow

When adding a new city:

1. duplicate the closest market JSON as a starting point
2. rewrite `heroBadges` first
3. write `localContextParagraphs` to the current rules
4. write 3 structured `marketInsights`
5. write unique FAQ entries
6. verify nearby city links
7. QA:
   - hero
   - local context
   - market insights
   - CTA links
   - mobile spacing

## Related Docs

- Landing-page strategy: `docs/car-broker-landing-page-strategy.md`
- Analytics and enhanced conversions: `docs/analytics-tracking.md`
- Calendly hardening and booking flow: `docs/calendly-turnstile-setup.md`
