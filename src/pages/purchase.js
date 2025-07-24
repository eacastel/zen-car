import React, { lazy, Suspense, useState, useEffect, useRef } from 'react'
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import CustomizeWizard from "../components/pricing-page/CustomizeWizard";
import ZenExperienceSection from '../components/pricing-page/ZenExperienceSection';


// Cached Stripe client using your publishable key

const TestimonialsPricing = lazy(() => import('../components/TestimonialsPricing'))

function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);

          // ✅ Fire the Meta Pixel "ViewContent" event
          if (window.fbq) {
            window.fbq('track', 'ViewContent', {
              content_name: 'Pricing Page',
            });
          }
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}


const Purchase = () => {
  const testimonialsRef = useRef();
  const showTestimonials = useOnScreen(testimonialsRef, "100px");

  return (
    <Layout>
      <main>
        <section className="pt-16 pb-4 bg-secondary" aria-labelledby="pricing-page-heading">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <h1
              id="pricing-page-heading"
              className="text-3xl md:text-4xl font-medium text-accent mb-4 text-center"
            >
              Skip the Hassle. Save Time & Money.
            </h1>
            <p className="mx-auto max-w-4xl text-lg md:text-xl text-center text-primary mb-12">
              Get our full-service concierge package—expert research, inventory sourcing, and purchase help—all in one seamless, cost-effective experience.
            </p>

            <div className="flex flex-col lg:flex-row gap-0">
              <div className="lg:w-1/2">
                <CustomizeWizard />
              </div>
              <div className="lg:w-1/2">
                <ZenExperienceSection />
              </div>
            </div>
          </div>
        </section>
      </main >


      <div ref={testimonialsRef}>
        {showTestimonials && (
          <Suspense fallback={<div className="py-20 text-center text-primary">Loading testimonials…</div>}>
            <TestimonialsPricing />
          </Suspense>
        )}
      </div>

    </Layout >
  );
};

export default Purchase;

export const Head = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Nationwide Car Buying Concierge, Consultation and Assistance",
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
