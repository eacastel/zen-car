import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Button from "../components/Button";

const SuccessPage = () => {
  const [amount, setAmount] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const intentId = params.get("payment_intent");
      if (!intentId) return;

      setPaymentIntentId(intentId);

      fetch("/.netlify/functions/get-payment-intent", {
        method: "POST",
        body: JSON.stringify({ id: intentId }),
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.amount) {
            const amountInDollars = data.amount / 100;
            setAmount(amountInDollars);

            // ✅ Fire Google Ads conversion
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "checkout_success",
              value: amountInDollars,
              currency: "USD",
              transaction_id: intentId,
            });

            // ✅ Fire Meta Purchase Pixel
            if (window.fbq) {
              window.fbq("track", "Purchase", {
                currency: "USD",
                content_name: "Zen Car Buying Package",
              });
            }
          }
        })
        .catch(err => {
          console.error("❌ Failed to retrieve payment intent", err);
        });
    }
  }, []);

  return (
    <Layout>
      <Seo 
        title="Order Success | Zen Car Buying" 
        description="Your order has been successfully processed. Thank you for choosing Zen Car Buying for your car buying experience across the USA." 
        pathname="/success" 
      />
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px] text-center">
          <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-lg mb-6">
            Your checkout session has been successfully completed.
          </p>
          {paymentIntentId && (
            <p className="text-sm text-gray-600 mb-2">PI-ID: {paymentIntentId}</p>
          )}
          {amount && (
            <p className="text-sm text-gray-600 mb-6">Amount: ${amount.toFixed(2)}</p>
          )}
          <Button to="/" color="accent" size="lg">
            Return Home
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SuccessPage;
