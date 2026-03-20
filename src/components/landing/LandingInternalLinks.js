import React from "react"
import { Link } from "gatsby"

export default function LandingInternalLinks({
  cityName,
  nearbyCities = [],
  serviceLinks = [],
}) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
              Keep exploring car buying support around {cityName}
            </h2>
            <p className="text-lg text-primary/75 max-w-3xl">
              Use these pages to compare services, pricing and nearby markets
              before you book.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {nearbyCities.map(city => (
                <Link
                  key={city.slug}
                  to={city.path}
                  className="rounded-full border border-primary/15 bg-secondary px-4 py-2 text-sm font-semibold text-primary hover:border-accent hover:text-accent"
                >
                  {city.city}, {city.stateCode}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-black/10 bg-secondary p-6 shadow-[0_18px_35px_rgba(0,0,0,0.08)]">
            <p className="text-sm tracking-[0.12em] text-accent font-pirulen mb-4">
              Service links
            </p>
            <div className="space-y-3">
              {serviceLinks.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-2xl border border-white/70 bg-white px-4 py-3 text-primary shadow-sm hover:border-accent hover:text-accent"
                >
                  <span className="font-semibold">{item.label}</span>
                  {item.description && (
                    <span className="block text-sm text-primary/65 mt-1">
                      {item.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
