'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { MAIN_PRICING_SERVICES } from '@/data/pricingData';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePricingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="pricing-section-heading" className="relative py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white px-4 py-1.5 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#FF6A00]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B2A5B]">
              TRANSPARENT PRICING
            </span>
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B2A5B] leading-[1.12]">
            Transparent Pricing for{' '}
            <span className="bg-gradient-to-r from-[#087FF5] via-[#8B5CF6] to-[#FF6A00] bg-clip-text text-transparent">
              Real Business Growth
            </span>
          </h1>

          {/* <h2 id="pricing-section-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Tailored Plans for Every Business
          </h2> */}

          {/* <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Choose from our core service categories with transparent pricing, zero hidden charges, and dedicated support.
          </p> */}
        </div>

        {/* 4 Cards Showcase Grid */}
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
                <div>
                  {/* Number Badge */}
                  <div className="flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-slate-700 shadow-xs border border-slate-100">
                      {service.num}
                    </span>
                  </div>

                  {/* Card Illustration */}
                  {/* <div className="relative my-4 h-36 sm:h-40 w-full overflow-hidden rounded-2xl bg-white/70 p-2 shadow-xs border border-white group-hover:scale-[1.02] transition-transform duration-500">
                    <Image
                      src={service.illustration}
                      alt={service.title}
                      fill
                      priority={index < 2}
                      className="object-contain"
                    />
                  </div> */}

                  {/* Title & Short Desc */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-[#0B2A5B] group-hover:text-[#087FF5] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="my-4 pt-3 border-t border-slate-200/70">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Starting From
                    </span>
                    <div className="text-3xl font-black tracking-tight" style={{ color: service.accentHex }}>
                      {service.startingPrice}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6 text-xs font-semibold text-slate-600">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 stroke-[2.5]" style={{ color: service.accentHex }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View Plans Action Button */}
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

      </div>
    </section>
  );
}
