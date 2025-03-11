import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import faqData from "../data/faqData.json"
import { motion } from "framer-motion"
import { openCalendlyPopup } from "../utils/openCalendly"

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const attachCalendlyTriggers = () => {
      const calendlyLinks = document.querySelectorAll(".calendly-popup")
      calendlyLinks.forEach(link => {
        link.addEventListener("click", e => {
          e.stopPropagation() // Prevent FAQ heading from triggering
          e.preventDefault()
          openCalendlyPopup()
        })
      })

      return () => {
        calendlyLinks.forEach(link =>
          link.removeEventListener("click", openCalendlyPopup)
        )
      }
    }

    attachCalendlyTriggers()
    const observer = new MutationObserver(attachCalendlyTriggers)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return (
    <Layout>
      <Seo title="Frequently Asked Questions (FAQ)" />
      <section id="faq" className="max-w-4xl mx-auto py-12 px-6">
      <h1
          id="page-title"
          className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-12"
        >
          Frequently Asked Questions (FAQ)
        </h1>

        <div
          itemscope
          itemtype="https://schema.org/FAQPage"
          className="space-y-6"
        >
          {faqData.map(({ question, answer }, index) => (
            <div
              key={index}
              itemscope
              itemprop="mainEntity"
              itemtype="https://schema.org/Question"
              className="border-b border-gray-200 pb-4"
            >
              <motion.h2
                itemprop="name"
                className={`text-lg font-semibold cursor-pointer text-primary transition-colors duration-200 ${
                  openIndex === index ? "text-accent" : ""
                }`}
                onClick={() => toggleFAQ(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                aria-expanded={openIndex === index}
              >
                {question}
              </motion.h2>

              {openIndex === index && (
                <motion.div
                  itemscope
                  itemprop="acceptedAnswer"
                  itemtype="https://schema.org/Answer"
                  className="mt-2 text-gray-700 space-y-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {answer.map((block, idx) => {
                    if (block.type === "text") {
                      return (
                        <p
                          key={idx}
                          itemprop="text"
                          dangerouslySetInnerHTML={{ __html: block.content }}
                        />
                      )
                    }

                    if (block.type === "list") {
                      return (
                        <ul key={idx} className="list-disc pl-5 space-y-2">
                          {block.content.map((item, listIdx) => (
                            <li
                              key={listIdx}
                              dangerouslySetInnerHTML={{ __html: item }}
                            />
                          ))}
                        </ul>
                      )
                    }

                    if (block.type === "ordered-list") {
                      return (
                        <ol key={idx} className="list-decimal pl-5 space-y-2 marker:text-primary font-bold">
                          {block.content.map((item, listIdx) => (
                            <li key={listIdx} className="text-gray-700">
                              <strong className="font-bold text-primary">
                                {item.label}:
                              </strong>{" "}
                              <span className="font-normal">{item.description}</span>
                            </li>
                          ))}
                        </ol>
                      )
                    }
                    

                    return null
                  })}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default FAQPage
