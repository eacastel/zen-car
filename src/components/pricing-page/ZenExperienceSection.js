import React, { useState } from "react";
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Button from "../Button";
import { FaCheckCircle } from "react-icons/fa";

const ZenExperienceSection = ({ siteUrl, getStripe }) => {

  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleZenPurchase = async () => {
    if (!termsAccepted) {
      alert("Please accept the Terms and Conditions before proceeding.");
      return;
    }

    setLoading(true);

    const payload = {
      amount: 1250,
      selections: {
        research: { label: "Zen Experience", price: 250, description: "Includes expert research recommendations." },
        inventory: true,
        purchase: true,
      },
      description:
        "Zen Experience Package: All services combined with a special discount – pay only $1,000 instead of $1,250.",
      metadata: {
        termsAccepted: "true"
      }
    };

    try {
      const response = await fetch("/.netlify/functions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setLoading(false);
    }
  };

  return (
    <section
      className="pt-16 pb-8 bg-secondary"
      aria-labelledby="zen-experience-heading"
    >
      <div className="container mx-auto px-4 md:px-6 md:max-w-[900px] lg:px-12 ">
        <h2
          id="zen-experience-heading"
          className="text-xl sm:text-4xl md:text-4xl font-medium text-accent mb-4 text-center"
        >
          Ready to get started?
        </h2>
        <p className="text-lg md:text-xl mx-auto max-w-3xl pb-8 mt-2 text-center text-primary">
          Choose below our full Zen Experience or customize your package.
        </p>

        <div
          className="bg-white p-8 rounded-2xl shadow-lg relative border-2 border-primary"
          role="region"
          aria-labelledby="zen-package-title"
        >
          {/* Text Content in Single Column */}
          <div className="text-center">
            <span
              className="absolute -top-5 right-0  bg-accent text-white text-sm uppercase px-6 py-2 rounded-tl-lg rounded-br-lg shadow-md font-bold"
              aria-label="Best value offer"
            >
              Most Popular
            </span>
<h2 className="text-3xl font-medium text-primary md:mt-4 mb-4 uppercase tracking-wider font-pirulen">
                Zen Experience
              </h2>

              <p className="text-lg md:text-xl mx-auto max-w-4xl pb-8 mt-2 text-center text-primary">
                Choose the full Zen Car Buying experience and enjoy a special $200 discount on our most complete, all‑in‑one solution for a truly stress‑free car buying journey.
              </p>

            <p className="text-xl text-accent font-semibold mb-4">
              $1,000 <span className="text-gray-400 ml-1 line-through text-lg">$1,250</span>
            </p>

            <ul className="mb-4 space-y-2 text-center">
              {[
                "Our end to end car buying solution",
                "Get the full experience with all services included",
                "Research, inventory sourcing and purchase assistance",
              ].map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start  justify-start text-left md:items-center md:justify-center md:text-center text-gray-700"
                >
                  <FaCheckCircle className="text-accent mt-1 min-w-8 mr-2 text-lg" aria-hidden="true" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>


            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleZenPurchase}
                color="accent"
                size="lg"
                className="whitespace-nowrap px-6 py-3 text-sm md:text-base"
                aria-label="Get the Full Zen Experience"
              >
                {loading ? "Processing..." : "Get the Full Zen Experience"}
              </Button>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center justify-center m-4">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                aria-checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-primary">
                I agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ZenExperienceSection;
