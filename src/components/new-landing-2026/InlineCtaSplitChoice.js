// src/components/InlineCtaSplitChoice.js
import React from "react"
import ServiceButton from "../ServiceButton"

export default function InlineCtaSplitChoice({
  eyebrow = "Choose your next step",
  sub = "Pick what works best for you.",
  leftTitle = "Talk to a Zen Guide",
  leftBody = "Schedule an introductory call based on your schedule!",
  leftCta = "Book Free 15-Minute Call",
  leftTo = "/vip-consultation/vip/",
  rightTitle = "See Packages First",
  rightBody = "Review options and pricing. Book the call when you’re ready.",
  rightCta = "View Packages",
  rightTo = "/purchase/",
}) {
  return (
    <section className="py-14">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-primary capitalize">
            {eyebrow}
          </h3>
          <p className="text-gray-700 mt-2">{sub}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.10)] p-7">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold text-primary">
                {leftTitle}
              </h4>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#EAF4F4] text-primary">
                Best first step
              </span>
            </div>
            <p className="text-gray-700 mt-3">{leftBody}</p>
            <div className="mt-6">
              <ServiceButton
                to={leftTo}
                size="lg"
                color="accent"
                className="w-full"
                trackingEvent="cta_click"
                trackingLabel="inline_split_left"
                trackingLocation="inline_cta_split_choice"
              >
                {leftCta}
              </ServiceButton>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.10)] p-7">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold text-primary">
                {rightTitle}
              </h4>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#F3F4F6] text-gray-700">
                Pricing-first
              </span>
            </div>
            <p className="text-gray-700 mt-3">{rightBody}</p>
            <div className="mt-6">
              <ServiceButton
                to={rightTo}
                size="lg"
                color="secondary"
                className="w-full"
                trackingEvent="cta_click"
                trackingLabel="inline_split_right"
                trackingLocation="inline_cta_split_choice"
              >
                {rightCta}
              </ServiceButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
