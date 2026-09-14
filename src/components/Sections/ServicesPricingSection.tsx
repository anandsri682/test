'use client';

import React, { useState } from "react";
import { Check, Plus, ArrowRight, HelpCircle } from "lucide-react";

interface ServicesPricingSectionProps {
  onContactClick?: () => void;
}

export default function ServicesPricingSection({ onContactClick }: ServicesPricingSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const scrollToContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-12 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto text-slate-100 relative bg-[#07070a]">
      {/* Background ambient particle light */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[160px] rounded-full z-0" />

      <div className="relative z-10">
        {/* HEADER SECTION */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
            CAPABILITIES & PRICING
          </div>
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Services & Pricing
          </h1>
          <p className="text-slate-300 max-w-2xl text-xs sm:text-base leading-relaxed">
            Transparent packages and tailored custom solutions for modern businesses. From logo design to custom enterprise web software.
          </p>

          {/* CATEGORY NAV PILLS */}
          <div className="flex overflow-x-auto gap-2 mt-6 sm:mt-8 border-b border-white/10 pb-4 no-scrollbar">
            {[
              { id: "all", label: "All Services" },
              { id: "logo", label: "1. Logo & Graphic Design" },
              { id: "web", label: "2. Website Development" },
              { id: "maintenance", label: "3. Website Maintenance" },
              { id: "software", label: "4. Software Development" },
              { id: "mobile", label: "5. Mobile App Development" },
              { id: "seo", label: "6. SEO Optimization" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? "bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-950/60 ring-1 ring-amber-400"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: LOGO & GRAPHIC DESIGN (Exact design matching screenshot)
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "logo") && (
          <div className="mb-14 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3 tracking-tight">
              <span className="text-amber-400 font-black">1.</span> Logo & Graphic Design
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
              {/* BASIC PACKAGE */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Basic Package</h3>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-6">₹2,000</div>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>2 Logo Concepts</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>2 Revision Rounds</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>JPG + PNG Files</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-amber-950/40"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>

              {/* STANDARD PACKAGE (RECOMMENDED CARD FROM SCREENSHOT) */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-amber-500 shadow-xl shadow-amber-950/40 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative ring-1 ring-amber-500/50">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-purple-600 text-white text-[10px] font-black uppercase px-4 py-0.5 rounded-full tracking-wider shadow-lg">
                  RECOMMENDED
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Standard Package</h3>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-6">₹3,250</div>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>3 Logo Concepts</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>4 Revision Rounds</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>JPG + PNG + PDF</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Basic Color Palette</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Font Details</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/60 active:scale-95"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>

              {/* PREMIUM PACKAGE */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Premium Package</h3>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-6">₹5,750</div>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>4-5 Logo Concepts</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Unlimited Minor Revisions</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>PDF, PNG, JPG, SVG Vector Files</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Full Brand Color Palette</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Font System Specs & Mini Brand Guide</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 2: WEBSITE DEVELOPMENT
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "web") && (
          <div className="mb-14 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3 tracking-tight">
              <span className="text-amber-400 font-black">2.</span> Website Development
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
              {/* SERVICE-BASED WEBSITE */}
              <div className="p-5 rounded-2xl bg-[#0c0c12] border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-amber-400 mb-1.5">Service-Based Website</h3>
                  <div className="text-2xl font-black text-white mb-4">₹5,000</div>
                  <ul className="space-y-2 text-xs text-slate-200 mb-5">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Basic UI/UX Design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>5 Core Pages (Home, About, Services, Testimonials, Contact)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Social Media Integration</span>
                    </li>
                  </ul>
                  <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2 mb-5">
                    Additional Page: +₹1,000
                  </div>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>

              {/* PRODUCT-BASED WEBSITE */}
              <div className="p-5 rounded-2xl bg-[#0c0c12] border border-amber-500/40 shadow-lg hover:border-amber-400 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-amber-400 mb-1.5">Product-Based Website</h3>
                  <div className="text-2xl font-black text-white mb-4">₹7,000</div>
                  <ul className="space-y-2 text-xs text-slate-200 mb-5">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Up to 50 Products Showcase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>WhatsApp Cart Order System</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Basic UI/UX & 5 Core Pages</span>
                    </li>
                  </ul>
                  <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2 mb-5">
                    Additional 50 Products: +₹1,000
                  </div>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>

              {/* SEMI E-COMMERCE */}
              <div className="p-5 rounded-2xl bg-[#0c0c12] border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-amber-400 mb-1.5">Semi E-Commerce</h3>
                  <div className="text-2xl font-black text-white mb-4">₹15,000</div>
                  <ul className="space-y-2 text-xs text-slate-200 mb-5">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Dynamic Website & Admin Panel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>WhatsApp Integration & Promo Codes</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>

              {/* FULL E-COMMERCE */}
              <div className="p-5 rounded-2xl bg-[#0c0c12] border border-amber-500/60 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-amber-400 mb-1.5">Full E-Commerce</h3>
                  <div className="text-2xl font-black text-white mb-4">₹25,000</div>
                  <ul className="space-y-2 text-xs text-slate-200 mb-5">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Razorpay Payment Gateway</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Admin Panel & Customer Login</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>

              {/* CUSTOM BUILD */}
              <div className="p-5 rounded-2xl bg-[#0c0c12] border border-dashed border-amber-500/40 flex flex-col justify-between items-center text-center">
                <div>
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
                    <Plus className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">Custom Build</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    Frontend or Backend architecture tailored exactly to your needs.
                  </p>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Get Quotation —</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 3: WEBSITE MAINTENANCE
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "maintenance") && (
          <div className="mb-14 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3 tracking-tight">
              <span className="text-amber-400 font-black">3.</span> Website Maintenance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Care Basic</h3>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-6">₹1,500<span className="text-xs font-normal text-slate-400">/month</span></div>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-6">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Monthly Cloud Backups & Security Checks</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>2 Content Updates per Month</span>
                    </li>
                  </ul>
                </div>
                <button onClick={scrollToContact} className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-500 active:scale-95">Select Package</button>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-amber-500 shadow-xl shadow-amber-950/40 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Care Pro</h3>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-6">₹3,500<span className="text-xs font-normal text-slate-400">/month</span></div>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-6">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Weekly Backups & 8 Content Updates</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Plugin Updates & Priority Support</span>
                    </li>
                  </ul>
                </div>
                <button onClick={scrollToContact} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs hover:from-amber-500 active:scale-95">Select Package</button>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Care E-Commerce</h3>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-6">₹6,500<span className="text-xs font-normal text-slate-400">/month</span></div>
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-6">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Daily Automated Backups</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Unlimited Minor Updates & Gateway Monitoring</span>
                    </li>
                  </ul>
                </div>
                <button onClick={scrollToContact} className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-500 active:scale-95">Select Package</button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 4: SOFTWARE DEVELOPMENT
        ========================================================================= */}
        {(activeTab === "all" || activeTab === "software") && (
          <div className="mb-14 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3 tracking-tight">
              <span className="text-amber-400 font-black">4.</span> Software Development
            </h2>

            <div className="p-6 sm:p-10 rounded-3xl bg-[#0c0c12] border border-amber-500/40 hover:border-amber-500 transition-all duration-300">
              <div className="max-w-3xl">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-400 mb-2">Custom Software Solutions</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8">Based on project requirements & specs</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm text-slate-200">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Web Applications & SaaS Platforms</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Internal Business Tools & Dashboards</span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>End-to-End Development</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Ongoing Maintenance Support</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={scrollToContact}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/60 inline-flex items-center gap-2 active:scale-95"
                >
                  <span>Get Quotation —</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DISCLAIMER BOX */}
        <div className="p-5 rounded-2xl bg-[#0c0c12] border border-white/10 text-center text-xs text-slate-400 max-w-4xl mx-auto mb-10 leading-relaxed">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold mb-1 text-xs sm:text-sm">
            <HelpCircle className="w-4 h-4" />
            Pricing & Service Disclaimer
          </div>
          <p>
            Pricing may vary depending on project scope, custom integrations, third-party subscriptions, and client specific requirements. Contact us for a precise quote.
          </p>
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-black p-6 sm:p-12 text-center border border-amber-500/40 overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <h3 className="text-xl sm:text-3xl font-black text-white mb-2">
            Need a Tailored Quote or Solution?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Share your project requirements and our team will recommend the ideal tech stack and plan.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-7 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/60 active:scale-95"
          >
            <span>Talk to AVM Smart</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </section>
  );
}
