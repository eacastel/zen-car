import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Button from '../components/Button'

const SuccessPage = () => {
  const [sessionId, setSessionId] = React.useState("")

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      setSessionId(params.get("session_id") || "")
    }
  }, [])

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.fbq && sessionId) {
      window.fbq("track", "Purchase", {
        currency: "USD",
        content_name: "Zen Car Buying Package"
      });
    }
  }, [sessionId])

  return (
    <Layout>
      <Seo 
        title="Order Success | Zen Car Buying" 
        description="Your order has been successfully processed. Thank you for choosing Zen Car Buying for your car buying experience across the USA." 
        pathname="/success" 
      />
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px] text-center">
          <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-lg mb-6">
            Your checkout session has been successfully completed.
          </p>
          {sessionId && (
            <p className="text-sm text-gray-600 mb-6">Session ID: {sessionId}</p>
          )}
          <Button to="/" color="accent" size="lg">
            Return Home
          </Button>
        </div>
      </section>
    </Layout>
  )
}

export default SuccessPage
