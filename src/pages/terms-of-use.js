import React from "react";
import Seo from "../components/Seo";
import Layout from "../components/Layout";

export default function WebsiteTerms() {
  return (
    <Layout>
      <main className="container mx-auto py-10 px-6 md:px-20 lg:px-40 prose prose-sm sm:prose lg:prose-lg max-w-none">
        <h1 className="text-primary text-4xl font-bold my-8">Terms of Use</h1>
        <p className="text-primary my-8">
          <strong>Effective Date:</strong> March 1, 2025
        </p>

        <section className="space-y-6 text-primary">
          <p>
            Welcome to the website of <strong>Zen Car Buying, LLC</strong> (“ZCB”, “Company”, “we”, or “us”). By accessing or using this website (the “Site”), you agree to be bound by the following Terms of Use (“Terms”). If you do not agree to these Terms, please do not use this Site.
          </p>

          <h2 className="text-2xl font-semibold">1. Use of Site</h2>
          <p>
            The content on this Site is provided for general informational purposes only. You agree not to use this Site for any unlawful purpose or any purpose prohibited under these Terms.
          </p>

          <h2 className="text-2xl font-semibold">2. Intellectual Property</h2>
          <p>
            All content, trademarks, logos and other intellectual property displayed on this Site are the property of Zen Car Buying, LLC or its licensors. You may not copy, reproduce, distribute, or otherwise use any content from this Site without express written permission.
          </p>

          <h2 className="text-2xl font-semibold">3. Third-Party Services</h2>
          <p>
            This Site uses third-party services such as Stripe (for payments), Calendly (for scheduling) and other embedded tools (“Third-Party Services”). By using this Site, you acknowledge that such services are governed by their own terms and conditions, which are not under ZCB’s control. ZCB is not responsible for the content, functionality, or practices of these services.
          </p>

          <h2 className="text-2xl font-semibold">4. Disclaimer of Warranties</h2>
          <p>
            This Site is provided “as is” and “as available” without warranties of any kind, either express or implied. We do not guarantee that the Site will be error-free or uninterrupted. We are not liable for any damage resulting from viruses, bugs, or other technological issues that may affect your use of the Site.
          </p>

          <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Zen Car Buying, LLC shall not be liable for any damages arising out of or related to your use of this Site, including but not limited to indirect, incidental, or consequential damages.
          </p>

          <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Updates will be posted on this page and take effect immediately upon publication. Your continued use of the Site after any changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold">7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Washington, without regard to conflict of law principles.
          </p>

          <h2 className="text-2xl font-semibold">8. Contact Information</h2>
          <p>
            If you have any questions or concerns, please contact us at:
            <br />
            Email: <a href="mailto:info@zencarbuying.com" className="text-accent hover:underline">info@zencarbuying.com</a>
            <br />
            Address: 2525 E. 29th Ave., Suite 10B-262, Spokane, WA 99223
          </p>
        </section>
      </main>
    </Layout>
  );
}

export const Head = ({ location }) => (
  <Seo
    title="Website Terms of Use | Zen Car Buying"
    description="Review Zen Car Buying's Terms of Use for this website, covering user conduct, intellectual property and limitations of liability when accessing our content or services online."
    pathname={location.pathname}
    robots="noindex, follow"
  />
);