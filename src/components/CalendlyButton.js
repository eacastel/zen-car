import React from "react";
import { motion } from "framer-motion";
import { Link } from "gatsby";

const CalendlyButton = ({
  children = "Book a Consultation",
  color = "accent",
  size = "base",
  className = "",
  disabled = false,
  to = "/15min", // default target
  ...rest
}) => {
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

  const finalClassName = `inline-flex items-center justify-center ${colors[color]} ${sizes[size]} appearance-none border-0 focus:outline-none focus:ring-0 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        className={finalClassName}
        aria-label="Go to scheduling page"
        {...rest}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default CalendlyButton;
