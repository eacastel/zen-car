import React from "react";
import { motion } from "framer-motion";

const FloatingTextButton = () => {
  return (
    <motion.a
      href="sms:+18886516088"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 bg-primary text-white px-4 py-3 text-sm font-semibold rounded-full shadow-lg transition-all ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex flex-col items-center justify-center gap-1 sm:hidden lg:block"
      aria-label="Send a text message to Zen Car Buying"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 mx-auto"
        aria-hidden="true"
      >
        <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22H2L4.92893 19.0711C3.11929 17.2614 2 14.7614 2 12ZM6.82843 20H12C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.1524 4.85124 16.1649 6.34315 17.6569L7.75736 19.0711L6.82843 20ZM8 13H16C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13Z" />
      </svg>
      <span className="leading-none text-center">Text Us</span>
    </motion.a>
  );
};

export default FloatingTextButton;
