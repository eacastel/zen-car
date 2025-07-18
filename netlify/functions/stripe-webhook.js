require("dotenv").config();
const Stripe = require("stripe");
const { Resend } = require("resend");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-08-16" });
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  const rawBody = event.body;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === "payment_intent.succeeded") {
    const intent = stripeEvent.data.object;
    const email = intent.metadata?.email || intent.receipt_email;
    const name = intent.metadata?.name || "Customer";
    const amount = (intent.amount / 100).toFixed(2);
    const currency = intent.currency.toUpperCase();
    const services = intent.metadata?.selections || "N/A";
    const id = intent.id;

    // Format for customer
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

    // Format for admin
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

      console.log("🔥 Webhook received:", stripeEvent.type);
      console.log("📧 Attempting to email:", email);
      console.log("📨 Email body preview:", customerHtml);

      return { statusCode: 200, body: "Emails sent" };
    } catch (err) {
      console.error("❌ Email send error:", err.message);
      return { statusCode: 500, body: "Failed to send email." };
    }
  }

  return { statusCode: 200, body: "Unhandled event type" };
};
