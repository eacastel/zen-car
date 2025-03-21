import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Squash as Hamburger } from "hamburger-react";
import ButtonHeader from "../components/CalendlyButtonHeader";
import CalendlyButtonHeader from "../components/CalendlyButtonHeader";

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
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white backdrop-blur-md sticky top-0 z-50 border-b border-primary">
      <nav
        className="container mx-auto px-4 py-3 flex items-center justify-between"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Logo (Left Side) */}
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

        {/* Flexible Spacer for Spacing */}
        <div className="flex-1"></div>

        {/* Desktop Navigation (Right Side) */}
        <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-8">
          {/* Phone Number */}
          <a
            href="tel:+18886516088"
            className="flex items-center text-md xl:text-lg font-semibold text-primary hover:text-accent transition-colors whitespace-nowrap"
            aria-label="Call Zen Car Buying at (888) 651-6088"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            (888) 651-6088
          </a>

          {/* Menu Links */}
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

          {/* Button */}
          <div className="ml-4">
            <CalendlyButtonHeader size="lg" color="accent">
              Get Started
            </CalendlyButtonHeader>
          </div>
        </div>

        {/* Mobile Header: Add Phone Icon Next to Hamburger */}
<div className="flex items-center gap-4 lg:hidden">
  {/* Phone Number Icon */}
  <a
    href="tel:+18886516088"
    className="text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    aria-label="Call Zen Car Buying at (888) 651-6088"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 24"
      fill="currentColor"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  </a>

  {/* Mobile Hamburger Menu */}
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              size={28}
              color="#6B8385"
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

            {/* Mobile "Get Started" Button - First for CTA Priority */}
            <li className="mt-4 w-full text-center">
              <ButtonHeader onClick="/pricing" size="lg" color="accent">
                Get Started
              </ButtonHeader>
            </li>

            

            {/* Navigation Links */}
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block text-white hover:text-accent pt-0 pb-2 px-4 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  activeClassName="text-accent"
                  aria-label={`Go to ${item.name} page`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
