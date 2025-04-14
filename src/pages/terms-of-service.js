import React from "react";
import Layout from "../components/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <main className="container mx-auto py-10 px-6 lg:px-12 max-w-5xl">
        <h1 className="text-primary text-4xl font-bold my-8">Clickwrap Terms and Conditions Agreement</h1>
        <p className="text-primary my-6">
          <strong>Effective Date:</strong> March 1, 2025 <br />
          <strong>Last Updated:</strong> April 14, 2025
        </p>

        <section className="space-y-6 text-primary">
          <p>
            This Clickwrap Terms and Conditions Agreement ("Agreement") is a legally binding contract between Zen Car Buying, LLC, a Washington limited liability company ("ZCB," "Company," "we," or "us"), and you ("User" or "you"). By clicking "I AGREE," you confirm that you have reviewed, understood, and accepted this Agreement in its entirety. If you do not agree, you must discontinue access to and use of the Company’s resources, which include vehicle research recommendations, inventory sourcing, and purchase assistance as described herein.
          </p>

          <h2 className="text-2xl font-semibold">Definitions</h2>
          <p><strong>Services.</strong> The online platform provided by the Company facilitates vehicle research, vehicle sourcing, and/or vehicle purchase assistance by us and for you, and supports transactions, communications, and related activities. The Company provides vehicle research recommendations, inventory sourcing, and purchase assistance as a service to you in consideration for certain fees provided on the Company’s website.</p>
          <p><strong>Platform.</strong> Our website, including integrated content, tools, technology, and features.</p>
          <p><strong>Agreement.</strong> This document, including any linked terms (e.g., Privacy Policy, Fee Disclosures), constitutes the complete and exclusive agreement between the User and the Company.</p>

          <h2 className="text-2xl font-semibold">User Consent</h2>
          <p><strong>Consent by Click.</strong> By clicking "I AGREE" during registration or use of the Services, you provide explicit consent to this Agreement, including all incorporated policies. Your assent to this Agreement is governed by the Uniform Electronic Transactions Act (UETA) (RCW 19.360), making it legally binding as an electronic signature under Washington law. This Agreement complies with Washington case law, including Wilson v. Huuuge, Inc.</p>
          <p><strong>SMS Consent.</strong> By providing your phone number and clicking "SCHEDULE EVENT," you consent to receive text messages (SMS) from the Company regarding appointment scheduling, updates regarding the Services, appointment reminders, etc. at the phone number you have provided. Message and data rates may apply. You can opt out at any time by replying "STOP".</p>

          <h2 className="text-2xl font-semibold">Services Provided and Liability Limitations</h2>
          <p><strong>Scope.</strong> The Services assist buyers in locating and acquiring a new or used vehicle. The Company does not serve as a dealership, provide financing, or guarantee the success of any transaction. All automotive sales contracts are between the buyer and the respective dealer/private seller.</p>
          <p><strong>No Guarantee or Warranty.</strong> The Company does not guarantee the availability of specific vehicles, dealer/seller pricing, or the success of any negotiations or transactions.</p>
          <p><strong>Dealer Independence.</strong> The Company is not a dealer and is not responsible for the conduct, representations, or contractual obligations of any dealer.</p>
          <p><strong>No Warranty.</strong> The Company provides the platform "as is" and disclaims all warranties, express or implied.</p>
          <p><strong>Limitation of Liability.</strong> The Company’s liability is limited to the amount paid for the Services.</p>
          <p><strong>Liability Carve-Out.</strong> The Company does not disclaim liability for gross negligence, intentional misconduct, or violations of Washington consumer protection laws.</p>
          <p><strong>No Agency.</strong> The Company is not an agent, representative, or fiduciary of you or the dealer/private seller.</p>

          <h2 className="text-2xl font-semibold">Required Regulatory Disclosures</h2>
          <p><strong>Fee Disclosures.</strong> Service fees are transparently disclosed before charges are incurred, in compliance with the Washington Consumer Protection Act (CPA).</p>
          <p><strong>Company Limitations.</strong> You are responsible for verifying all terms with the dealer directly and conducting your own due diligence.</p>
          <p><strong>Additional Disclosures.</strong> The Company affirms compliance with Washington law regarding broker disclosures.</p>

          <h2 className="text-2xl font-semibold">User Obligations</h2>
          <ul className="list-disc pl-6">
            <li>Use the Services solely for lawful and personal purposes.</li>
            <li>Provide accurate and complete information when prompted.</li>
            <li>Do not tamper with UI mechanisms or security features.</li>
            <li>Independently review all dealer terms and agreements.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Fees and Payment</h2>
          <p><strong>Transparency.</strong> Fees will be clearly displayed at checkout and are non-refundable unless required by law.</p>
          <p><strong>Payment Terms.</strong> Payments must be made via accepted methods such as Stripe.</p>
          <p><strong>Fee Example.</strong> A $250 fee may apply for inventory sourcing and will be shown before transaction confirmation.</p>

          <h2 className="text-2xl font-semibold">Governing Law and Disputes</h2>
          <p><strong>Governing Law.</strong> Washington State law governs this Agreement.</p>
          <p><strong>Jurisdiction.</strong> Disputes must be brought in Spokane County, Washington courts.</p>
          <p><strong>Dispute Resolution.</strong> Parties must first attempt good faith mediation before filing legal actions.</p>

          <h2 className="text-2xl font-semibold">Technological Requirements and UI Enforceability</h2>
          <p><strong>Affirmative Assent.</strong> "I AGREE" is required before payment and includes a hyperlink to this Agreement.</p>
          <p><strong>Accessibility.</strong> The UI complies with best practices for legibility and conspicuous placement.</p>

          <h2 className="text-2xl font-semibold">Termination and Suspension</h2>
          <p>The Company may terminate or suspend access for violations of this Agreement with reasonable notice, unless immediate action is required.</p>

          <h2 className="text-2xl font-semibold">Severability</h2>
          <p>If any part of this Agreement is deemed invalid, the remaining provisions remain in effect.</p>

          <h2 className="text-2xl font-semibold">Modifications</h2>
          <p>The Company may update this Agreement. Continued use of Services implies acceptance of changes.</p>

          <h2 className="text-2xl font-semibold">Entire Agreement</h2>
          <p>This Agreement, the Privacy Policy, and referenced documents constitute the full agreement between the parties.</p>

          <h2 className="text-2xl font-semibold">User Acknowledgements</h2>
          <ul className="list-disc pl-6">
            <li>You have read, understood, and accepted this Agreement.</li>
            <li>You are at least 18 years old.</li>
            <li>Your consent creates a binding legal agreement under Washington law.</li>
          </ul>

          <p>
            <strong>Zen Car Buying, LLC</strong><br />
            2525 E. 29th Ave., Suite 10B-262<br />
            Spokane, WA 99223<br />
            Email:{" "}
            <a href="mailto:privacy@zencarbuying.com" className="text-accent hover:underline">
              privacy@zencarbuying.com
            </a>
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default TermsPage;