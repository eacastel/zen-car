//src/components/Header.js

import React, { useState, useEffect, useRef } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Squash as Hamburger } from "hamburger-react";
import ButtonHeader from "../components/ButtonHeader";
import { getHomePath } from "../utils/getHomePath";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // 👉 NEW: keep a live CSS variable with the header’s visible height
  useEffect(() => {
    const root = document.documentElement;
    const headerEl = document.querySelector("header");
    if (!headerEl) return;

    const updateVar = () => {
      // rect.height reflects visible height even while translateY hides/shows
      const rect = headerEl.getBoundingClientRect();
      const visible = Math.max(0, rect.height);
      const pad = 8; // small breathing room below header
      root.style.setProperty("--header-offset", `${visible + pad}px`);
    };

    updateVar();
    const onScroll = () => updateVar();
    const onResize = () => updateVar();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // track logo/menu reflows too
    const ro = "ResizeObserver" in window ? new ResizeObserver(updateVar) : null;
    if (ro) ro.observe(headerEl);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, []);








  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "zen-car-buying-logo-full-color.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
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
    { name: "About", path: "/about/" },
    { name: "FAQ", path: "/faq/" },
    { name: "Services", path: "/services/" },
    { name: "Blog", path: "/blog/" },
    { name: "Contact", path: "/contact/" },
  ];

  return (
    <header
      className={`bg-white backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-primary transition-transform duration-300 ease-in-out transform ${showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <nav
        className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Logo (fixed at 300px wide) */}
        <Link
          to={getHomePath()}
          className="z-50 flex-shrink-0"
          style={{ width: "300px" }}
          aria-label="Go to Home Page"
        >
          <div className="h-[64px] flex items-center">
            <GatsbyImage
              image={logoImage}
              alt="Zen Car Buying Logo"
              className="h-[64px] w-auto"
              imgStyle={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        {/* Hamburger – wraps under at <365px, right aligned otherwise */}
        <div className="flex lg:hidden w-full justify-center min-[365px]:w-auto min-[365px]:justify-end mt-2 min-[365px]:mt-0">

          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={28}
            color="#6B8385"
            rounded
            as="button"
            label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          />

        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-x-6 xl:gap-x-8 ml-auto">
          <li>
            <a
              href="tel:+18886516088"
              className="flex items-center text-sm xl:text-base font-bold text-primary hover:text-accent transition-colors whitespace-nowrap mr-2"
              aria-label="Call Zen Car Buying at (888) 651-6088"
            >
              (888) 651-6088
            </a>
          </li>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-primary hover:text-accent transition-colors font-bold text-sm xl:text-base whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                activeClassName="text-accent"
                aria-label={`Go to ${item.name} page`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li className="ml-2">
            <ButtonHeader
              to="/vip-consultation/vip/"
              size="lg"
              color="accent"
              >
              Book Consultation
            </ButtonHeader>
          </li>
        </ul>

        {/* Mobile Navigation Menu */}
        <div
          className={`${isOpen ? "block" : "hidden"
            } lg:hidden absolute top-full left-0 right-0 bg-primary z-40 shadow-lg`}
          aria-hidden={!isOpen}
        >
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li className="mt-4 w-full text-center">
              <ButtonHeader
                to="/vip-consultation/vip/"
                size="lg"
                color="accent"
                >
                Book Consultation
              </ButtonHeader>
            </li>

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
