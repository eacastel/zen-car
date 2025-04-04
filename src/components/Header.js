import React, { useState, useEffect, useRef } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Squash as Hamburger } from "hamburger-react";
import CalendlyButtonHeader from "../components/CalendlyButtonHeader";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const [showHeader, setShowHeader] = useState(true);
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current) {
      // scrolling down
      setShowHeader(false);
    } else if (currentScrollY < lastScrollY.current) {
      // scrolling up
      setShowHeader(true);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);




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

    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
<header
  className={`bg-white backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-primary transition-transform duration-300 ease-in-out transform ${
    showHeader ? "translate-y-0" : "-translate-y-full"
  }`}
>
      <nav
        className="container mx-auto px-4 py-3 flex items-center justify-between"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Logo (Left Side) */}
        <Link
          to="/"
          className="z-50 flex-shrink-0 mr-6"
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
            className="flex items-center text-sm xl:text-base font-bold text-primary hover:text-accent transition-colors whitespace-nowrap mr-2"
            aria-label="Call Zen Car Buying at (888) 651-6088"
          >

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
        <div className="flex items-center lg:hidden">
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
          className={`${isOpen ? "block" : "hidden"
            } lg:hidden absolute top-full left-0 right-0 bg-primary z-40 shadow-lg`}
          aria-hidden={!isOpen}
        >
          <ul className="flex flex-col items-center py-4 space-y-4">

            {/* Mobile "Get Started" Button - First for CTA Priority */}
            <li className="mt-4 w-full text-center">
              <CalendlyButtonHeader size="lg" color="accent">
                Get Started
              </CalendlyButtonHeader>
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
