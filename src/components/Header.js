import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Squash as Hamburger } from 'hamburger-react'

export default function Header() {
  const [isOpen, setOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "zen-car-buying-logo-header-white.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90
          )
        }
      }
    }
  `)

  const logoImage = getImage(data.logo)

  const navItems = [
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-primary/85 backdrop-blur-md sticky top-0 z-50 border-b border-secondary">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-50 flex-shrink-0" style={{ width: '300px' }}>
            <GatsbyImage
              image={logoImage}
              alt="Zen Car Buying Logo"
              className="h-16 w-auto"
              imgStyle={{ objectFit: 'contain', maxWidth: '300px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-8 flex-1 justify-end">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white hover:text-accent transition-colors font-bold text-sm xl:text-base whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                activeClassName="text-accent"
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-4">
              <Link
                to="/contact"
                className="bg-accent text-white px-5 py-2 rounded-md font-bold text-sm xl:text-base whitespace-nowrap
                transition-all duration-200 ease-in-out hover:bg-accent-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                size={28} /* 🔥 Slightly larger for easier tap */
                color="#FFFFFF"
                rounded
              />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`${isOpen ? 'block' : 'hidden'} lg:hidden absolute top-full left-0 right-0 bg-primary z-40 shadow-lg`}
            aria-hidden={!isOpen}
          >
            <ul className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.path} className="w-full text-center">
                  <Link
                    to={item.path}
                    className="block text-white hover:text-accent py-2 px-4 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    activeClassName="text-accent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="mt-4">
                <Link
                  to="/contact"
                  className="bg-accent text-white px-8 py-2 rounded-md font-bold text-sm xl:text-base whitespace-nowrap
                  transition-all duration-200 ease-in-out hover:bg-accent-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}