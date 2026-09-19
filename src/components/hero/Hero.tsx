'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Code,
  Smartphone,
  BarChart3,
  Cloud,
  Palette,
  Users,
  ArrowRight,
  Play,
  ChevronDown,
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

const HERO_SERVICES = [
  {
    num: '01',
    title: 'Web Development',
    slug: 'web-development',
    icon: Code,
    color: '#087FF5',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-[#087FF5]',
    dotBg: 'bg-[#087FF5]',
    shadow: 'shadow-blue-500/10',
  },
  {
    num: '02',
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    icon: Smartphone,
    color: '#10B981',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-[#10B981]',
    dotBg: 'bg-[#10B981]',
    shadow: 'shadow-emerald-500/10',
  },
  {
    num: '03',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: BarChart3,
    color: '#FF6A00',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    iconBg: 'bg-[#FF6A00]',
    dotBg: 'bg-[#FF6A00]',
    shadow: 'shadow-orange-500/10',
  },
  {
    num: '04',
    title: 'Cloud & DevOps',
    slug: 'cloud-and-devops',
    icon: Cloud,
    color: '#8B5CF6',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconBg: 'bg-[#8B5CF6]',
    dotBg: 'bg-[#8B5CF6]',
    shadow: 'shadow-purple-500/10',
  },
  {
    num: '05',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    icon: Palette,
    color: '#EC4899',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    iconBg: 'bg-[#EC4899]',
    dotBg: 'bg-[#EC4899]',
    shadow: 'shadow-pink-500/10',
  },
  {
    num: '06',
    title: 'IT Consulting',
    slug: 'it-consulting',
    icon: Users,
    color: '#F59E0B',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-[#F59E0B]',
    dotBg: 'bg-[#F59E0B]',
    shadow: 'shadow-amber-500/10',
  },
];

export default function Hero() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Doubled array for 100% seamless infinite vertical circulation loop
  const duplicatedServices = [...HERO_SERVICES, ...HERO_SERVICES];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF3FF] via-[#F4F8FE] to-[#FFFFFF] pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-slate-200/60">
      
      {/* SOFT BACKGROUND GLOWS & ATMOSPHERE */}
      <div className="absolute -top-32 left-10 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-emerald-200/20 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ============================================================
              LEFT SIDE: BRANDING, EXACT TAGLINE, DESCRIPTION, CTA
          ============================================================ */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6 text-left z-10 pt-2 lg:pt-0">
            
            {/* BRAND LABEL */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
              <span className="h-2.5 w-2.5 rounded-full bg-[#087FF5] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B2A5B]">
                AVM SMART SOLUTIONS
              </span>
            </div>

            {/* MAIN TAGLINE - ABSOLUTELY UNCHANGED */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12] text-[#0B2A5B]">
              Digital Solutions for{' '}
              <span className="bg-gradient-to-r from-[#087FF5] to-[#2563EB] bg-clip-text text-transparent block sm:inline">
                Real Business
              </span>{' '}
              <span className="relative inline-block bg-gradient-to-r from-[#10B981] to-[#13B89A] bg-clip-text text-transparent">
                Growth
                {/* Yellow/Orange brushstroke underline accent */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3 text-[#FFB800] opacity-90"
                  viewBox="0 0 140 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C30 3.5 85 2 137 7.5"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* COMPANY DESCRIPTION */}
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-lg">
              We design, develop, and deliver high-performance websites, mobile applications, and scalable digital solutions that help businesses work smarter and grow faster.
            </p>

            {/* PRIMARY CTA BUTTON */}
            <div className="pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#087FF5] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#066FD6] hover:shadow-xl hover:shadow-blue-500/35 active:scale-95 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* ============================================================
              MIDDLE & RIGHT CONTAINER: INTEGRATED ARCHITECTURAL VISUAL
              WITH VERTICAL CURVED SERVICE TIMELINE CAROUSEL
          ============================================================ */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end min-h-[460px] sm:min-h-[520px]">
            
            {/* RIGHT SIDE GENERATED ARCHITECTURAL VISUAL (BLENDED ENVIRONMENT) */}
            <div className="relative w-full lg:w-[88%] h-[380px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all">
              <Image
                src="/images/hero-architectural-portal.jpg"
                alt="AVM Smart Solutions Architectural Gateway"
                fill
                priority
                className="object-cover object-right sm:object-center"
              />
              
              {/* SOFT LEFT & BOTTOM BLEND GRADIENT OVERLAYS */}
              <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-[#F4F8FE] via-[#F4F8FE]/60 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/90 via-white/30 to-transparent pointer-events-none" />

              {/* FLOATING GLASS BADGE - SEE HOW WE CREATE IMPACT */}
              <div
                className="absolute bottom-6 right-6 z-20 group cursor-pointer"
                onClick={() => setImpactModalOpen(true)}
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2A5B] text-white shadow-md transition-transform group-hover:scale-110">
                    <Play className="h-4 w-4 fill-white ml-0.5" />
                  </div>
                  <div className="text-left pr-1">
                    <p className="text-xs font-bold text-[#0B2A5B]">See How</p>
                    <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      We Create Impact <ArrowRight className="h-3 w-3 text-[#087FF5] transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
                MIDDLE COLUMN: VERTICAL CURVED SERVICE CARDS TIMELINE
                CIRCULATES CONTINUOUSLY UPWARD ALONG A CURVED PATHWAY
            ============================================================ */}
            <div className="absolute left-0 sm:left-4 lg:left-[-35px] top-1/2 -translate-y-1/2 z-20 w-[240px] sm:w-[270px] h-[400px] sm:h-[460px] overflow-hidden py-2">
              
              {/* CURVED CONNECTING PATHWAY SVG LINE WITH COLORED NODE DOTS */}
              <svg
                className="absolute left-2 top-0 h-full w-10 stroke-slate-300/60 fill-none pointer-events-none z-0"
                viewBox="0 0 50 460"
                preserveAspectRatio="none"
              >
                <path
                  d="M 25 0 Q 45 115 25 230 T 25 460"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
              </svg>

              {/* TOP & BOTTOM FADE MASKS FOR SEAMLESS CARD ENTRY/EXIT */}
              <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#EBF3FF] via-[#EBF3FF]/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/80 to-transparent z-20 pointer-events-none" />

              {/* CONTINUOUS VERTICAL CIRCULATING CAROUSEL */}
              <div
                className="w-full pl-5 pr-1"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                <motion.div
                  className="flex flex-col gap-3"
                  animate={
                    shouldReduceMotion || isPaused
                      ? { y: undefined }
                      : { y: ['0%', '-50%'] }
                  }
                  transition={{
                    duration: 24,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                >
                  {duplicatedServices.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={`${service.slug}-${index}`}
                        onClick={() => setQuoteModalOpen(true)}
                        className={`
                          group relative flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 p-2.5 sm:p-3 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:shadow-xl cursor-pointer ${service.shadow}
                        `}
                      >
                        {/* Colored Node Dot on Pathway */}
                        <div
                          className={`absolute -left-4 h-3 w-3 rounded-full ${service.dotBg} ring-4 ring-white shadow-sm`}
                        />

                        {/* Icon Container */}
                        <div
                          className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl ${service.iconBg} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        {/* Title & Category */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-[#0B2A5B] truncate group-hover:text-[#087FF5] transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

            </div>

          </div>

        </div>

        {/* ============================================================
            SUBTLE BOTTOM BRAND LINE & DOWN ARROW
        ============================================================ */}
        <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center justify-center relative">
          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <span className="hidden sm:inline">SMART SOLUTIONS FOR A BRIGHTER TOMORROW</span>
          </div>
          <button
            type="button"
            aria-label="Scroll down"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-transform duration-300 hover:scale-110 hover:border-blue-400 hover:text-[#087FF5] cursor-pointer"
          >
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>

      </div>

      {/* QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

      {/* IMPACT VIDEO OVERLAY MODAL */}
      {impactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h3 className="text-sm font-bold text-[#0B2A5B]">AVM Smart Solutions — Enterprise Impact</h3>
              <button
                type="button"
                onClick={() => setImpactModalOpen(false)}
                className="rounded-full bg-slate-100 p-2 text-xs font-bold text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
              <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-slate-900">
                <Image
                  src="/images/hero-architectural-portal.jpg"
                  alt="AVM Smart Solutions Impact Gateway"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/50 flex flex-col items-center justify-center p-6 text-white text-center">
                  <h4 className="text-xl font-black">Building Digital Solutions That Scale</h4>
                  <p className="mt-2 text-xs text-slate-200">
                    From enterprise web portals to high-performance mobile apps, we help organizations accelerate revenue and efficiency.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setImpactModalOpen(false);
                  setQuoteModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#087FF5] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#066FD6]"
              >
                Start Your Project Today
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
