import React, { useState } from "react";
import { navigate } from "gatsby";
import Button from "../Button";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const CustomizeWizard = () => {
  const [includeResearchInventory, setIncludeResearchInventory] = useState(false);
  const [includePurchaseHelp, setIncludePurchaseHelp] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const total =
    includeResearchInventory && includePurchaseHelp
      ? 850
      : includeResearchInventory
        ? 450
        : includePurchaseHelp
          ? 500
          : 0;

  const handleCheckout = async () => {
    if (!termsAccepted) {
      alert("Please accept the Terms and Conditions before proceeding.");
      return;
    }

    const selections = {
      research_inventory: includeResearchInventory,
      purchase: includePurchaseHelp,
    };

    const metadata = {
      termsAccepted: "true",
      package:
        includeResearchInventory && includePurchaseHelp
          ? "Zen Experience"
          : includeResearchInventory
            ? "Research + Inventory"
            : "Purchase Assistance",
    };

    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total * 100,
          selections,
          metadata,
        }),
      });

      const { clientSecret } = await res.json();

      if (!clientSecret) throw new Error("No clientSecret returned.");

      navigate("/checkout", {
        state: {
          clientSecret,
          selections,
          total: total * 100,
        },
      });
    } catch (err) {
      console.error("Checkout error:", err);
      alert("There was a problem starting your checkout.");
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="bg-secondary pb-6">
        <div className="container mx-auto  md:px-4 md:max-w-4xl lg:px-6">
          <div className="bg-white border-2 border-primary rounded-2xl shadow-lg p-8">
            <span className="text-sm font-bold uppercase text-accent tracking-wider mb-2 block text-center">
              Build Your Own
            </span>
            <h2 className="text-3xl font-pirulen text-primary text-center mb-4 uppercase tracking-wider">
              Starter Package
            </h2>
            <p className="text-lg text-primary text-center mb-8">
              Select one or both services below. Get both to unlock the Zen Experience and save $100.
            </p>

            <div className="grid gap-6 mb-8">
              <div
                role="checkbox"
                aria-checked={includeResearchInventory}
                aria-label="Include Research and Inventory Sourcing – $450"
                tabIndex={0}
                onClick={() => setIncludeResearchInventory(!includeResearchInventory)}
                onKeyDown={(e) => e.key === "Enter" && setIncludeResearchInventory(!includeResearchInventory)}
                className={`cursor-pointer border rounded-lg p-6 shadow-sm transition hover:bg-gray-50 ${includeResearchInventory ? "border-accent" : "border-gray-300"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {includeResearchInventory ? (
                      <FaCheckSquare className="text-accent text-2xl" />
                    ) : (
                      <FaRegSquare className="text-gray-400 text-2xl" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-primary">Research + Inventory Sourcing</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        We'll help you choose the best make, model, and year — and locate ideal matches in your area.
                      </p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-accent">$450</span>
                </div>
              </div>

              <div
                role="checkbox"
                aria-checked={includePurchaseHelp}
                aria-label="Include Research and Inventory Sourcing – $500"
                tabIndex={0}
                onClick={() => setIncludePurchaseHelp(!includePurchaseHelp)}
                onKeyDown={(e) => e.key === "Enter" && setIncludePurchaseHelp(!includePurchaseHelp)}
                className={`cursor-pointer border rounded-lg p-6 shadow-sm transition hover:bg-gray-50 ${includePurchaseHelp ? "border-accent" : "border-gray-300"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {includePurchaseHelp ? (
                      <FaCheckSquare className="text-accent text-2xl" />
                    ) : (
                      <FaRegSquare className="text-gray-400 text-2xl" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-primary">Purchase Assistance</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        We negotiate, confirm options, coordinate delivery, and ensure everything’s right before you sign.
                      </p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-accent">$500</span>
                </div>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-xl font-semibold">
                Total: <span className="text-accent">${total}</span>
              </p>
              {includeResearchInventory && includePurchaseHelp && (
                <p className="text-md text-green-600">Zen Experience Discount Applied – Save $100!</p>
              )}
            </div>

            <div className="text-center mt-6">
              <Button
                onClick={handleCheckout}
                color="accent"
                size="lg"
                disabled={!includeResearchInventory && !includePurchaseHelp}
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </Button>
            </div>

            <div className="flex items-start mt-4 justify-center">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2 mt-1"
              />
              <label htmlFor="termsAccepted" className="text-sm text-primary">
                I agree to the{" "}
                <a href="/terms" className="underline text-accent" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </a>
                .
              </label>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomizeWizard;
