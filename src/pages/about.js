import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import CallToAction from '../components/CallToAction'
import { motion } from "framer-motion"

export default function AboutPage({ data }) {
  const trustImage1 = getImage(data.trustImage1)
  const trustImage2 = getImage(data.trustImage2)

  return (
    <Layout>
    <section
      className="container mx-auto px-4 md:px-6 pt-8 pb-16 max-w-[900px]"
      itemscope
      itemtype="https://schema.org/AboutPage"
    >
      <h1
        id="page-title"
        className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-12"
      >
        About Zen Car Buying
      </h1>

      {/* Intro Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
            Finding the perfect used car at the right price can be challenging. 
            At <strong>Zen Car Buying</strong>, our dedicated{' '}
            <strong>used car buying concierge</strong> service ensures you get the best value without the stress.
          </p>
          <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
            We specialize in sourcing <strong>lightly used cars</strong> and <strong>luxury used cars</strong> at incredible savings — often at <strong>50-70% less</strong> than their original sticker price.  
            Imagine owning a <strong>$50,000 BMW 3 series</strong> for only $30,000 or a <strong>$80,000 Audi e-tron electric SUV</strong> for just $40,000.
          </p>
          <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
            Our trusted experts offer professional guidance at every step, 
            ensuring you secure a top-quality vehicle with confidence.
          </p>
        </div>

        {/* Trust Image */}
        <div>
          <GatsbyImage
            image={trustImage1}
            alt="Row of cars at a dealership showcasing available inventory"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Why Used Cars are Complex */}
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Why Buying a Used Car is More Complex
      </h2>
      <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
        Unlike buying a new car, the used car market introduces multiple factors that can make finding the right vehicle overwhelming:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-base md:text-lg text-primary mb-8">
        <li>Model year changes that alter features and options.</li>
        <li>Multiple trim levels with varying equipment.</li>
        <li>Vehicle history differences — lease returns from careful owners vs. high-mileage ex-rental cars.</li>
      </ul>

        {/* Our Proven 4-Step Process */}
        <section className="my-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Proven 4-Step Process</h2>
          <p className="text-base md:text-lg text-primary leading-relaxed mb-4">At Zen Car Buying, our trusted used car buying concierge service follows a streamlined 4-step process designed to help you secure the perfect vehicle with ease. From the initial consultation to expert vehicle recommendations, detailed inventory sourcing, and comprehensive purchase assistance, we simplify the complex world of used car buying. Whether you're searching for lightly used cars, luxury used cars, or want to explore car shipping services for out-of-state deals, our process ensures you get exceptional value — all while minimizing stress.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 mt-12 gap-6">
            {[  
              { step: '1', title: 'Schedule Consultation', desc: 'Book a free 15-minute call to discuss your needs and budget.' },
              { step: '2', title: 'Get Recommendations', desc: 'Receive personalized vehicle suggestions tailored to you.' },
              { step: '3', title: 'Review Inventory', desc: 'We locate the best options nationwide to match your needs.' },
              { step: '4', title: 'Purchase Assistance', desc: 'Our experts handle negotiation, paperwork, and delivery.' },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="border-2 border-primary p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-accent mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-primary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Nationwide Savings Section */}
        <div className="grid md:grid-cols-2 gap-8 pt-10 mb-12">
          <div>
            <GatsbyImage
              image={trustImage2}
              alt="Car delivery service showing a customer receiving a newly purchased vehicle"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Nationwide Car Shipping for More Savings
            </h2>
            <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
              With affordable shipping options available, you aren’t limited to cars in your local area. 
              Our <strong>car buying concierge</strong> experts source vehicles from across the U.S., often saving our clients thousands of dollars by purchasing in regions with better deals.
            </p>
            <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
              Whether you're looking for a luxury used car, a high-quality SUV, or an affordable sedan, we’ll find the perfect match for your budget.
            </p>
          </div>
        </div>

        {/* Warranty Assurance Section */}
        <h2 className="text-2xl font-semibold text-primary mb-4">
          What About Repairs?
        </h2>
        <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
          Concerned about costly repairs for used cars? 
          Most of the vehicles we recommend are still under the original manufacturer warranty, making them eligible for comprehensive extended warranties. 
          This often extends the manufacturer’s original bumper-to-bumper coverage, giving you added peace of mind.
        </p>

        {/* Closing CTA Section */}
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Let Your Zen Guide Help
        </h2>
        <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
          Our proven system has helped countless customers find <strong>luxury used cars</strong> and 
          reliable vehicles at unbeatable prices.  
          Whether you're buying your dream BMW or searching for the <strong>best used cars under $30,000</strong>, we’ve got you covered.
        </p>
        <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
          Let us guide you to the perfect vehicle at the perfect price.
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
        gatsbyImageData(layout: CONSTRAINED, width: 400, height: 400, placeholder: BLURRED)
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
    title="About Zen Car Buying | Expert Used Car Buying Concierge"
    description="Looking for a trusted used car buying concierge? Zen Car Buying helps you find luxury used cars and lightly used vehicles at 50-70% off new car prices. Schedule a free consultation today."
    pathname="/about"
  />
)