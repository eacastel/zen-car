import React, { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import Button from "../Button";
import { FaCheckCircle } from "react-icons/fa";

const ZenExperienceSection = ({ zenImg, siteUrl, getStripe }) => {
  const [loading, setLoading] = useState(false);

  const handleZenPurchase = async () => {
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
      <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
        <h2 
          id="zen-experience-heading" 
          className="text-xl sm:text-4xl md:text-4xl font-bold text-accent mb-4 text-center"
        >
          Ready to get started?
        </h2>
        <p className="text-lg md:text-xl mx-auto max-w-3xl pb-8 mt-2 text-center text-primary">
          Our Zen Experience package is the most complete, all‑in‑one solution for a stress‑free car buying journey. Enjoy premium support, expert guidance, and unbeatable value.
        </p>

        <div 
          className="bg-white p-8 rounded-2xl shadow-lg relative border-2 border-primary"
          role="region"
          aria-labelledby="zen-package-title"
        >
          <div className="flex flex-col lg:flex-row items-center">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center">
              <span 
                className="absolute -top-5 right-0 bg-accent text-white text-sm uppercase px-6 py-2 rounded-tl-lg rounded-br-lg shadow-md font-bold"
                aria-label="Best value offer"
              >
                Best Value
              </span>
              <h3 
                id="zen-package-title"
                className="text-3xl font-bold text-primary mb-4"
              >
                “The Zen Experience”
              </h3>
              <p className="text-xl text-accent font-semibold mb-4">
                $1,000 <span className="text-gray-400 ml-1 line-through text-lg">$1,250</span>
              </p>
              <p className="text-gray-700 mb-4 text-center">
                Get the full stress‑free experience with all services included.
              </p>
              <ul className="mb-4 space-y-2 text-center">
                {[
                  "All research, sourcing & purchase assistance",
                  "Best value package (Save $250)",
                  "End‑to‑end car buying help",
                ].map((detail, i) => (
                  <li 
                    key={i} 
                    className="flex items-center justify-center text-gray-700"
                  >
                    <FaCheckCircle className="text-accent mr-2 text-lg" aria-hidden="true" /> 
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
              <GatsbyImage 
                image={zenImg} 
                alt="Illustration of the Zen Experience package with expert guidance and research" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleZenPurchase}
              color="accent"
              size="lg"
              className="whitespace-nowrap px-6 py-3 text-sm md:text-base"
              aria-label="Purchase the Zen Experience package"
            >
              {loading ? "Processing..." : "Get the Zen Experience"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZenExperienceSection;
