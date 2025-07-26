import React from "react";
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import CalendlyButton from '../components/CalendlyButton'
import Button from '../components/Button'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'




// SVG Icons
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 mr-2 inline-block"
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="none"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"
    />
  </svg>
)

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 mr-2 inline-block"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M8 10h.01M12 10h.01M16 10h.01M21 15a2 2 0 01-2 2H5l-4 4V5a2 2 0 012-2h16a2 2 0 012 2v10z"
    />
  </svg>
)

export default function ContactPage() {

  const { bmwMountain } = useStaticQuery(graphql`
    query {
      bmwMountain: file(relativePath: { eq: "bmw-mountain.png" }) {
        childImageSharp {
          gatsbyImageData(
          layout: CONSTRAINED
          width: 900
          height:400
          placeholder: BLURRED
          transformOptions: { cropFocus: CENTER }
          formats: [AUTO, WEBP]
          )
        }
      }
    }
  `)
  const bmwImage = getImage(bmwMountain)
  return (
    <Layout>
      <section className="container mx-auto px-4 md:px-2 lg:px-6 py-16">
        {/* Top Contact Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center mb-8">
          {/* Call Button */}
          <a
            href="tel:+18886516088"
            className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-primary-dark hover:scale-105 transition-transform duration-200 text-center w-full md:w-auto"
            aria-label="Call Zen Car Buying"
          >
            <PhoneIcon /> Call Us
          </a>

          {/* Text Us Button */}
          <a
            href="sms:+18886516088"
            className="bg-secondary text-primary px-6 py-3 rounded-lg text-lg font-bold border-2 border-primary hover:border-black hover:scale-105 transition-transform duration-200 text-center w-full md:w-auto"
            aria-label="Text Zen Car Buying"
          >
            <MessageIcon /> Text Us
          </a>


        </div>

        {/* Heading Section */}
        <h1
          id="page-title"
          className="text-3xl md:text-4xl lg:text-5xl text-center font-medium text-primary my-12"
        >
          Contact Zen Car Buying
        </h1>

        <p className="text-lg text-center text-primary max-w-2xl mx-auto mb-8">
          We're here to help you find the perfect car without the hassle. Reach out via phone, text, or email for fast support, or schedule a free consultation below.
        </p>

        {/* Calendly Button Section */}
        <div className="text-center mb-6">
          <CalendlyButton size="lg" color="accent">
            Schedule Free Consultation
          </CalendlyButton>
        </div>

        {/* 'Get Started' Button */}
        <div className="text-center mb-12">
          <Button to="/purchase" size="lg" color="primary">
            Ready To Buy
          </Button>
        </div>
        {bmwImage && (
          <div className="mt-6 flex justify-center">
            <GatsbyImage
              image={bmwImage}
              alt="BMW parked with a scenic mountain background"
              className="rounded-lg shadow-md max-w-3xl w-full"
            />
          </div>
        )}
      </section>
    </Layout>
  )
}

export const Head = () => (
  <>
    <Seo
      title="Contact Zen Car Buying | Free 15-Minute Consultation"
      description="Get in touch with Zen Car Buying. Call, text, or email us for expert car-buying advice, or schedule your free 15-minute consultation today."
      pathname="/contact"
      image="https://zencarbuying.com/images/contact-hero.jpg" // adjust to your actual image path
    />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Zen Car Buying",
        "url": "https://zencarbuying.com/contact",
        "mainEntityOfPage": "https://zencarbuying.com/contact",
        "publisher": {
          "@type": "Organization",
          "name": "Zen Car Buying",
          "url": "https://zencarbuying.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://zencarbuying.com/logo.png"
          }
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+1-888-651-6088",
            "contactType": "Customer Support",
            "email": "info@zencarbuying.com",
            "areaServed": "US",
            "availableLanguage": "English"
          }
        ]
      })}
    </script>
  </>
)

