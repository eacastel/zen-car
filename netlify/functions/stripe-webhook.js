require("dotenv").config();
const Stripe = require("stripe");
const { Resend } = require("resend");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-08-16" });
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  const rawBody = Buffer.from(event.body, "utf8");

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === "payment_intent.succeeded") {
    const intentId = stripeEvent.data.object.id;

    let intent;
    try {
      intent = await stripe.paymentIntents.retrieve(intentId, {
        expand: ["charges"],
      });
    } catch (err) {
      console.error("❌ Failed to retrieve PaymentIntent:", err.message);
      return { statusCode: 500, body: "Error retrieving PaymentIntent" };
    }

    const charge = intent.charges?.data?.[0];

    const email = charge?.billing_details?.email || "unknown@zencarbuying.com";
    const name = charge?.billing_details?.name || "Customer";

    const amount = (intent.amount / 100).toFixed(2);
    const currency = intent.currency.toUpperCase();
    const services = intent.metadata?.selections || intent.metadata?.package || "N/A";
    const id = intent.id;

    const customerHtml = `
      <h2>Thank You for Your Purchase!</h2>
      <p>Hi ${name},</p>
      <p>We’ve received your payment of <strong>$${amount} ${currency}</strong>.</p>
      <p>We’ll begin work on your Zen Car Buying package shortly.</p>
      <hr />
      <p><strong>Services Selected:</strong></p>
      <pre>${services}</pre>
      <p><strong>Transaction ID:</strong> ${id}</p>
      <p>Thanks again,<br />Zen Car Buying Team</p>
    `;

    const adminHtml = `
      <h2>New Purchase Alert</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Amount:</strong> $${amount} ${currency}</p>
      <p><strong>Metadata:</strong></p>
      <pre>${services}</pre>
      <p><strong>Payment ID:</strong> ${id}</p>
    `;

    try {
      // 🟢 Optional: debug email showing billing details
      await resend.emails.send({
        from: "Zen Debug <debug@zencarbuying.com>",
        to: "manager@zencarbuying.com",
        subject: "DEBUG: Stripe Billing Details",
        html: `<pre>${JSON.stringify(charge?.billing_details, null, 2)}</pre>`,
      });

      // 📤 Email to customer
      await resend.emails.send({
        from: "Zen Car Buying <guide@zencarbuying.com>",
        to: email,
        subject: "Your Zen Car Buying Purchase Confirmation",
        html: customerHtml,
      });

      // 📤 Email to admin
      await resend.emails.send({
        from: "Zen Car Buying <hello@zencarbuying.com>",
        to: "manager@zencarbuying.com",
        subject: `✅ New Zen Purchase: ${name}`,
        html: adminHtml,
      });

      console.log("✅ Emails sent to customer and admin for:", email);
      return { statusCode: 200, body: "Emails sent" };
    } catch (err) {
      console.error("❌ Email send error:", err.message);
      return { statusCode: 500, body: "Failed to send email." };
    }
  }

  return { statusCode: 200, body: "Unhandled event type" };
};
