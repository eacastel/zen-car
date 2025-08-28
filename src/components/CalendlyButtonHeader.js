import React from "react";
import { motion } from "framer-motion";
import { Link } from "gatsby";
import { openCalendlyPopup } from "../utils/openCalendly";

const CalendlyButtonHeader = ({
  to, // new
  children = "Book a Consultation",
  className = "",
  disabled = false,
  ...rest
}) => {
  const finalClassName = `
    bg-accent hover:bg-accent-dark text-white 
    px-5 py-2 rounded-md font-bold text-sm xl:text-base whitespace-nowrap 
    transition-all duration-200 ease-in-out hover:shadow-md 
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  const ButtonInner = (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
      <span className={finalClassName}>{children}</span>
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} aria-label="Open scheduling page" {...rest}>
        {ButtonInner}
      </Link>
    );
  }

  return (
    <button
      onClick={openCalendlyPopup}
      disabled={disabled}
      className="appearance-none bg-transparent p-0 border-0"
      aria-label="Open scheduling popup"
      {...rest}
    >
      {ButtonInner}
    </button>
  );
};

export default CalendlyButtonHeader;
