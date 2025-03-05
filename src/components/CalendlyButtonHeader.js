import React from "react";
import { motion } from "framer-motion";
import { openCalendlyPopup } from "../utils/openCalendly";

const CalendlyButtonHeader = ({
  children = "Book a Consultation",
  className = "",
  disabled = false,
  ...rest
}) => {
  // Header button styles matching your header "Get Started" style
  const finalClassName = `
    bg-accent hover:bg-accent-dark text-white 
    px-5 py-2 rounded-md font-bold text-sm xl:text-base whitespace-nowrap 
    transition-all duration-200 ease-in-out hover:shadow-md 
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <button onClick={openCalendlyPopup} disabled={disabled} className={finalClassName} {...rest}>
        {children}
      </button>
    </motion.div>
  );
};

export default CalendlyButtonHeader;
