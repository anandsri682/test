'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Globe,
  ShieldCheck,
  MessageCircle,
  Server,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function PromotionalOfferSection() {
  const shouldReduceMotion = useReducedMotion();

  const BENEFITS = [
    {
      id: 'web-dev',
      title: 'Website Development',
      desc: 'Complete Website Development for ₹2,499',
      highlight: '₹2,499',
      icon: Globe,
      iconBg: 'bg-[#087FF5]/15 text-[#087FF5] border-[#087FF5]/30',
      accentColor: '#087FF5',
    },
    {
      id: 'maintenance',
      title: '3 Months Maintenance',
      desc: '3 Months of Maintenance Included',
      highlight: '3 Months Included',
      icon: ShieldCheck,
      iconBg: 'bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/30',
      accentColor: '#FF6A00',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Integration',
      desc: 'WhatsApp Integration Included',
      highlight: 'Integration Included',
      icon: MessageCircle,
      iconBg: 'bg-[#67D63B]/15 text-[#67D63B] border-[#67D63B]/30',
      accentColor: '#67D63B',
    },
    {
      id: 'domain',
      title: 'Free Domain for 1 Year',
      desc: 'Free Domain Purchase for 1 Year',
      highlight: '1 Year Included',
      icon: Server,
      iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      accentColor: '#A855F7',
    },
  ];

  return (
    <section
      aria-labelledby="promo-offer-heading"
      className="relative overflow-hidden bg-[#0B2A5B] text-white py-14 sm:py-20 lg:py-24 border-b border-slate-800"
    >
      {/* Ambient background glows & floating accents */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[450px] w-[450px] rounded-full bg-[#087FF5]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#FF6A00]/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-[300px] w-[300px] rounded-full bg-[#67D63B]/10 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Top Promotional Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#67D63B]/40 bg-[#67D63B]/10 px-4 py-1.5 backdrop-blur-md shadow-xs">
            <Sparkles className="h-4 w-4 text-[#67D63B]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#67D63B]">
              SPECIAL PROMOTIONAL PACKAGE
            </span>
          </div>

          {/* Headline */}
          <h2
            id="promo-offer-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]"
          >
            Launch Your Business Website for Just{' '}
            <span className="bg-gradient-to-r from-[#67D63B] via-[#087FF5] to-[#FF6A00] bg-clip-text text-transparent inline-block">
              ₹2,499!
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Get your business online with an affordable website package that includes WhatsApp integration, 3 months of maintenance, and a domain included for the first year.
          </p>
        </motion.div>


        {/* Main Offer Focal Card + 4 Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Focal Price Card (₹2,499 Highlight) */}
          <motion.div
            className="lg:col-span-5 rounded-3xl border-2 border-[#67D63B]/40 bg-gradient-to-br from-[#061838] via-[#0B2A5B] to-[#0A224A] p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-[#67D63B]/10 blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3.5 py-1 rounded-full bg-[#087FF5]/20 text-[#087FF5] text-xs font-black uppercase tracking-wider border border-[#087FF5]/30">
                  All-In-One Starter Package
                </span>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#67D63B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#67D63B]"></span>
                </span>
              </div>

              <div className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">
                Complete Offer Price
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                  ₹2,499
                </span>
                <span className="text-slate-400 text-xs font-semibold">
                  / complete setup
                </span>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-700/60 text-xs sm:text-sm font-semibold text-slate-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#67D63B] shrink-0" />
                  <span>Website Development for ₹2,499</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#67D63B] shrink-0" />
                  <span>3 Months of Maintenance Included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#67D63B] shrink-0" />
                  <span>WhatsApp Integration Included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#67D63B] shrink-0" />
                  <span>Free Domain Purchase for 1 Year</span>
                </div>
              </div>
            </div>

            {/* Quick Action in Left Card */}
            <div className="pt-6">
              <Link
                href="/pricing/website-development"
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-[#67D63B] px-6 py-3 text-xs sm:text-sm font-black text-slate-950 shadow-lg shadow-[#67D63B]/20 hover:bg-[#58BF30] hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Grab This Offer</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>


          {/* Right 4 Offer Benefits Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {BENEFITS.map((benefit, index) => {
              const IconComp = benefit.icon;
              return (
                <motion.div
                  key={benefit.id}
                  className="rounded-3xl border border-slate-700/70 bg-[#061838]/80 p-5 sm:p-6 shadow-md hover:border-slate-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md group"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                >
                  <div className="space-y-3">
                    <div className={`h-12 w-12 rounded-2xl border ${benefit.iconBg} flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="h-6 w-6" />
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-[#087FF5] transition-colors">
                      {benefit.title}
                    </h3>

                    <p className="text-xs text-slate-300 font-normal leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold" style={{ color: benefit.accentColor }}>
                    <span>Included in Offer</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                      {benefit.highlight}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>


        {/* Bottom Dual CTA Button Row */}
        <motion.div
          className="mt-10 sm:mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/pricing/website-development"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#FF6A00] hover:bg-[#E05B00] text-white font-extrabold text-xs sm:text-sm rounded-2xl inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Grab This Offer</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/pricing/website-development"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm rounded-2xl border border-white/20 inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md cursor-pointer"
          >
            <span>View Package Details</span>
            <ArrowRight className="h-4 w-4 text-[#087FF5]" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
