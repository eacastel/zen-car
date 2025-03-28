import React from "react";
import Layout from "../components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <main className="container mx-auto py-10 px-6 lg:px-12">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-6">
          <strong>Effective Date:</strong> [Date] <br />
          <strong>Last Updated:</strong> [Date]
        </p>

        <section className="space-y-6">
          <p>
            Welcome to <strong>Zen Car Buying</strong> ("Company", "we", "our", "us"). This Privacy Policy outlines how we
            collect, use, and protect your personal information, including details about our use of cookies, SMS
            communications, and your privacy rights.
          </p>

          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p>We collect the following types of information:</p>

          <ul className="list-disc pl-6">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and preferences for car searches.</li>
            <li><strong>Device & Usage Data:</strong> Browser type, IP address, pages visited, and interaction with the site.</li>
            <li><strong>Cookies & Tracking:</strong> Details about how you interact with our website.</li>
          </ul>

          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>

          <ul className="list-disc pl-6">
            <li>To provide and improve our car buying concierge service.</li>
            <li>To communicate with you via email, phone, and SMS.</li>
            <li>For legal compliance and fraud prevention.</li>
          </ul>

          <h2 className="text-2xl font-semibold">3. SMS Messaging Policy</h2>
          <p>
            By providing your phone number, you consent to receive SMS messages from Zen Car Buying LLC. These may include:
          </p>

          <ul className="list-disc pl-6">
            <li>Appointment reminders</li>
            <li>Vehicle search updates</li>
            <li>Promotional offers (if opted in)</li>
          </ul>

          <p>
            <strong>Opt-Out:</strong> You can opt out at any time by replying "STOP". Standard messaging rates may apply.
            For assistance, reply "HELP" or email us at{" "}
            <a href="mailto:privacy@zencarbuying.com" className="text-accent hover:underline">
              privacy@zencarbuying.com
            </a>.
          </p>

          <h2 className="text-2xl font-semibold">4. How We Share Your Information</h2>
          <p>We do not sell your personal information. We may share your data with:</p>

          <ul className="list-disc pl-6">
            <li>Service providers (e.g., payment processors, analytics tools).</li>
            <li>Legal authorities if required by law.</li>
          </ul>

          <h2 className="text-2xl font-semibold">5. Cookies & Tracking Technologies</h2>
          <p>We use cookies to improve your experience. Our site uses:</p>

          <ul className="list-disc pl-6">
            <li><strong>Essential Cookies:</strong> Required for core website functions.</li>
            <li><strong>Analytics Cookies:</strong> To measure site performance.</li>
            <li><strong>Marketing Cookies:</strong> For personalized ads (if applicable).</li>
          </ul>

          <p>
            You can manage your cookie preferences through{" "}
            <a href="https://www.cookieyes.com/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              CookieYes
            </a>.
          </p>

          <h2 className="text-2xl font-semibold">6. Your Privacy Rights</h2>
          <p>
            If you are a resident of California or other applicable regions, you have the right to:
          </p>

          <ul className="list-disc pl-6">
            <li>Request access to personal data we collect.</li>
            <li>Request deletion of your data.</li>
            <li>Opt out of marketing communications.</li>
          </ul>

          <h2 className="text-2xl font-semibold">7. Data Security</h2>
          <p>We use industry-standard security measures to protect your data, including:</p>

          <ul className="list-disc pl-6">
            <li>Data encryption for sensitive information.</li>
            <li>Restricted access to personal data.</li>
            <li>Secure third-party integrations.</li>
          </ul>

          <h2 className="text-2xl font-semibold">8. Third-Party Links</h2>
          <p>Our website may contain links to third-party sites. We are not responsible for their privacy practices.</p>

          <h2 className="text-2xl font-semibold">9. Updates to This Policy</h2>
          <p>We may update this Privacy Policy periodically. The "Last Updated" date reflects the latest changes.</p>

          <h2 className="text-2xl font-semibold">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>

          <p>
            📧 Email:{" "}
            <a href="mailto:privacy@zencarbuying.com" className="text-accent hover:underline">
              privacy@zencarbuying.com
            </a>
            <br />
            📍 Address: 2525 E. 29th Ave., Suite 10B-262, Spokane, WA 99223.
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default PrivacyPolicy;

export const Head = () => {
  const siteUrl = "https://zencarbuying.com";
  return (
    <>
      <title>Privacy Policy | Zen Car Buying LLC</title>
      <meta name="description" content="Zen Car Buying's Privacy Policy covering data collection, SMS communication, and cookies." />
      <link rel="canonical" href={`${siteUrl}/privacy-policy`} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Privacy Policy | Zen Car Buying" />
      <meta property="og:description" content="Zen Car Buying's Privacy Policy covering data collection, SMS communication, and cookies." />
      <meta property="og:url" content={`${siteUrl}/privacy-policy`} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Privacy Policy | Zen Car Buying" />
      <meta name="twitter:description" content="Zen Car Buying's Privacy Policy covering data collection, SMS communication, and cookies." />

      {/* JSON‑LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: `${siteUrl}/privacy-policy`,
          name: "Privacy Policy",
          description: "Zen Car Buying's Privacy Policy covering data collection, SMS communication, and cookies.",
        })}
      </script>
    </>
  );
};
