import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FloatingTextButton() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null; // hide if the user dismissed it

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Close (X) */}
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss text‑us button"
          className="absolute -top-1 -right-1 bg-primary text-white w-5 h-5 rounded-full text-xs flex items-center justify-center hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md sm:hidden"
        >
          ✕
        </button>

        {/* Text Us */}
        <motion.a
          href="sms:+18886516088"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-primary text-white px-4 py-3 text-sm font-semibold rounded-full shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex flex-col items-center gap-1 sm:hidden"
          aria-label="Send SMS to Zen Car Buying"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
            aria-hidden="true"
          >
            <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10H2l3-3C3.119 17.261 2 14.761 2 12z" />
          </svg>
          <span className="leading-none">Text Us</span>
        </motion.a>
      </div>
    </div>
  );
}
