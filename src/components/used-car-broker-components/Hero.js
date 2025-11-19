// src/components/Hero.js

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import ServiceButton from '../../components/ServiceButton';

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
    <section
      className="relative w-full h-[600px]"
      aria-labelledby="hero-title"
    >
      {/* Background Image */}
      <GatsbyImage
        image={heroImage}
        alt="Luxury used car parked in a cityscape, ideal for affordable and premium car buying with Zen Car Buying"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1A1A1A]/80 md:bg-black/50 flex items-center">
        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px] text-center text-white">
          <p className="text-lg uppercase tracking-wider mb-4 font-pirulen">
            THE MODERN APPROACH TO CAR BUYING
          </p>

          <h1
            id="hero-title"
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily:
                '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
            }}
          >
            Your Trusted Nationwide Used Car Brokerage
          </h1>

          <h2 className="text-xl font-poppins tracking-widest uppercase mb-8">
            Zen Car Buying’s used car brokers save you time, stress, and 30–50% off original MSRP!
          </h2>

          {/* Buttons - Styled using the existing Button component */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ServiceButton
              size="lg"
              color="accent"
              to="/15min/"
            >
              Book Free 15-Minute Call
            </ServiceButton>

            <ServiceButton
              size="lg"
              color="secondary"
              to="/purchase/"
            >
              View Packages
            </ServiceButton>
          </div>

          
        {/* BBB Seal for mobile - directly under button */}
          <div className="sm:hidden flex justify-center mt-8">
            <a
              href="https://www.bbb.org/us/wa/spokane/profile/car-buying/zen-car-buying-llc-1296-1000183307/#sealclick"
              target="_blank"
              rel="noreferrer nofollow"
              className="block"
            >
              <img
                src="https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-120-61-bbb-1000183307.png"
                alt="Zen Car Buying LLC BBB Business Review"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300 w-[100px] h-auto"
                style={{ border: 0 }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* BBB Seal for desktop - absolute bottom-right */}
      <div className="hidden sm:flex absolute bottom-4 right-4 md:right-16 z-10 flex-col items-end text-xs text-white">
        <a
          href="https://www.bbb.org/us/wa/spokane/profile/car-buying/zen-car-buying-llc-1296-1000183307/#sealclick"
          target="_blank"
          rel="noreferrer nofollow"
          className="block"
        >
          <img
            src="https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-120-61-bbb-1000183307.png"
            alt="Zen Car Buying LLC BBB Business Review"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300 w-[120px] h-auto"
            style={{ border: 0 }}
          />
        </a>
      </div>
    </section>
  );
}
