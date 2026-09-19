'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { PricingDetailData } from '@/data/pricingData';
import {
  Check,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Headphones,
  Zap,
  Star,
  Users,
  Clock,
  MessageSquare,
  Palette,
  Code,
  CheckCircle,
  Rocket,
  ChevronRight,
  BarChart,
  Target,
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

const DYNAMIC_ICONS: Record<string, React.ElementType> = {
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Headphones,
  Zap,
  Palette,
  CheckCircle,
  MessageSquare,
  Code,
  Rocket,
  BarChart,
  Target,
  Users,
  Clock,
};

interface PricingDetailClientProps {
  data: PricingDetailData;
}

export default function PricingDetailClient({ data }: PricingDetailClientProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'onetime'>('onetime');
  const shouldReduceMotion = useReducedMotion();

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#F8FAFC] overflow-hidden min-h-screen">
      
      {/* ============================================================
          TOP BREADCRUMB
      ============================================================ */}
      <div className="bg-[#041227] text-slate-400 text-xs py-3 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white font-semibold">{data.title}</span>
        </div>
      </div>

      {/* ============================================================
          HERO SECTION
      ============================================================ */}
     


      {/* ============================================================
          PRICING PLANS SECTION
      ============================================================ */}
      <section className="py-12 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#087FF5] text-xs font-extrabold uppercase tracking-widest rounded-full">
            OUR PLANS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A5B]">
            Choose the Right Plan for Your Business
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
            Transparent pricing. No hidden charges. All plans include mobile responsive design.
          </p>

          {/* TOGGLE MONTHLY / ONE-TIME */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${billingPeriod === 'monthly' ? 'text-[#0B2A5B]' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setBillingPeriod(billingPeriod === 'onetime' ? 'monthly' : 'onetime')}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-300 transition-colors duration-200 ease-in-out focus:outline-none"
              style={{ backgroundColor: billingPeriod === 'onetime' ? data.accentHex : '#CBD5E1' }}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  billingPeriod === 'onetime' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${billingPeriod === 'onetime' ? 'text-[#0B2A5B]' : 'text-slate-400'}`}>
              One-Time Payment
            </span>
          </div>
        </div>

        {/* 4 PLAN CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {data.plans.map((plan, pIdx) => {
            return (
              <div
                key={pIdx}
                className={`relative rounded-3xl border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
                  plan.isPopular ? 'border-2 shadow-xl ring-2 ring-blue-500/20' : 'border-slate-200'
                }`}
                style={{ borderColor: plan.isPopular ? data.accentHex : undefined }}
              >
                {/* POPULAR BADGE */}
                {plan.badge && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md"
                    style={{ backgroundColor: data.accentHex }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* PLAN NAME & DESC */}
                  <h3 className="text-xl font-black text-[#0B2A5B]">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px] font-normal leading-relaxed">
                    {plan.desc}
                  </p>

                  {/* PRICE */}
                  <div className="my-5 pt-3 border-t border-slate-100">
                    <div className="text-3xl font-black tracking-tight" style={{ color: data.accentHex }}>
                      {plan.price}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                      {plan.period}
                    </span>
                  </div>

                  {/* FEATURES */}
                  <ul className="space-y-2.5 text-xs font-semibold text-slate-600 mb-6">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 shrink-0 stroke-[2.5] mt-0.5" style={{ color: data.accentHex }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA BUTTON */}
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold transition-all duration-300 active:scale-95 shadow-md ${
                    plan.isPopular
                      ? 'text-white'
                      : 'bg-slate-100 text-[#0B2A5B] hover:bg-slate-200'
                  }`}
                  style={{ backgroundColor: plan.isPopular ? data.accentHex : undefined }}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>


      {/* ============================================================
          FEATURE COMPARISON TABLE
      ============================================================ */}
      <section className="py-12 lg:py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
              Plan Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Find the perfect plan based on your exact feature needs.
            </p>
          </div>

          {/* RESPONSIVE SCROLL CONTAINER FOR COMPARISON TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full min-w-[650px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[#0B2A5B] border-b border-slate-200 text-xs font-black uppercase">
                  <th className="p-4 w-2/5">Features</th>
                  <th className="p-4 text-center">Starter</th>
                  <th className="p-4 text-center text-[#087FF5]">Business</th>
                  <th className="p-4 text-center text-orange-600">Professional</th>
                  <th className="p-4 text-center text-purple-600">Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {data.comparison.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-4 font-bold text-[#0B2A5B]">{row.feature}</td>
                    
                    <td className="p-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check className="h-4 w-4 mx-auto text-emerald-500 stroke-[3]" /> : <span className="text-slate-300">-</span>
                      ) : (
                        row.starter
                      )}
                    </td>

                    <td className="p-4 text-center font-semibold">
                      {typeof row.business === 'boolean' ? (
                        row.business ? <Check className="h-4 w-4 mx-auto text-emerald-500 stroke-[3]" /> : <span className="text-slate-300">-</span>
                      ) : (
                        row.business
                      )}
                    </td>

                    <td className="p-4 text-center font-semibold">
                      {typeof row.professional === 'boolean' ? (
                        row.professional ? <Check className="h-4 w-4 mx-auto text-emerald-500 stroke-[3]" /> : <span className="text-slate-300">-</span>
                      ) : (
                        row.professional
                      )}
                    </td>

                    <td className="p-4 text-center font-semibold">
                      {typeof row.custom === 'boolean' ? (
                        row.custom ? <Check className="h-4 w-4 mx-auto text-emerald-500 stroke-[3]" /> : <span className="text-slate-300">-</span>
                      ) : (
                        row.custom
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>


      {/* ============================================================
          DEVELOPMENT PROCESS SECTION
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <span className="inline-block px-3.5 py-1 bg-blue-100 text-[#087FF5] text-[11px] font-extrabold uppercase tracking-widest rounded-full">
              DEVELOPMENT PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
              Our Process — Simple & Smooth
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              From initial idea to live launch — we guide you through every step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.process.map((step, sIdx) => {
              const StepIcon = DYNAMIC_ICONS[step.iconName] || Code;
              return (
                <div key={sIdx} className="relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs text-center space-y-3">
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md font-bold"
                    style={{ backgroundColor: data.accentHex }}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="text-[10px] font-black uppercase text-slate-400">Step {step.num}</div>
                  <h3 className="text-sm font-extrabold text-[#0B2A5B]">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">{step.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================
          FAQ SECTION
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about our {data.title.toLowerCase()}.
            </p>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-[#0B2A5B] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 pt-0 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-200/60 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================
          FINAL CTA BANNER
      ============================================================ */}
      <section className={`relative overflow-hidden text-white py-14 lg:py-16 ${data.heroBg}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 z-10 relative">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {data.ctaTitle}
          </h2>
          <p className="text-slate-300 text-xs sm:text-base font-normal max-w-lg mx-auto">
            {data.ctaSub}
          </p>

          <div>
            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FFB800] px-8 py-4 text-xs sm:text-sm font-bold text-slate-900 shadow-xl shadow-amber-500/20 hover:bg-[#E6A600] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
