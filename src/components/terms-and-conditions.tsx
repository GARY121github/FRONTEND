import React from "react";

interface TermsAndConditionsProps {
  contactEmail: string;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  contactEmail,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#0E1217] via-[#0F1217] to-[#0E1217] p-4">
      <div className="flex flex-col max-w-3xl mx-auto gap-8 text-blue-100 py-[5%]">
        <h2 className="text-4xl font-extrabold text-center">
          VidSphere Terms and Conditions
        </h2>
        <p className="text-center text-sm w-[90%] mx-auto">
          Welcome to VidSphere! By accessing or using VidSphere, you agree to
          comply with and be bound by the following terms and conditions. Please
          read these terms carefully before accessing or using VidSphere.
        </p>
        <hr className="border border-blue-100 font-semibold my-4" />

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">1. Acceptance of Terms</h3>
          <p>
            By accessing or using VidSphere, you agree to be bound by these
            terms and conditions. If you do not agree with any part of these
            terms, you may not access or use VidSphere.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">2. Eligibility</h3>
          <p>
            You must be at least 13 years old to use VidSphere. If you are under
            18 years old, you must have permission from a parent or legal
            guardian to use VidSphere.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">3. User Account</h3>
          <p>
            You may need to create a user account to access certain features of
            VidSphere. You are responsible for maintaining the confidentiality
            of your account information, including your username and password.
            You are also responsible for all activities that occur under your
            account.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">4. Content Uploads</h3>
          <p>
            You may upload videos to VidSphere subject to the following
            conditions: (List of conditions here)
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">5. Content Streaming</h3>
          <p>
            VidSphere allows users to stream videos uploaded by other users. You
            may stream videos on VidSphere subject to the following conditions:
            (List of conditions here)
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">6. Prohibited Activities</h3>
          <p>
            When using VidSphere, you must not: (List of prohibited activities
            here)
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">7. Disclaimer of Warranty</h3>
          <p>
            VidSphere is provided on an "as is" and "as available" basis. We do
            not warrant that VidSphere will be uninterrupted or error-free. We
            disclaim all warranties, express or implied, including but not
            limited to warranties of merchantability, fitness for a particular
            purpose, and non-infringement.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">8. Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, we shall not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages arising out of or relating to your use of VidSphere.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">9. Changes to Terms</h3>
          <p>
            We reserve the right to modify these terms and conditions at any
            time. Any changes will be effective immediately upon posting on
            VidSphere. Your continued use of VidSphere after the posting of
            changes constitutes your acceptance of such changes.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-3xl">10. Contact Us</h3>
          <p>
            If you have any questions or concerns about these terms and
            conditions, please contact us at{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
        <p className="flex flex-col gap-4">
          These terms and conditions were last updated on [date].
        </p>
      </div>
      <hr className="border border-blue-100" />
      <div className="text-center text-sm text-blue-100 py-4">
        &copy; 2024 VidSphere. All rights reserved.
      </div>
    </div>
  );
};

export default TermsAndConditions;
