import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Squash as Hamburger } from "hamburger-react";
import ButtonHeader from "../components/ButtonHeader";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "zen-car-buying-logo-full-color.png" }) {
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
  `);

  const logoImage = getImage(data.logo);

  const navItems = [
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" }, 
  ];

  return (
    <header className="bg-secondary backdrop-blur-md sticky top-0 z-50 border-b border-accent">
      <nav
        className="container mx-auto px-4 py-3"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="z-50 flex-shrink-0"
            style={{ width: "300px" }}
            aria-label="Go to Home Page"
          >
            <GatsbyImage
              image={logoImage}
              alt="Zen Car Buying Logo"
              className="w-auto"
              imgStyle={{ objectFit: "contain", maxWidth: "300px" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-8 flex-1 justify-end">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-primary hover:text-accent transition-colors font-bold text-sm xl:text-base whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                activeClassName="text-accent"
                aria-label={`Go to ${item.name} page`}
              >
                {item.name}
              </Link>
            ))}

            {/* Click-to-Call Phone Number with SVG Icon */}
            <a
              href="tel:+18886516088"
              className="flex items-center text-md xl:text-lg font-semibold text-primary hover:text-accent transition-colors whitespace-nowrap"
              aria-label="Call Zen Car Buying at (888) 651-6088"
            >
              {/* Phone Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor" 
                className="w-5 h-5 mr-1"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              (888) 651-6088
            </a>

            {/* Button */}
            <div className="ml-4">
              <ButtonHeader size="lg" color="accent">
                Get Started
              </ButtonHeader>
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
                size={28} /* Slightly larger for easier tap */
                color="#000"
                rounded
              />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:hidden absolute top-full left-0 right-0 bg-primary z-40 shadow-lg`}
            aria-hidden={!isOpen}
          >
            <ul className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.path} className="w-full text-center">
                  <Link
                    to={item.path}
                    className="block text-white hover:text-accent py-2 px-4 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    activeClassName="text-accent"
                    aria-label={`Go to ${item.name} page`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Mobile Click-to-Call with SVG */}
              <li className="mt-4">
                <a
                  href="tel:+18886516088"
                  className="flex items-center text-lg mb-3 font-semibold text-white hover:text-accent transition-colors"
                  aria-label="Call Zen Car Buying at (888) 651-6088"
                >
                  {/* Mobile SVG Icon */}
                  <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor" 
                className="w-5 h-5 mr-1"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
                  (888) 651-6088
                </a>
              </li>

              {/* Mobile "Get Started" Button */}
              <li className="mt-4">

                <ButtonHeader onClick="/pricing" size="lg" color="accent">
                  Get Started
                </ButtonHeader>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
