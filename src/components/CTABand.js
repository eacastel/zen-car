// src/components/CTABand.js
import React from "react";
import ServiceButton from "../components/ServiceButton";

export default function CTABand({
  eyebrow = "Ready when you are",
  title = "Get a Zen Guide on your side",
  body = "Book a quick call, or review packages first. Either way, we keep it simple and stress-free.",
  primaryLabel = "Book Free 15-Minute Call",
  primaryTo = "/vip-consultation/?access=vip",
  secondaryLabel = "View Packages",
  secondaryTo = "/purchase/",
}) {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10">
        <div className="rounded-[28px] bg-[#617b7f] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] overflow-hidden">
          <div className="px-6 sm:px-10 py-10">
            <p className="text-sm uppercase tracking-wider opacity-90 font-pirulen">
              {eyebrow}
            </p>

            <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-poppins">{title}</h3>
                <p className="mt-3 text-[#f4fbfb] max-w-2xl">{body}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <ServiceButton size="lg" color="accent" to={primaryTo}>
                  {primaryLabel}
                </ServiceButton>
                <ServiceButton size="lg" color="secondary" to={secondaryTo}>
                  {secondaryLabel}
                </ServiceButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
