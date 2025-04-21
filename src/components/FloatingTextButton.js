import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FloatingTextButton() {
  const [isVisible, setIsVisible]   = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [isChecked, setIsChecked]   = useState(false);

  if (!isVisible) return null;                // hide if the user dismissed it

  return (
    <>
      {/* ───────────────── Floating Button ───────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Close (X) */}
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss text‑us button"
            className="absolute -top-1 -right-1 bg-primary text-white w-5 h-5 rounded-full text-xs flex items-center justify-center hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md"
          >
            ✕
          </button>

          {/* Text Us */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-3 text-sm font-semibold rounded-full shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex flex-col items-center gap-1 sm:hidden lg:block"
            aria-haspopup="dialog"
            aria-expanded={showModal}
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
          </motion.button>
        </div>
      </div>

      {/* ───────────────── Opt‑in Modal ───────────────── */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold text-primary">
              SMS Consent
            </h2>

            <p className="text-sm">
              By texting our phone number you consent to receive text
              messages from Zen Car Buying, LLC. You can text “STOP” at
              any time to opt out. Message and data rates may apply. Message
              frequency may vary; text “HELP” for assistance. For more
              information please visit our{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-accent"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/sms-terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-accent"
              >
                SMS Terms &amp; Conditions
              </a>
              .
            </p>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={isChecked}
                onChange={e => setIsChecked(e.target.checked)}
              />
              <span>I agree to the SMS Terms above.</span>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md text-sm focus:outline-none hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* Enabled only when the box is ticked */}
              <a
                href={isChecked ? 'sms:+13108803755' : undefined}
                className={`px-4 py-2 rounded-md text-sm text-white ${
                  isChecked ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={!isChecked ? e => e.preventDefault() : undefined}
              >
                Send SMS
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
