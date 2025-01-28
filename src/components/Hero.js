import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export function Hero() {
  return (
    <div className="relative">
      <StaticImage
        src="../images/hero-bg.jpg"
        alt="Happy customer with car"
        placeholder="blurred"
        className="h-96 w-full object-cover"
        layout="fullWidth"
        formats={['auto', 'webp', 'avif']}
      />
      <div className="absolute inset-0 bg-primary/75 flex items-center">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Save Thousands on Your Next Used Car
          </h1>
          {/* Rest of hero content */}
        </div>
      </div>
    </div>
  )
}