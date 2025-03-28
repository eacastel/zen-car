import React from "react";
import { Link } from "gatsby";
import { openCalendlyPopup } from "../utils/openCalendly";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 md:max-w-[750px] lg:max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 lg:gap-16">

          {/* Larger First Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Zen Car Buying</h3>
            <p className="text-secondary leading-relaxed">
              Your trusted concierge for stress-free car purchases. Let our Zen Guides guide you to the best deals with personalized advice and expert strategies.
            </p>
            <p className="leading-relaxed mt-2">
              Call Us:
              <a
                href="tel:+18886516088"
                className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent "
                aria-label="Call Zen Car Buying at (888) 651-6088"
              >            (888) 651-6088
              </a>
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
            <li>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    openCalendlyPopup();
                  }}
                  className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Schedule a call with Zen Car Buying"
                >
                  Get Started
                </button>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary mt-8 pt-4 text-center text-secondary">
          © {new Date().getFullYear()} Zen Car Buying. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
