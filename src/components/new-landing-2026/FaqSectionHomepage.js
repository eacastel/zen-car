// src/components/FaqSectionHomepage.js

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="border-b border-black/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-[16px] sm:text-lg font-semibold text-[#1f2a2c] leading-tight">
          {question}
        </span>

        <span
          className="
            shrink-0
            inline-flex items-center justify-center
            w-9 h-9 rounded-full
            bg-[#f99f1b]/10
            border border-[#f99f1b]/25
          "
          aria-hidden="true"
        >
          <ChevronDown
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            size={18}
            color="#f99f1b"
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-10 text-[15px] sm:text-base text-[#1f2a2c]/75 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FaqSectionHomepage() {
  return (
    <section aria-label="Frequently Asked Questions" className="py-16 bg-secondary">
      <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1f2a2c]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#1f2a2c]/70">
            Quick answers to the most common questions before you book.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-[28px] shadow-[0_22px_50px_rgba(0,0,0,0.12)] border border-black/10 px-6 sm:px-8">
          <FaqItem
            question="What kinds of transactions do you support?"
            answer="We do everything from leases, to financing and cash deals."
          />
          <FaqItem
            question="What brands?"
            answer="We work with all makes and models ranging from premium luxury brands to budget vehicles including new and used."
          />
          <FaqItem
            question="Am I buying the car from you?"
            answer="You buy the car directly from the dealer; however, we negotiate the best price and coordinate all the paper work."
          />
          
        </div>
      </div>
    </section>
  );
}
