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
        <p className="text-lg text-gray-500 mb-12">Your Trusted Nationwide Car Broker and Car Buying Concierge</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Who We Are</h2>
          <p className="text-base md:text-lg text-primary mb-4">
            At <strong>Zen Car Buying</strong>, we simplify the car-buying experience. As a <strong>car brokering</strong> and concierge service, we leverage years of expertise and modern tools to ensure you secure lightly used, luxury vehicles—stress-free.
          </p>
          <p className="text-base md:text-lg text-primary mb-4">
            Our Zen Guides exclusively represent your interests, providing personalized service to locate, negotiate, and deliver your ideal vehicle, often at <strong>30–50% below original MSRP</strong>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Nationwide Service & Delivery</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-base md:text-lg text-primary mb-4">
                Zen Car Buying serves customers across the <strong>entire continental U.S.</strong>, sourcing vehicles from regions offering the best deals. Whether in a major city or a remote town, we coordinate seamless delivery directly to your driveway.
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
                <li>Personalized vehicle recommendations tailored to your needs.</li>
                <li>Expert negotiation for optimal pricing.</li>
                <li>Thorough vehicle evaluations and history checks.</li>
                <li>Remote paperwork processing and financing assistance.</li>
                <li>Home delivery of your selected vehicle.</li>
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
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Proven 4-Step Process</h2>
           <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
            At <strong>Zen Car Buying</strong>remove the stress and simplify the complex world of car buying. It all starts with a <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openCalendlyPopup();
              }}
              className="text-accent underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent mb-4"
              aria-label="Schedule a free 15-minute consultation"
            > free 15-minute consultation</button>. 
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[ 
              { step: '1', title: 'Schedule Consultation', desc: 'Book your free 15-minute call to go over your budget and preferences.' },
              { step: '2', title: 'Get Recommendations', desc: 'Receive a customized proposal with your recommendation.' },
              { step: '3', title: 'Review Inventory', desc: 'We locate and provide the best vehicles matching your recommendation.' },
              { step: '4', title: 'Purchase Assistance', desc: 'Let your Zen Guides do the work so you don’t have to.' },
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
          <h2 className="text-2xl font-semibold text-primary mb-4">Warranty & Peace of Mind</h2>
          <p className="text-base md:text-lg text-primary">
            Most recommended vehicles are still under the original manufacturer warranty and qualify for comprehensive extended warranties, ensuring your purchase is worry-free.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Get Started Today</h2>
          <p className="text-base md:text-lg text-primary">
            Ready to experience stress-free car buying? Click <button
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

        <CallToAction />
      </section>
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

export const Head = () => (
  <Seo
    title="About Zen Car Buying | Nationwide Car Broker & Concierge"
    description="Zen Car Buying provides local and nationwide car brokering and concierge services to source, negotiate, and deliver the best new and used vehicles—saving you time, money, and stress."
    pathname="/about"
  />
)
