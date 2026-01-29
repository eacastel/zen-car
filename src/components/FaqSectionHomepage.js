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
            question="What car brands do you specialize in?"
            answer="We work with all major makes and models. We’re especially experienced with premium and luxury brands, but the process works the same no matter what you’re buying."
          />
          <FaqItem
            question="Do I pay the dealer or you?"
            answer="You pay the dealer directly for the vehicle. You pay Zen Car Buying a flat service fee. We don’t mark up the price of the car."
          />
          <FaqItem
            question="Can you help with trade-ins?"
            answer="Yes. We can help you compare options and guide you to the strongest trade-in path so you don’t leave value on the table."
          />
          <FaqItem
            question="How does delivery work?"
            answer="If the car is local, you can pick it up or we can arrange drop-off. If it’s out of state, we coordinate transport to bring it to your driveway."
          />
        </div>
      </div>
    </section>
  );
}
