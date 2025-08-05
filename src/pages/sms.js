import React, { useState } from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default function SmsPage() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Layout>
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-primary mb-8">
          Text Zen Car Buying
        </h1>

        <p className="text-lg text-primary mb-6">
        By texting Zen Car Buying LLC (888) 651-6088 you agree to receive Conversations (external) messages from Zen Car Buying LLC for communication regarding your vehicle search and buying experience. Message and data rates may apply. Message frequency may vary. Reply STOP to opt-out or HELP for support.
        Visit <a href="/privacy-policy/" className="underline text-accent">https://zencarbuying.com/privacy-policy/</a> to see our Privacy Policy and <a href="/sms-terms-and-conditions/" className="underline text-accent">https://zencarbuying.com/sms-terms-and-conditions/</a> for our Terms of Service.
        </p>

        {/* Checkbox */}
        <div className="flex items-start justify-center gap-2 mb-8 text-left">
          <input
            id="sms-consent"
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="sms-consent" >
            I agree to the SMS Terms above.
          </label>
        </div>

        {/* Start Texting Button */}

<a
  href="sms:+18886516088?body=Hi%20Zen%20Car%20Buying%2C%20I'm%20interested%20in%20your%20services."
  className="inline-block px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition bg-primary text-white hover:bg-primary-dark"
  aria-label="Start texting Zen Car Buying"
>
  Start Texting
</a>
      </section>
    </Layout>
  );
}

export const Head = () => (
  <Seo
    title="Text Us | Zen Car Buying"
    description="Contact Zen Car Buying via text message. Consent to receive SMS messages and learn more about our privacy and SMS terms."
    pathname="/sms/"
  />
);
