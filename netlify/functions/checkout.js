// src/api/checkout.js
require("dotenv").config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Allow": "POST" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { amount, selections, description, metadata } = JSON.parse(event.body);
    if (!amount || !selections) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required parameters" }),
      };
    }

    let lineItems = [];

    if (amount === 1000) {
      // 1 recommendation  → charge $800
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Zen Experience – 1 Car Recommendation, Inventory Sourcing and Purchase Assistance",
            description: "Special bundle: only $800 instead of $1,000.",
          },
          unit_amount: 800 * 100,
        },
        quantity: 1,
      });
    } else if (amount === 1100) {
      // 2 recommendations → charge $900
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Zen Experience – 2 Car Recommendations, Inventory Sourcing and Purchase Assistance",
            description: "Special bundle: only $800 instead of $1,100.",
          },
          unit_amount: 900 * 100,
        },
        quantity: 1,
      });
    } else if (amount === 1200) {
      // 3 recommendations → charge $1,000
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Zen Experience – 3 Car Recommendations, Inventory Sourcing and Purchase Assistance",
            description: "Special bundle: only $1,000 instead of $1,200.",
          },
          unit_amount: 1000 * 100,
        },
        quantity: 1,
      });
      } else {
      if (selections.research && selections.research.price > 0) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: `Research Recommendation: ${selections.research.label}`,
              description: selections.research.description,
            },
            unit_amount: selections.research.price * 100,
          },
          quantity: 1,
        });
      }
      if (selections.inventory) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Inventory Sourcing",
              description: "Receive up to 5 vehicle recommendations per match.",
            },
            unit_amount: 250 * 100,
          },
          quantity: 1,
        });
      }
      if (selections.purchase) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Purchase Assistance",
              description: "Negotiation, warranty checks, paperwork assistance, and dealer coordination.",
            },
            unit_amount: 500 * 100,
          },
          quantity: 1,
        });
      }
    }

    const sessionParams = {
      payment_method_types: ["card", "link"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.GATSBY_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.GATSBY_SITE_URL}/cancel`,
      metadata: {
        selections: JSON.stringify(selections),
        description: description.substring(0, 500),
        agreedToTerms: 
        metadata.termsAccepted === true || metadata.termsAccepted2 === true
        ? "true"
        : "false",
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id, url: session.url }),
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
  
};
