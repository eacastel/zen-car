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

 // Get full PaymentIntent, including first charge's billing details
    const intent = await stripe.paymentIntents.retrieve(id, {
      expand: ["charges.data.billing_details"],
    });

    const metadata = intent.metadata || {};
    const charge = intent.charges?.data?.[0] || {};
    const billing = charge.billing_details || {};

    // Try all reasonable places for email + name
    const customerEmail =
      intent.receipt_email ||
      metadata.email ||
      billing.email ||
      "";

    const customerName =
      metadata.name ||
      billing.name ||
      "";

    return {
      statusCode: 200,
      body: JSON.stringify({
        amount: intent.amount,
        currency: intent.currency,
        id: intent.id,
        receipt_email: intent.receipt_email || "",
        customer_email: customerEmail,
        customer_name: customerName,
        metadata,
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
