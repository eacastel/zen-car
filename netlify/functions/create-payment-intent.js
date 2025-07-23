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
    const { selections, metadata = {}, email, name } = JSON.parse(event.body);

    if (!selections || typeof selections !== "object") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing or invalid selections object" }),
      };
    }

    let finalAmount = 0;
    const breakdown = [];

    const isZenPackage = selections?.package === "Zen Experience";
    const includeResearchInventory = selections.includeResearchInventory === true;
    const includePurchaseHelp = selections.includePurchaseHelp === true;

    if (isZenPackage) {
      // Purchased via Zen Experience CTA
      finalAmount = 850 * 100;
      breakdown.push("Zen Experience – Includes Research + Inventory + Purchase Assistance ($850 with $100 discount)");
    } else if (includeResearchInventory && includePurchaseHelp) {
      // Selected both manually via Customize flow
      finalAmount = 850 * 100;
      breakdown.push("Custom Bundle – Research + Inventory + Purchase Assistance ($850 with $100 discount)");
    } else {
      if (includeResearchInventory) {
        finalAmount += 450 * 100;
        breakdown.push("Research + Inventory Sourcing – $450");
      }
      if (includePurchaseHelp) {
        finalAmount += 500 * 100;
        breakdown.push("Purchase Assistance – $500");
      }
    }

    const fullMetadata = {
      ...metadata,
      name,
      email,
      intentId: "TBD", // placeholder
      breakdown: breakdown.join(" | "),
      selections: JSON.stringify(selections),
      agreedToTerms: metadata.termsAccepted === true || metadata.termsAccepted2 === true ? "true" : "false",
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: "usd",
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      metadata: {
        ...fullMetadata,
        intentId: "temp", // gets overwritten below
      },
    });

    // Now safely patch it in without overwriting everything
    await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: {
        intentId: paymentIntent.id,
      },
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
