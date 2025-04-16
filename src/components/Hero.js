import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import CalendlyButton from "../components/CalendlyButton";


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
  `);

  const heroImage = getImage(data.heroBg);

  return (
    <section className="relative w-full h-[600px]">
      {/* Background Image */}
      <GatsbyImage
        image={heroImage}
        alt="Luxury used car parked in a cityscape, ideal for affordable and premium car buying with Zen Car Buying"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center">
        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px] text-center text-white">
          <p className="text-lg uppercase tracking-wider mb-4 font-pirulen" >THE MODERN APPROACH TO CAR BUYING</p>

          <h1 className="text-4xl md:text-5xl mb-4" style={{
    fontFamily:'"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', }}>Stress-Free, Data-Driven Car Buying Assistance
          </h1>

          <p className="text-xl font-poppins tracking-widest uppercase mb-8">
            Let our Zen Guides find you a lightly used car at up to 30-50% off new car prices.
          </p>

          {/* Buttons - Styled using the existing Button component */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CalendlyButton size="lg" color="accent">
              Schedule Your Free Consultation
            </CalendlyButton>


          </div>
        </div>
      </div>
    </section>
  );
}
