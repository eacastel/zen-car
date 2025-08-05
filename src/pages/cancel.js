import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Button from '../components/Button'

const CancelPage = () => {
  return (
    <Layout>
      <Seo 
        title="Checkout Cancelled | Zen Car Buying" 
        description="Your checkout session was cancelled. Please try again or contact support for assistance with your car buying journey." 
        pathname="/cancel/" 
      />
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px] text-center">
          <h1 className="text-4xl font-bold mb-4">Checkout Cancelled</h1>
          <p className="text-lg mb-6">
            Your checkout session was cancelled. If you believe this was an error, please try again or contact our support team.
          </p>
          <Button to="/purchase/" color="accent" size="lg">
            Return to Purchase
          </Button>
        </div>
      </section>
    </Layout>
  )
}

export default CancelPage
