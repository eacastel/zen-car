import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Button from './Button'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export function Hero() {
  const data = useStaticQuery(graphql`
    query {
      heroBg: file(relativePath: { eq: "hero-bg.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90
          )
        }
      }
    }
  `)

  const heroImage = getImage(data.heroBg)

  return (
    <section className="relative w-full h-[600px]">
      {/* Background Image */}
      <GatsbyImage
        image={heroImage}
        alt="Zen Car Buying - Stress-Free Car Buying"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center">
        <div className="container mx-auto px-6 text-center text-white">
          <p className="text-lg uppercase tracking-wider mb-4 font-pirulen">THE ZEN APPROACH TO CAR BUYING</p>

          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Save Thousands on Your Next Car
          </h1>

          <p className="text-lg font-poppins  tracking-widest mb-3 uppercase">
            Stress-Free, Data-Driven Car Buying Assistance 
          </p>

          <p className="text-xl font-helvetica italic mb-8">
            "Find the perfect lightly used car at 50–70% off new car prices."
          </p>

          <Button to="/contact" color="accent" size="lg">
            Schedule Your Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
