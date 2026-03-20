import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import HowItWorks from "../components/HowItWorks"
import LandingHero from "../components/landing/LandingHero"
import LandingSection from "../components/landing/LandingSection"
import LandingFaqSection from "../components/landing/LandingFaqSection"
import LandingInternalLinks from "../components/landing/LandingInternalLinks"
import LandingPageAnalytics from "../components/landing/LandingPageAnalytics"
import ServiceButton from "../components/ServiceButton"
import {
  buildBookingPath,
  capitalizeFirst,
  buildCityMetaDescription,
  buildCityMetaTitle,
  buildCitySchemas,
  buildPricingPath,
  buildServicePath,
  getCityHeroCtaSubnote,
  getCityHeroSubheadline,
  getCityKeywordSet,
  getNearbyCities,
  getServiceConfig,
} from "../utils/landingPages"

const CityLandingTemplate = ({ data, pageContext }) => {
  const cityData = data.citiesJson
  const allCities = data.allCitiesJson.nodes
  const serviceType = pageContext.serviceType
  const serviceConfig = getServiceConfig(serviceType)
  const keywordSet = getCityKeywordSet(cityData, serviceType)
  const nearbyCities = getNearbyCities(allCities, cityData, serviceType)
  const bookingPath = buildBookingPath({
    citySlug: cityData.slug,
    serviceType,
  })
  const pricingPath = buildPricingPath({
    citySlug: cityData.slug,
    serviceType,
  })
  const heroBadges = (cityData.heroBadges || []).slice(0, 3)
  const localContextParagraphs =
    cityData.localContextParagraphs &&
    cityData.localContextParagraphs.slice(0, 2).filter(Boolean).length
      ? cityData.localContextParagraphs.slice(0, 2).filter(Boolean)
      : [cityData.localIntro, ...(cityData.supportingParagraphs || [])]
          .filter(Boolean)
          .slice(0, 2)

  const serviceLinks = [
    {
      to: "/car-broker/",
      label: "Car broker service page",
      description: "See the broader nationwide service overview.",
    },
    {
      to: "/used-car-broker/",
      label: "Used car broker service page",
      description: "Compare how our used-car process differs.",
    },
    {
      to: "/pricing/",
      label: "Pricing and packages",
      description: "Review current package structure and next steps.",
    },
    {
      to: "/car-broker/service-areas/",
      label: "Service areas",
      description: "Browse more markets and related city landing pages.",
    },
  ]

  return (
    <Layout>
      <LandingPageAnalytics
        pageType="city"
        serviceType={serviceType}
        city={cityData.city}
        state={cityData.state}
      />

      <LandingHero
        eyebrow={`${cityData.city}, ${
          cityData.stateCode
        } ${serviceConfig.displayName.toLowerCase()}`}
        title={keywordSet.primaryKeywordDisplay}
        description={getCityHeroSubheadline(serviceType)}
        accentLine={serviceConfig.heroAccent}
        ctaNote="We research, negotiate and coordinate delivery. You just choose the car."
        ctaSubnote={getCityHeroCtaSubnote(cityData, serviceType)}
        heroImage={cityData.heroImage}
        primaryCta={{
          text: "Book consultation",
          to: bookingPath,
          label: `${serviceType}_${cityData.slug}_book_consultation`,
          location: `${serviceType}_city_hero`,
          trackingPayload: {
            service: serviceType,
            page_type: "city",
            city: cityData.city,
            state: cityData.state,
          },
        }}
        secondaryCta={{
          text: "Explore services",
          to: buildServicePath(serviceType, cityData.slug),
          label: `${serviceType}_${cityData.slug}_explore_services`,
          location: `${serviceType}_city_hero`,
          trackingPayload: {
            service: serviceType,
            page_type: "city",
            city: cityData.city,
            state: cityData.state,
          },
        }}
        badgeItems={heroBadges}
      />

      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:max-w-[1280px] -mt-6 relative z-10">
          <div className="rounded-[24px] border border-primary/10 bg-white p-6 md:p-8 shadow-[0_16px_40px_rgba(20,31,34,0.08)]">
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-3">
              Not sure where to start?
            </h2>
            <p className="text-lg text-primary/80 max-w-3xl mb-3">
              A quick consultation helps you understand pricing, inventory and
              whether local or out-of-state buying makes more sense.
            </p>
            <p className="text-primary/75 max-w-3xl">
              We research the market, source inventory, negotiate with dealers
              and coordinate delivery when the right vehicle is outside your
              area.
            </p>
          </div>
        </div>
      </section>

      <LandingSection
        background="bg-white"
        eyebrow={`${cityData.region} Market`}
        title={`${keywordSet.primaryKeywordDisplay} guidance starts with local context`}
        description={localContextParagraphs[0]}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
          <div className="space-y-5 text-lg leading-relaxed text-primary/80">
            {localContextParagraphs.slice(1).map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="rounded-[24px] border border-primary/10 bg-secondary p-6 shadow-sm">
            <p className="text-sm tracking-[0.12em] text-accent font-pirulen mb-4">
              Neighborhoods we hear about
            </p>
            <div className="flex flex-wrap gap-2">
              {cityData.neighborhoods.map(area => (
                <span
                  key={area}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </LandingSection>

      <LandingSection
        background="bg-secondary"
        eyebrow="Market Insights"
        title={`What’s different about buying a car in ${cityData.city}?`}
        description={`Local inventory, pricing pressure and dealership behavior can change the deal more than most buyers expect.`}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {cityData.marketInsights.map(insight => (
            <article
              key={insight.title}
              className="rounded-[24px] border border-white/70 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">
                {insight.title}
              </h3>
              <p className="text-primary/75">{insight.description}</p>
            </article>
          ))}
        </div>
      </LandingSection>

      <LandingSection
        background="bg-white"
        eyebrow="Why Use a Broker"
        title={`Why use a ${serviceConfig.displayName.toLowerCase()} in ${
          cityData.city
        }?`}
        description={`The right support removes pressure, opens better options and helps you make a confident decision without wasting weekends.`}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {heroBadges.map(card => (
            <article
              key={card.title}
              className="rounded-[24px] border border-primary/10 bg-secondary p-6 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {card.title}
              </h3>
              <p className="text-primary/75 leading-relaxed">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </LandingSection>

      <HowItWorks />

      <LandingSection
        background="bg-secondary"
        eyebrow="Services + Pricing"
        title={`Straightforward support for buyers in ${cityData.city}`}
        description={`Whether you need a ${serviceConfig.displayName.toLowerCase()} or a more complete concierge plan, we keep the next step clear.`}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
          <div className="grid gap-4 md:grid-cols-3">
            {keywordSet.secondaryKeywords.slice(0, 3).map(keyword => (
              <div
                key={keyword}
                className="rounded-[20px] border border-white/70 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {capitalizeFirst(keyword)}
                </h3>
                <p className="text-primary/70">
                  We use this intent to shape sourcing, negotiation and package
                  recommendations.
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-[24px] border border-primary/10 bg-primary p-6 text-white shadow-lg">
            <p className="text-sm tracking-[0.12em] text-accent mb-3">
              Next step
            </p>
            <p className="text-lg text-white/85 leading-relaxed mb-6">
              A short consultation is the fastest way to clarify pricing, fit
              and whether the best option is local or worth sourcing from
              farther out.
            </p>
            <div className="flex flex-col gap-3">
              <ServiceButton
                to={pricingPath}
                size="base"
                color="accent"
                trackingEvent="cta_click"
                trackingLabel={`${serviceType}_${cityData.slug}_view_pricing`}
                trackingLocation={`${serviceType}_city_pricing`}
                trackingPayload={{
                  service: serviceType,
                  page_type: "city",
                  city: cityData.city,
                  state: cityData.state,
                }}
              >
                View pricing
              </ServiceButton>
              <ServiceButton
                to={bookingPath}
                size="base"
                color="secondary"
                trackingEvent="cta_click"
                trackingLabel={`${serviceType}_${cityData.slug}_book_consultation_pricing`}
                trackingLocation={`${serviceType}_city_pricing`}
                trackingPayload={{
                  service: serviceType,
                  page_type: "city",
                  city: cityData.city,
                  state: cityData.state,
                }}
              >
                Book consultation
              </ServiceButton>
            </div>
          </div>
        </div>
      </LandingSection>

      <LandingFaqSection
        title={`Local questions about buying in ${cityData.city}`}
        description={`These answers cover the questions that come up most often before buyers commit to the next step.`}
        items={cityData.faq}
      />

      <LandingInternalLinks
        cityName={cityData.city}
        nearbyCities={nearbyCities}
        serviceLinks={serviceLinks}
      />

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:max-w-[1280px] text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Want a cleaner path to the right vehicle in {cityData.city}?
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            We will help you narrow inventory, pressure-test pricing and decide
            whether local or broader sourcing makes more sense.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <ServiceButton
              to={bookingPath}
              size="lg"
              color="accent"
              trackingEvent="cta_click"
              trackingLabel={`${serviceType}_${cityData.slug}_final_book_consultation`}
              trackingLocation={`${serviceType}_city_final_cta`}
              trackingPayload={{
                service: serviceType,
                page_type: "city",
                city: cityData.city,
                state: cityData.state,
              }}
            >
              Book consultation
            </ServiceButton>
            <ServiceButton
              to={buildServicePath(serviceType, cityData.slug)}
              size="lg"
              color="secondary"
              trackingEvent="cta_click"
              trackingLabel={`${serviceType}_${cityData.slug}_final_explore_service`}
              trackingLocation={`${serviceType}_city_final_cta`}
              trackingPayload={{
                service: serviceType,
                page_type: "city",
                city: cityData.city,
                state: cityData.state,
              }}
            >
              Explore services
            </ServiceButton>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CityLandingTemplate

export const Head = ({ data, pageContext, location }) => {
  const cityData = data.citiesJson
  const serviceType = pageContext.serviceType
  const title = buildCityMetaTitle(cityData, serviceType)
  const description = buildCityMetaDescription(cityData, serviceType)
  const pageUrl = `https://zencarbuying.com${location.pathname}`
  const schemas = buildCitySchemas({ cityData, serviceType, pageUrl })

  return (
    <Seo title={title} description={description} pathname={location.pathname}>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Seo>
  )
}

export const query = graphql`
  query CityLandingPage($slug: String!) {
    citiesJson(slug: { eq: $slug }) {
      slug
      city
      state
      stateCode
      region
      primaryKeyword
      primaryKeywordDisplay
      secondaryKeywords
      longTailKeywords
      usedPrimaryKeyword
      usedPrimaryKeywordDisplay
      usedSecondaryKeywords
      usedLongTailKeywords
      heroBadges {
        title
        description
      }
      heroImage
      localContextParagraphs
      localizedPainPoint
      localIntro
      supportingParagraphs
      marketInsights {
        title
        description
      }
      neighborhoods
      nearbyCities
      faq {
        question
        answer
      }
    }
    allCitiesJson {
      nodes {
        slug
        city
        state
        stateCode
      }
    }
  }
`
