import * as React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { GatsbyImage } from 'gatsby-plugin-image'

export default function ServicesPage({ data }) {
  return (
    <Layout>
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-primary mb-8">Our Comprehensive Services</h1>
          
          <div className="grid md:grid-cols-3 gap-12">
            {servicesData.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <GatsbyImage 
                  image={service.image} 
                  alt={service.title}
                  className="h-48 w-full object-cover mb-4 rounded"
                />
                <h2 className="text-2xl font-bold text-primary mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button to={service.ctaLink} color="accent">
                  {service.ctaText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => (
    <Seo
        title="Services | Used Car Buying Concierge & Consultation"
        description="Explore Zen Car Buying’s comprehensive car-buying services—from recommendations and nationwide sourcing to purchase assistance."
        pathname="/services"
        pageType="article"
    />
)

// Replace with real data from CMS or markdown files
const servicesData = [
  {
    title: "Car Recommendations",
    description: "Expert model/year recommendations based on your needs...",
    ctaText: "Get Started",
    ctaLink: "/contact",
    image: null // Add GatsbyImage data
  },
  // Add other services
]