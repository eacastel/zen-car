import React, { useState } from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FaCheckCircle, FaRegCircle, FaCheckSquare, FaRegSquare } from 'react-icons/fa'

/* ======================
   Section 3: Customize Your Package (Updated with Three Columns, Accessibility & Discount Logic)
======================== */
function CustomizeWizard() {
  const researchOptions = [
    { label: "Don't Need A Recommendation", price: 0, description: "Skip expert recommendations and proceed with your own choices." },
    { label: '1 Car', price: 250, description: 'Select your expert recommendation option.' },
    { label: '2 Cars', price: 400, description: 'Select your expert recommendation option.' },
    { label: '3 Cars', price: 500, description: 'Select your expert recommendation option.' }
  ]

  const [researchSelection, setResearchSelection] = useState(null)
  const [inventorySourcing, setInventorySourcing] = useState(false)
  const [purchaseAssistance, setPurchaseAssistance] = useState(false)

  const totalPrice =
    (researchSelection ? researchSelection.price : 0) +
    (inventorySourcing ? 250 : 0) +
    (purchaseAssistance ? 500 : 0)

  // If the total equals $1,250 then apply the Zen Experience discount.
  const discountedTotal = totalPrice === 1250 ? 1000 : totalPrice

  // Helper for keyboard events on interactive elements.
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-6">
        {/* Big Card Container */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Customize Your Package
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Research Recommendation */}
            <div className="border p-4 rounded-lg bg-gray-50 shadow-sm text-left">
              <div className="flex items-center mb-2">
                <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 font-bold">
                  1
                </div>
                <h4 className="text-lg font-semibold text-black">Research Recommendation</h4>
              </div>
              <p className="mb-2 text-gray-700 text-sm">
                Choose your expert recommendation option.
              </p>
              <div className="flex flex-col gap-3">
                {researchOptions.map((option, idx) => (
                  <div
                    key={idx}
                    role="button"
                    tabIndex="0"
                    onClick={() => setResearchSelection(option)}
                    onKeyDown={(e) => handleKeyDown(e, () => setResearchSelection(option))}
                    className="flex flex-col border p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                    style={{
                      border: researchSelection && researchSelection.label === option.label
                        ? '2px solid #F59E0B'
                        : '1px solid #D1D5DB'
                    }}
                    aria-pressed={researchSelection && researchSelection.label === option.label ? "true" : "false"}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-4">
                          {researchSelection && researchSelection.label === option.label
                            ? <FaCheckCircle className="text-accent text-2xl" />
                            : <FaRegCircle className="text-gray-400 text-2xl" />
                          }
                        </span>
                        <div className="text-base font-semibold text-black">
                          {option.label}
                        </div>
                      </div>
                      {option.label !== "Don't Need A Recommendation" && (
                        <div className="text-xl font-bold text-accent">
                          ${option.price}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Column 2: Inventory Sourcing (top) and Purchase Assistance (bottom) */}
            <div className="flex flex-col gap-4">
              {/* Inventory Sourcing Card */}
              <div className="border p-4 rounded-lg bg-gray-50 shadow-sm text-left">
                <div className="flex items-center mb-2">
                  <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-semibold text-black">Inventory Sourcing</h4>
                </div>
                <p className="mb-2 text-gray-700 text-sm">
                  Find top vehicles from our network.
                </p>
                <div
                  role="button"
                  tabIndex="0"
                  onClick={() => setInventorySourcing(!inventorySourcing)}
                  onKeyDown={(e) => handleKeyDown(e, () => setInventorySourcing(!inventorySourcing))}
                  className="flex flex-col border p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                  style={{
                    border: inventorySourcing ? '2px solid #F59E0B' : '1px solid #D1D5DB'
                  }}
                  aria-pressed={inventorySourcing ? "true" : "false"}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-4">
                        {inventorySourcing
                          ? <FaCheckSquare className="text-accent text-2xl" />
                          : <FaRegSquare className="text-gray-400 text-2xl" />
                        }
                      </span>
                      <div className="text-base font-semibold text-black">
                        Add Inventory Sourcing
                      </div>
                    </div>
                    <div className="text-xl font-bold text-accent">
                      $250
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    Receive recommendations on 5–10 vehicles per match.
                  </p>
                </div>
              </div>
              {/* Purchase Assistance Card */}
              <div className="border p-4 rounded-lg bg-gray-50 shadow-sm text-left">
                <div className="flex items-center mb-2">
                  <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-semibold text-black">Purchase Assistance</h4>
                </div>
                <p className="mb-2 text-gray-700 text-sm">
                  We handle dealer negotiations and paperwork.
                </p>
                <div
                  role="button"
                  tabIndex="0"
                  onClick={() => setPurchaseAssistance(!purchaseAssistance)}
                  onKeyDown={(e) => handleKeyDown(e, () => setPurchaseAssistance(!purchaseAssistance))}
                  className="flex flex-col border p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                  style={{
                    border: purchaseAssistance ? '2px solid #F59E0B' : '1px solid #D1D5DB'
                  }}
                  aria-pressed={purchaseAssistance ? "true" : "false"}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-4">
                        {purchaseAssistance
                          ? <FaCheckSquare className="text-accent text-2xl" />
                          : <FaRegSquare className="text-gray-400 text-2xl" />
                        }
                      </span>
                      <div className="text-base font-semibold text-black">
                        Add Purchase Assistance
                      </div>
                    </div>
                    <div className="text-xl font-bold text-accent">
                      $500
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    Detail the negotiation, warranty checks, paperwork assistance. Contact dealer, coordinate a video walk-through and get photos of any wear and tear, finalize pricing, assist in evaluating extended warranties, recommend shipping companies for out-of-market purchases, and hand off dealer to client (credit app, buying documentation, coordinating pick up or delivery) and shipping company.
                  </p>
                </div>
              </div>
            </div>
            {/* Column 3: Package Summary */}
            <div className="w-full">
              {researchSelection || inventorySourcing || purchaseAssistance ? (
                <div className="border p-4 rounded-lg bg-gray-50 shadow-sm text-left">
                  <h3 className="text-xl font-bold text-primary mb-4">Package Summary</h3>
                  <div className="mb-4">
                    {researchSelection && (
                      <div className="mb-2">
                        <p className="font-semibold">Research Recommendation:</p>
                        <p>{researchSelection.label} Option{researchSelection.price > 0 && ` – $${researchSelection.price}`}</p>
                      </div>
                    )}
                    {inventorySourcing && (
                      <div className="mb-2">
                        <p className="font-semibold">Inventory Sourcing:</p>
                        <p>$250</p>
                      </div>
                    )}
                    {purchaseAssistance && (
                      <div className="mb-2">
                        <p className="font-semibold">Purchase Assistance:</p>
                        <p>$500</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-bold text-lg text-center">
                      Total Price: ${discountedTotal}
                    </p>
                    {totalPrice === 1250 && (
                      <p className="text-sm text-green-600 text-center">
                        Special Zen Experience Discount Applied – Save $250!
                      </p>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <Button to="/checkout" color="accent" size="base">
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border p-4 rounded-lg bg-gray-50 shadow-sm text-center">
                  <p className="text-gray-500">
                    Your package summary will appear here once you make a selection.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ======================
   Main Pricing Page Component with Gatsby Image Query
======================== */
export default function Pricing() {
  const data = useStaticQuery(graphql`
    query {
      heroImage: file(relativePath: { eq: "hero4.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      zenExperience: file(relativePath: { eq: "hyundai2.png" }) {
        childImageSharp {
          gatsbyImageData(width: 600, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      inventory: file(relativePath: { eq: "hyundai.png" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      purchase: file(relativePath: { eq: "kia1.png" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  `)

  const heroBg = getImage(data.heroImage)
  const zenImg = getImage(data.zenExperience)

  return (
    <Layout>
      {/* Section 1: Hero Call-to-Action */}
      <section className="relative p-40 flex items-center overflow-hidden">
        <GatsbyImage
          image={heroBg}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        {/* Content Wrapper with Dotted Border */}
        <div className="relative container mx-auto px-2 text-center text-white max-w-3xl">
          <div className="inline-block p-12 border-2 border-accent rounded-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Perfect Car Buying Experience
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Schedule a free 15‑minute consultation with a zen guide today.
            </p>
            <Button to="/schedule" color="accent" size="lg">
              Schedule Your Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: “The Zen Experience” Package */}
      <section className="pt-16 pb-8 bg-secondary">
        <div className="container mx-auto px-6">
          {/* Introduction Paragraph for Zen Experience */}
         
            <h2 className="text-3xl font-bold text-accent mb-4 text-center">Ready to place your order?</h2>
            <p className="text-lg md:text-xl mx-12 pb-8 mt-2 text-center text-primary">Our Zen Experience package is the most complete, all‑in‑one solution for a stress‑free car buying journey. Enjoy premium support, expert guidance, and unbeatable value.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-lg relative border-2 border-primary">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 text-center">
                {/* Best Value Sticker */}
                <span className="absolute -top-5 right-0 bg-primary text-white text-sm uppercase px-6 py-2 rounded-tl-lg rounded-br-lg shadow-md font-bold">
                  Best Value
                </span>
                <h3 className="text-3xl font-bold text-primary mb-4">“The Zen Experience”</h3>
                <p className="text-xl text-accent font-semibold mb-4">
                  $1,000 <span className="text-gray-400 ml-1 line-through text-lg">$1,250</span>
                </p>
                <p className="text-gray-700 mb-4 text-center">
                  Get the full stress‑free experience with all services included.
                </p>
                <ul className="mb-4 space-y-2 text-center">
                  {[
                    'All research, sourcing & purchase assistance',
                    'Best value package (Save $250)',
                    'End‑to‑end car buying help'
                  ].map((detail, i) => (
                    <li key={i} className="flex items-center justify-center text-gray-700">
                      <FaCheckCircle className="text-accent mr-2 text-lg" /> {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
                <GatsbyImage image={zenImg} alt="The Zen Experience" className="w-full h-auto rounded" />
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button to="/contact" color="accent" size="lg" className="bg-clementine hover:bg-orange-500">
                Get the Zen Experience
              </Button>
            </div>
          </div>
          {/* Introduction Paragraph for Customize Your Package */}          
          <h2 className="text-3xl font-bold text-accent mt-20 text-center">Prefer a tailored solution?</h2>
          <p className="text-lg md:text-xl mx-12 mt-4 text-center text-primary">Customize your package by selecting only the services you need – and enjoy your complimentary 15‑minute consultation with every package purchase.
          </p>
        </div>
      </section>

      {/* Section 3: Customize Your Package */}
      <CustomizeWizard />
    </Layout>
  )
}

export const Head = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Nationwide Car Buying Consultation and Assistance",
    "provider": {
      "@type": "Organization",
      "name": "Zen Car Buying",
      "url": "https://www.zencarbuying.com",
      "logo": "https://www.zencarbuying.com/logo.png"
    },
    "areaServed": "US",
    "description": "Zen Car Buying offers a comprehensive, nationwide car buying experience including a free 15‑minute consultation, expert recommendations, inventory sourcing, and purchase assistance.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "Varies",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <>
      <Seo
        title="Zen Car Buying Pricing | Nationwide Car Buying Packages"
        description="Discover Zen Car Buying's comprehensive, nationwide car buying experience. Get a free 15‑minute consultation, expert recommendations, inventory sourcing, and purchase assistance across the USA."
        pathname="/pricing"
      />
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </>
  )
}
