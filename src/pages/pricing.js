import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import CustomizeWizard from "../components/pricing-page/CustomizeWizard";
import TestimonialsPricing from '../components/TestimonialsPricing'

// Cached Stripe client using your publishable key


const Pricing = () => {

  return (
    <Layout>
      <CustomizeWizard />
      <TestimonialsPricing />
    </Layout>
  );
};

export default Pricing;

export const Head = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Nationwide Car Buying Consultation and Assistance",
    "serviceOutput": "Concierge-style used car buying support, including price negotiation, vehicle sourcing, and shipping coordination.",
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
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Car Buying Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Free 15-Minute Consultation",
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Complete Concierge Service",
          "price": "Varies",
          "priceCurrency": "USD"
        }
      ]
    }
  }
  

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
