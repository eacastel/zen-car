import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import StripeWrapper from "../components/payment/StripeWrapper";

const CheckoutPage = ({ location }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);

  const state = location.state;
  const selections = state?.selections;
  const total = state?.total;

  useEffect(() => {
    if (!selections || !total) {
      navigate("/pricing");
      return;
    }

    fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total,
        name: "Pending", // Placeholder; actual entered by user
        email: "unknown@zencarbuying.com", // Placeholder; actual entered by user
        metadata: {
          selections: JSON.stringify(selections),
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      });
  }, [selections, total]);

  return (
  <Layout>
    <main className="flex-grow bg-secondary py-8">
      {!loading && clientSecret ? (
        <StripeWrapper clientSecret={clientSecret} selections={selections} total={total} />
      ) : (
        <p className="text-center text-primary">Loading checkout…</p>
      )}
    </main>
  </Layout>
);
};

export default CheckoutPage;
