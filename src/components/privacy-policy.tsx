import React from "react";

interface PrivacyPolicyProps {
  contactEmail: string;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ contactEmail }) => {
  return (
    <div className="bg-gradient-to-b from-[#0E1217] via-[#0F1217] to-[#0E1217] p-4">
      <div className="flex flex-col max-w-3xl mx-auto gap-8 text-blue-100 py-[5%]">
        <h2 className="text-4xl font-extrabold text-center">
          VidSphere Privacy Policy
        </h2>
        <p className="text-center text-sm w-[90%] mx-auto">
          Welcome to VidSphere! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          information when you use VidSphere.
        </p>
        <hr className="border border-blue-100 font-semibold my-4" />

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">1. Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as when you
            create or modify your account, upload content, or contact us for
            support. We may also collect certain information automatically when
            you use VidSphere.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">
            2. How We Use Your Information
          </h3>
          <p>
            We may use the information we collect from you to (List of purposes,
            e.g., provide, maintain, and improve VidSphere, personalize your
            experience, etc.).
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">
            3. Sharing Your Information
          </h3>
          <p>
            We may share your information with third parties for various
            purposes, such as to provide services on our behalf, comply with
            legal obligations, or protect our rights.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">4. Security</h3>
          <p>
            We take reasonable measures to help protect your information from
            unauthorized access, use, or disclosure. However, no method of
            transmission over the internet or electronic storage is 100% secure.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">5. Your Choices</h3>
          <p>
            You may update or delete your account information at any time by
            logging into your account settings. You may also opt out of certain
            communications from us.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">
            6. Changes to This Privacy Policy
          </h3>
          <p>
            We reserve the right to modify this Privacy Policy at any time. Any
            changes will be effective immediately upon posting on VidSphere.
            Your continued use of VidSphere after the posting of changes
            constitutes your acceptance of such changes.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">7. Contact Us</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
        <p className="flex flex-col gap-4">
          This Privacy Policy was last updated on [date].
        </p>
      </div>
      <hr className="border border-blue-100" />
      <div className="text-center text-sm text-blue-100 py-4">
        &copy; 2024 VidSphere. All rights reserved.
      </div>
    </div>
  );
};

export default PrivacyPolicy;
