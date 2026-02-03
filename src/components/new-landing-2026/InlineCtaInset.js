// src/components/InlineCtaInset.js
import React from "react";
import ServiceButton from "../ServiceButton";

export default function InlineCtaInset({
  title = "Want a clearer plan in 15 minutes?",
  subtitle = "Book a quick call and we’ll map your next steps with zero pressure.",
  primaryLabel = "Book Free Call",
  primaryTo = "/vip-consultation/?access=vip",
  secondaryLabel = "View Packages",
  secondaryTo = "/purchase/",
}) {
  return (
    <section className="relative -mt-10 mb-10">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div
          className="
            rounded-2xl
            bg-white/80
            backdrop-blur
            border border-white/60
            shadow-[0_18px_40px_rgba(0,0,0,0.14)]
            px-6 py-6
            md:px-10 md:py-8
          "
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-lg md:text-xl font-semibold text-primary capitalize">
                {title}
              </h3>
              <p className="text-sm md:text-base text-gray-700 mt-1">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <ServiceButton to={primaryTo} size="lg" color="accent">
                {primaryLabel}
              </ServiceButton>
              <ServiceButton to={secondaryTo} size="lg" color="secondary">
                {secondaryLabel}
              </ServiceButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
