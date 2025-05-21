// /netlify/functions/get-payment-intent.js
require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { id } = JSON.parse(event.body);

    if (!id || !id.startsWith("pi_")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid payment_intent ID" }),
      };
    }

    const intent = await stripe.paymentIntents.retrieve(id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        amount: intent.amount,
        currency: intent.currency,
        id: intent.id,
      }),
    };
  } catch (error) {
    console.error("❌ Stripe fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to retrieve payment intent" }),
    };
  }
};
