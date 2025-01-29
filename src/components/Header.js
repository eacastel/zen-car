import React, { useState } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import { Squash as Hamburger } from 'hamburger-react'

export default function Header() {
  const [isOpen, setOpen] = useState(false)

  // Query for the logo image
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "zen-car-buying-logo-header.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 300
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const logoImage = getImage(data.logo)

  return (
    <header className="bg-primary text-white" role="banner">
      <nav className="container mx-auto px-4 md:px-6 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo with consistent sizing */}
          <Link
            to="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-accent z-50"
          >
            <GatsbyImage
              image={logoImage}
              alt="Zen Car Buying Logo"
              className="h-16 w-auto object-contain"
              imgStyle={{ 
                width: 'auto',
                height: '100%',
                maxWidth: '300px'
              }}
            />
            <span className="sr-only">Zen Car Buying</span>
          </Link>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              size={24}
              color="#FFFFFF"
              distance="sm"
              rounded
            />
          </div>

          {/* Navigation Links - Tightened spacing */}
          <div
            className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center absolute md:static top-full left-0 right-0 bg-primary z-40 shadow-lg md:shadow-none`}
          >
            <ul className="flex flex-col w-full md:w-auto md:flex-row md:items-center md:gap-x-4 lg:gap-x-6 space-y-4 md:space-y-0 py-4 md:py-0 px-4 md:px-0">
              <li className="border-b border-gray-600 md:border-none w-full md:w-auto">
                <Link
                  to="/services"
                  className="block text-white font-bold hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent py-2 md:py-0"
                  activeClassName="text-accent"
                >
                  Services
                </Link>
              </li>
              <li className="border-b border-gray-600 md:border-none w-full md:w-auto">
                <Link
                  to="/how-it-works"
                  className="block text-white font-bold hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent py-2 md:py-0"
                  activeClassName="text-accent"
                >
                  How It Works
                </Link>
              </li>
              <li className="border-b border-gray-600 md:border-none w-full md:w-auto">
                <Link
                  to="/about"
                  className="block text-white font-bold hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent py-2 md:py-0"
                  activeClassName="text-accent"
                >
                  About
                </Link>
              </li>
              <li className="w-full md:w-auto mt-4 md:mt-0">
                <Link
                  to="/contact"
                  className="block bg-accent px-4 py-2 rounded text-white font-bold hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-white whitespace-nowrap text-center md:text-left"
                >
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}