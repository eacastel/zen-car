import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";
import Seo from "../components/Seo";
import Layout from "../components/Layout";
import Turnstile from "react-turnstile";
import "../utils/openCalendly";

export default function VipConsultationPage({ forceVip = false }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // 1. Authorization State
  const [isAuthorized, setIsAuthorized] = useState(false);
  const calendarContainer = useRef(null);

  // Get Key from Env
  const SITE_KEY = process.env.GATSBY_TURNSTILE_SITE_KEY;
  const STYLE_PARAMS = "hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=f99f1b&text_color=6b8385";

  // -------------------------------------------
  // STEP 1: THE GATEKEEPER (Check URL Params)
  // -------------------------------------------
useEffect(() => {
  
  if (forceVip) {
    setIsAuthorized(true);
    return;
  }

  const path = window.location.pathname.replace(/\/+$/, "");
  const isVipPath = path === "/vip-consultation/vip";
  const params = new URLSearchParams(window.location.search);
  const accessCode = params.get("access");

  if (!(isVipPath || accessCode === "vip")) {
    console.warn("Unauthorized access attempt");
    navigate("/");
  } else {
    setIsAuthorized(true);
  }
}, [forceVip]);

  // -------------------------------------------
  // STEP 2: HELPER FUNCTIONS
  // -------------------------------------------
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

  // -------------------------------------------
  // STEP 3: TURNSTILE VERIFICATION
  // -------------------------------------------
  const handleTurnstileVerify = async (token) => {
    try {
      console.log("Human verified. Fetching secure link...");

      const res = await fetch("/.netlify/functions/get-calendly-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) throw new Error("Verification failed");

      const data = await res.json();
      if (!data.url) throw new Error("No URL returned");

      const separator = data.url.includes("?") ? "&" : "?";
      const finalUrl = `${data.url}${separator}${STYLE_PARAMS}`;

      await loadCalendlyAssets();

      if (calendarContainer.current && window.Calendly) {
        calendarContainer.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: finalUrl,
          parentElement: calendarContainer.current,
          resize: true,
        });
        setLoading(false);
      }
    } catch (err) {
      console.error("Load Error:", err);
      setError(true);
      setLoading(false);
    }
  };

  // -------------------------------------------
  // STEP 4: META / GTM TRACKING
  // -------------------------------------------
  useEffect(() => {
    if (calendarContainer.current && isAuthorized) {
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
  }, [isAuthorized]);

  // -------------------------------------------
  // RENDER
  // -------------------------------------------

  // If not authorized yet, render nothing (or a spinner) to prevent content flash
  if (!isAuthorized) {
    return null;
  }

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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes shimmer { 0% {background-position:100% 0} 100% {background-position:0 0} }
      `}</style>

      <div className="calendly-wrapper">
        <h1 className="sr-only">VIP Consultation</h1>

        {loading && !error && (
          <div id="skeleton" className="skeleton">
            {SITE_KEY && (
              <Turnstile
                sitekey={SITE_KEY}
                onVerify={handleTurnstileVerify}
                theme="light"
                appearance="interaction-only"
              />
            )}
            {!SITE_KEY && <p>Loading Security...</p>}
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>Verification failed. Please refresh.</p>
          </div>
        )}

        <div ref={calendarContainer} className="calendly-container" />
      </div>
    </Layout>
  );
}

export const Head = () => (
  <Seo
    title="VIP Consultation"
    description="Schedule your consultation with a Zen Guide."
    pathname="/vip-consultation/"
    noIndex={true}
  />
);