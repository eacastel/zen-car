import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { getHomePath } from "../utils/getHomePath";

const SuccessPage = () => {
  const [amount, setAmount] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {

      const sha256 = async (input) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(input.toLowerCase().trim());
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      };

      const params = new URLSearchParams(window.location.search);
      const intentId = params.get("payment_intent");
      if (!intentId || window.__CONVERSION_FIRED__) return;

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

            if (!window.__CONVERSION_FIRED__) {
              window.__CONVERSION_FIRED__ = true;

              // 🔁 Meta Conversions API via Netlify function
              (async () => {
                try {
                  const email = data.receipt_email || data.customer_email || "";
                  const nameParts = (data?.customer_name ?? "").split(" ");
                  const firstName = nameParts[0] || "";
                  const lastName = nameParts.slice(1).join(" ") || "";

                  await fetch("/.netlify/functions/meta-capi", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      eventName: "Purchase",
                      eventId: `stripe_${intentId}`,
                      eventSourceUrl: window.location.href,
                      value: amountInDollars,
                      currency: "USD",
                      userData: {
                        em: email ? await sha256(email) : undefined,
                        fn: firstName ? await sha256(firstName) : undefined,
                        ln: lastName ? await sha256(lastName) : undefined,
                      },
                    }),
                  });
                } catch (err) {
                  console.error("❌ Meta CAPI error (Purchase):", err);
                }
              })();

              // 🟩 Google Ads
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "checkout_success",
                value: amountInDollars,
                currency: "USD",
                transaction_id: intentId,
                customer_email: email || "",      
                customer_name: data.customer_name || "", 
              });

              // 🟦 Meta Pixel
              if (window.fbq) {
                window.fbq("track", "Purchase", {
                  currency: "USD",
                  value: amountInDollars,
                  content_name: "Zen Car Buying Package",
                });
              }
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
        pathname="/success/"
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
          <Button to={getHomePath()} color="accent" size="lg">
            Return Home
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SuccessPage;
