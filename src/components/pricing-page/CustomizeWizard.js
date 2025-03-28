import React, { useState } from "react";
import { FaCheckCircle, FaRegCircle, FaCheckSquare, FaRegSquare } from "react-icons/fa";
import Button from "../Button";
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const CustomizeWizard = () => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "zen-logo-lotus.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 150
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90
          )
        }
      }
    }
  `)

const logoImage = getImage(data.logo)
  
  // Updated research options: 1 Car: $250, 2 Cars: $350, 3 Cars: $450.
  const researchOptions = [
    {
      label: "Know which car you want?",
      price: 0,
      description: "Skip expert recommendations and proceed with your own choices."
    },
    {
      label: "1 Car",
      price: 250,
      description: "Includes recommendation for 1 make, model, year and trim level."
    },
    {
      label: "2 Cars",
      price: 350,
      description: "Includes recommendation for 2 makes, models, years and trim levels."
    },
    {
      label: "3 Cars",
      price: 450,
      description: "Includes recommendation for 3 makes, models, years and trim levels."
    }
  ];

  const [researchSelection, setResearchSelection] = useState(null);
  const [inventorySourcing, setInventorySourcing] = useState(false);
  const [purchaseAssistance, setPurchaseAssistance] = useState(false);
  const [loading, setLoading] = useState(false);

  const [termsAccepted2, setTermsAccepted2] = useState(false);

  // Calculate total without discount
  const totalPrice =
    (researchSelection ? researchSelection.price : 0) +
    (inventorySourcing ? 250 : 0) +
    (purchaseAssistance ? 500 : 0);

  // Discount applies if research (with cost) AND both inventory and purchase are selected.
  const discountApplicable = researchSelection && researchSelection.price > 0 && inventorySourcing && purchaseAssistance;
  const finalAmount = discountApplicable ? totalPrice - 200 : totalPrice;

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const handleCustomPurchase = async () => {
    if (!termsAccepted2) {
      alert("Please accept the Terms and Conditions before proceeding.");
      return;
    }
    setLoading(true);
    let descriptionLines = [];
    let selectedProducts = [];

    if (researchSelection) {
      descriptionLines.push(`Research: ${researchSelection.label} Option – $${researchSelection.price}`);
      if (researchSelection.price > 0) {
        selectedProducts.push({
          name: `Research Recommendation: ${researchSelection.label}`,
          price: researchSelection.price,
          description: researchSelection.description
        });
      }
    }
    if (inventorySourcing) {
      descriptionLines.push(`Inventory Sourcing: $250`);
      selectedProducts.push({
        name: "Inventory Sourcing",
        price: 250,
        description: "Find vehicles that match your criteria"
      });
    }
    if (purchaseAssistance) {
      descriptionLines.push(`Purchase Assistance: $500`);
      selectedProducts.push({
        name: "Purchase Assistance",
        price: 500,
        description: "We coordinate the transaction."
      });
    }
    const description = descriptionLines.join("\n");

    const payload = {
      amount: totalPrice, // Sending original total; backend can apply discount logic if needed
      selections: {
        research: researchSelection,
        inventory: inventorySourcing,
        purchase: purchaseAssistance
      },
      products: selectedProducts, // New field with selected product details
      description,
      metadata: {
        termsAccepted: termsAccepted2
      }
    };

    try {
      const response = await fetch("/.netlify/functions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4 md:px-2 md:max-w-[1280px] lg:px-6 lg:max-w-[1280px]">



          <div className=" mx-4 md:mx-2  lg:mx-6 lg:max-w-[1280px] rounded-2xl shadow-lg relative border-2 border-primary">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <GatsbyImage
              image={logoImage}
              alt="Zen Car Buying Logo"
              className="w-auto mx-auto"
              imgStyle={{ objectFit: 'contain', maxWidth: '150px' }}
            />

            <h2 className="text-3xl font-medium text-primary mt-4 mb-4 uppercase tracking-wider font-pirulen">
                Customize Your Package
              </h2>

              <p className="text-lg md:text-xl mx-auto max-w-4xl pb-8 mt-2 text-center text-primary">
              Choose all services to unlock the full Zen Experience — and enjoy a special $200 discount on our most complete, all‑in‑one solution for a truly stress‑free car buying journey. 
            </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: Research Recommendation */}
                <div
                  className="border p-4 rounded-lg bg-gray-50 shadow-sm text-left"
                  aria-labelledby="research-rec-header"
                  role="group"
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-accent text-white rounded-full min-w-8 h-8 flex items-center justify-center mr-2 font-bold">
                      1
                    </div>
                    <h4 className="text-lg font-semibold text-black" id="research-rec-header">
                      Research Recommendation
                    </h4>
                  </div>
                  <p className="mb-2 text-gray-700 text-sm">
                    Choose your expert recommendation option.
                  </p>
                  <fieldset>
                    <legend className="sr-only">Research Recommendations</legend>
                    <div className="flex flex-col gap-3">
                      {researchOptions.map((option, idx) => {
                        const isSelected =
                          researchSelection &&
                          researchSelection.label === option.label;

                        return (
                          <div
                            key={idx}
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={0}
                            aria-label={`${option.label} option, costs $${option.price || 0}`}
                            onClick={() => setResearchSelection(option)}
                            onKeyDown={(e) =>
                              handleKeyDown(e, () => setResearchSelection(option))
                            }
                            className="flex flex-col border p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                            style={{
                              border: isSelected ? "2px solid #F59E0B" : "1px solid #D1D5DB"
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="mr-4">
                                  {isSelected ? (
                                    <FaCheckCircle className="text-accent text-2xl" />
                                  ) : (
                                    <FaRegCircle className="text-gray-400 text-2xl" />
                                  )}
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
                            <div className="text-sm text-gray-600 mt-1">
                              {option.description}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                {/* Column 2: Inventory Sourcing & Purchase Assistance */}
                <div className="flex flex-col gap-4">
                  {/* Inventory Sourcing Card */}
                  <div
                    className="border p-4 rounded-lg bg-gray-50 shadow-sm text-left"
                    aria-labelledby="inventory-header"
                  >
                    <div className="flex items-center mb-2">
                      <div className="bg-accent text-white rounded-full min-w-8 h-8 flex items-center justify-center mr-2 font-bold">
                        2
                      </div>
                      <h4 className="text-lg font-semibold text-black" id="inventory-header">
                        Inventory Sourcing
                      </h4>
                    </div>
                    <p className="mb-2 text-gray-700 text-sm">
                      Find top vehicles from our network.
                    </p>
                    <div
                      role="checkbox"
                      aria-checked={inventorySourcing}
                      tabIndex={0}
                      aria-label="Add Inventory Sourcing for $250"
                      onClick={() => setInventorySourcing(!inventorySourcing)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => setInventorySourcing(!inventorySourcing))
                      }
                      className="flex flex-col border p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                      style={{
                        border: inventorySourcing ? "2px solid #F59E0B" : "1px solid #D1D5DB"
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-4">
                            {inventorySourcing ? (
                              <FaCheckSquare className="text-accent text-2xl" />
                            ) : (
                              <FaRegSquare className="text-gray-400 text-2xl" />
                            )}
                          </span>
                          <div className="text-base font-semibold text-black">
                            Add Inventory Sourcing
                          </div>
                        </div>
                        <div className="text-xl font-bold text-accent">$250</div>
                      </div>
                      <p className="mt-2 text-gray-600 text-sm">
                        Find vehicles that match your criteria.
                      </p>
                    </div>
                  </div>

                  {/* Purchase Assistance Card */}
                  <div
                    className="border p-4 rounded-lg bg-gray-50 shadow-sm text-left"
                    aria-labelledby="purchase-header"
                  >
                    <div className="flex items-center mb-2">
                      <div className="bg-accent text-white rounded-full min-w-8 h-8 flex items-center justify-center mr-2 font-bold">
                        3
                      </div>
                      <h4 className="text-lg font-semibold text-black" id="purchase-header">
                        Purchase Assistance
                      </h4>
                    </div>
                    <p className="mb-2 text-gray-700 text-sm">
                      We coordinate the transaction.
                    </p>
                    <div
                      role="checkbox"
                      aria-checked={purchaseAssistance}
                      tabIndex={0}
                      aria-label="Add Purchase Assistance for $500"
                      onClick={() => setPurchaseAssistance(!purchaseAssistance)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => setPurchaseAssistance(!purchaseAssistance))
                      }
                      className="flex flex-col border p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                      style={{
                        border: purchaseAssistance ? "2px solid #F59E0B" : "1px solid #D1D5DB"
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-4">
                            {purchaseAssistance ? (
                              <FaCheckSquare className="text-accent text-2xl" />
                            ) : (
                              <FaRegSquare className="text-gray-400 text-2xl" />
                            )}
                          </span>
                          <div className="text-base font-semibold text-black">
                            Add Purchase Assistance
                          </div>
                        </div>
                        <div className="text-xl font-bold text-accent">$500</div>
                      </div>
                      <p className="mt-2 text-gray-600 text-sm">
                        We contact the dealer, set up a video walk through, confirm the exact options on the car, send you the Car Fax report, assist in negotiation and evaluate any add ons and coordinate delivery. The credit check and transaction papers are sent to you for completion.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Package Summary */}
                <div className="w-full">
                  {researchSelection || inventorySourcing || purchaseAssistance ? (
                    <div
                      className="border p-4 rounded-lg bg-gray-50 shadow-sm text-left"
                      aria-labelledby="package-summary-header"
                    >
                      <h3 className="text-xl font-bold text-primary mb-4" id="package-summary-header">
                        Package Summary
                      </h3>
                      <div className="mb-4">
                        {researchSelection && (
                          <div className="mb-2">
                            <p className="font-semibold">Research Recommendation:</p>
                            <p>
                              {researchSelection.label} Option
                              {researchSelection.price > 0 &&
                                ` – $${researchSelection.price}`}
                            </p>
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
                        <p className="font-bold text-lg text-center">Total Price: ${finalAmount}</p>
                        {discountApplicable && (
                          <p className="text-sm text-green-600 text-center">
                            Zen Experience Discount Applied – Save $200!
                          </p>
                        )}
                      </div>
                      <div className="mt-4 text-center">
                        <Button onClick={handleCustomPurchase} color="accent" size="base" className="bg-clementine hover:bg-orange-500">
                          {loading ? "Processing..." : "Proceed to Checkout"}
                        </Button>
                      </div>
                      {/* Terms and Conditions Checkbox */}
                      <div className="flex items-center justify-center m-4">
                        <input
                          type="checkbox"
                          id="terms2"
                          checked={termsAccepted2}
                          aria-checked={termsAccepted2}
                          onChange={(e) => setTermsAccepted2(e.target.checked)}
                          className="mr-2 cursor-pointer"
                        />
                        <label htmlFor="terms2" className="text-sm text-primary">
                          I agree to the{" "}
                          <a
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent underline"
                          >
                            Terms and Conditions
                          </a>
                        </label>
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
        </div>
      </section>

    </main>
  );
};

export default CustomizeWizard;
