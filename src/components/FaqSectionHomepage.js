

// src/components/FaqSectionHomepage.js

import React from "react";

    const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-slate-800">{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          color="#f99f1b"
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const Section = ({ className, children, id }) => (
  <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
    <div className="container mx-auto max-w-6xl">{children}</div>
  </section>
);


export default function FaqSectionHomepage() {
  return (

      <Section className="bg-[#f8fafc]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <FaqItem
            question="What car brands do you specialize in?"
            answer="We specialize in German luxury vehicles including Mercedes-Benz, BMW, Audi, and Porsche. However, we can assist with most major makes and models."
          />
          <FaqItem
            question="Do I pay the dealer or you?"
            answer="You pay the dealer directly for the vehicle. You pay us a small flat fee for our service. We never mark up the price of the car."
          />
          <FaqItem
            question="Can you help with trade-ins?"
            answer="Absolutely. We can solicit bids for your trade-in from multiple sources to ensure you get the highest possible value, rather than just what one dealer offers."
          />
          <FaqItem
            question="How does delivery work?"
            answer="If the car is local, you can pick it up or we can arrange drop-off. If it is out of state, we coordinate with trusted transport carriers to bring it to your driveway."
          />
        </div>
      </Section>
  );
}