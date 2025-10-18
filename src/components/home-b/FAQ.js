// src/components/home-b/FAQ.js
import React from "react";

const Q = ({ q, a }) => (
  <details className="group rounded-lg bg-white p-5 shadow-sm open:shadow-md transition">
    <summary className="cursor-pointer list-none flex items-center justify-between">
      <h3 className="text-base md:text-lg font-semibold text-primary">{q}</h3>
      <span className="ml-4 text-gray-400 group-open:rotate-180 transition">▾</span>
    </summary>
    <div className="mt-3 text-gray-600">{a}</div>
  </details>
);

export default function FAQ() {
  return (
    <section id="faq" className="py-16 bg-secondary/20" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-medium text-primary text-center mb-8">
          FAQs
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Q q="Do you work nationwide?" a="Yes. We find and negotiate cars across the U.S. and help coordinate shipping." />
          <Q q="Do I pay before you find cars?" a="For paid plans, yes — flat fee, no hidden costs. Free consult available if you’re not ready." />
          <Q q="How long does it take?" a="Most clients see top matches in 2–5 business days; full concierge varies with inventory." />
          <Q q="Can you help with financing?" a="We’ll advise on lender options and secure, dealer-proof steps; we are not a lender." />
        </div>
      </div>
    </section>
  );
}
