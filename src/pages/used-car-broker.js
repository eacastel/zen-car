// src/pages/car-broker.js
import React, { lazy, Suspense, useState, useEffect, useRef } from 'react'
import Layout from '../components/used-car-broker-components/Layout';
import Seo from '../components/Seo';
import { Hero } from '../components/used-car-broker-components/Hero';
import CallToAction from '../components/used-car-broker-components/CallToAction';

const HowItWorks = lazy(() => import('../components/used-car-broker-components/HowItWorks'));
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-12 w-12 mx-auto mb-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
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
  negotiation: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1" stroke="none" className="h-12 w-12 mx-auto mb-4">
      <path d="M5.00488 9.00268C5.55717 9.00268 6.00488 9.45039 6.00488 10.0027C7.63965 10.0027 9.14352 10.5631 10.3349 11.5022L12.5049 11.5027C13.837 11.5027 15.0339 12.0815 15.8579 13.0014L19.0049 13.0027C20.9972 13.0027 22.7173 14.1679 23.521 15.8541C21.1562 18.9747 17.3268 21.0027 13.0049 21.0027C10.2142 21.0027 7.85466 20.3994 5.944 19.3447C5.80557 19.7283 5.43727 20.0027 5.00488 20.0027H2.00488C1.4526 20.0027 1.00488 19.555 1.00488 19.0027V10.0027C1.00488 9.45039 1.4526 9.00268 2.00488 9.00268H5.00488ZM6.00589 12.0027L6.00488 17.0238L6.05024 17.0572C7.84406 18.3176 10.183 19.0027 13.0049 19.0027C16.0089 19.0027 18.8035 17.847 20.84 15.8732L20.9729 15.7397L20.8537 15.6393C20.3897 15.2763 19.8205 15.051 19.2099 15.0096L19.0049 15.0027L16.8932 15.0017C16.9663 15.3236 17.0049 15.6586 17.0049 16.0027V17.0027H8.00488V15.0027L14.7949 15.0017L14.7605 14.9232C14.38 14.1296 13.593 13.568 12.6693 13.508L12.5049 13.5027L9.57547 13.5025C8.66823 12.5772 7.40412 12.003 6.00589 12.0027ZM4.00488 11.0027H3.00488V18.0027H4.00488V11.0027ZM13.6513 3.57806L14.0046 3.93183L14.3584 3.57806C15.3347 2.60175 16.9177 2.60175 17.894 3.57806C18.8703 4.55437 18.8703 6.13728 17.894 7.11359L14.0049 11.0027L10.1158 7.11359C9.13948 6.13728 9.13948 4.55437 10.1158 3.57806C11.0921 2.60175 12.675 2.60175 13.6513 3.57806ZM11.53 4.99227C11.3564 5.16584 11.3372 5.43526 11.4714 5.62938L11.5289 5.69831L14.0039 8.17368L16.4798 5.69938C16.6533 5.52581 16.6726 5.25639 16.5376 5.06152L16.4798 4.99227C16.3062 4.81871 16.0368 4.79942 15.8417 4.93457L15.7724 4.99249L14.0033 6.76111L12.236 4.9912L12.1679 4.93442C11.973 4.79942 11.7036 4.81871 11.53 4.99227Z" />
    </svg>
  ),
};

const CarBroker = () => {
  const testimonialsRef = useRef();
  const showTestimonials = useOnScreen(testimonialsRef, '100px');

  return (
    <Layout>
      <Hero />

      <section className="py-16 bg-secondary" aria-labelledby="car-broker-benefits">
        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
          <h2 id="car-broker-benefits" className="text-4xl font-medium text-accent text-center mb-12">
            Why Choose Our <span className="text-accent">Used Car Broker Services?</span>
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-12">
            {[
              { title: 'Expert Recommendations', key: 'recommendations', desc: 'Personalized picks from our professional used car brokers based on your needs & budget.' },
              { title: 'Nationwide and Local Inventory', key: 'sourcing', desc: 'Top-condition, low-mileage used vehicles sourced locally and nationwide by your dedicated Zen Guide.' },
              { title: 'Time Saving, Stress Free Buying', key: 'negotiation', desc: 'Zen Car Buying’s experienced car brokers deal and negotiate directly with the dealership  so you don\'t have to.' },
            ].map((benefit, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-accent">{icons[benefit.key]}</div> 
                <h3 className="text-xl font-medium text-primary">{benefit.title}</h3>
                <p className="text-gray-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 {/* ✅ How It Works Section */}
      <Suspense fallback={<div className="py-20 text-center text-primary">Loading process…</div>}>
        <HowItWorks />
      </Suspense>



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
}
export default CarBroker

export const Head = () => (
  <Seo
  title="Used Car Broker | Nationwide Concierge Car Buying Service"
  description="Zen Car Buying is a trusted nationwide used car broker service. Our expert car brokers help you find, negotiate, and buy the perfect used car—without dealership stress."
  pathname="/car-broker"
>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Nationwide Used Car Broker",
      "provider": {
        "@type": "Organization",
        "name": "Zen Car Buying",
        "url": "https://zencarbuying.com/used-car-broker",
        "logo": "https://zencarbuying.com/zen-car-buying-logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-888-651-6088",
          "contactType": "Customer Service"
        }
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "description": "Zen Car Buying is a nationwide used car broker. We help you find, evaluate, and purchase the right used vehicle with no dealership hassle.",
      "serviceType": "Used Car Broker Service",
      "url": "https://zencarbuying.com/used-car-broker"
    })}
  </script>
</Seo>
);
