import React from "react"
import ServiceButton from "../ServiceButton"

export default function LandingHero({
  eyebrow,
  title,
  description,
  accentLine,
  ctaNote,
  ctaSubnote,
  primaryCta,
  secondaryCta,
  badgeItems = [],
  heroImage,
}) {
  return (
    <section className="relative overflow-hidden rounded-b-[40px] bg-[#617b7f] text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,159,27,0.22),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_32%)]" />
      <div
        className="absolute right-0 top-0 h-full w-full opacity-20"
        style={
          heroImage
            ? {
                backgroundImage: `linear-gradient(120deg, rgba(24,40,43,0.92), rgba(97,123,127,0.15)), url(${heroImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : undefined
        }
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:max-w-[1280px] pt-16 pb-14 md:pt-20 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] items-center">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-sm tracking-[0.12em] text-accent font-pirulen mb-5">
                {eyebrow}
              </p>
            )}
            <h1 className="text-[38px] leading-[1.05] md:text-[56px] font-poppins mb-5">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-[60ch] mb-4">
              {description}
            </p>
            {accentLine && (
              <p className="text-base md:text-lg text-accent max-w-[52ch] mb-8">
                {accentLine}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 max-w-[560px]">
              {primaryCta && (
                <ServiceButton
                  to={primaryCta.to}
                  size="lg"
                  color="accent"
                  trackingEvent="cta_click"
                  trackingLabel={primaryCta.label}
                  trackingLocation={primaryCta.location}
                  trackingDestination={primaryCta.to}
                  trackingPayload={primaryCta.trackingPayload}
                >
                  {primaryCta.text}
                </ServiceButton>
              )}
              {secondaryCta && (
                <ServiceButton
                  to={secondaryCta.to}
                  size="lg"
                  color="secondary"
                  trackingEvent="cta_click"
                  trackingLabel={secondaryCta.label}
                  trackingLocation={secondaryCta.location}
                  trackingDestination={secondaryCta.to}
                  trackingPayload={secondaryCta.trackingPayload}
                >
                  {secondaryCta.text}
                </ServiceButton>
              )}
            </div>
            {ctaNote && (
              <p className="mt-4 max-w-[42rem] text-sm md:text-base text-white/80">
                {ctaNote}
              </p>
            )}
            {ctaSubnote && (
              <p className="mt-2 max-w-[42rem] text-sm md:text-base text-white/90">
                {ctaSubnote}
              </p>
            )}
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 md:p-8 backdrop-blur shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
            <p className="text-sm tracking-[0.12em] text-white/70 mb-4">
              Why buyers use Zen Car Buying
            </p>
            <div className="space-y-4">
              {badgeItems.map(item => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
