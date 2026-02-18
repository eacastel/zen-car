// src/components/CTAMicroInline.js
import React from "react"
import ServiceButton from "../ServiceButton"

export default function CTAMicroInline({
  text = "Want a clearer plan in 15 minutes?",
  primaryLabel = "Book Free Call",
  primaryTo = "/vip-consultation/vip/",
  secondaryLabel = "View Packages",
  secondaryTo = "/purchase/",
}) {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <div className="rounded-[20px] bg-[#eef6f6] border border-black/10 px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-primary font-semibold text-lg">{text}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <ServiceButton
              size="base"
              color="accent"
              to={primaryTo}
              trackingEvent="cta_click"
              trackingLabel="micro_inline_primary"
              trackingLocation="cta_micro_inline"
            >
              {primaryLabel}
            </ServiceButton>
            <ServiceButton
              size="base"
              color="secondary"
              to={secondaryTo}
              trackingEvent="cta_click"
              trackingLabel="micro_inline_secondary"
              trackingLocation="cta_micro_inline"
            >
              {secondaryLabel}
            </ServiceButton>
          </div>
        </div>
      </div>
    </section>
  )
}
