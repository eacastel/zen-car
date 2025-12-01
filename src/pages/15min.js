import React, { useEffect, useState, useRef } from "react";
import Seo from "../components/Seo";
import Layout from "../components/Layout";
import "../utils/openCalendly"; 

export default function CalendlyInlinePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const calendarContainer = useRef(null);

  // Styling params (removed the leading '&' to handle the join cleanly below)
  const STYLE_PARAMS = "hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=f99f1b&text_color=6b8385";

  useEffect(() => {
    // 1. Function to load Calendly Assets
    const loadCalendlyAssets = () => {
      if (!document.querySelector('link[href*="assets/external/widget.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        document.head.appendChild(link);
      }
      
      return new Promise((resolve) => {
        if (window.Calendly) {
          resolve();
        } else {
          const script = document.createElement("script");
          script.src = "https://assets.calendly.com/assets/external/widget.js";
          script.async = true;
          script.onload = () => resolve();
          document.head.appendChild(script);
        }
      });
    };

    // 2. Fetch the Secure Link & Init Widget
    const initCalendar = async () => {
      try {
        console.log("Fetching secure link...");
        const res = await fetch("/.netlify/functions/get-calendly-link");
        
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        
        const data = await res.json();
        console.log("Received URL:", data.url); // Debugging log

        if (!data.url) throw new Error("No URL returned from API");
        
        // Construct final URL
        // If data.url has '?', we append with '&', otherwise '?'
        const separator = data.url.includes("?") ? "&" : "?";
        const finalUrl = `${data.url}${separator}${STYLE_PARAMS}`;

        await loadCalendlyAssets();

        if (calendarContainer.current && window.Calendly) {
          calendarContainer.current.innerHTML = ""; // Clear any skeleton/loading text
          
          window.Calendly.initInlineWidget({
            url: finalUrl,
            parentElement: calendarContainer.current,
            resize: true,
          });
          
          setLoading(false);
        }
      } catch (err) {
        console.error("Calendar Load Error:", err);
        setError(true);
        setLoading(false);
      }
    };

    initCalendar();

    // 3. Observer for Meta/GTM events
    if (calendarContainer.current) {
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if ([...m.addedNodes].some((n) => n.nodeName === "IFRAME")) {
            if (typeof window.fbq === "function") window.fbq("track", "Schedule");
            
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
      observer.observe(calendarContainer.current, { childList: true });
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
          max-width: 800px;
          margin: 0.5rem auto;
          padding: 0rem 1rem;
          min-height: 1200px;
        }
        /* NOTE: Renamed class in CSS to match the div below */
        .calendly-container {
          width: 100%;
          min-width: 320px;
          height: 1200px;
        }
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

        {loading && !error && <div id="skeleton" className="skeleton" />}

        {error && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>We are having trouble loading the calendar.</p>
            <button onClick={() => window.location.reload()} className="btn">
              Retry
            </button>
          </div>
        )}
        <div
          ref={calendarContainer}
          className="calendly-container" 
        />
      </div>
    </Layout>
  );
}

export const Head = () => (
  <>
    <Seo
      title="Book Your Free 15-Minute Consultation"
      description="Schedule your free 15-minute consultation with a Zen Guide."
      pathname="/15min/"
    />
  </>
);