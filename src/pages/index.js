import React from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Seo from '../components/Seo'
import { Hero } from '../components/Hero'
import { motion } from "framer-motion"
import Testimonials from '../components/Testimonials'

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
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="2" stroke="none" className="h-12 w-12 mx-auto mb-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.8611 2.39057C12.8495 1.73163 14.1336 1.71797 15.1358 2.35573L19.291 4.99994H20.9998C21.5521 4.99994 21.9998 5.44766 21.9998 5.99994V14.9999C21.9998 15.5522 21.5521 15.9999 20.9998 15.9999H19.4801C19.5396 16.9472 19.0933 17.9102 18.1955 18.4489L13.1021 21.505C12.4591 21.8907 11.6609 21.8817 11.0314 21.4974C10.3311 22.1167 9.2531 22.1849 8.47104 21.5704L3.33028 17.5312C2.56387 16.9291 2.37006 15.9003 2.76579 15.0847C2.28248 14.7057 2 14.1254 2 13.5109V6C2 5.44772 2.44772 5 3 5H7.94693L11.8611 2.39057ZM4.17264 13.6452L4.86467 13.0397C6.09488 11.9632 7.96042 12.0698 9.06001 13.2794L11.7622 16.2518C12.6317 17.2083 12.7903 18.6135 12.1579 19.739L17.1665 16.7339C17.4479 16.5651 17.5497 16.2276 17.4448 15.9433L13.0177 9.74551C12.769 9.39736 12.3264 9.24598 11.9166 9.36892L9.43135 10.1145C8.37425 10.4316 7.22838 10.1427 6.44799 9.36235L6.15522 9.06958C5.58721 8.50157 5.44032 7.69318 5.67935 7H4V13.5109L4.17264 13.6452ZM14.0621 4.04306C13.728 3.83047 13.3 3.83502 12.9705 4.05467L7.56943 7.65537L7.8622 7.94814C8.12233 8.20827 8.50429 8.30456 8.85666 8.19885L11.3419 7.45327C12.5713 7.08445 13.8992 7.53859 14.6452 8.58303L18.5144 13.9999H19.9998V6.99994H19.291C18.9106 6.99994 18.5381 6.89148 18.2172 6.68727L14.0621 4.04306ZM6.18168 14.5448L4.56593 15.9586L9.70669 19.9978L10.4106 18.7659C10.6256 18.3897 10.5738 17.9178 10.2823 17.5971L7.58013 14.6247C7.2136 14.2215 6.59175 14.186 6.18168 14.5448Z" />
    </svg>
  ),
};


const HomePage = () => {
  return (
    <Layout>
      {/* ✅ Hero Section */}
      <Hero />


{/* ✅ Key Benefits Section */}
<section className="py-16 bg-secondary" aria-labelledby="benefits-heading">
  <div className="container mx-auto px-6">
    <h2 id="benefits-heading" className="text-4xl font-bold text-primary text-center mb-12">
      Why Choose <span className="text-accent">Zen Car Buying?</span>
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
      {[
        { title: 'Personalized Vehicle Recommendations', key: 'recommendations', desc: 'Tailored suggestions based on your needs & budget.' },
        { title: 'Expert Guidance on Warranty & Financing', key: 'warranty', desc: 'We help you navigate extended warranties and loan options.' },
        { title: 'Nationwide Vehicle Sourcing & Shipping', key: 'sourcing', desc: 'Find the best deals, no matter where you live.' },
        { title: 'Negotiation & Purchase Assistance', key: 'negotiation', desc: 'We ensure you get the best price and stress-free buying.' },
      ].map((benefit, index) => (
        <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-accent">{icons[benefit.key]}</div> {/* ✅ This applies stroke color */}
          <h3 className="text-xl font-semibold text-primary">{benefit.title}</h3>
          <p className="text-gray-700">{benefit.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ✅ How It Works Section */}
<section className="bg-primary text-white py-20" aria-labelledby="how-it-works">
  <div className="container mx-auto px-6">
    <h2 id="how-it-works" className="text-4xl font-bold text-center mb-12">
      Our <span className="text-accent">Proven 3-Step Process</span>
    </h2>
    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-12">
      {[
        { title: 'Schedule Consultation', desc: 'Book your free 15-minute call to discuss your needs.', step: '1' },
        { title: 'Get Recommendations', desc: 'Receive expert vehicle recommendations based on your budget and preferences.', step: '2' },
        { title: 'Close the Deal', desc: 'We assist with negotiation and paperwork to ensure a smooth purchase.', step: '3' },
      ].map((step, index) => (
        <motion.div 
          key={index} 
          className="text-center p-6 bg-white/10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-4xl font-bold text-accent-dark bg-white/20 px-5 py-2 inline-block rounded-full mb-3">
            {step.step}
          </div>
          <h3 className="text-xl font-semibold">{step.title}</h3>
          <p className="text-gray-200">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ✅ Include Testimonials */}
      <Testimonials />

      {/* ✅ CTA Section */}
      <section className="bg-accent text-white py-20 text-center" aria-labelledby="cta-heading">
        <div className="container mx-auto px-6">
          <h2 id="cta-heading" className="text-4xl font-bold mb-6">
            Ready to Find Your <span className="text-primary">Perfect Car?</span>
          </h2>
          <p className="text-lg mb-6">
            Get expert guidance and stress-free car buying at the best prices.
          </p>
          <Button to="/contact" color="primary" size="lg">
            Schedule Your Free Consultation
          </Button>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage

// ✅ SEO Metadata
export const Head = () => (
  <Seo
    title="Zen Car Buying | Stress-Free Used Car Concierge"
    description="Save thousands on your next used car with expert guidance. Get personalized recommendations, sourcing, and negotiation help."
    pathname="/"
  />
)
