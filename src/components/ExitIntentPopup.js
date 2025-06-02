import React, { useEffect, useState } from "react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("exitIntentShown");
    if (alreadyShown) return;

    const isMobile = window.innerWidth < 768;

    const showPopup = () => {
      setVisible(true);
      sessionStorage.setItem("exitIntentShown", "true");
    };

    if (isMobile) {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
        if (scrollPercent > 50) {
          showPopup();
          window.removeEventListener("scroll", handleScroll);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
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
  }, []);

  const handleClose = () => setVisible(false);

  const handleClick = () => {
    if (typeof window !== "undefined" && window.openCalendlyPopup) {
      window.openCalendlyPopup();
    } else {
      window.location.href = "/15min";
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
  <div className="relative w-full max-w-md bg-secondary rounded-2xl shadow-2xl pt-0 pb-0 font-poppins animate-fade-in overflow-hidden">

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

    {/* Main content box */}
    <div className="bg-white mx-0 mt-0 mb-2 p-6 rounded-xl text-center">
      <h2 className="text-2xl font-medium text-accent mb-3">
        Find the Right Car For You!
      </h2>
      <p className="text-md text-primary mb-5">
        Get your free 15 minute call with one of our Zen Guides. Your perfect car might already be out there—we’ll help you find it with ease, insight, and zero pressure.
      </p>
      <button
        onClick={handleClick}
        className="bg-accent text-white px-6 py-2 rounded-full shadow hover:bg-accent-dark transition font-medium"
      >
        Book My Free Call
      </button>
    </div>

    {/* Bottom footer */}
    <div className=" text-primary text-xs text-center pt-1 pb-3 px-4">
      *No stress. No obligations. Just friendly expert advice.
    </div>

  </div>
</div>
  );
}
