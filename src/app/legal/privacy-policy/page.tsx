import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Effective Date: 11 January 2025</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to Braling Print Studio. This Privacy Policy explains how we
            collect, use, and protect your personal information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <p>We collect the following personal information:</p>
          <ul className="list-disc list-inside">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            3. How We Use Your Information
          </h2>
          <p>Your personal information is used for the following purposes:</p>
          <ul className="list-disc list-inside">
            <li>Marketing and promotional purposes</li>
            <li>Analytics to improve our services</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            4. Third-Party Services
          </h2>
          <p>
            We use third-party services like Google Analytics and Social Login
            to enhance your experience. These services may collect data based on
            their respective privacy policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Cookies</h2>
          <p>
            We use cookies to remember your preferences and enhance your user
            experience.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Advertisers</h2>
          <p>
            Your information may be shared with advertisers to deliver targeted
            ads.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            7. Data Protection and Compliance
          </h2>
          <p>
            We comply with the GDPR and CCPA regulations to protect your
            personal information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Data Retention</h2>
          <p>
            Your data is retained as long as your account remains active or
            until you delete your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            9. Children&apos;s Privacy
          </h2>
          <p>Our services are not intended for children under the age of 13.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            10. Updates to this Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. You will be
            notified via email about any changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">11. Contact Us</h2>
          <p>If you have any questions or concerns, please contact us at:</p>
          <ul className="list-disc list-inside">
            <li>
              Website:{" "}
              <a
                href="https://bralingprintstudio.com"
                className="text-blue-500"
              >
                Braling Print Studio
              </a>
            </li>
            <li>Phone: +62 858-0333-0005</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
