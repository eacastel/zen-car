import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import CallToAction from '../components/CallToAction'

export default function AboutPage({ data }) {
  const trustImage1 = getImage(data.trustImage1)
  const trustImage2 = getImage(data.trustImage2)

  return (
    <Layout>
      <section className="container mx-auto px-4 md:px-2 lg:px-6 py-16">
      <h1
          id="page-title"
          className="text-3xl md:text-4xl lg:text-5xl  font-medium text-primary mb-12"
        >
          About Zen Car Buying
        </h1>

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg text-gray-700 mb-4">
              The used car market is filled with incredible deals, offering car
              buyers an opportunity to own lightly used, significantly more
              expensive vehicles at 50-70% the cost of a new car. 
            </p>
            <p className="text-lg text-gray-700 mb-4">
              That’s like getting a <strong>$50,000 BMW 3 series</strong> for
              only $30,000 or a <strong>$80,000 Audi e-tron electric SUV</strong> for only $40,000. These incredible deals exist in the
              entry-luxury market as well, with cars from Toyota, Honda, and
              Subaru offering amazing bargains!
            </p>
          </div>

          {/* Trust Image */}
          <div>
            <GatsbyImage
              image={trustImage1}
              alt="Happy customer driving away in their new car"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Why Used Cars are Complex */}
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Why Buying a Used Car is More Complex
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Unlike new car shopping where "what you see is what you get," the used
          car market introduces multiple factors like:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700 mb-8">
          <li>Model year changes that alter features and options.</li>
          <li>Multiple trim levels with varying equipment.</li>
          <li>History differences — lease return from a careful owner vs. a high-mileage ex-rental car.</li>
        </ul>

        {/* Nationwide Savings Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <GatsbyImage
              image={trustImage2}
              alt="Car being delivered with confidence through nationwide shipping"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Nationwide Inventory Sourcing
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              With modern technology and affordable shipping costs, car shoppers
              can confidently purchase vehicles from dealerships thousands of
              miles away. We've saved our customers thousands by sourcing cars
              from markets where inventory is more competitive and affordable.
            </p>
          </div>
        </div>

        {/* Warranty Assurance Section */}
        <h2 className="text-2xl font-semibold text-primary mb-4">
          What About Repairs?
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Most of the cars your Zen Guide will recommend will still have some
          portion of the original manufacturer warranty remaining. This allows
          you to purchase a comprehensive used car warranty, often extending
          the manufacturer’s original bumper-to-bumper coverage.
        </p>

        {/* Closing CTA Section */}
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Let Your Zen Guide Help
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Our proven system ensures you get the car of your dreams — without the
          stress. Let us guide you to the perfect vehicle at the perfect price.
        </p>
      
         

      </section>
      <CallToAction />
    </Layout>
  )
}

export const query = graphql`
  query {
    trustImage1: file(relativePath: { eq: "row-of-cars.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
    trustImage2: file(relativePath: { eq: "sleek-bmw.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`

export const Head = () => (
  <Seo
    title="About Zen Car Buying | Your Trusted Car Buying Guide"
    description="Learn how Zen Car Buying helps you find the perfect used car at 50-70% less than new prices. Schedule a free 15-minute consultation today."
    pathname="/about"
  />
)
