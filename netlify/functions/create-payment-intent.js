require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { amount, selections, description, metadata = {}, email, name } = JSON.parse(event.body);

    if (!amount || !selections) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing amount or selections" }),
      };
    }

    // Generate metadata similar to line item breakdown
    let breakdown = [];
    let finalAmount = amount;

    if (
      selections?.research?.label === "Zen Experience" &&
      amount === 1000
    ) {
      breakdown = [
        "Zen Experience $1,000 – Includes Research + Inventory + Purchase (you pay $800 – $200 off)",
      ];
      finalAmount = 800 * 100; // Customer is charged $800
    } else if (amount === 1100) {
      breakdown.push("Zen Experience – 2 Cars + Inventory + Purchase ($900 special bundle)");
      finalAmount = 900 * 100;
    } else if (amount === 1200) {
      breakdown.push("Zen Experience – 3 Cars + Inventory + Purchase ($1000 special bundle)");
      finalAmount = 1000 * 100;
    } else {
      // Standard selections
      if (selections.research && selections.research.price > 0) {
        breakdown.push(`Research: ${selections.research.label} – $${selections.research.price}`);
      }
      if (selections.inventory) {
        breakdown.push("Inventory Sourcing – $250");
      }
      if (selections.purchase) {
        breakdown.push("Purchase Assistance – $500");
      }
      finalAmount = amount;
    }

    const fullMetadata = {
      ...metadata,
      name,
      email,
      breakdown: breakdown.join(" | "),
      selections: JSON.stringify(selections),
      agreedToTerms: metadata.termsAccepted === true || metadata.termsAccepted2 === true ? "true" : "false",
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: "usd",
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      metadata: fullMetadata,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (err) {
    console.error("Payment intent error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
