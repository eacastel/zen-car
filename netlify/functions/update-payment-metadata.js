require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { id, name, email } = JSON.parse(event.body);

    if (!id || !name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields." }),
      };
    }

    const intent = await stripe.paymentIntents.update(id, {
      metadata: {
        name,
        email,
      },
      receipt_email: email,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("❌ Failed to update metadata:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Update failed." }),
    };
  }
};
