// CheckoutForm.js

import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ selections, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setMessage(null);

    try {
      // 🚨 Must submit elements BEFORE any async logic
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setMessage(submitError.message);
        setLoading(false);
        return;
      }

      // ✅ Then create PaymentIntent
      const response = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          selections,
        }),
      });

      const { clientSecret } = await response.json();

      // ✅ Now confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        setMessage(error.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };



  return (
    <section className="bg-secondary py-2 md:py-4">
      <div className="container mx-auto px-0 md:px-2 md:max-w-[1280px] lg:px-6 lg:max-w-[1280px]">
        <div className="mx-1 md:mx-2 lg:mx-6 lg:max-w-[1280px] rounded-2xl shadow-lg relative border-2 border-primary">
          <div className="bg-white p-4 md:p-8 lg:p-12 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-medium text-primary md:mt-4 mb-4 uppercase tracking-wider font-pirulen">
              Complete Your Purchase
            </h2>
            <p className="text-lg md:text-xl mx-auto max-w-4xl pb-8 mt-2 text-center text-primary">
              Review your selected services and finalize your purchase to begin your Zen Experience.
            </p>

            <div className="max-w-2xl mx-auto text-left bg-gray-50 rounded-lg border p-6 shadow-sm mb-6">
              {(selections?.zenExperience || (selections.includeResearchInventory && selections.includePurchaseHelp)) ? (
                <>
                  <p className="text-lg text-gray-700 mb-2 text-center">
                    <span className="font-semibold">Zen Experience:</span> Includes Research + Inventory + Purchase Assistance
                  </p>
                  <p className="text-center text-gray-600 text-sm mb-2">
                    <span className="line-through text-gray-400">$950</span> → <span className="text-accent font-semibold">$850 special bundle</span>
                  </p>
                </>
              ) : (
                <>
                  {selections.includeResearchInventory && (
                    <p className="text-lg text-gray-700 mb-2 text-center">
                      <span className="font-semibold">Research + Inventory Sourcing:</span> $450
                    </p>
                  )}
                  {selections.includePurchaseHelp && (
                    <p className="text-lg text-gray-700 mb-2 text-center">
                      <span className="font-semibold">Purchase Assistance:</span> $500
                    </p>
                  )}
                </>
              )}

              <hr className="my-4 border-t border-gray-300" />

              <p className="mt-4 text-lg font-bold text-center text-primary">
                Total: ${total / 100}
              </p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <div className="bg-white border border-gray-300 rounded p-4">
                <PaymentElement />
              </div>
              <button
                type="submit"
                disabled={loading || !stripe || !elements}
                className="w-full bg-clementine text-white text-lg py-3 rounded hover:bg-orange-500 transition-colors"
              >
                {loading ? "Processing…" : "Pay Now"}
              </button>
              {message && <div className="text-red-600 text-sm mt-2">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;