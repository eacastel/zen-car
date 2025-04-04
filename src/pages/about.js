import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import CallToAction from '../components/CallToAction'
import { motion } from "framer-motion"
import { openCalendlyPopup } from "../utils/openCalendly";


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
            Finding the perfect used car can be challenging. 
            At <strong>Zen Car Buying</strong>, we are a {' '}
            <strong>used car buying concierge</strong> service that solves for that using years of experience buying used cars. Our Zen Guides ensure you get the best value without the stress of traditional car buying. And with our modern approach we take advantage of systems and tools so you don’t have to step into a single dealership!
          </p>
          <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
            We specialize in sourcing <strong>lightly used cars</strong> and <strong>luxury used cars</strong> at incredible savings — often at <strong>50-70% less</strong> than their original new car sticker price.  
            Imagine owning a lightly used <strong>$50,000 BMW 3 series</strong> for only $30,000 or a <strong>$90,000 Audi e-tron electric SUV</strong> for just $40,000.
          </p>
          <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
            Our Zen Guides offer professional guidance at every step, 
            ensuring you secure a top-quality vehicle with confidence. <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      openCalendlyPopup();
    }}
    className="text-accent underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
    aria-label="Schedule a free 15-minute consultation"
  > Click here</button> to get started.
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
        <li>Model year changes that alter styling, standard features and options.</li>
        <li>Multiple trim levels with varying equipment that changes every year.</li>
        <li>Vehicle history — the used car market is filled with less desirable vehicles such as cars that were previously used in rental fleets!</li>
      </ul>

        {/* Our Proven 4-Step Process */}
        <section className="my-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Proven 4-Step Process</h2>
        <p className="text-base md:text-lg text-primary leading-relaxed mb-4">
  At <strong>Zen Car Buying</strong>, we follow a streamlined 4-step process designed to help you secure the perfect vehicle. It starts with a <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      openCalendlyPopup();
    }}
    className="text-accent underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
    aria-label="Schedule a free 15-minute consultation"
  > free 15-minute consultation  </button> which sets the foundation for your Zen Guide to deliver vehicle recommendations in an easy to read proposal format, inventory sourcing, and purchase assistance. We remove the stress and simplify the complex world of car buying. 
</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-12 gap-6">
            {[  
              { step: '1', title: 'Schedule Consultation', desc: 'Book your free 15-minute call to go over your budget and preferences.' },
              { step: '2', title: 'Get Recommendations', desc: 'Receive a customized proposal with your recommendation.' },
              { step: '3', title: 'Review Inventory', desc: 'We locate and provide the best vehicles matching your recommendation.' },
              { step: '4', title: 'Purchase Assistance', desc: 'Let your Zen Guides do the work so you don’t have to.' },
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
          Let us guide you to the perfect vehicle at the perfect price. <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      openCalendlyPopup();
    }}
    className="text-accent underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
    aria-label="Schedule a free 15-minute consultation"
  > Click here</button> to schedule your free 15 minute consultation.
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
       description="Zen Car Buying is your trusted partner for luxury used cars, lightly used vehicles, and out-of-state car sourcing. Our expert Zen Guides help first-time buyers and savvy car shoppers save thousands — stress-free."
       pathname="/about"
     />
)