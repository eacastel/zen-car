import React from "react";
import Seo from "../components/Seo";
import Layout from "../components/Layout";

export default function SmsTerms() {
  return (
    <Layout>
      <main className="container mx-auto py-10 px-6 md:px-20 lg:px-40 prose prose-sm sm:prose lg:prose-lg max-w-none">
        <h1 className="text-primary text-4xl font-bold my-8">SMS Terms &amp; Conditions</h1>
        <p className="text-primary my-8">
          <strong>Effective Date:</strong> March 1, 2025
        </p>

        <section className="space-y-6 text-primary">

        <p>Welcome to the website of <strong>Zen Car Buying, LLC</strong> (“ZCB”, “Company”, “we”, or “us”). By accessing or using this website (the “Site”) including its services like SMS, you agree to be bound by the following SMS Terms and Conditions (“Terms”). If you do not agree to these Terms, please do not use this Site or its SMS capabilities.</p>
          {/* 1 — SMS Consent Communication */}
          <h2 className="text-2xl font-semibold">1. SMS Consent Communication</h2>
          <p>
            The phone numbers obtained as part of the client onboarding or SMS‑consent process will <strong>not</strong> be shared with third parties for marketing purposes.
          </p>

          {/* 2 — Types of communications */}
          <h2 className="text-2xl font-semibold">2. Types of SMS Communications</h2>
          <p>
            If you have consented to receive text messages from <strong>ZCB</strong>, you may receive messages related to the following:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base text-primary mb-8">
            <li>Appointment reminders</li>
            <li>Follow‑up messages</li>
            <li>Billing inquiries</li>
          </ul>
          <p className="italic">
            Example: “Hello, this is a friendly reminder of your upcoming appointment with our Zen Gude [Name] at [Location] on [Date] at [Time]. You can reply STOP to opt out of SMS messaging from Zen Car Buying at any time.”
          </p>

          {/* 3 — Message frequency */}
          <h2 className="text-2xl font-semibold">3. Message Frequency</h2>
          <p>
            Message frequency may vary depending on the type of communication. For example, you may receive up to <strong>4</strong> SMS messages per week related to your appointments, billing, or account status.
          </p>

          {/* 4 — Potential fees */}
          <h2 className="text-2xl font-semibold">4. Potential Fees for SMS Messaging</h2>
          <p>
            Standard message and data rates may apply, depending on your carrier’s pricing plan. Fees may vary for domestic and international messages.
          </p>

          {/* 5 — Opt‑in method */}
          <h2 className="text-2xl font-semibold">5. Opt‑In Method</h2>
          <p>
            You may opt‑in to receive SMS messages from <strong>ZCB</strong> in the following ways:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base text-primary mb-8">
            <li>By texting our SMS number through the website or through your mobile phone</li>
            <li>By submitting an online form that includes your mobile phone number</li>
            <li>By purchasing our services and providing a mobile phone number</li>
          </ul>

          {/* 6 — Opt‑out method */}
          <h2 className="text-2xl font-semibold">6. Opt‑Out Method</h2>
          <p>
            You can opt out of receiving SMS messages at any time. Reply <strong>STOP</strong> to any SMS you receive, or contact us directly to request removal from our messaging list.
          </p>

          {/* 7 — Help */}
          <h2 className="text-2xl font-semibold">7. Help</h2>
          <p>
            If you are experiencing any issues, reply with the keyword <strong>HELP</strong>, or contact us directly at <em>help@zencarbuying.com</em>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base text-primary mb-8">
            <li>If you do not wish to receive SMS messages, simply do not text or SMS our phone number or check the SMS‑consent box on our forms.</li>
          </ul>

          {/* 8 — Standard disclosures */}
          <h2 className="text-2xl font-semibold">8. Standard Messaging Disclosures</h2>
          <ul className="list-disc pl-5 space-y-2 text-base text-primary mb-8">
            <li>Message and data rates may apply.</li>
            <li>You can opt out at any time by texting “STOP.”</li>
            <li>For assistance, text “HELP” or visit our <a href="https://zencarbuying.com/privacy-policy/" className="text-accent hover:underline">https://zencarbuying.com/privacy-policy/</a> and <a href="https://zencarbuying.com/terms-and-conditions/" className="text-accent hover:underline">https://zencarbuying.com/terms-and-conditions/</a> for our Terms of Service. pages.</li>
            <li>Message frequency may vary.</li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}

export const Head = ({ location }) => (
  <Seo
    title="SMS Terms & Conditions | Zen Car Buying"
    description="Review Zen Car Buying's SMS Terms & Conditions outlining consent, message frequency, data rates, opt-out instructions, and privacy practices related to text messaging."
    pathname={location.pathname}
    robots="noindex, follow"
  />
);