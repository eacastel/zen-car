// src/components/Hero.js
import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import CalendlyButton from '../../components/CalendlyButton';

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

  const handleTrack = (action, label) => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cta_click',
        cta_action: action,
        cta_label: label,
        cta_location: 'hero',
      });
    } catch (_) {}
  };

  return (
    <section className="relative w-full h-[600px]" aria-labelledby="hero-title">
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

          {/* Dual CTAs: Left = Appointment (Calendly), Right = Purchase */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5"
            role="group"
            aria-label="Primary actions"
          >
            {/* Left: Book Appointment (Free Consultation) */}
            <CalendlyButton
              size="lg"
              color="accent"
              aria-label="Book a free 15-minute consultation"
              onClick={() => handleTrack('book_consult', 'CalendlyButton')}
            >
              Book Free 15-min Call
            </CalendlyButton>

            {/* Right: Purchase (Full Concierge) */}
            {/* If you have a dedicated section on the page, use the anchor. Otherwise point to your start/checkout route */}
            <Link
              to="/#start-concierge"
              onClick={() => handleTrack('purchase_start', 'FullZenHero')}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 bg-[#F99F1B] text-black hover:opacity-90 transition"
              aria-label="Start Full Concierge Service purchase"
            >
              Start Full Concierge Service – $850
            </Link>
          </div>

          {/* BBB Seal for mobile - directly under buttons */}
          <div className="sm:hidden flex justify-center mt-8">
            <a
              href="https://www.bbb.org/us/wa/spokane/profile/car-buying/zen-car-buying-llc-1296-1000183307/#sealclick"
              target="_blank"
              rel="noreferrer noopener nofollow"
              className="block"
              aria-label="Zen Car Buying BBB Business Review"
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
          rel="noreferrer noopener nofollow"
          className="block"
          aria-label="Zen Car Buying BBB Business Review"
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
