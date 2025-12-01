// src/pages/15min.js
import React, { useEffect } from "react";
import Seo from "../components/Seo";
import Layout from "../components/Layout";
import "../utils/openCalendly"; // keeps calendly.event_scheduled listener (Meta CAPI, GA/Ads, etc.)

const CALENDLY_URL =
  "https://calendly.com/zencarbuying/consult-internal-v3" +
  "?hide_landing_page_details=1" +
  "&hide_gdpr_banner=1" +
  "&primary_color=f99f1b" +
  "&text_color=6b8385";

export default function CalendlyInlinePage() {
  useEffect(() => {
    // Load Calendly CSS
    if (!document.querySelector('link[href*="assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Load Calendly JS (auto-inits the data-url div)
    if (!document.querySelector('script[src*="assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }

    // Observe when Calendly injects its iframe
    const parent = document.querySelector(".calendly-inline-widget");
    if (parent) {
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if ([...m.addedNodes].some((n) => n.nodeName === "IFRAME")) {
            // Hide skeleton once iframe appears
            const s = document.getElementById("skeleton");
            if (s) s.style.display = "none";

            // Fire Meta Pixel "Schedule" (parity with popup)
            if (typeof window.fbq === "function") {
              window.fbq("track", "Schedule");
            }

            // Optional: push GTM event too
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "schedule_opened",
              method: "inline",
              page_location: window.location.href,
            });

            observer.disconnect();
            break;
          }
        }
      });
      observer.observe(parent, { childList: true });
    }
  }, []);

  return (
    <Layout>
      <style>{`
        html, body { background: #eaf3f3 !important; }
        .calendly-wrapper {
          background: #fff !important;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: 1rem auto;
          padding: 1rem;
        }
        .calendly-inline-widget {
          background: #fff;
          width: 100% !important;
          min-width: 320px;
          height: 1600px;
          border: none;
        }
        @media (min-width: 768px) { .calendly-inline-widget { height: 1400px; } }
        @media (min-width: 1024px) { .calendly-inline-widget { height: 1200px; } }

        /* Skeleton while waiting for Calendly iframe */
        .skeleton {
          height: 300px;
          background: linear-gradient(90deg,#eee 25%,#ddd 50%,#eee 75%);
          background-size: 400% 100%;
          animation: shimmer 1.2s infinite;
          border-radius: 6px;
        }
        @keyframes shimmer { 0% {background-position:100% 0} 100% {background-position:0 0} }
      `}</style>

      <div className="calendly-wrapper">
        <h1 className="sr-only">Book Your Free 15-Minute Consultation</h1>

        {/* Skeleton placeholder */}
        <div id="skeleton" className="skeleton" />

        {/* Calendly auto-init with data-url */}
        <div
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
    {/* Speed up Calendly fetch */}
    <link rel="dns-prefetch" href="https://assets.calendly.com" />
    <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
    <link rel="preload" href="https://assets.calendly.com/assets/external/widget.css" as="style" />
    <link rel="preload" href="https://assets.calendly.com/assets/external/widget.js" as="script" />
  </>
);
