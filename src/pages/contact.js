import * as React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function ContactPage() {
  return (
    <Layout>
      <section className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px] py-16">
        <h1 className="text-4xl font-bold text-primary mb-8">Contact Us</h1>
        
        <form className="max-w-2xl mx-auto" netlify name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="mb-6">
            <label htmlFor="name" className="block text-primary font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-3 border border-primary rounded focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-primary font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-primary rounded focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-primary font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full p-3 border border-primary rounded focus:ring-2 focus:ring-accent"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-accent text-white px-8 py-3 rounded hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Send Message
          </button>
        </form>
      </section>
    </Layout>
  )
}

export const Head = () => (
  <Seo 
    title="Contact Zen Car Buying | Free 15-Minute Consultation"
    description="Ready to save on your next used car? Schedule a free 15-minute consultation, or contact us via phone or email."
    pathname="/contact"
  />
)