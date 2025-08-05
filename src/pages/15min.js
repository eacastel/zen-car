// src/pages/15min.js
import React, { useEffect } from "react";
import { openCalendlyPopup } from "../utils/openCalendly";
import Seo from "../components/Seo";
import Layout from "../components/Layout";

export default function CalendlyPopupPage() {
  useEffect(() => {
    openCalendlyPopup();
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-center h-[80vh] text-center px-4">
        <p className="text-xl text-primary">
          Loading your 15-minute consultation... If the popup doesn’t appear,
          <br />
          <a
            href="https://calendly.com/zencarbuying/15-minute-consultation-with-a-zen-guide"
            className="underline text-accent font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here to open the calendar directly
          </a>.
        </p>
      </div>
    </Layout>
  );
}

export const Head = () => (
  <Seo
    title="Book Your Free 15-Minute Consultation"
    description="Schedule your free 15-minute consultation with a Zen Guide. We'll help you find the perfect used car without the stress."
    pathname="/15min/"
  />
);
