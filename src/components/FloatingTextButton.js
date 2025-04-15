import React, { useState } from "react";
import { motion } from "framer-motion";

const FloatingTextButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null; // Hide the button if dismissed

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Close (X) Button */}
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss text us button"
          className="absolute -top-1 -right-1 bg-primary text-white w-5 h-5 rounded-full  text-xs flex items-center justify-center hover:bg-secondary transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md"
        >
          ✕
        </button>

        {/* Text Us Button */}
        <motion.a
          href="sms:+13108803755"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-primary text-white px-4 py-3 text-sm font-semibold rounded-full shadow-lg transition-all ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex flex-col items-center justify-center gap-1 sm:hidden lg:block"
          aria-label="Send a text message to Zen Car Buying"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 mx-auto"
            aria-hidden="true"
          >
            <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22H2L4.92893 19.0711C3.11929 17.2614 2 14.7614 2 12Z" />
          </svg>
          <span className="leading-none text-center">Text Us</span>
        </motion.a>
      </div>
    </div>
  );
};

export default FloatingTextButton;
