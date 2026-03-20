# Programmatic City Landing Pages

This implementation adds a JSON-driven SEO landing page system for:

- `/car-broker/`
- `/used-car-broker/`
- `/car-broker/[city-state]/`
- `/used-car-broker/[city-state]/`
- `/car-broker/service-areas/`

## Architecture

- City data source: `src/data/cities/*.json`
- Gatsby JSON sourcing:
  - `gatsby-source-filesystem` named `cities`
  - `gatsby-transformer-json`
- Programmatic page creation: `gatsby-node.js`
- Shared city template: `src/templates/city-landing.js`
- Shared landing components: `src/components/landing/*`
- Shared page/SEO helpers: `src/utils/landingPages.js`

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

## Content Rules

Each city JSON should keep these fields unique:

- `localIntro`
- `supportingParagraphs`
- `marketInsights`
- `faq`

Keyword mapping is handled per city for:

- `primaryKeyword`
- `secondaryKeywords`
- `longTailKeywords`
- `usedPrimaryKeyword`
- `usedSecondaryKeywords`
- `usedLongTailKeywords`

## Launch Checklist

1. Remove or confirm no conflicting Netlify redirects remain for `/car-broker/` and `/used-car-broker/`.
2. Add any missing city hero images referenced by `heroImage`.
3. Validate GTM events in Preview mode:
   - `page_context`
   - `city_page_view`
   - `scroll_depth`
   - `cta_click`
4. Check generated sitemap entries for service and city routes.
5. Verify internal links on homepage, service pages and city pages.
6. Run a production build with Contentful/network access.
7. QA ads to ensure traffic lands on service pages first, then city pages where relevant.

## Scaling Notes

- Add new cities by dropping another JSON file into `src/data/cities/`.
- Nearby city clusters are driven by `nearbyCities`.
- The same city template serves both service types using `pageContext.serviceType`.
