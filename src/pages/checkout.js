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
  console.log("CheckoutPage mounted", { selections, total, clientSecret: state?.clientSecret });

  if (!selections || !total || !state?.clientSecret) {
    navigate("/pricing");
    return;
  }

  setClientSecret(state.clientSecret);
  setLoading(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // Intentionally run only once on mount




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
