import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Button from "../components/Button"

export default function ThankYouPage() {
  return (
    <Layout>
      <Seo
        title="Appointment Scheduled | Zen Car Buying"
        description="Your consultation is confirmed. We look forward to speaking with you."
        pathname="/thank-you/"
        noIndex={true}
      />
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px] text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Appointment Scheduled
          </h1>
          <p className="text-lg text-primary mb-8">
            Your consultation has been booked successfully. Please check your
            email for confirmation details.
          </p>
          <Button to="/" color="accent" size="lg">
            Return Home
          </Button>
        </div>
      </section>
    </Layout>
  )
}
