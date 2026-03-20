import React, { lazy, Suspense, useMemo } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../Layout"
import HeroSocialProof from "../new-landing-2026/HeroSocialProof"
import HowItWorks from "../HowItWorks"
import LandingHero from "./LandingHero"
import LandingSection from "./LandingSection"
import LandingFaqSection from "./LandingFaqSection"
import LandingInternalLinks from "./LandingInternalLinks"
import LandingPageAnalytics from "./LandingPageAnalytics"
import InlineCtaInset from "../new-landing-2026/InlineCtaInset"
import ServiceButton from "../ServiceButton"
import {
  buildBookingPath,
  buildPurchasePath,
  buildServicePath,
  capitalizeFirst,
  getCityPath,
  getServiceConfig,
} from "../../utils/landingPages"

const Testimonials = lazy(() => import("../Testimonials"))

function TopCityLinks({ serviceType }) {
  const data = useStaticQuery(graphql`
    query ServiceLandingCities {
      allCitiesJson(sort: { fields: [city], order: ASC }) {
        nodes {
          slug
          city
          stateCode
        }
      }
    }
  `)

  const cities = useMemo(
    () =>
      (data?.allCitiesJson?.nodes || []).slice(0, 6).map(city => ({
        ...city,
        path: getCityPath(city.slug, serviceType),
      })),
    [data, serviceType]
  )

  return (
    <LandingSection
      background="bg-white"
      eyebrow="Top service areas"
      title="Explore city-specific car broker guidance"
      description="These location pages are built for buyers comparing local dealership conditions, inventory pressure and delivery logistics."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cities.map(city => (
          <Link
            key={city.slug}
            to={city.path}
            className="rounded-[22px] border border-primary/10 bg-secondary p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent"
          >
            <h3 className="text-xl font-semibold text-primary">
              {city.city}, {city.stateCode}
            </h3>
            <p className="mt-2 text-primary/70">
              Local buying strategy, FAQs and service guidance for {city.city}.
            </p>
          </Link>
        ))}
      </div>
    </LandingSection>
  )
}

export default function ServiceLandingPage({ serviceType }) {
  const config = getServiceConfig(serviceType)
  const bookingPath = buildBookingPath({ serviceType })
  const purchasePath = buildPurchasePath({ serviceType })
  const nearbyServiceLinks = [
    {
      to: config.alternateServicePath,
      label:
        serviceType === "car_broker"
          ? "Compare with our used car broker page"
          : "Compare with our car broker page",
      description: "See how the buying approach shifts by service type.",
    },
    {
      to: "/pricing/",
      label: "Review pricing",
      description: "See the package structure and next-step options.",
    },
    {
      to: "/car-broker/service-areas/",
      label: "Browse service areas",
      description: "Jump straight to the markets we are expanding next.",
    },
  ]

  return (
    <Layout>
      <LandingPageAnalytics pageType="service" serviceType={serviceType} />

      <LandingHero
        eyebrow={config.heroEyebrow}
        title={config.heroTitle}
        description={`${config.primaryKeyword} support should be strategic, calm and direct. ${config.heroDescription}`}
        accentLine={config.heroAccent}
        ctaNote="We research, negotiate and coordinate delivery. You just choose the car."
        primaryCta={{
          text: "Book consultation",
          to: bookingPath,
          label: `${serviceType}_hero_book_consultation`,
          location: `${serviceType}_hero`,
          trackingPayload: {
            service: serviceType,
            page_type: "service",
          },
        }}
        secondaryCta={{
          text: "View pricing",
          to: purchasePath,
          label: `${serviceType}_hero_view_pricing`,
          location: `${serviceType}_hero`,
          trackingPayload: {
            service: serviceType,
            page_type: "service",
          },
        }}
        badgeItems={config.introCards}
      />

      <HeroSocialProof />

      <LandingSection
        background="bg-white"
        eyebrow="How We Help"
        title={config.introHeading}
        description={`Buyers searching for ${config.secondaryKeywords
          .slice(0, 2)
          .join(
            " and "
          )} usually need the same thing: sharper guidance and less dealership friction.`}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {config.introCards.map(card => (
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

      <LandingSection
        background="bg-secondary"
        eyebrow="Pricing"
        title={config.pricingHeading}
        description={config.pricingBody}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
          <div className="grid gap-4 md:grid-cols-3">
            {config.pricingHighlights.map(item => (
              <div
                key={item}
                className="rounded-[20px] border border-white/70 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-primary">
                  {capitalizeFirst(item)}
                </h3>
              </div>
            ))}
          </div>
          <div className="rounded-[24px] border border-primary/10 bg-primary p-6 text-white shadow-lg">
            <p className="text-sm tracking-[0.12em] text-accent mb-3">
              High-intent buyers
            </p>
            <p className="text-lg leading-relaxed mb-6">
              If you are comparing searches like "{config.longTailKeywords[0]}"{" "}
              or "{config.longTailKeywords[1]}", the fastest move is a short
              consultation before you start negotiating blind.
            </p>
            <ServiceButton
              to={buildServicePath(serviceType)}
              size="base"
              color="accent"
              trackingEvent="cta_click"
              trackingLabel={`${serviceType}_pricing_cta`}
              trackingLocation={`${serviceType}_pricing_section`}
              trackingPayload={{ service: serviceType, page_type: "service" }}
            >
              Stay on this service path
            </ServiceButton>
          </div>
        </div>
      </LandingSection>

      <HowItWorks />

      <InlineCtaInset
        title="Want a clearer buying plan before you contact dealerships?"
        subtitle={`Book a short call to talk through ${config.primaryKeyword}, pricing and your next best move.`}
        primaryLabel="Book consultation"
        primaryTo={bookingPath}
      />

      <Suspense
        fallback={
          <div className="py-20 text-center text-primary">
            Loading testimonials…
          </div>
        }
      >
        <Testimonials />
      </Suspense>

      <LandingFaqSection
        title={`Questions people ask before they hire a ${config.displayName.toLowerCase()}`}
        description={`These answers are built around the intent behind searches like ${config.secondaryKeywords
          .slice(2, 4)
          .join(" and ")}.`}
        items={config.faq}
      />

      <TopCityLinks serviceType={serviceType} />

      <LandingInternalLinks
        cityName="your market"
        nearbyCities={[]}
        serviceLinks={nearbyServiceLinks}
      />

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:max-w-[1280px] text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            {config.ctaTitle}
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            {config.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <ServiceButton
              to={bookingPath}
              size="lg"
              color="accent"
              trackingEvent="cta_click"
              trackingLabel={`${serviceType}_final_book_consultation`}
              trackingLocation={`${serviceType}_final_cta`}
              trackingPayload={{ service: serviceType, page_type: "service" }}
            >
              Book consultation
            </ServiceButton>
            <ServiceButton
              to={purchasePath}
              size="lg"
              color="secondary"
              trackingEvent="cta_click"
              trackingLabel={`${serviceType}_final_view_pricing`}
              trackingLocation={`${serviceType}_final_cta`}
              trackingPayload={{ service: serviceType, page_type: "service" }}
            >
              View pricing
            </ServiceButton>
          </div>
        </div>
      </section>
    </Layout>
  )
}
