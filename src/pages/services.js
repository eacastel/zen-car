import React, { lazy, Suspense, useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../components/Button";





const TestimonialsPricing = lazy(() => import('../components/TestimonialsPricing'))
const Services = () => {
    const testimonialsRef = useRef();
    const showTestimonials = useOnScreen(testimonialsRef, "100px");

    return (
        <Layout>
            <section className="container mx-auto px-4 md:px-6 py-16 max-w-4xl text-center">
                <h1 className="text-4xl font-bold text-primary mb-8">
                    Stress-Free Car Buying, Done For You
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
                    Zen Car Buying offers two flexible service options designed to save you time, money, and hassle—whether you need full support or just expert guidance.
                </p>

                {/* Services Offered */}
                <h2 className="text-2xl font-semibold text-center text-accent mb-6">
                    Choose Your Package
                </h2>
                <div className="grid gap-6 md:grid-cols-2 text-left text-base mb-12">
                    

                    <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold text-primary mb-2">Full Zen Experience – $850</h3>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Everything in the Starter Package</li>
                            <li>Full purchase negotiation & support</li>
                            <li>Paperwork handling & dealer coordination</li>
                            <li>Final delivery assistance</li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-500">Best for those ready to buy and delegate the hard parts.</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold text-primary mb-2">Starter Package – $450</h3>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>1-on-1 onboarding with your Zen Guide</li>
                            <li>Personalized car recommendations (2–4 picks)</li>
                            <li>Nationwide inventory sourcing</li>
                            <li>Verified vehicle listings</li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-500">Purchase assistance available later for $500.</p>
                    </div>
                </div>

                {/* What's Included */}
                <h2 className="text-2xl font-semibold text-center text-accent mb-6">
                    What’s Included in Every Step
                </h2>
                <div className="grid gap-6 md:grid-cols-2 text-left md:text-center mb-12">
                    {[
                        {
                            title: "1-on-1 Onboarding Call",
                            desc: "We get to know your budget, needs, and goals so everything is tailored to you.",
                        },
                        {
                            title: "Personalized Car Picks",
                            desc: "You get 2–4 data-backed vehicle recommendations matched to your lifestyle.",
                        },
                        {
                            title: "Verified Listings, Delivered",
                            desc: "We search nationwide, verify availability, and bring you the best options—no scrolling needed.",
                        },
                        {
                            title: "Seamless Purchase Support",
                            desc: "We handle the back-and-forth with dealers, paperwork, and delivery so you don’t have to.",
                        },
                    ].map((service, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm"
                        >
                            <div className="flex items-start justify-start md:justify-center mb-2">
                                <FaCheckCircle className="text-accent mt-1 mr-2" />
                                <h4 className="text-lg font-semibold text-primary">{service.title}</h4>
                            </div>
                            <p className="text-gray-700 text-base md:text-center">{service.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p className="text-lg text-gray-700 mb-4">
                        Ready to skip the stress and find your perfect car?
                    </p>
                    <Button to="/purchase" size="lg" color="accent">
                        Start Your Zen Journey
                    </Button>
                </div>
            </section>
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

export default Services;

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
            "name": "Car Buying Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "name": "Full Zen Experience",
                    "price": "850",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "name": "Research & Sourcing Only",
                    "price": "450",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "name": "Purchase Support Only",
                    "price": "500",
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
