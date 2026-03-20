import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { buildServiceSchemas, getCityPath } from "../../utils/landingPages"

const groupByRegion = cities =>
  cities.reduce((groups, city) => {
    groups[city.region] = groups[city.region] || []
    groups[city.region].push(city)
    return groups
  }, {})

export default function ServiceAreasPage() {
  const data = useStaticQuery(graphql`
    query ServiceAreasPageQuery {
      allCitiesJson(sort: { fields: [region, city], order: [ASC, ASC] }) {
        nodes {
          slug
          city
          state
          stateCode
          region
        }
      }
    }
  `)

  const groupedCities = groupByRegion(data.allCitiesJson.nodes)

  return (
    <Layout>
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 md:px-6 lg:max-w-[1280px]">
          <p className="text-sm tracking-[0.12em] text-accent font-pirulen mb-4">
            Service areas
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-primary mb-4">
            Car broker service areas and local landing pages
          </h1>
          <p className="text-lg text-primary/75 max-w-3xl">
            Use these city pages to compare local buying conditions, see
            market-specific FAQs and route ad traffic to pages that match search
            intent more closely than the homepage.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:max-w-[1280px] space-y-10">
          {Object.entries(groupedCities).map(([region, cities]) => (
            <div key={region}>
              <h2 className="text-3xl font-medium text-primary mb-5">
                {region}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cities.map(city => (
                  <Link
                    key={city.slug}
                    to={getCityPath(city.slug, "car_broker")}
                    className="rounded-[22px] border border-primary/10 bg-secondary p-5 shadow-sm hover:border-accent"
                  >
                    <h3 className="text-xl font-semibold text-primary">
                      {city.city}, {city.stateCode}
                    </h3>
                    <p className="mt-2 text-primary/70">
                      Car broker and used car broker landing pages for{" "}
                      {city.city}.
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const Head = ({ location }) => {
  const schemas = buildServiceSchemas(
    "car_broker",
    "https://zencarbuying.com/car-broker/service-areas/"
  )

  return (
    <Seo
      title="Car Broker Service Areas | Zen Car Buying"
      description="Browse city-specific car broker landing pages built for local search intent and paid traffic routing."
      pathname={location?.pathname || "/car-broker/service-areas/"}
    >
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Seo>
  )
}
