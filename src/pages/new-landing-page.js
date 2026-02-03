// zen-car/src/pages/index.js

import { navigate } from "gatsby";
import React, { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { Hero } from '../components/new-landing-2026/Hero'
import HeroSocialProof from "../components/new-landing-2026/HeroSocialProof";
import CallToAction from '../components/new-landing-2026/CallToAction'
import CTABand from "../components/new-landing-2026/CTABand";
import InlineCtaSplitChoice from "../components/new-landing-2026/InlineCtaSplitChoice";
import InlineCtaInset from "../components/new-landing-2026/InlineCtaInset";
import CarLogoStrip from "../components/new-landing-2026/CarLogoStrip";
import RevealSection from "../components/new-landing-2026/RevealSection";
import FaqSectionHomepage from "../components/new-landing-2026/FaqSectionHomepage";
import CallTextCtaBar from "../components/new-landing-2026/CallTextCtaBar";




const HowItWorks = lazy(() => import('../components/HowItWorks'));
const Testimonials = lazy(() => import('../components/Testimonials'));


function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}


const icons = {
  recommendations: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-12 w-12 mx-auto mb-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" />

    </svg>
  ),
  negotiation: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-12 w-12 mx-auto mb-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 4.5A2.5 2.5 0 1 1 9.5 4.5a2.5 2.5 0 0 1 5 0Z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 17l2.589-1.308A.75.75 0 0 0 6 15.02c0-2.94 2.138-5.454 5.007-5.937a6.3 6.3 0 0 1 1.986 0C15.862 9.566 18 12.08 18 15.02a.75.75 0 0 0 .411.672L21 17"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 16l-1.042 1.389c-.032.042-.048.064-.064.084a2.75 2.75 0 0 1-1.033.686l-1.587.397A2.25 2.25 0 0 0 4 20.829C4 21.476 4.524 22 5.171 22h1.556c.599 0 .899 0 1.19-.034.68-.08 1.337-.299 1.929-.643.253-.147.493-.327.972-.687L12 20.5M12 20.5 14 19M12 20.5l1.54.952c.609.229.914.343 1.229.416.163.038.328.068.494.089.321.041.647.041 1.298.041h2.269C19.476 22 20 21.476 20 20.829c0-1.075-.732-2.012-1.774-2.273l-1.587-.397a2.75 2.75 0 0 1-1.033-.686c-.016-.02-.032-.042-.064-.084L14.5 16"
      />
    </svg>
  ),

  warranty: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-12 w-12 mx-auto mb-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  sourcing: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-12 w-12 mx-auto mb-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
};


const HomePage = () => {
  const testimonialsRef = useRef();
  const showTestimonials = useOnScreen(testimonialsRef, '100px');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const reset = urlParams.get("reset");
      if (reset === "1") {
        localStorage.removeItem("preferredHome");
        document.cookie = "preferredHome=; path=/; max-age=0";
        return;
      }

      const localPref = localStorage.getItem("preferredHome");
      const cookieMatch = document.cookie.match(/(?:^|;\s*)preferredHome=([^;]+)/);
      const cookiePref = cookieMatch?.[1];
      const preferredHome = localPref || cookiePref;

      if (preferredHome && preferredHome !== "/") {
        navigate(preferredHome, { replace: true });
      }
    }
  }, []);

  return (
    <Layout>
      {/* ✅ Hero Section */}
      <Hero />



      <RevealSection>
        <HeroSocialProof />
      </RevealSection>
            <RevealSection>
  <CallTextCtaBar />
</RevealSection>

            <RevealSection>
        <CarLogoStrip />
      </RevealSection>

      <RevealSection>
        {/* ✅ Key Benefits Section */}
        <section className="py-16 bg-secondary" aria-labelledby="benefits-heading">
          <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
            <h2 id="benefits-heading" className="text-4xl font-medium text-accent text-center mb-6">
              Why Choose <span className="text-accent">Zen Car Buying?</span>
            </h2>
            <p className="text-2xl font-medium text-primary text-center max-w-3xl mx-auto mb-12">Skip the dealer hassle. We help you buy smarter with expert guidance and proven strategies all for one flat fee.</p>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-12">
              {[
                { title: 'Personalized Vehicle Recommendations', key: 'recommendations', desc: 'We provide tailored suggestions based on your needs & budget.' },
                { title: 'Nationwide Vehicle Sourcing', key: 'sourcing', desc: 'We find you the best deals, no matter where you live.' },
                { title: 'Stress Free Process', key: 'negotiation', desc: 'Our Zen Guides streamline the car buying process for you!' },
              ].map((benefit, index) => (
                <Link
                  key={index}
                  to="/services/"
                  aria-label={`Learn more about ${benefit.title}`}
                  style={{ cursor: "auto", textDecoration: "none", color: "inherit" }}
                >
                  <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">

                    <div className="text-accent">{icons[benefit.key]}</div> {/* ✅ This applies stroke color */}
                    <h3 className="text-xl font-medium text-primary">{benefit.title}</h3>
                    <p className="text-gray-500">{benefit.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </section>
      </RevealSection>

      <RevealSection>
        <div className="pt-20">
          <InlineCtaInset />
        </div>
      </RevealSection>

      <RevealSection>
        {/* ✅ How It Works Section */}
        <Suspense fallback={<div className="py-20 text-center text-primary">Loading process…</div>}>
          <HowItWorks />
        </Suspense>
      </RevealSection>

      <RevealSection>
  <FaqSectionHomepage />
</RevealSection>

      <RevealSection>
        <InlineCtaSplitChoice />
      </RevealSection>

      <RevealSection>
        <div ref={testimonialsRef}>
          {showTestimonials && (
            <Suspense fallback={<div className="py-20 text-center text-primary">Loading testimonials…</div>}>
              <Testimonials />
            </Suspense>
          )}
        </div>
      </RevealSection>

      <RevealSection>
        <CTABand />
      </RevealSection>



      <RevealSection>
        <CallToAction />
      </RevealSection>
    </Layout>
  )
}

export default HomePage


export const Head = ({ location }) => (
  <Seo
    title="Zen Car Buying | Stress-Free Concierge Service for New, Lightly Used & Luxury Cars"
    description="Zen Car Buying is your trusted concierge service for finding new cars, lightly used vehicles and luxury models at affordable prices nationwide. Our proven 4-step system ensures a stress-free car-buying experience."
    pathname={location?.pathname || "/"}
  >
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Zen Car Buying",
        url: "https://zencarbuying.com",
        logo: "https://zencarbuying.com/zen-car-buying-logo.png",
        sameAs: [
          "https://www.facebook.com/zencarbuying",
          "https://www.instagram.com/zencarbuying",
          "https://www.linkedin.com/company/zencarbuying",
          "https://www.yelp.com/biz/zencarbuying"
        ],
        description:
          "Zen Car Buying helps you find luxury and lightly used cars at 30–50% off with expert concierge help."
      })}
    </script>
  </Seo>
);
