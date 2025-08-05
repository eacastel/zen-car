import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";
import Button from "../Button";
import { navigate } from "gatsby";

const ZenExperienceSection = () => {
  const data = useStaticQuery(graphql`
    query {
      zenLogo: file(relativePath: { eq: "zen-car-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 150, quality: 90, placeholder: TRACED_SVG, layout: CONSTRAINED)
        }
      }
    }
  `);

  const logoImage = getImage(data.zenLogo);

  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleZenPurchase = async () => {
  if (!termsAccepted) {
    alert("Please accept the Terms and Conditions before proceeding.");
    return;
  }

  setLoading(true);

  const selections = {
    includeResearchInventory: true,
    includePurchaseHelp: true,
    package: "Zen Experience",
  };

  const metadata = {
    termsAccepted: "true",
    package: "Zen Experience",
  };

  try {
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selections,
        metadata,
        name: "Pending",
        email: "unknown@zencarbuying.com",
      }),
    });

    const data = await response.json();
    if (data.clientSecret) {
      navigate("/checkout/", {
        state: {
          selections,
          total: 85000, // purely for UI display, not used by Stripe
          clientSecret: data.clientSecret,
        },
      });
    } else {
      console.error("Checkout error:", data.error);
      setLoading(false);
    }
  } catch (error) {
    console.error("Error creating payment intent:", error);
    setLoading(false);
  }
};



  return (
    <section className="pb-8 bg-secondary" aria-labelledby="zen-experience-card">
      <div className="container mx-auto  md:px-4 md:max-w-4xl lg:px-6">
        <div className="rounded-2xl shadow-lg relative border-2 border-primary">
          <span className="absolute -top-5 right-0 bg-accent text-white text-sm uppercase px-6 py-2 rounded-tl-lg rounded-br-lg shadow-md font-bold">
            Recommended
          </span>

          <div className="bg-white p-4 md:pt-8 md:pb-4 lg:pb-4 rounded-2xl shadow-lg text-center" id="zen-experience-card">

            <span className="text-sm font-bold uppercase text-accent tracking-wider mb-2 block text-center">
              Best Value
            </span>

            <h3 className="text-3xl font-medium text-primary mb-4 uppercase tracking-wider font-pirulen">
              Zen Experience
            </h3>


            <p className="text-lg text-primary mb-6 mx-auto max-w-2xl px-4">
              <strong>Pay once, we handle the rest</strong>
              <br />
              From the car to the paperwork— we save you time, money and stress.
            </p>

            <p className="text-lg text-primary font-semibold mb-4 max-w-2xl px-8">
              Includes Research + Inventory Sourcing + Purchase Assistance
            </p>

            <ul className="text-lg text-primary mb-6 mx-auto max-w-md text-left pl-6 list-disc list-inside">
              <li>Personalized vehicle recommendations</li>
              <li>Nationwide inventory sourcing</li>
              <li>Dealer negotiation & paperwork handled for you</li>
            </ul>

            <div className="text-center mb-4">
              <p className="text-xl font-semibold">
                Total: <span className="text-accent">$850</span>
              </p>
              <p className="text-md text-green-600">Zen Experience Discount Applied – Save $100!</p>
            </div>
            <div className="flex justify-center">
              <GatsbyImage image={logoImage} alt="Zen Experience Logo" className="max-w-[200px] md:max-w-[300px]" />
            </div>
            <Button
              onClick={handleZenPurchase}
              color="accent"
              size="lg"
              type="button"
              className="whitespace-nowrap px-6 py-3 text-sm md:text-base"
            >
              {loading ? "Processing..." : "Get the Full Zen Experience"}
            </Button>

            <div className="flex items-center justify-center mt-4 mb-12">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-primary">
                I agree to the{" "}
                <a href="/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="text-accent underline">
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
