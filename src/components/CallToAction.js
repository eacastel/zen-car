import React from 'react';
import CalendlyButton from "../components/CalendlyButton";

export default function CallToAction() {
  return (
    <section
      className="bg-accent text-white py-20 text-center"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
        <h2
          id="cta-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight"
        >
          Ready to Find Your{" "}
          <span className="text-primary">Perfect Car?</span>
        </h2>

        <p className="text-lg md:text-xl mb-6">
          Get expert guidance and stress-free car buying at the best prices.
        </p>

        <div className="inline-block">
          <CalendlyButton size="lg" color="primary">
            Schedule Your Free Consultation
          </CalendlyButton>
        </div>
      </div>
    </section>
  );
}
