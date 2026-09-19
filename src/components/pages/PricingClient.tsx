'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { MAIN_PRICING_SERVICES } from '@/data/pricingData';
import {
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Headphones,
  Zap,
  Star,
  DollarSign,
  Award,
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

export default function PricingClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#F8FAFC] overflow-hidden min-h-screen">
      
      {/* ============================================================
          PRICING HERO SECTION
      ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF4FF] via-[#F4F8FE] to-[#F8FAFC] pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200/60">
        
        {/* AMBIENT GLOWS */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-purple-300/15 blur-3xl pointer-events-none" />

        {/* DECORATIVE CURSIVE ACCENTS */}
        <div className="absolute left-8 top-12 hidden lg:block opacity-25 pointer-events-none select-none font-serif italic text-3xl text-[#087FF5] -rotate-6">
          Let's Build Together
        </div>
        <div className="absolute right-8 top-12 hidden lg:block opacity-25 pointer-events-none select-none font-serif italic text-3xl text-emerald-600 rotate-3 text-right">
          Your Growth<br />Our Technology
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 z-10">
          
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#087FF5]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B2A5B]">
              OUR PRICING
            </span>
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B2A5B] leading-[1.12]">
            Transparent Pricing for{' '}
            <span className="bg-gradient-to-r from-[#087FF5] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Real Business Growth
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Professional solutions at fair prices. No hidden charges. Just real value.
          </p>

          {/* BENEFIT PILLS */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto text-xs font-bold text-slate-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200 shadow-xs">
              <Check className="h-4 w-4 text-emerald-500 stroke-[3]" /> Quality Assured
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200 shadow-xs">
              <Clock className="h-4 w-4 text-purple-500" /> On-Time Delivery
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200 shadow-xs">
              <Headphones className="h-4 w-4 text-blue-500" /> Dedicated Support
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200 shadow-xs">
              <Zap className="h-4 w-4 text-amber-500" /> Custom Solutions
            </span>
          </div>

        </div>
      </section>


      {/* ============================================================
          MAIN 4 PRICING CARDS GRID
      ============================================================ */}
      <section className="relative py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {MAIN_PRICING_SERVICES.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                className={`relative rounded-3xl border bg-gradient-to-b ${service.bgGradient} ${service.cardBorder} p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between group`}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              >
                {/* NUMBER BADGE */}
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-slate-700 shadow-xs border border-slate-100">
                    {service.num}
                  </span>
                </div>

                {/* SERVICE ILLUSTRATION */}
                <div className="relative my-4 h-36 sm:h-40 w-full overflow-hidden rounded-2xl bg-white/60 p-2 shadow-xs border border-white group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src={service.illustration}
                    alt={service.title}
                    fill
                    priority={index < 2}
                    className="object-contain"
                  />
                </div>

                {/* TITLE & DESCRIPTION */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-[#0B2A5B] group-hover:text-[#087FF5] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                </div>

                {/* PRICING */}
                <div className="my-4 pt-3 border-t border-slate-200/70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Starting From
                  </span>
                  <div className="text-3xl font-black tracking-tight" style={{ color: service.accentHex }}>
                    {service.startingPrice}
                  </div>
                </div>

                {/* FEATURE HIGHLIGHTS */}
                <ul className="space-y-2 mb-6 text-xs font-semibold text-slate-600">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 stroke-[2.5]" style={{ color: service.accentHex }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* VIEW PLANS BUTTON */}
                <Link
                  href={`/pricing/${service.slug}`}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold text-white shadow-md transition-all duration-300 active:scale-95 ${service.btnBg}`}
                >
                  <span>View Plans</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

              </motion.div>
            );
          })}
        </div>
      </section>


      {/* ============================================================
          WHY CHOOSE US / PARTNERSHIP SECTION
      ============================================================ */}
      <section className="py-12 lg:py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-10">
            <span className="inline-block px-3 py-1 bg-blue-50 text-[#087FF5] text-[11px] font-extrabold uppercase tracking-widest rounded-full">
              WHY CHOOSE US
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
              More Than Just a Service
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              We don't just deliver projects, we build long-term partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-xs flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 font-bold">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B2A5B]">Affordable Pricing</h3>
                <p className="text-xs text-slate-500 mt-0.5">Best value for your budget with clear scope.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-xs flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-bold">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B2A5B]">On-Time Delivery</h3>
                <p className="text-xs text-slate-500 mt-0.5">We respect your timelines and launch dates.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-xs flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-bold">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B2A5B]">Dedicated Support</h3>
                <p className="text-xs text-slate-500 mt-0.5">Always here to help you solve tech issues.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-xs flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 font-bold">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B2A5B]">Quality Assured</h3>
                <p className="text-xs text-slate-500 mt-0.5">We maintain enterprise software standards.</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================
          BOTTOM CTA BANNER
      ============================================================ */}
      <section className="relative overflow-hidden bg-[#061B3A] text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
          
          <div className="text-center md:text-left space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Let's turn your ideas into reality. Get a free consultation today!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FFB800] px-7 py-3.5 text-xs sm:text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/20 hover:bg-[#E6A600] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>4.9/5 Rating across 100+ businesses</span>
            </div>
          </div>

        </div>
      </section>

      {/* QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
