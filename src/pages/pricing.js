import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import CustomizeWizard from "../components/pricing-page/CustomizeWizard";

// Cached Stripe client using your publishable key


const Pricing = () => {

  return (
    <Layout>
      <CustomizeWizard />
    </Layout>
  );
};

export default Pricing;

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
  };

  return (
    <>
      <Seo
        title="Zen Car Buying Pricing | Nationwide Car Buying Packages"
        description="Discover Zen Car Buying's comprehensive, nationwide car buying experience. Get a free 15‑minute consultation, expert recommendations, inventory sourcing, and purchase assistance across the USA."
        pathname="/pricing"
      />
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </>
  );
};
