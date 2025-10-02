// src/components/InlineReviewCard.js
import React from "react";
import testimonials from "../data/testimonials.json";

export default function InlineReviewCard({ index = 0 }) {
  const t = testimonials[index % testimonials.length];

  if (!t) return null;

  const reviewLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: t.quote,
    author: { "@type": "Person", name: t.name },
    itemReviewed: { "@type": "Service", name: "Zen Car Buying – Concierge" },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    publisher: { "@type": "Organization", name: "Zen Car Buying" }
  };

  return (
    <aside
      className="my-8 p-5 bg-white border border-secondary rounded-lg shadow-sm"
      aria-label="Customer review"
    >
      <p className="text-lg italic text-primary">“{t.quote}”</p>
      <div className="mt-3 text-sm text-gray-700 font-semibold">— {t.name}</div>
      {/*
        <div className="mt-4">
          <a
            href="/reviews/"
            className="inline-block px-3 py-2 text-sm rounded-md bg-accent text-white hover:opacity-90"
          >
            Read more reviews
          </a>
        </div>
      */}
      <script type="application/ld+json">
        {JSON.stringify(reviewLd)}
      </script>
    </aside>
  );
}
