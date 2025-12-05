import React, { useState, useEffect, useRef } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Squash as Hamburger } from "hamburger-react";
import ButtonHeader from "../components/ButtonHeader";
import { getHomePath } from "../utils/getHomePath";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // 1. SCROLL LOGIC
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const triggerHeight = window.innerHeight - 100; // Switch color after Hero

      // Toggle Scrolled State
      if (currentScrollY > triggerHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show Logic
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

  // 2. HEADER HEIGHT VAR
  useEffect(() => {
    const root = document.documentElement;
    const headerEl = document.querySelector("header");
    if (!headerEl) return;
    const updateVar = () => {
      const rect = headerEl.getBoundingClientRect();
      root.style.setProperty("--header-offset", `${Math.max(0, rect.height)}px`);
    };
    updateVar();
    window.addEventListener("resize", updateVar);
    return () => window.removeEventListener("resize", updateVar);
  }, []);

  // 3. GRAPHQL - Get Logos
  const data = useStaticQuery(graphql`
    query {
      logoColor: file(relativePath: { eq: "zen-car-buying-logo-full-color.png" }) {
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
      logoWhite: file(relativePath: { eq: "zen-car-logo-white.png" }) {
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

  const colorLogo = getImage(data.logoColor);
  const whiteLogoFile = getImage(data.logoWhite);

  // 4. LOGO LOGIC
  let activeLogo;
  let logoClasses = "h-[64px] w-auto transition-all duration-300";

  if (isScrolled) {
    activeLogo = colorLogo;
  } else {
    // If white logo exists, use it. Else use color logo + filter
    if (whiteLogoFile) {
      activeLogo = whiteLogoFile;
    } else {
      activeLogo = colorLogo;
      logoClasses += " brightness-0 invert"; 
    }
  }

  // 5. STYLES
  // Text Color
  const textColorClass = isScrolled ? "text-primary" : "text-white";
  
  // Background Style
  const headerStyle = {
    // Transparent at top, White when scrolled
    backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.98)" : "transparent",
    backdropFilter: isScrolled ? "blur(12px)" : "none",
    borderBottom: isScrolled ? "1px solid #f1f5f9" : "1px solid transparent",
    boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.05)" : "none",
  };

  const navItems = [
    { name: "About", path: "/about/" },
    { name: "FAQ", path: "/faq/" },
    { name: "Services", path: "/services/" },
    { name: "Blog", path: "/blog/" },
    { name: "Contact", path: "/contact/" },
  ];

  return (
    <header
      style={headerStyle}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out transform 
        ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap">
        <Link to={getHomePath()} className="z-50 flex-shrink-0" style={{ width: "300px" }}>
          <div className="h-[64px] flex items-center">
             <GatsbyImage
               image={activeLogo}
               alt="Zen Car Buying Logo"
               className={logoClasses}
               imgStyle={{ objectFit: "contain" }}
             />
          </div>
        </Link>

        {/* Mobile Hamburger */}
        <div className={`flex lg:hidden w-full justify-center min-[365px]:w-auto min-[365px]:justify-end mt-2 min-[365px]:mt-0 ${textColorClass}`}>
          <Hamburger toggled={isOpen} toggle={setOpen} size={28} color="currentColor" rounded />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-x-6 xl:gap-x-8 ml-auto">
          <li>
            <a href="tel:+18886516088" className={`flex items-center text-sm font-bold transition-colors whitespace-nowrap mr-2 ${textColorClass} hover:text-accent`}>
              (888) 651-6088
            </a>
          </li>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={`transition-colors font-bold text-sm whitespace-nowrap ${textColorClass} hover:text-accent`}>
                {item.name}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <ButtonHeader to="/vip-consultation/?access=vip" size="lg" color="accent" className="shadow-md">
              Book Consultation
            </ButtonHeader>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} lg:hidden absolute top-full left-0 right-0 bg-primary z-40 shadow-lg border-t border-white/10`}>
          <ul className="flex flex-col items-center py-6 space-y-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="block text-white text-lg font-medium" onClick={() => setOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="w-full text-center px-6">
              <ButtonHeader to="/vip-consultation/?access=vip" size="lg" color="accent" className="w-full justify-center">
                Book Consultation
              </ButtonHeader>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}