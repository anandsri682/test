import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Users, Gift, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Referral Partner Program Terms & Conditions | AVM Smart Solutions',
  description:
    'Official program terms, 6-character coupon referral attribution, website package pricing, and commission takeover conditions for AVM Smart Solutions referral partners and influencers.',
};

export default function InfluencerTermsPage() {
  return (
    <div className="w-full bg-[#F4F7FA] text-slate-800 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0B0B0B] text-white py-16 sm:py-20 border-b-4 border-[#FFD600] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFD600]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#FFD600]/30 text-[#FFD600] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Referral Partner Terms • Version 2.0</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Referral Partner & Influencer Program Terms
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully. The program is open to both individual referral partners and content creators/influencers.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        
        {/* Section 0: Who Can Join */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-slate-900 text-[#FFD600] font-black text-sm flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl font-black text-slate-900">Program Eligibility for Everyone</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-2.5 leading-relaxed pl-11">
            <p>
              The AVM Smart Solutions Referral Program is open to any individual or digital professional:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-medium text-slate-700">
              <li>
                <strong>Individual Referral Partners:</strong> Any person can register with just their Full Name, Email Address, and Mobile Number. No social following or channel required.
              </li>
              <li>
                <strong>Influencers & Creators:</strong> Digital creators can register their account display name and link their YouTube, Instagram, Facebook, or other social profiles.
              </li>
            </ul>
          </div>
        </div>

        {/* Section A: Referral Attribution & 6-Char Code */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl font-black text-slate-900">Referral Attribution & Unique 6-Character Coupon Codes</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-2.5 leading-relaxed pl-11">
            <p>
              Every registered partner receives a unique coupon code consisting of <strong>exactly six alphanumeric characters</strong> (e.g. <span className="font-mono font-bold bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">RAHULK</span>, <span className="font-mono font-bold bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">TECHWI</span>).
            </p>
            <p>
              Referrals are strictly attributed when the customer submits the official AVM Smart Solutions contact or quote form with your valid 6-character code.
            </p>
            <p>
              When a valid code is applied, the customer sees: <strong className="text-emerald-700">₹1,000 SAVED — COUPON APPLIED</strong> and your referrer attribution underneath (e.g. <em>Referred by: Rahul Kumar</em> or <em>Referred by: Rahul Kumar · Tech With Rahul</em>).
            </p>
          </div>
        </div>

        {/* Section B: Website Package Pricing */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#087FF5] font-black text-sm flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl font-black text-slate-900">Website Package Offer & Pricing Rules</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-3 leading-relaxed pl-11">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase">Regular Package Price</p>
                <p className="text-lg font-black text-slate-500 line-through">₹4,999</p>
              </div>
              <div className="border-x border-slate-200 sm:border-y-0 py-2 sm:py-0">
                <p className="text-[11px] font-bold text-amber-600 uppercase">Referral Discount</p>
                <p className="text-lg font-black text-amber-600">₹1,000 Flat Off</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-emerald-600 uppercase">Discounted Offer Price</p>
                <p className="text-lg font-black text-emerald-600">₹3,999</p>
              </div>
            </div>
            <p>
              The ₹3,999 discounted offer price applies specifically to our standard <strong>Business Website Package</strong>. Custom enterprise systems and additional services require custom quotations.
            </p>
          </div>
        </div>

        {/* Section C: Commission Eligibility & Official Takeover */}
        <div className="bg-amber-50/50 p-6 sm:p-8 rounded-3xl border-2 border-amber-300 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-900 font-black text-sm flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl font-black text-slate-900">Commission Eligibility & Official Project Takeover</h2>
          </div>
          <div className="text-sm text-slate-700 space-y-3 leading-relaxed pl-11">
            <p className="font-bold text-slate-900">
              Commission is NOT payable merely because a visitor submits an enquiry, receives a consultation, or registers with a code.
            </p>
            <p>
              A referral commission becomes eligible ONLY when all five conditions are satisfied:
            </p>
            <ol className="list-decimal pl-5 space-y-2 font-medium">
              <li>The customer enters your valid 6-character coupon code during form submission.</li>
              <li>AVM Smart Solutions evaluates and formally accepts the project.</li>
              <li>The client confirms the agreement and fulfills agreed payment requirements.</li>
              <li>
                <strong>Official Project Takeover:</strong> The AVM Smart engineering team has officially accepted the project, allocated technical resources, and commenced active delivery.
              </li>
              <li>The referral passes verification and anti-fraud checks.</li>
            </ol>
            <div className="p-3.5 bg-white rounded-xl border border-amber-200 text-xs text-amber-900 font-bold">
              ⚡ Commission Payment Timing: The commission is payable only after the project has officially been taken over by AVM Smart Solutions and the agreed payment conditions have been cleared.
            </div>
          </div>
        </div>

        {/* Section D: Cancellations & Anti-Abuse */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 font-black text-sm flex items-center justify-center shrink-0">
              5
            </span>
            <h2 className="text-xl font-black text-slate-900">Cancellations, Refunds, & Coupon Validity</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-2.5 leading-relaxed pl-11">
            <p>
              If a client cancels before delivery, or if a payment is reversed, any provisional commission will be adjusted accordingly.
            </p>
            <p>
              AVM Smart Solutions reserves the right to deactivate coupon codes in cases of inactivity or misuse. Deactivating a coupon stops future discounts while preserving historical referral logs.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/influencer-program"
            className="w-full sm:w-auto px-8 py-4 bg-[#0B0B0B] hover:bg-slate-900 text-[#FFD600] font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Register as Referral Partner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl border border-slate-300 transition-all text-center"
          >
            <span>Back to Contact Us</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
