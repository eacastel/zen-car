import React from "react";
import { motion } from "framer-motion";

const CalendlyButton = ({ 
  children = "Book a Consultation", 
  color = "accent", 
  size = "base", 
  className = "", 
  disabled = false, 
  ...rest 
}) => {
  const openCalendly = () => {
  if (typeof window !== "undefined" && window.Calendly) {
    document.body.style.overflow = "auto"; // ✅ Restore scrolling before opening Calendly

    window.Calendly.initPopupWidget({
      url: "https://calendly.com/zencarbuying?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=f99f1b&text_color=6b8385&background_color=eaf3f3",
    });

    // ✅ Ensure full size & allow outside click to close
    setTimeout(() => {
      const calendlyOverlay = document.querySelector(".calendly-popup");
      if (calendlyOverlay) {
        calendlyOverlay.style.width = "100vw";
        calendlyOverlay.style.height = "100vh";
        calendlyOverlay.style.maxHeight = "100vh";
        calendlyOverlay.style.overflow = "hidden";
      }

      // ✅ Ensure the popup closes when clicking outside
      const overlay = document.querySelector(".calendly-overlay");
      if (overlay) {
        overlay.addEventListener("click", () => {
          window.Calendly.closePopupWidget();
        });
      }
    }, 500);
  }
};

  // Tailwind styles
  const sizes = {
    sm: "px-4 py-2 text-sm",
    base: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const colors = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    accent: "bg-accent hover:bg-accent-dark text-white",
    secondary: "bg-secondary text-primary hover:bg-secondary-dark",
  };

  const finalClassName = `${colors[color]} ${sizes[size]} appearance-none border-0 focus:outline-none focus:ring-0 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <button 
        onClick={openCalendly} 
        disabled={disabled} 
        className={finalClassName} 
        {...rest}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default CalendlyButton;
