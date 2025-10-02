// src/components/StickySidebarCta.js
import React from "react";
import CalendlyButton from "./CalendlyButton";


export default function StickySidebarCta() {
  return (
    <div className="sticky top-24 border border-secondary bg-white rounded-lg shadow-md p-5">
      <h3 className="text-xl font-bold text-primary mb-2">
        Ready to skip the dealership hassle?
      </h3>
      <ul className="list-disc ml-5 text-sm text-primary mb-4">
        <li>We find the right car & deal</li>
        <li>You avoid upsells & games</li>
        <li>Nationwide search, fast</li>
      </ul>
            <CalendlyButton size="lg" color="accent">
              Start Your Search
            </CalendlyButton>
      <p className="mt-3 text-xs text-gray-600">
        No pressure. 15-minute clarity call.
      </p>
    </div>
  );
}
