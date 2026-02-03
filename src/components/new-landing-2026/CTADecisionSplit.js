// src/components/CTADecisionSplit.js
import React from "react";
import ServiceButton from "../ServiceButton";

function Card({ title, body, badge, buttonLabel, buttonTo, buttonColor }) {
  return (
    <div className="rounded-[22px] bg-white border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)] p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#eef6f6] text-primary">
          {badge}
        </span>
      </div>
      <p className="mt-3 text-gray-700">{body}</p>
      <div className="mt-6">
        <ServiceButton size="lg" color={buttonColor} to={buttonTo} className="w-full">
          {buttonLabel}
        </ServiceButton>
      </div>
    </div>
  );
}

export default function CTADecisionSplit({
  left = {
    title: "Talk to a Zen Guide",
    badge: "Best first step",
    body: "Quick call to confirm your needs, timeline, and budget. Then we handle the research and dealer back-and-forth.",
    buttonLabel: "Book Free 15-Minute Call",
    buttonTo: "/vip-consultation/?access=vip",
    buttonColor: "accent",
  },
  right = {
    title: "See Packages First",
    badge: "For pricing-first buyers",
    body: "Review options and pricing, then book the call when you’re ready. No pressure, no surprise fees.",
    buttonLabel: "View Packages",
    buttonTo: "/purchase/",
    buttonColor: "secondary",
  },
  heading = "Choose your next step",
  subheading = "Either path gets you to the same outcome. A better car deal with less stress.",
}) {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-poppins text-primary">{heading}</h2>
          <p className="mt-2 text-gray-700">{subheading}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card {...left} />
          <Card {...right} />
        </div>
      </div>
    </section>
  );
}
