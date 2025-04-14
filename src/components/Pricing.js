import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeroSection from "../components/pricing-page/HeroSection";
import ZenExperienceSection from "../components/pricing-page/ZenExperienceSection";
import CustomizeWizard from "../components/pricing-page/CustomizeWizard";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe.js using a cached promise
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

const Pricing = () => {
  
  const siteUrl = process.env.GATSBY_SITE_URL;
  
  return (
    <Layout>
      <ZenExperienceSection siteUrl={siteUrl} getStripe={getStripe} />
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
