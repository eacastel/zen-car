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
          e.stopPropagation()
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
      <Seo 
        title="Frequently Asked Questions (FAQ) - Zen Car Buying"
        description="Get expert guidance on buying a used car. Discover how our car buying concierge service can help you find the best deals, source inventory nationwide, and avoid costly mistakes."
      />
      
      <section 
        id="faq" 
        className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-8 pb-16 max-w-[900px]"
        aria-labelledby="page-title"
      >
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
                  className="mt-2 text-primary space-y-4"
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
                        <ol 
                          key={idx} 
                          className="list-decimal pl-5 space-y-2 marker:text-primary font-bold"
                        >
                          {block.content.map((item, listIdx) => (
                            <li key={listIdx} className="text-primary">
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

export const Head = ({ location }) => (
  <Seo
    title="Frequently Asked Questions (FAQ) - Zen Car Buying"
    description="Get expert guidance on buying a used car. Discover how our car buying concierge service can help you find the best deals, source inventory nationwide, and avoid costly mistakes."
    pathname={location.pathname}
    schemaMarkup={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(({ question, answer }) => ({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer.map(block =>
            block.type === "text"
              ? block.content
              : block.type === "list" || block.type === "ordered-list"
              ? block.content.map(item =>
                  typeof item === "string" ? item : `${item.label}: ${item.description}`
                ).join(" ")
              : ""
          ).join(" ")
        }
      }))
    }}
  />
)
