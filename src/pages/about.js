// src/pages/about.js
import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import CallToAction from '../components/CallToAction'
import { motion } from "framer-motion"
import { openCalendlyPopup } from "../utils/openCalendly";

export default function AboutPage({ data }) {
  const flatbedImage = getImage(data.flatbedImage)
  const mapImage = getImage(data.mapImage)

  return (
    <Layout>
      <section
        className="container mx-auto px-4 md:px-6 pt-8 pb-16 max-w-[900px]"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-2">
          About Zen Car Buying
        </h1>
        <p className="text-lg text-gray-500 mb-12">Your Trusted Nationwide Car Broker Concierge Service</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Who We Are</h2>
          <p className="text-base md:text-lg text-primary mb-4">
            At <strong>Zen Car Buying</strong>, we simplify the car-buying experience—whether you're shopping for a <strong>brand-new</strong> vehicle or a <strong>lightly used car</strong>. As a <strong>nationwide car broker concierge service</strong>, we leverage years of expertise and modern tools to ensure you get the right car without the time, stress, or dealership pressure.
          </p>
          <p className="text-base md:text-lg text-primary mb-4">
            Our <strong>Zen Guides</strong> exclusively represent your interests.Unlike traditional or “free” car brokers who take kickbacks from dealers, we work only for you. From research to negotiation and delivery, we help you purchase the best <strong>new or used vehicle</strong>—at the best possible price.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Nationwide Service & Delivery</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-base md:text-lg text-primary mb-4">
                Zen Car Buying serves customers across the <strong>continental U.S.</strong>, sourcing both new and used vehicles from markets that offer the best value. This often means thousands in savings over your local dealership. Wherever you're located, we coordinate every detail—from search to <strong>seamless home delivery</strong>.
              </p>
            </div>
            <div>
              <GatsbyImage
                image={mapImage}
                alt="Nationwide service map"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Specialized Services</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="list-disc pl-5 space-y-2 text-base md:text-lg text-primary">
                <li>Personalized new and used vehicle recommendations tailored to your lifestyle and budget.</li>
                <li>Expert negotiation for optimal pricing.</li>
                <li>Vehicle evaluations and history checks.</li>
                <li>Remote paperwork processing for convenience.</li>
                <li>Continental U.S. vehicle delivery.</li>
              </ul>
            </div>
            <div>
              <GatsbyImage
                image={flatbedImage}
                alt="Flatbed truck delivering a used luxury car"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">How We Save You Time, Money, and Stress</h2>
          <p className="text-base md:text-lg text-primary leading-relaxed mb-6 max-w-3xl">
            We make car buying simple and stress-free—no dealer games, no wasted time. Just expert help and one flat fee, with your best deal as our only goal.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Start Your Zen Experience',
                desc: (
                  <>
                    Choose a service package and book your onboarding call to get started —or book a{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        openCalendlyPopup();
                      }}
                      className="text-accent underline focus:outline-none focus:ring-2 focus:ring-accent"
                      aria-label="Schedule your onboarding call"
                    >
                      quick intro call
                    </button>
                    {" "}if you’d like to learn more first.
                  </>
                )
              },
              {
                step: '2',
                title: 'Receive Expert Recommendations',
                desc: 'We hand-select your ideal vehicle based on your lifestyle, reliability needs, and long-term goals.',
              },
              {
                step: '3',
                title: 'Get Matched with Available Inventory',
                desc: 'We source the best available listings nationwide, verify them, and present them to you with key details.',
              },
              {
                step: '4',
                title: 'Enjoy Purchase & Delivery Support',
                desc: 'We negotiate, manage paperwork, and coordinate delivery so you can buy with confidence and ease.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="border-2 border-primary p-6 rounded-lg text-center shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-accent mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-primary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Not Sure Where to Start?</h2>
          <p className="text-base md:text-lg text-primary leading-relaxed max-w-2xl mb-6">
            Your free 15-minute call is pressure-free and designed to help you understand how we work, what you'll get,
            and whether a full-service or à la carte option makes the most sense for your situation. Click <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openCalendlyPopup();
              }}
              className="text-accent underline cursor-pointer"
              aria-label="Schedule a consultation"
            >here</button> for your free consultation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Warranty & Peace of Mind</h2>
          <p className="text-base md:text-lg text-primary">
            Most recommended used vehicles are still under the <strong>original manufacturer warranty</strong> and many new cars qualify for <strong>extended coverage</strong>. We help ensure your purchase is as worry-free as it is cost-effective.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Get Started Today</h2>
          <p className="text-base md:text-lg text-primary mb-4">
            Whether you're seeking a dependable used car or a brand-new luxury vehicle, Zen Car Buying is your trusted partner for <strong>stress-free car broker services</strong>.</p>
          <p className="text-base md:text-lg text-primary mb-4">
            Ready to experience stress-free car buying?{" "}
            <a
              href="/purchase/"
              className="text-accent underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Start your Zen Car Buying journey"
            >
              Start your Zen journey now
            </a>
            .
          </p>
        </section>


      </section>
      <CallToAction />
    </Layout>
  )
}

export const query = graphql`
  query {
    flatbedImage: file(relativePath: { eq: "flatbed-delivery.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
      }
    }
    mapImage: file(relativePath: { eq: "us-map-service-area.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`

export const Head = ({ location }) => {
  const siteUrl = "https://zencarbuying.com";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about/#webpage`,
    name: "About Zen Car Buying",
    url: `${siteUrl}/about/`,
    description:
      "Learn about Zen Car Buying's nationwide car brokering and concierge service—our mission, process, and commitment to helping drivers buy the right vehicle stress-free.",
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Zen Car Buying",
      url: siteUrl,
      logo: `${siteUrl}/zen-car-buying-logo.png`,
      description:
        "Zen Car Buying provides local and nationwide car brokering and concierge services to source, negotiate, and deliver the best new and used vehicles.",
      foundingDate: "2020",
      founder: {
        "@type": "Person",
        name: "Brian Alexander"
      },
      sameAs: [
        "https://www.facebook.com/zencarbuying",
        "https://www.instagram.com/zencarbuying",
        "https://www.linkedin.com/company/zencarbuying",
        "https://www.yelp.com/biz/zencarbuying"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-888-651-6088",
        contactType: "Customer Support",
        areaServed: "US",
        availableLanguage: "English"
      }
    }
  };

  return (
    <>
      <Seo
        title="About Zen Car Buying | Nationwide Car Broker & Concierge"
        description="Zen Car Buying provides local and nationwide car brokering and concierge services to source, negotiate, and deliver the best new and used vehicles—saving you time, money, and stress."
        pathname={location?.pathname || "/about/"}
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </>
  );
};
