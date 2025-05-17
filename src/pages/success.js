import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Button from "../components/Button";

const SuccessPage = () => {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("session_id") || "";
      setSessionId(id);

      // ✅ Fire Google Ads conversion via GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "checkout_success",
        value: 327.07, // TODO: replace with dynamic amount if needed
        currency: "USD",
        transaction_id: id, // optional
      });

      // ✅ Fire Meta Pixel Purchase
      if (window.fbq && id) {
        window.fbq("track", "Purchase", {
          currency: "USD",
          content_name: "Zen Car Buying Package"
        });
      }
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
          {sessionId && (
            <p className="text-sm text-gray-600 mb-6">Session ID: {sessionId}</p>
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
