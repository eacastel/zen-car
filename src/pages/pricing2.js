import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { FaCheckCircle } from 'react-icons/fa'

const pricingData = [
  {
    title: 'Research Recommendations',
    price: '$250 - $500',
    description: 'Get expert model and year recommendations based on your needs.',
    details: [
      'Personalized recommendations for make/model/year',
      'Reliability and market analysis',
      'Delivered in 48 hours'
    ],
    options: [
      { label: '1 Car - $250', link: '/contact' },
      { label: '2 Cars - $400', link: '/contact' },
      { label: '3 Cars - $500', link: '/contact' }
    ]
  },
  {
    title: 'Inventory Sourcing',
    price: '$250',
    description: 'Find the best available cars that match your recommendations.',
    details: [
      '5-10 matching vehicles',
      'Verified pricing, condition & location',
      'Requires Research Package'
    ],
    options: [{ label: 'Add Inventory Sourcing', link: '/contact' }]
  },
  {
    title: 'Purchase Assistance',
    price: '$500',
    description: 'We handle negotiation, dealer communication, and paperwork.',
    details: [
      'Dealer communication & negotiation',
      'Financing and paperwork guidance',
      'Up to 2 vehicles'
    ],
    options: [{ label: 'Get Purchase Assistance', link: '/contact' }]
  },
  {
    title: 'Zen Experience',
    price: '$1,000',
    description: 'Get the full stress-free experience with all services included.',
    details: [
      'All research, sourcing & purchase assistance',
      'Best value package (Save $250)',
      'End-to-end car buying help'
    ],
    options: [{ label: 'Go All In', link: '/contact' }]
  }
]

export default function Pricing() {
  return (
    <Layout>
      <section className="py-20 bg-gray-100 text-center" aria-labelledby="pricing-heading">
        <div className="container mx-auto px-6">
          {/* ✅ Pricing Heading */}
          <h1 id="pricing-heading" className="text-4xl font-bold text-primary mb-6">
            Our <span className="text-accent">Pricing & Packages</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Choose the level of support you need—from expert recommendations to full purchase assistance.
          </p>

          {/* ✅ Pricing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingData.map((packageItem, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold text-primary">{packageItem.title}</h2>
                <p className="text-xl text-accent font-semibold my-3">{packageItem.price}</p>
                <p className="text-gray-700 mb-4">{packageItem.description}</p>

                {/* ✅ List of Features */}
                <ul className="text-left mb-6 space-y-2">
                  {packageItem.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <FaCheckCircle className="text-accent mr-2" /> {detail}
                    </li>
                  ))}
                </ul>

                {/* ✅ Call-to-Action Buttons */}
                {packageItem.options.map((option, i) => (
                  <Button key={i} to={option.link} color="accent" size="base">
                    {option.label}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

// ✅ SEO Metadata for Pricing Page
export const Head = () => (
  <Seo
    title="Zen Car Buying Pricing | Choose Your Car Buying Package"
    description="Explore Zen Car Buying's pricing and packages. Get expert car recommendations, inventory sourcing, and purchase assistance."
    pathname="/pricing"
  />
)
