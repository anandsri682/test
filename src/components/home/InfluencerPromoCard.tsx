'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Gift, TrendingUp, ShieldCheck } from 'lucide-react';

export default function InfluencerPromoCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-[#0B0B0B] text-white p-8 sm:p-12 border-2 border-[#FFD600]/60 shadow-2xl hover:border-[#FFD600] transition-colors group"
      >
        {/* Subtle Ambient Yellow Gradient Backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD600]/10 rounded-full blur-[100px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[110px] pointer-events-none -z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD600]/15 border border-[#FFD600]/40 text-[#FFD600] text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>Partner & Affiliate Opportunity</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Become an <span className="text-[#FFD600]">AVM Smart Partner</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              Promote digital solutions, refer businesses, and earn reliable commissions through our official influencer referral program.
            </p>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#FFD600]/20 text-[#FFD600] flex items-center justify-center shrink-0">
                  <Gift className="w-3 h-3" />
                </div>
                <span>Get your unique referral coupon code</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#FFD600]/20 text-[#FFD600] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3 h-3" />
                </div>
                <span>Share ₹1,000 package discount with your audience</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#FFD600]/20 text-[#FFD600] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <span>Refer customers to AVM Smart Solutions</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#FFD600]/20 text-[#FFD600] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span>Earn commissions on qualifying project takeovers</span>
              </div>
            </div>
          </div>

          {/* Right Column CTA Card */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <Link
              href="/influencer-program"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-[#FFD600] hover:bg-[#FFE033] text-[#0B0B0B] font-black text-sm shadow-xl shadow-[#FFD600]/10 hover:shadow-[#FFD600]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Join the Influencer Program</span>
              <ArrowRight className="w-4 h-4 text-[#0B0B0B]" />
            </Link>
            <p className="text-[11px] text-slate-400 mt-2.5 text-center lg:text-right">
              Instant coupon generation • No upfront fee
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
