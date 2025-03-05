import React, { useState } from "react";
import { FaCheckCircle, FaRegCircle, FaCheckSquare, FaRegSquare } from "react-icons/fa";
import Button from "../Button";

const CustomizeWizard = () => {
  // Updated prices: 1 Car: $250, 2 Cars: $350, 3 Cars: $450
  const researchOptions = [
    {
      label: "Don't Need A Recommendation",
      price: 0,
      description: "Skip expert recommendations and proceed with your own choices."
    },
    {
      label: "1 Car",
      price: 250,
      description: "Select your expert recommendation option."
    },
    {
      label: "2 Cars",
      price: 350,
      description: "Select your expert recommendation option."
    },
    {
      label: "3 Cars",
      price: 450,
      description: "Select your expert recommendation option."
    }
  ];

  const [researchSelection, setResearchSelection] = useState(null);
  const [inventorySourcing, setInventorySourcing] = useState(false);
  const [purchaseAssistance, setPurchaseAssistance] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate the sum without discount
  const totalPrice =
    (researchSelection ? researchSelection.price : 0) +
    (inventorySourcing ? 250 : 0) +
    (purchaseAssistance ? 500 : 0);

  // Discount applies only if a research option with a price (i.e. not "Don't Need A Recommendation") is selected, 
  // and both inventory sourcing and purchase assistance are true.
  const discountApplicable = researchSelection && researchSelection.price > 0 && inventorySourcing && purchaseAssistance;
  const finalAmount = discountApplicable ? totalPrice - 200 : totalPrice;

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const handlePurchase = async () => {
    setLoading(true);
    let descriptionLines = [];
    if (researchSelection) {
      descriptionLines.push(`Research: ${researchSelection.label} Option – $${researchSelection.price}`);
    }
    if (inventorySourcing) {
      descriptionLines.push(`Inventory Sourcing: $250`);
    }
    if (purchaseAssistance) {
      descriptionLines.push(`Purchase Assistance: $500`);
    }
    const description = descriptionLines.join("\n");

    const payload = {
      amount: totalPrice, // send the original total so the backend can apply discount if needed
      selections: {
        research: researchSelection,
        inventory: inventorySourcing,
        purchase: purchaseAssistance,
      },
      description,
    };

    try {
      const response = await fetch("/api/checkout", {
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
        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
          <h2
            id="customize-your-package"
            className="text-xl sm:text-4xl md:text-4xl font-bold text-accent mb-4 text-center"
          >
            Prefer a tailored solution?
          </h2>
          <p className="text-lg md:text-xl mx-auto max-w-3xl pb-8 mt-2 text-center text-primary">
            Customize your package by selecting only the services you need – and enjoy your complimentary 15‑minute consultation with every package purchase.
          </p>
        </div>

        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Customize Your Package
            </h2>

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
                      Receive up to 5 vehicle recommendations per match.
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
                    We handle dealer negotiations and paperwork.
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
                      Detail the negotiation, warranty checks, and paperwork assistance. Contact dealer, coordinate a video walk-through, get photos of any wear and tear, finalize pricing, assist in evaluating extended warranties, recommend shipping companies, and hand off dealer to client.
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
                          Special Zen Experience Discount Applied – Save $200!
                        </p>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <Button onClick={handlePurchase} color="accent" size="base" className="bg-clementine hover:bg-orange-500">
                        {loading ? "Processing..." : "Proceed to Checkout"}
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
    </main>
  );
};

export default CustomizeWizard;
