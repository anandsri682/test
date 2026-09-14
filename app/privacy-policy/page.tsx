import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | AVM Smart Solutions",
  description: "Privacy Policy and data protection guidelines for AVM Smart Solutions.",
  alternates: { canonical: "https://www.avmsmart.in/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full py-16 bg-white text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-deep">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: January 2024</p>
        <div className="prose prose-slate max-w-none text-sm space-y-4">
          <p>
            At AVM Smart Solutions ("AVM Smart", "we", "us"), accessible from https://www.avmsmart.in, protecting the privacy of our visitors and clients is one of our main priorities.
          </p>
          <h2 className="text-xl font-bold text-slate-900 mt-6">Information We Collect</h2>
          <p>
            When you submit contact forms, request quotes, or communicate with us, we may collect personal information including your full name, email address, phone number, company name, and project specifications.
          </p>
          <h2 className="text-xl font-bold text-slate-900 mt-6">How We Use Your Information</h2>
          <p>
            We use collected information to fulfill requested software services, communicate regarding project milestones, respond to technical inquiries, and improve our website performance.
          </p>
          <h2 className="text-xl font-bold text-slate-900 mt-6">Data Protection & Security</h2>
          <p>
            AVM Smart implements enterprise SSL encryption and administrative security controls to protect your personal details against unauthorized disclosure.
          </p>
        </div>
      </div>
    </div>
  );
}
