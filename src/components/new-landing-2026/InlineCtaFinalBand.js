// src/components/InlineCtaFinalBand.js
import React from "react";
import ServiceButton from "../ServiceButton";

export default function InlineCtaFinalBand({
  title = "Ready when you are.",
  subtitle = "Get expert guidance and a calmer way to buy, without dealership pressure.",
  primaryLabel = "Book Free Call",
  primaryTo = "/vip-consultation/?access=vip",
  secondaryLabel = "View Packages",
  secondaryTo = "/purchase/",
}) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            bg-[#617b7f]
            text-white
            shadow-[0_18px_40px_rgba(0,0,0,0.20)]
          "
        >
          <div className="px-6 py-10 md:px-12 md:py-12">
            <h3 className="text-3xl md:text-4xl font-semibold">{title}</h3>
            <p className="text-white/90 mt-3 max-w-2xl">{subtitle}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <ServiceButton to={primaryTo} size="lg" color="accent">
                {primaryLabel}
              </ServiceButton>
              <ServiceButton to={secondaryTo} size="lg" color="secondary">
                {secondaryLabel}
              </ServiceButton>
            </div>
          </div>

          {/* subtle highlight sweep */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
