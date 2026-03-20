import React from "react"
import Seo from "../components/Seo"
import ServiceLandingPage from "../components/landing/ServiceLandingPage"
import { buildServiceSchemas } from "../utils/landingPages"

export default function CarBrokerPage() {
  return <ServiceLandingPage serviceType="car_broker" />
}

export const Head = ({ location }) => {
  const schemas = buildServiceSchemas(
    "car_broker",
    "https://zencarbuying.com/car-broker/"
  )

  return (
    <Seo
      title="Car Broker | Nationwide Car Buying Concierge | Zen Car Buying"
      description="Hire a car broker to research inventory, negotiate smarter and buy without the dealership stress. Zen Car Buying helps clients nationwide."
      pathname={location?.pathname || "/car-broker/"}
    >
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Seo>
  )
}
