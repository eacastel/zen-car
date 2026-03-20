import React from "react"
import Seo from "../components/Seo"
import ServiceLandingPage from "../components/landing/ServiceLandingPage"
import { buildServiceSchemas } from "../utils/landingPages"

export default function UsedCarBrokerPage() {
  return <ServiceLandingPage serviceType="used_car_broker" />
}

export const Head = ({ location }) => {
  const schemas = buildServiceSchemas(
    "used_car_broker",
    "https://zencarbuying.com/used-car-broker/"
  )

  return (
    <Seo
      title="Used Car Broker | Nationwide Used Car Buying Service | Zen Car Buying"
      description="Work with a used car broker to evaluate inventory, avoid overpriced listings and negotiate smarter without dealership stress."
      pathname={location?.pathname || "/used-car-broker/"}
    >
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Seo>
  )
}
