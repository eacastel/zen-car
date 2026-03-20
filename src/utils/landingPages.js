import { SOCIAL_SCHEMA_SAME_AS } from "./socialProfiles"

export const SITE_URL = "https://zencarbuying.com"

export const SERVICE_CONFIGS = {
  car_broker: {
    serviceType: "car_broker",
    serviceSlug: "car-broker",
    servicePath: "/car-broker/",
    alternateServicePath: "/used-car-broker/",
    serviceAreasPath: "/car-broker/service-areas/",
    displayName: "Car broker",
    heroEyebrow: "Nationwide car broker service",
    heroTitle:
      "Hire a car broker to buy your next car without the dealership stress",
    heroDescription:
      "Our car broker service handles research, sourcing, negotiation and delivery coordination so you can buy with more clarity and far less friction.",
    heroAccent:
      "Built for drivers who want expert representation instead of dealership pressure.",
    primaryKeyword: "car broker",
    secondaryKeywords: [
      "auto broker service",
      "car buying concierge",
      "car buying service USA",
      "hire someone to buy a car",
      "car negotiation service",
    ],
    longTailKeywords: [
      "car broker near me",
      "professional car buyer service",
      "someone to negotiate car price for me",
      "car broker cost",
      "car broker service price",
    ],
    metaTitle: "Car broker | Nationwide car buying concierge | Zen Car Buying",
    metaDescription:
      "Work with a nationwide car broker who researches inventory, negotiates pricing and coordinates delivery so you can buy with less stress and better market insight.",
    serviceSchemaName: "Nationwide car broker service",
    introHeading: "What a car broker does for you",
    introCards: [
      {
        title: "We represent your side of the deal",
        description:
          "Zen Car Buying acts as your advocate, not the dealer's closer. We help define the right vehicle, compare options and protect your leverage during negotiation.",
      },
      {
        title: "We compress the research",
        description:
          "Instead of bouncing between dealership sites and classified listings, you get a tighter shortlist backed by pricing context, listing validation and market awareness.",
      },
      {
        title: "We keep the transaction calm",
        description:
          "From trade conversations to delivery logistics, our process is built to reduce the noise, wasted time and pressure that usually drags car buying out.",
      },
    ],
    pricingHeading: "Transparent pricing before you commit",
    pricingBody:
      "If you are comparing car broker cost, we keep it straightforward: a flat-fee service structure, clear package options and no dealership-style upsell maze.",
    pricingHighlights: [
      "Packages start at a clear flat fee",
      "Nationwide sourcing and negotiation support",
      "Optional purchase and delivery coordination",
    ],
    faq: [
      {
        question: "What does a car broker cost?",
        answer:
          "Most clients start by reviewing package options on our pricing page, then use a quick consultation to confirm the right level of support. That keeps car broker cost clear before you commit.",
      },
      {
        question: "Can a car broker help if I already found a vehicle?",
        answer:
          "Yes. We can step in to validate pricing, review the listing, advise on negotiation strategy and coordinate the purchase process if you want help buying a specific car without dealer stress.",
      },
      {
        question: "Do you work nationwide?",
        answer:
          "Yes. Our car buying concierge service works with clients across the U.S., including out-of-state purchases where delivery, paperwork and dealership coordination matter.",
      },
    ],
    ctaTitle: "Ready to buy with a calmer strategy?",
    ctaSubtitle:
      "Book a consultation and we will map the best next step for your budget, timeline and target vehicle.",
  },
  used_car_broker: {
    serviceType: "used_car_broker",
    serviceSlug: "used-car-broker",
    servicePath: "/used-car-broker/",
    alternateServicePath: "/car-broker/",
    serviceAreasPath: "/car-broker/service-areas/",
    displayName: "Used car broker",
    heroEyebrow: "Used car buying concierge",
    heroTitle:
      "Work with a used car broker to avoid overpaying, guessing and dealer pressure",
    heroDescription:
      "Our used car broker service helps you narrow the right vehicles, inspect the market, avoid bad listings and negotiate with more confidence before money changes hands.",
    heroAccent:
      "Ideal for buyers who want used-car guidance without wasting weekends chasing questionable inventory.",
    primaryKeyword: "used car broker",
    secondaryKeywords: [
      "used car buying service",
      "help buying a used car",
      "used car concierge service",
      "best way to buy a used car",
      "used car negotiation service",
    ],
    longTailKeywords: [
      "used car broker near me",
      "someone to inspect used car before buying",
      "used car buying help service",
      "avoid used car scams service",
    ],
    metaTitle:
      "Used car broker | Nationwide used car buying service | Zen Car Buying",
    metaDescription:
      "Use a nationwide used car broker to evaluate inventory, reduce risk and negotiate smarter on used vehicles without dealership stress.",
    serviceSchemaName: "Nationwide used car broker service",
    introHeading: "What a used car broker handles differently",
    introCards: [
      {
        title: "We filter risky inventory early",
        description:
          "Used listings can look good until pricing history, condition reports and seller behavior tell a different story. We narrow the field before you waste energy.",
      },
      {
        title: "We compare value, not just price",
        description:
          "The cheapest listing is rarely the best buy. We weigh mileage, options, ownership history and regional pricing so you can evaluate value like a pro.",
      },
      {
        title: "We reduce expensive surprises",
        description:
          "A used car buying service should save you from bad assumptions, weak negotiation and avoidable fees. That is the layer of protection we build into the process.",
      },
    ],
    pricingHeading: "Used car buying help with a clear fee structure",
    pricingBody:
      "If you are researching the best way to buy a used car, pricing should still be transparent. We use flat-fee guidance so you can compare support options without guessing what comes next.",
    pricingHighlights: [
      "Straightforward packages for research and sourcing",
      "Listing review and negotiation guidance",
      "Support designed to reduce used-car risk",
    ],
    faq: [
      {
        question: "Can you help inspect a used car before I buy it?",
        answer:
          "Yes. While we do not replace a mechanical inspection, we help you narrow the right candidate, assess listing quality and decide when a pre-purchase inspection makes sense.",
      },
      {
        question: "How does a used car broker help me avoid scams?",
        answer:
          "We look at pricing logic, listing consistency, ownership clues, dealership behavior and how the vehicle fits the broader market so you are less exposed to common used-car traps.",
      },
      {
        question: "Do you only work with local used cars?",
        answer:
          "No. We often help clients compare local inventory with better out-of-state options when the value or condition justifies shipping or travel.",
      },
    ],
    ctaTitle: "Want help narrowing the right used car?",
    ctaSubtitle:
      "Book a consultation and we will talk through budget, must-haves, red flags and the smartest buying path.",
  },
}

export const DEFAULT_SCROLL_THRESHOLDS = [25, 50, 75, 90]

export const FOOTER_MARKETS = [
  { slug: "los-angeles-ca", city: "Los Angeles", stateCode: "CA" },
  { slug: "san-francisco-ca", city: "San Francisco", stateCode: "CA" },
  { slug: "seattle-wa", city: "Seattle", stateCode: "WA" },
  { slug: "houston-tx", city: "Houston", stateCode: "TX" },
  { slug: "atlanta-ga", city: "Atlanta", stateCode: "GA" },
  { slug: "miami-fl", city: "Miami", stateCode: "FL" },
]

export function capitalizeFirst(text = "") {
  if (!text) return ""
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function appendQuery(path, params = {}) {
  const url = new URL(path, SITE_URL)

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return
    url.searchParams.set(key, String(value))
  })

  return `${url.pathname}${url.search}`
}

export function buildBookingPath({ citySlug, serviceType }) {
  return appendQuery("/vip-consultation/vip/", {
    city: citySlug,
    service: serviceType,
  })
}

export function buildPricingPath({ citySlug, serviceType }) {
  return appendQuery("/pricing/", {
    city: citySlug,
    service: serviceType,
  })
}

export function buildPurchasePath({ citySlug, serviceType }) {
  return appendQuery("/purchase/", {
    city: citySlug,
    service: serviceType,
  })
}

export function buildServicePath(serviceType, citySlug) {
  const config = SERVICE_CONFIGS[serviceType]
  return appendQuery(config.servicePath, {
    city: citySlug,
    service: serviceType,
  })
}

export function getCityPath(slug, serviceType) {
  const config = SERVICE_CONFIGS[serviceType]
  return `/${config.serviceSlug}/${slug}/`
}

export function getCityKeywordSet(cityData, serviceType) {
  if (serviceType === "used_car_broker") {
    return {
      primaryKeyword:
        cityData.usedPrimaryKeyword || `used car broker in ${cityData.city}`,
      secondaryKeywords: cityData.usedSecondaryKeywords || [
        `used car buying service ${cityData.city}`,
        `help buying a used car ${cityData.city}`,
        `used car concierge service ${cityData.city}`,
      ],
      longTailKeywords: cityData.usedLongTailKeywords || [
        `used car broker near me ${cityData.city}`,
        `someone to inspect used car before buying in ${cityData.city}`,
        `avoid used car scams service ${cityData.city}`,
      ],
    }
  }

  return {
    primaryKeyword: cityData.primaryKeyword,
    secondaryKeywords: cityData.secondaryKeywords || [],
    longTailKeywords: cityData.longTailKeywords || [],
  }
}

export function getServiceConfig(serviceType) {
  return SERVICE_CONFIGS[serviceType]
}

export function getNearbyCities(allCities = [], cityData, serviceType) {
  const slugs = cityData.nearbyCities || []
  return slugs
    .map(slug => allCities.find(city => city.slug === slug))
    .filter(Boolean)
    .map(city => ({
      ...city,
      path: getCityPath(city.slug, serviceType),
    }))
}

export function buildCityMetaTitle(cityData, serviceType) {
  const { primaryKeyword } = getCityKeywordSet(cityData, serviceType)
  const serviceLabel =
    serviceType === "used_car_broker"
      ? "Used Car Buying Service"
      : "Car Buying Concierge"
  return `${primaryKeyword} | ${serviceLabel} | Zen Car Buying`
}

export function buildCityMetaDescription(cityData, serviceType) {
  const { primaryKeyword, longTailKeywords } = getCityKeywordSet(
    cityData,
    serviceType
  )
  const supportingPhrase =
    longTailKeywords[0] || `car buying help in ${cityData.city}`

  return `${primaryKeyword} with nationwide sourcing, negotiation support and delivery coordination. Zen Car Buying helps drivers in ${
    cityData.city
  } with ${supportingPhrase.toLowerCase()}.`
}

export function buildCitySchemas({ cityData, serviceType, pageUrl }) {
  const serviceConfig = getServiceConfig(serviceType)
  const keywordSet = getCityKeywordSet(cityData, serviceType)

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbusiness`,
    name: "Zen Car Buying",
    url: SITE_URL,
    image: `${SITE_URL}${cityData.heroImage || "/images/og-zencarbuying.jpg"}`,
    telephone: "+1-888-651-6088",
    priceRange: "$$",
    areaServed: [
      {
        "@type": "City",
        name: cityData.city,
      },
      {
        "@type": "State",
        name: cityData.state,
      },
    ],
    sameAs: SOCIAL_SCHEMA_SAME_AS,
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `${serviceConfig.displayName} in ${cityData.city}`,
    serviceType: keywordSet.primaryKeyword,
    description: buildCityMetaDescription(cityData, serviceType),
    areaServed: {
      "@type": "City",
      name: cityData.city,
    },
    provider: {
      "@type": "Organization",
      name: "Zen Car Buying",
      url: SITE_URL,
      logo: `${SITE_URL}/zen-car-buying-logo.png`,
    },
    availableChannel: "Online",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (cityData.faq || []).map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return [localBusinessSchema, serviceSchema, faqSchema]
}

export function buildServiceSchemas(serviceType, pageUrl) {
  const config = getServiceConfig(serviceType)

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "Zen Car Buying",
    url: SITE_URL,
    logo: `${SITE_URL}/zen-car-buying-logo.png`,
    telephone: "+1-888-651-6088",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    sameAs: SOCIAL_SCHEMA_SAME_AS,
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: config.serviceSchemaName,
    serviceType: config.primaryKeyword,
    description: config.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Zen Car Buying",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    offers: {
      "@type": "OfferCatalog",
      name: `${config.displayName} Packages`,
      itemListElement: config.pricingHighlights.map(item => ({
        "@type": "Offer",
        name: item,
        availability: "https://schema.org/InStock",
      })),
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return [localBusinessSchema, serviceSchema, faqSchema]
}
