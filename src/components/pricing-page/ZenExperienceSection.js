import React, { useState } from "react";
import Button from "../Button";
import { navigate } from "gatsby";

const ZenExperienceSection = () => {
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleZenPurchase = async () => {
    if (!termsAccepted) {
      alert("Please accept the Terms and Conditions before proceeding.");
      return;
    }

    setLoading(true);

    const payload = {
      amount: 1000, // bundle price in dollars
      selections: {
        research: {
          label: "Zen Experience",
          price: 800,
          description: "Includes Research + Inventory + Purchase (value $1,000 – you save $200).",
        },
        inventory: true,
        purchase: true,
      },
      description:
        "Zen Experience Package: All services combined with a special discount – pay only $800 instead of $1,000.",
      metadata: {
        termsAccepted: "true",
        package: "Zen Experience",
      },
      name: "Pending",
      email: "unknown@zencarbuying.com",
    };

    try {
      const response = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.clientSecret) {
        // Redirect to internal checkout flow (Stripe Elements UI)
        navigate("/checkout", {
          state: {
            selections: payload.selections,
            total: 80000, // in cents
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
    <section className="pt-16 pb-8 bg-secondary" aria-labelledby="zen-experience-heading">
      <div className="container mx-auto px-0 md:px-2 md:max-w-[1280px] lg:px-6 lg:max-w-[1280px]">
        <h2
          id="zen-experience-heading"
          className="text-xl sm:text-4xl font-medium text-accent mb-4 text-center"
        >
          Start your Zen Car Buying journey
        </h2>
        <p className="text-lg md:text-xl text-center text-primary mb-12">
          Select the full Zen Experience for the most comprehensive support, or customize your package to fit your exact needs.
        </p>

       

        <div className="mx-1 md:mx-2 lg:mx-6 lg:max-w-[1280px] rounded-2xl shadow-lg relative border-2 border-primary">
          <span className="absolute -top-5 right-0 bg-accent text-white text-sm uppercase px-6 py-2 rounded-tl-lg rounded-br-lg shadow-md font-bold">
            Most Popular
          </span>
          <div className="bg-white p-4 md:p-8 lg:p-12 rounded-2xl shadow-lg text-center">



            <h3 className="text-3xl font-medium text-primary mb-4 uppercase tracking-wider font-pirulen">
              Zen Experience
            </h3>
            <p className="text-lg text-primary mb-6">
              The complete Zen Car Buying solution with expert research, inventory sourcing, and purchase help.
            </p>

            <p className="text-xl text-accent font-semibold mb-4">
              $800 <span className="text-gray-400 line-through text-lg ml-1">$1,000</span>
            </p>

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
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-accent underline">
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
