import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions | AVM Smart Solutions",
  description: "Terms and conditions of service for AVM Smart Solutions.",
  alternates: { canonical: "https://www.avmsmart.in/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <div className="w-full py-16 bg-white text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-deep">Terms & Conditions</h1>
        <p className="text-sm text-slate-500">Last updated: January 2024</p>
        <div className="prose prose-slate max-w-none text-sm space-y-4">
          <p>
            Welcome to AVM Smart Solutions. By accessing or using https://www.avmsmart.in, you agree to comply with and be bound by these Terms & Conditions.
          </p>
          <h2 className="text-xl font-bold text-slate-900 mt-6">Intellectual Property Rights</h2>
          <p>
            All website design, logos, graphics, source code, and assets created by AVM Smart Solutions remain protected by intellectual property laws until explicit client transfer upon project completion.
          </p>
          <h2 className="text-xl font-bold text-slate-900 mt-6">Limitation of Liability</h2>
          <p>
            AVM Smart Solutions shall not be liable for any indirect or consequential damages arising from website downtime or third-party server hosting outages.
          </p>
        </div>
      </div>
    </div>
  );
}
