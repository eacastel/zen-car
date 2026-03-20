import React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
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
  buildCityMetaDescription,
  buildCityMetaTitle,
  buildCitySchemas,
  buildPricingPath,
  buildServicePath,
  capitalizeFirst,
  getCityKeywordSet,
  getNearbyCities,
  getServiceConfig,
} from "../utils/landingPages"

function buildLocalizedCards(
  cityData: any,
  serviceType: string,
  keywords: any
) {
  const serviceLabel =
    serviceType === "used_car_broker" ? "used car broker" : "car broker"

  return [
    {
      title: `${cityData.city} pricing needs context`,
      description: `A ${serviceLabel} in ${cityData.city} helps you compare listings against real market conditions instead of reacting to the first attractive ad or dealership promise.`,
    },
    {
      title: `The right search radius changes the deal`,
      description: `Buyers in ${
        cityData.city
      } often get better leverage when they compare ${cityData.neighborhoods.join(
        ", "
      )} and wider regional inventory instead of staying locked into the nearest lot.`,
    },
    {
      title: `Your keyword search should lead to strategy`,
      description: `Shoppers typing searches like "${keywords.secondaryKeywords[0]}" or "${keywords.longTailKeywords[0]}" usually need a clear plan before dealership pressure narrows their options.`,
    },
  ]
}

const CityLandingTemplate = ({ data, pageContext }: PageProps<any>) => {
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
  const localizedCards = buildLocalizedCards(cityData, serviceType, keywordSet)

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
        title={`${capitalizeFirst(
          keywordSet.primaryKeyword
        )} | Car buying concierge in ${cityData.city}`}
        description={`${keywordSet.primaryKeyword} support should feel local, direct and strategic. ${cityData.localizedPainPoint}`}
        accentLine={serviceConfig.heroAccent}
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
        badgeItems={localizedCards}
      />

      <LandingSection
        background="bg-white"
        eyebrow={`${cityData.region} Market`}
        title={`${capitalizeFirst(
          keywordSet.primaryKeyword
        )} guidance starts with local context`}
        description={cityData.localIntro}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
          <div className="space-y-5 text-lg leading-relaxed text-primary/80">
            {cityData.supportingParagraphs.map((paragraph: string) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="rounded-[24px] border border-primary/10 bg-secondary p-6 shadow-sm">
            <p className="text-sm tracking-[0.12em] text-accent font-pirulen mb-4">
              Neighborhoods we hear about
            </p>
            <div className="flex flex-wrap gap-2">
              {cityData.neighborhoods.map((area: string) => (
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
        description={`Searches like ${keywordSet.secondaryKeywords
          .slice(0, 2)
          .join(
            " and "
          )} usually reflect the same issue: local buying conditions matter.`}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {cityData.marketInsights.map((insight: string) => (
            <article
              key={insight}
              className="rounded-[24px] border border-white/70 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">
                {cityData.city} insight
              </h3>
              <p className="text-primary/75">{insight}</p>
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
        description={`Buyers looking for ${keywordSet.secondaryKeywords[1]} or ${keywordSet.secondaryKeywords[2]} usually want help simplifying one of the most time-consuming purchases they make.`}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {localizedCards.map(card => (
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
            {keywordSet.secondaryKeywords.slice(0, 3).map((keyword: string) => (
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
              If you are comparing phrases like "
              {keywordSet.longTailKeywords[0]}" or "
              {keywordSet.longTailKeywords[1]}", a short consultation is the
              fastest way to clarify pricing and fit.
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
        description={`These answers are written to support long-tail searches like ${keywordSet.longTailKeywords
          .slice(0, 3)
          .join(", ")}.`}
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

export const Head: HeadFC<any> = ({ data, pageContext, location }) => {
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
      secondaryKeywords
      longTailKeywords
      usedPrimaryKeyword
      usedSecondaryKeywords
      usedLongTailKeywords
      heroImage
      localizedPainPoint
      localIntro
      supportingParagraphs
      marketInsights
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
