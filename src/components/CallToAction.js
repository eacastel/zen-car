import React from 'react';
import ServiceButton from "../components/ServiceButton";

export default function CallToAction() {
  return (
    <section
      className="bg-accent text-white py-20 text-center"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
        <h2
          id="cta-heading"
          className="text-3xl !leading-snug md:text-4xl lg:text-5xl font-medium mb-6 "
        >
          "Experience the joy of {" "}
          <span className="text-white">compassionate car buying."</span>
        </h2>

        <p className="text-lg md:text-xl mb-6">
          Get expert guidance and stress-free car buying at the best prices.
        </p>

        <div className="inline-block">
          <ServiceButton  to="/vip-consultation/vip/" size="lg" color="primary">
            Book Your Free 15-Minute Call
          </ServiceButton>
        </div>
      </div>
    </section>
  );
}
