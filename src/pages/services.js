import React, { lazy, Suspense, useRef } from 'react';
import { Link } from 'gatsby';
import useOnScreen from '../hooks/useOnScreen';
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../components/Button";
import CallToAction from '../components/CallToAction'

const Testimonials = lazy(() => import('../components/Testimonials'))

const Services = () => {
  const testimonialsRef = useRef();
  const showTestimonials = useOnScreen(testimonialsRef, "100px");

  return (
    <Layout>
      {/* SECTION 1: hero + packages on bg-secondary */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl text-center">
          <h1 id="page-title" className="text-4xl font-bold text-primary mb-8">
            Stress-Free Car Buying, Done For You
          </h1>

          <p className="text-xl md:text-2xl text-primary font-medium mb-8">
            We identify your needs, find the best matches, negotiate the best deal and get the car to your door — saving you time, money and stress.
          </p>

          {/* Services Offered */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-center text-accent mb-2">
              Prices start at $450
            </h2>
            <Button to="/purchase/" size="base" color="accent">
              View Packages &amp; Get Started
            </Button>
          </div>

          <p className="text-xl text-gray-700 mb-8">
            Zen Car Buying offers two flexible service options designed to save you time, money and hassle—whether you need full support or just expert guidance.
          </p>

          {/* Clickable Packages */}
          <div className="grid gap-6 md:grid-cols-2 text-left text-base mb-4 md:mb-2 lg:mb-0">
            <Link
              to="/purchase/"
              aria-label="Choose Starter Package on purchase page"
              className="group block bg-white border border-gray-200 p-6 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 hover:shadow-md transition"
            >
              <article>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:underline">
                  Starter Package
                </h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>1-on-1 onboarding with your Zen Guide</li>
                  <li>Personalized car recommendations (2–4 picks)</li>
                  <li>Nationwide inventory sourcing</li>
                  <li>Verified vehicle listings</li>
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  Purchase assistance available.
                </p>
              </article>
            </Link>

            <Link
              to="/purchase/"
              aria-label="Choose Full Zen Experience on purchase page"
              className="group block bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 hover:shadow-md transition"
            >
              <article>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:underline">
                  Full Zen Experience
                </h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Everything in the Starter Package</li>
                  <li>Full purchase negotiation &amp; support</li>
                  <li>Paperwork handling &amp; dealer coordination</li>
                  <li>Final delivery assistance</li>
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  Best for those ready to buy and delegate the hard parts.
                </p>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: steps + CTA on default (white) background */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-4xl text-center">
        {/* What's Included (Clickable) */}
        <h2 className="text-2xl font-semibold text-center text-accent mb-6">
          What’s Included in Every Step
        </h2>
        <div className="grid gap-6 md:grid-cols-2 text-left md:text-center mb-12">
          {[
            {
              title: "1-on-1 Onboarding Call",
              desc: "We get to know your budget, needs and goals so everything is tailored to you.",
            },
            {
              title: "Personalized Car Picks",
              desc: "You get data-backed vehicle recommendations matched to your requirements.",
            },
            {
              title: "Verified Listings, Delivered",
              desc: "We bring you the best options locally and nationally, vehicle condition and availability—no scrolling needed.",
            },
            {
              title: "Seamless Purchase Support",
              desc: "We handle the back-and-forth with dealers, paperwork and delivery saving you time and stress.",
            },
          ].map((service, idx) => (
            <Link
              key={idx}
              to="/purchase/"
              aria-label={`Go to purchase page for ${service.title}`}
              className="group block bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
            >
              <article>
                <div className="flex items-start justify-start md:justify-center mb-2">
                  <FaCheckCircle className="text-accent mt-1 mr-2" />
                  <h4 className="text-lg font-semibold text-primary group-hover:underline">
                    {service.title}
                  </h4>
                </div>
                <p className="text-gray-700 text-base md:text-center">
                  {service.desc}
                </p>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            Ready to skip the stress and find your perfect car?
          </p>
          <Button to="/vip-consultation/vip/" size="lg" color="accent">
            Book Your Free 15-Minute Call
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <div ref={testimonialsRef}>
        {showTestimonials && (
          <Suspense fallback={<div className="py-20 text-center text-primary">Loading testimonials…</div>}>
            <Testimonials />
          </Suspense>
        )}
      </div>
      <CallToAction />
    </Layout>
  );
};

export default Services;

export const Head = ({ location }) => {
  const pageUrl = "https://zencarbuying.com/services/";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Nationwide Car Buying Concierge",
    serviceType: "Nationwide Car Buying Concierge, Consultation and Assistance",
    serviceOutput:
      "Concierge-style used car buying support, including price negotiation, vehicle sourcing and shipping coordination.",
    provider: {
      "@type": "Organization",
      name: "Zen Car Buying",
      url: "https://zencarbuying.com/",
      logo: "https://zencarbuying.com/zen-car-buying-logo.png"
    },
    areaServed: { "@type": "Country", name: "United States" },
    description:
      "Zen Car Buying offers a comprehensive, nationwide car buying experience including a free 15-minute consultation, expert recommendations, inventory sourcing and purchase assistance.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "850",
      offers: [
        { "@type": "Offer", name: "Free 15-Minute Consultation", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: pageUrl },
        { "@type": "Offer", name: "Research & Sourcing Only", price: "450", priceCurrency: "USD", availability: "https://schema.org/InStock", url: pageUrl },
        { "@type": "Offer", name: "Purchase Support Only", price: "500", priceCurrency: "USD", availability: "https://schema.org/InStock", url: pageUrl },
        { "@type": "Offer", name: "Full Zen Experience", price: "850", priceCurrency: "USD", availability: "https://schema.org/InStock", url: pageUrl }
      ]
    }
  };

  return (
    <>
      <Seo
        title="Zen Car Buying Services | Nationwide Car Buying Packages"
        description="Explore Zen Car Buying's nationwide car buying services. Choose a package to get started, or book a free 15-minute onboarding call to learn how we save you time, money and stress."
        pathname={location?.pathname || "/services/"}
      />
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </>
  );
};
