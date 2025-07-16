import React, { useEffect, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);

  const data = useStaticQuery(graphql`
    query {
      starbucksCard: file(relativePath: { eq: "starbucks-giftcard.png" }) {
        childImageSharp {
          gatsbyImageData(width: 200, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  `);
  const starbucksImage = getImage(data.starbucksCard);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const excludedPaths = ["/15min", "/thank-you"];
    const currentPath = window.location.pathname;
    if (excludedPaths.includes(currentPath)) return;

    const shownAt = localStorage.getItem("exitIntentShownAt");
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

    if (shownAt && Date.now() - parseInt(shownAt, 10) < SEVEN_DAYS) return;

    const isMobile = window.innerWidth < 768;

    const showPopup = () => {
      setVisible(true);
      localStorage.setItem("exitIntentShownAt", Date.now().toString());
    };

    // Exit intent for desktop
    if (!isMobile) {
      const handleMouseMove = (e) => {
        if (e.clientY < 10) {
          showPopup();
          document.removeEventListener("mousemove", handleMouseMove);
        }
      };
      const delay = setTimeout(() => {
        document.addEventListener("mousemove", handleMouseMove);
      }, 3000);

      return () => {
        clearTimeout(delay);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }

    // Scroll intent for mobile
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
      if (scrollPercent > 50) {
        showPopup();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    if (visible) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible]);

  const handleClose = () => setVisible(false);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      // GTM tracking
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "exit_intent_call_click",
        label: "Exit Intent Popup",
      });

      // Call scheduling logic
      if (window.openCalendlyPopup) {
        window.openCalendlyPopup();
      } else {
        window.location.href = "/15min";
      }
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-secondary rounded-2xl shadow-2xl pt-0 pb-0 font-poppins animate-fade-in overflow-hidden"
      >
        {/* Top bar */}
        <div className="bg-primary text-white text-md uppercase tracking-wider font-pirulen py-3 text-center">
          Free 15-minute call!
        </div>

        {/* Close X */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main content */}
        <div className="bg-white mx-0 mt-0 mb-2 p-6 rounded-xl text-center">
          {starbucksImage && (
            <GatsbyImage
              image={starbucksImage}
              alt="Free $5 Starbucks Gift Card"
              className="mx-auto mb-6 w-40 rounded-lg shadow-xl -rotate-2 opacity-80"
            />
          )}
          <h2 className="text-2xl font-medium text-accent mb-3 font-poppins">
            Get a $5 Starbucks Gift Card
          </h2>
          <p className="text-md text-primary mb-3">
            Complete a free 15-minute call with one of our Zen Guides and we'll send you a $5 Starbucks card — on us!
          </p>
          <button
            onClick={handleClick}
            className="bg-accent text-white px-6 py-2 rounded-full shadow hover:bg-accent-dark transition font-medium"
          >
            Book My Free Call
          </button>
        </div>

        {/* Bottom footer */}
        <div className="text-primary text-xs text-center pt-1 pb-3 px-4">
          *Gift card delivered after completed call. No stress. No obligations. Just friendly expert advice.
        </div>
      </div>
    </div>
  );
}
