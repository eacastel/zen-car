// src/pages/15min.js
import React, { useEffect } from "react";
import Seo from "../components/Seo";
import Layout from "../components/Layout";
import "../utils/openCalendly"; // keeps calendly.event_scheduled listener

const CALENDLY_URL =
  "https://calendly.com/zencarbuying/15-minute-consultation-with-a-zen-guide" +
  "?hide_landing_page_details=1" +
  "&hide_gdpr_banner=1" +
  "&primary_color=f99f1b" +
  "&text_color=6b8385";

export default function CalendlyInlinePage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Calendly CSS
    if (!document.querySelector('link[href*="assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Calendly script
    if (!document.querySelector('script[src*="assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  },

    []);

  return (
    <Layout>
      <style>{`
        html, body {
          background: #eaf3f3 !important; 
        }
        .calendly-wrapper {
        
          background: #ffffff !important; 
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: 1rem auto; /* space around box */
          padding: 1rem; /* optional breathing room */
        }
        .calendly-inline-widget {
        background: #fff; /* white box for calendar */
          width: 100% !important;
          min-width: 320px;
          height: 1600px; /* tall enough to avoid scrollbar */
          border: none;
        }
        @media (min-width: 768px) {
          .calendly-inline-widget { height: 1400px; }
        }
        @media (min-width: 1024px) {
          .calendly-inline-widget { height: 1200px; }
        }
      `}</style>

      <div className="calendly-wrapper">
        <h1 className="sr-only">Book Your Free 15-Minute Consultation</h1>
        <div
          id="calendly-inline-parent"
          className="calendly-inline-widget"
          data-url={CALENDLY_URL}          
          role="region"
          aria-label="Calendly scheduling options"
        />
        <p className="sr-only">
          If the calendar doesn’t load,{" "}
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
            open it in a new tab
          </a>
          .
        </p>
      </div>
    </Layout>
  );
}
 
export const Head = () => (
  <>
    <Seo
      title="Book Your Free 15-Minute Consultation"
      description="Schedule your free 15-minute consultation with a Zen Guide. We'll help you find the perfect used car without the stress."
      pathname="/15min/"
    />
    <link rel="dns-prefetch" href="https://assets.calendly.com" />
    <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
  </>
);
