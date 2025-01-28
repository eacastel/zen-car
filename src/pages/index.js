import React from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Seo from '../components/Seo' // Import the Seo component

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Save Thousands on Your Next Used Car—Without the Stress
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Let our expert Zen Guides find the perfect lightly used vehicle for you at 50–70% off new car prices.
          </p>
          <Button to="/contact" color="accent" size="lg">
            Schedule Your Free 15-Minute Consultation
          </Button>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            'Personalized Vehicle Recommendations',
            'Expert Guidance on Warranty & Financing',
            'Nationwide Vehicle Sourcing & Shipping',
            'Negotiation & Purchase Assistance',
          ].map((benefit) => (
            <div key={benefit} className="text-center p-4">
              <div className="h-24 w-24 bg-accent rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary">{benefit}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Proven 4-Step Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              'Schedule Consultation',
              'Complete Survey',
              'Get Recommendations',
              'Close the Deal',
            ].map((step, index) => (
              <div key={step} className="text-center">
                <div className="text-2xl font-bold text-accent mb-2">Step {index + 1}</div>
                <h3 className="text-xl">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage

// Use the Seo component in the Head export for metadata
export const Head = () => (
  <Seo
    title="Zen Car Buying | Your Trusted Concierge for Used Cars"
    description="Discover incredible deals on lightly used cars."
  />
)
