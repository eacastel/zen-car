import React, { useId, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = useId()

  return (
    <div className="border-b border-black/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-lg font-semibold text-primary">{question}</span>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
          <ChevronDown
            size={18}
            color="#f99f1b"
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-8 text-base leading-relaxed text-primary/75">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LandingFaqSection({ title, description, items = [] }) {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:max-w-[1280px]">
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-primary/75">{description}</p>
          )}
        </div>

        <div className="max-w-4xl rounded-[28px] border border-black/10 bg-white px-6 sm:px-8 shadow-[0_22px_50px_rgba(0,0,0,0.12)]">
          {items.map(item => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
