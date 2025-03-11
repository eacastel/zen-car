import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";

const ButtonHeader = ({
  to = "/pricing",  // Default link to /pricing
  onClick,          // Added onClick prop handling
  children = "Getting Started",
  color = "accent",
  size = "base",
  className = "",
  disabled = false,
  ...rest
}) => {
  const finalClassName = `bg-accent hover:bg-accent-dark text-white 
    px-5 py-2 rounded-md font-bold text-sm xl:text-base whitespace-nowrap 
    transition-all duration-200 ease-in-out hover:shadow-md 
    focus:outline-none ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  // Ensures `onClick` is treated only as a function
  const handleClick = typeof onClick === 'function' ? onClick : undefined;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {handleClick ? (
        <button
          onClick={handleClick}
          disabled={disabled}
          className={finalClassName}
          {...rest}
        >
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className={finalClassName}
          {...rest}
        >
          {children}
        </Link>
      )}
    </motion.div>
  );
};

export default ButtonHeader;
