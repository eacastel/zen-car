import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import CalendlyButton from "../../components/CalendlyButton";

const HeroSection = ({ heroBg }) => {
  return (
    <section 
      className="relative py-20 px-4 md:p-40 flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <GatsbyImage
          image={heroBg}
          alt="Luxury car parked in an urban setting at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative container mx-auto px-4 text-center text-white max-w-3xl z-10">
        <div className="inline-block p-6 md:p-12 border-2 border-accent rounded-xl" role="presentation">
          <h1 
            id="hero-heading" 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight"
          >
            Discover Your Perfect Car Buying Experience
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">
            Schedule a free 15‑minute consultation with a Zen guide today.
          </p>
          <div className="flex justify-center">
          <CalendlyButton size="lg" color="accent">
          Schedule Your Free Consultation
        </CalendlyButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
