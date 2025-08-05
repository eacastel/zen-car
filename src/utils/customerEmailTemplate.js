function buildCustomerEmail({ name = "Customer", amount, currency, breakdown, paymentIntentId }) {
  const formattedAmount = `$${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;

  return `
    <h2 style="font-family: sans-serif; color: #222;">Welcome to Zen Car Buying!</h2>

    <p style="font-family: sans-serif; font-size: 16px;">
      Hi <strong>${name}</strong>, thank you for your purchase — we’re excited to help you find the perfect car, the stress-free way.
    </p>

    <p style="font-family: sans-serif; font-size: 16px;">
      <strong>Here’s what we’ve received:</strong><br/>
      Services: ${breakdown}<br/>
      Amount Paid: ${formattedAmount}<br/>
      Transaction ID: ${paymentIntentId}
    </p>

    <hr />

    <h3 style="font-family: sans-serif; color: #222;">What happens next?</h3>

    <ol style="font-family: sans-serif; font-size: 16px; padding-left: 20px;">
      <li><strong>Step 1:</strong>  If you haven’t already, schedule your welcome call with your Zen Guide.<br />
        <a href="https://zencarbuying.com/15min/" style="color: #e67e22;">Book Your Appointment →</a>
      </li>
      <li><strong>Step 2:</strong> We’ll review your goals, preferences and budget during the call.</li>
      <li><strong>Step 3:</strong> Based on the package you selected, we’ll begin the research, sourcing and/or negotiation process.</li>
    </ol>

    <p style="font-family: sans-serif; font-size: 16px;">
      Expect a confirmation email from your Zen Guide shortly after you schedule the intro call.
    </p>

    <p style="font-family: sans-serif; font-size: 16px;">
      If you have any questions in the meantime, reply to this email or contact us at <a href="mailto:support@zencarbuying.com">support@zencarbuying.com</a>.
    </p>

    <p style="font-family: sans-serif; font-size: 16px;">
      Welcome aboard —<br/>
      The Zen Car Buying Team
    </p>
  `;
}

module.exports = { buildCustomerEmail };
