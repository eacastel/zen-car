require("dotenv").config();
const Stripe = require("stripe");
const { Resend } = require("resend");
const { buildCustomerEmail } = require("../utils/customerEmailTemplate");


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

    const intent = await stripe.paymentIntents.retrieve(intentId, {
      expand: ["charges.data.billing_details"],
    });

    const charge = intent.charges?.data?.[0] || {};

    const email =
      intent.metadata?.email ||
      intent.receipt_email ||
      charge.billing_details?.email ||
      "unknown@zencarbuying.com";

    const name =
      intent.metadata?.name ||
      charge.billing_details?.name ||
      "Customer";

    const amount = (intent.amount / 100).toFixed(2);
    const currency = intent.currency.toUpperCase();

    let services = "N/A";
    try {
      const raw = intent.metadata?.selections;
      if (raw) {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        services = Object.entries(parsed)
          .map(([key, val]) => `${key}: ${val}`)
          .join("\n");
      }
    } catch {
      services = intent.metadata?.selections || "N/A";
    }

    const id = intent.id;

    // ✅ DEBUG: You can check this in Netlify Logs
    console.log("📧 Billing Email:", charge.billing_details?.email);
    console.log("👤 Billing Name:", charge.billing_details?.name);
    console.log("📨 Final Email Used:", email);
    console.log("🙋 Final Name Used:", name);

    const breakdown = intent.metadata?.breakdown || null;

    // Format for customer
    const customerHtml = buildCustomerEmail({
      name,
      amount: intent.amount,
      currency: intent.currency,
      breakdown,
      paymentIntentId: intent.id,
    });

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

      console.log("🔥 Webhook processed and emails sent.");
      return { statusCode: 200, body: "Emails sent" };
    } catch (err) {
      console.error("❌ Email send error:", err.message);
      return { statusCode: 500, body: "Failed to send email." };
    }
  }

  return { statusCode: 200, body: "Unhandled event type" };
};
