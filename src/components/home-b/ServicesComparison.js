// src/components/home-b/ServicesComparison.js
import React from "react";
import { Link } from "gatsby";

const Card = ({ title, desc, price, cta, anchor, variant = "primary", onClick }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
    <h3 className="text-xl font-semibold text-primary">{title}</h3>
    <p className="text-gray-600">{desc}</p>
    <p className="text-2xl font-bold">{price}</p>
    <Link
      to={anchor}
      onClick={onClick}
      className={
        variant === "outline"
          ? "inline-flex items-center justify-center rounded-lg px-5 py-3 border border-primary text-primary hover:bg-primary/5 transition"
          : "inline-flex items-center justify-center rounded-lg px-5 py-3 bg-[#F99F1B] text-black font-semibold hover:opacity-90 transition"
      }
      aria-label={cta}
    >
      {cta}
    </Link>
  </div>
);

export default function ServicesComparison() {
  return (
    <section id="pricing" className="py-16 bg-gray-50" aria-labelledby="plans-heading">
      <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
        <h2 id="plans-heading" className="text-3xl md:text-4xl font-medium text-primary text-center mb-2">
          Choose your starting point
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Crystal-clear options: jump straight into concierge, or begin with a free call.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            title="Full Zen Experience"
            desc="Research, sourcing, negotiation, and delivery coordination. We handle everything."
            price="$850 flat"
            cta="Start Full Concierge"
            anchor="/#start-concierge"
            onClick={() =>
              typeof window !== "undefined" &&
              window.dataLayer?.push({ event: "cta_click", cta_action: "purchase_start", cta_label: "FullZenCard", cta_location: "services" })
            }
          />
          <Card
            title="Research + Inventory"
            desc="We find the best 3–5 matches nationwide and guide your next steps."
            price="$450 flat"
            cta="Start Research"
            anchor="/#start-research"
            variant="outline"
            onClick={() =>
              typeof window !== "undefined" &&
              window.dataLayer?.push({ event: "cta_click", cta_action: "purchase_start", cta_label: "ResearchCard", cta_location: "services" })
            }
          />
          <Card
            title="Free 15-min Consultation"
            desc="Not sure yet? Talk with Brian and get precise next steps."
            price="Free"
            cta="Book Free Call"
            anchor="/#book-call"
            variant="outline"
            onClick={() =>
              typeof window !== "undefined" &&
              window.dataLayer?.push({ event: "cta_click", cta_action: "book_consult", cta_label: "FreeCallCard", cta_location: "services" })
            }
          />
        </div>
      </div>
    </section>
  );
}
