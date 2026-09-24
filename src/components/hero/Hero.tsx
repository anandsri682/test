'use client';

import React, { useState } from 'react';
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
  },
  {
    num: '02',
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    icon: Smartphone,
    color: '#10B981',
  },
  {
    num: '03',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: BarChart3,
    color: '#FF6A00',
  },
  {
    num: '04',
    title: 'Cloud & DevOps',
    slug: 'cloud-and-devops',
    icon: Cloud,
    color: '#8B5CF6',
  },
  {
    num: '05',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    icon: Palette,
    color: '#EC4899',
  },
  {
    num: '06',
    title: 'IT Consulting',
    slug: 'it-consulting',
    icon: Users,
    color: '#F59E0B',
  },
];

export default function Hero() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        z-0
        overflow-hidden
        bg-gradient-to-b
        from-[#EBF3FF]
        via-[#F4F8FE]
        to-white
        pt-6
        pb-10
        sm:pt-8
        sm:pb-12
        lg:pt-10
        lg:pb-14
      "
    >

      {/* ============================================================
          BACKGROUND ATMOSPHERE
      ============================================================ */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[650px] w-[650px] rounded-full bg-blue-300/20 blur-[130px]" />

      <div className="pointer-events-none absolute right-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-emerald-200/15 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-200px] right-[20%] h-[500px] w-[500px] rounded-full bg-blue-200/15 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ============================================================
            MAIN HERO
        ============================================================ */}

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-4">

          {/* ==========================================================
              LEFT CONTENT

              IMPORTANT:
              z-10 instead of z-50.
              This keeps the navbar above the hero content.
          ========================================================== */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-start
              space-y-6
              text-left
              lg:col-span-5
            "
          >

            {/* Brand label */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-200/70
                bg-white/85
                px-3.5
                py-1.5
                shadow-sm
                backdrop-blur-md
              "
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#087FF5]" />

              <span className="text-xs font-bold uppercase tracking-widest text-[#0B2A5B]">
                AVM SMART SOLUTIONS
              </span>
            </div>

            {/* Main heading */}

            <h1
              className="
                max-w-[620px]
                text-3xl
                font-black
                leading-[1.08]
                tracking-tight
                text-[#0B2A5B]
                sm:text-4xl
                md:text-5xl
                lg:text-[52px]
                xl:text-[62px]
              "
            >
              Digital Solutions for{' '}

              <span className="bg-gradient-to-r from-[#087FF5] to-[#2563EB] bg-clip-text text-transparent">
                Real Business
              </span>{' '}

              <span className="relative inline-block bg-gradient-to-r from-[#10B981] to-[#13B89A] bg-clip-text text-transparent">

                Growth

                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-[#FFB800]"
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

            {/* Description */}

            <p
              className="
                max-w-[540px]
                text-sm
                font-medium
                leading-relaxed
                text-slate-600
                sm:text-base
                lg:text-[17px]
              "
            >
              We design, develop, and deliver high-performance websites,
              mobile applications, and scalable digital solutions that help
              businesses work smarter and grow faster.
            </p>

            {/* CTA */}

            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="
                group
                inline-flex
                cursor-pointer
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#087FF5]
                px-8
                py-4
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-blue-500/25
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#066FD6]
                hover:shadow-xl
                hover:shadow-blue-500/30
                active:scale-95
              "
            >
              <span>Start a Project</span>

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

          </div>

          {/* ==========================================================
              RIGHT VISUAL

              Keep image treatment unchanged.
          ========================================================== */}

          <div
            className="
              relative
              z-10
              h-[500px]
              w-full
              lg:col-span-7
              lg:h-[570px]
            "
          >

            {/* ========================================================
                IMAGE
            ======================================================== */}

            <div
              className="
                absolute
                inset-y-0
                right-[-8%]
                w-[108%]
                overflow-hidden
                lg:right-[-14%]
                lg:w-[112%]
              "
            >

              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'ellipse(72% 65% at 62% 50%)',
                }}
              >
                <Image
                  src="/images/landingpage.png"
                  alt="AVM Smart Solutions Architectural Gateway"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 850px"
                  className="object-cover object-center"
                />
              </div>

              {/* Left image mask */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  z-10
                  w-[48%]
                  bg-gradient-to-r
                  from-[#F4F8FE]
                  via-[#F4F8FE]/95
                  via-55%
                  to-transparent
                "
              />

              {/* Top blend */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  right-0
                  top-0
                  z-10
                  h-28
                  bg-gradient-to-b
                  from-[#F4F8FE]
                  to-transparent
                "
              />

              {/* Bottom blend */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10
                  h-32
                  bg-gradient-to-t
                  from-[#F4F8FE]
                  to-transparent
                "
              />

              {/* Right fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  right-0
                  z-10
                  w-20
                  bg-gradient-to-l
                  from-[#F4F8FE]/50
                  to-transparent
                "
              />

              <div className="pointer-events-none absolute inset-0 z-10 bg-blue-500/[0.025]" />

            </div>

            {/* ========================================================
                HALF-OVAL SERVICE PATH

                z-20 so it stays inside hero,
                but navbar remains above it.
            ======================================================== */}

            <div className="absolute inset-0 z-20 overflow-hidden">

              {/* Fixed half-oval guide */}

              <svg
                className="
                  pointer-events-none
                  absolute
                  left-[4%]
                  top-[6%]
                  h-[500px]
                  w-[390px]
                  lg:left-[6%]
                  lg:h-[540px]
                  lg:w-[430px]
                "
                viewBox="0 0 430 540"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="
                    M 300 535
                    C 120 500, 55 390, 75 270
                    C 95 145, 180 55, 310 15
                  "
                  stroke="rgba(148,163,184,0.20)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  fill="none"
                />
              </svg>

              {/* Moving cards */}

              {HERO_SERVICES.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.slug}
                    className="
                      absolute
                      left-0
                      top-0
                      z-20
                      w-[255px]
                      sm:w-[280px]
                      lg:w-[300px]
                    "
                    animate={
                      shouldReduceMotion
                        ? {
                            x: 80,
                            y: 350,
                            opacity: 1,
                            rotate: 0,
                          }
                        : {
                            x: [
                              110,
                              92,
                              68,
                              42,
                              18,
                              2,
                              5,
                              18,
                              42,
                              70,
                              100,
                              125,
                            ],

                            y: [
                              455,
                              420,
                              380,
                              330,
                              275,
                              220,
                              165,
                              110,
                              60,
                              20,
                              -25,
                              -90,
                            ],

                            rotate: [
                              6,
                              5,
                              4,
                              3,
                              2,
                              0,
                              -1,
                              -2,
                              -3,
                              -4,
                              -5,
                              -6,
                            ],

                            opacity: [
                              0,
                              0.45,
                              1,
                              1,
                              1,
                              1,
                              1,
                              1,
                              1,
                              0.85,
                              0.35,
                              0,
                            ],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? {
                            duration: 0,
                          }
                        : {
                            duration: 15,
                            delay: -(index * 2.5),
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                          }
                    }
                  >

                    {/* Service card */}

                    <div
                      onClick={() => setQuoteModalOpen(true)}
                      className="
                        group
                        relative
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-white/80
                        bg-white/80
                        px-3
                        py-3
                        shadow-lg
                        shadow-slate-900/5
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:scale-[1.03]
                        hover:bg-white
                        hover:shadow-2xl
                      "
                    >

                      {/* Colored curve node */}

                      <span
                        className="
                          absolute
                          -left-[18px]
                          top-1/2
                          h-3
                          w-3
                          -translate-y-1/2
                          rounded-full
                          ring-4
                          ring-white/70
                        "
                        style={{
                          backgroundColor: service.color,
                          boxShadow: `0 0 18px ${service.color}66`,
                        }}
                      />

                      {/* Icon */}

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          text-white
                          shadow-md
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                        style={{
                          backgroundColor: service.color,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Content */}

                      <div className="min-w-0 flex-1">

                        <h3 className="truncate text-xs font-bold text-[#0B2A5B] sm:text-sm">
                          {service.title}
                        </h3>

                        <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400">
                          {service.num}
                        </p>

                      </div>

                      <ArrowRight
                        className="
                          h-4
                          w-4
                          shrink-0
                          text-slate-300
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:text-[#087FF5]
                        "
                      />

                    </div>

                  </motion.div>
                );
              })}

              {/* Top fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  right-0
                  top-0
                  z-40
                  h-28
                  bg-gradient-to-b
                  from-[#F4F8FE]
                  via-[#F4F8FE]/80
                  to-transparent
                "
              />

              {/* Bottom fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-40
                  h-28
                  bg-gradient-to-t
                  from-[#F4F8FE]
                  via-[#F4F8FE]/80
                  to-transparent
                "
              />

            </div>

            {/* ========================================================
                IMPACT BUTTON
            ======================================================== */}

            <button
              type="button"
              onClick={() => setImpactModalOpen(true)}
              className="
                absolute
                bottom-[32px]
                right-[3%]
                z-30
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-2xl
                border
                border-white/80
                bg-white/85
                px-4
                py-3
                shadow-xl
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white
                hover:shadow-2xl
              "
            >

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2A5B] text-white shadow-md">
                <Play className="ml-0.5 h-4 w-4 fill-white" />
              </div>

              <div className="pr-1 text-left">

                <p className="text-xs font-bold text-[#0B2A5B]">
                  See How
                </p>

                <p className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  We Create Impact

                  <ArrowRight className="h-3 w-3 text-[#087FF5]" />
                </p>

              </div>

            </button>

          </div>

        </div>

        {/* ============================================================
            BOTTOM BRAND LINE
        ============================================================ */}

        <div
          className="
            relative
            z-10
            mt-4
            flex
            items-center
            justify-center
            border-t
            border-slate-200/50
            pt-4
            lg:mt-6
          "
        >

          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">

            <span className="hidden sm:inline">
              SMART SOLUTIONS FOR A BRIGHTER TOMORROW
            </span>

          </div>

          <button
            type="button"
            aria-label="Scroll down"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight * 0.85,
                behavior: 'smooth',
              });
            }}
            className="
              flex
              h-8
              w-8
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-all
              duration-300
              hover:scale-110
              hover:border-blue-400
              hover:text-[#087FF5]
            "
          >
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>

        </div>

      </div>

      {/* ================================================================
          QUOTE MODAL
      ================================================================ */}

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

      {/* ================================================================
          IMPACT MODAL
      ================================================================ */}

      {impactModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">

          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <h3 className="text-sm font-bold text-[#0B2A5B]">
                AVM Smart Solutions — Enterprise Impact
              </h3>

              <button
                type="button"
                onClick={() => setImpactModalOpen(false)}
                className="
                  rounded-full
                  bg-slate-100
                  p-2
                  text-xs
                  font-bold
                  text-slate-500
                  hover:bg-slate-200
                "
              >
                ✕
              </button>

            </div>

            <div className="space-y-4 p-6 text-center">

              <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-slate-900">

                <Image
                  src="/images/hero-architectural-portal.jpg"
                  alt="AVM Smart Solutions Impact Gateway"
                  fill
                  className="object-cover"
                />

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                    bg-slate-950/50
                    p-6
                    text-center
                    text-white
                  "
                >

                  <h4 className="text-xl font-black">
                    Building Digital Solutions That Scale
                  </h4>

                  <p className="mt-2 text-xs text-slate-200">
                    From enterprise web portals to high-performance mobile
                    apps, we help organizations accelerate revenue and
                    efficiency.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  setImpactModalOpen(false);
                  setQuoteModalOpen(true);
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#087FF5]
                  px-6
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  hover:bg-[#066FD6]
                "
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