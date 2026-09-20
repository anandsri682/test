'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Monitor,
  Layers,
  Code,
  Clock,
} from 'lucide-react';
import { DEMOS, DEMO_CATEGORIES, DemoItem } from '@/data/demos';

export default function DemosClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredDemos =
    activeCategory === 'All'
      ? DEMOS
      : DEMOS.filter((demo) => demo.category === activeCategory);

  const liveCount = DEMOS.filter(
    (demo) => demo.status === 'live' && demo.liveUrl.length > 0
  ).length;

  return (
    <div className="w-full min-h-screen bg-[#F4F7FA] text-slate-900 pb-24 antialiased overflow-x-hidden">

      {/* ============================================================
          HERO
      ============================================================ */}
      <section
        aria-labelledby="demos-hero-heading"
        className="relative overflow-hidden bg-[#0B2A5B] text-white py-16 sm:py-20"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#087FF5]/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#13B89A]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#087FF5_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span className="text-[#38BDF8]">
                AVM SMART DEMO SHOWCASE
              </span>
            </div>

            <h1
              id="demos-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-tight"
            >
              Explore Our Live Product Demos
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Interact directly with live web applications, e-commerce stores,
              education platforms, and custom management systems built by AVM
              Smart.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-white/10 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#67D63B] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#67D63B]" />
                </span>
                <span>{liveCount} Live Interactive Demos</span>
              </div>

              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#38BDF8]" />
                <span>Production Subdomains</span>
              </div>

              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#FF6A00]" />
                <span>Full-Stack Solutions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          CONTENT
      ============================================================ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">

        {/* FILTER HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FF5]">
                DIGITAL SHOWCASE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] tracking-tight">
              Our Projects
              <span className="text-[#087FF5] ml-2">
                ({filteredDemos.length})
              </span>
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Explore our digital products and working solutions.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap items-center gap-2">
            {DEMO_CATEGORIES.map((category) => {
              const count =
                category === 'All'
                  ? DEMOS.length
                  : DEMOS.filter((d) => d.category === category).length;

              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-label={`Filter demos by ${category}`}
                  aria-pressed={active}
                  className={`
                    min-h-[42px]
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-bold
                    inline-flex
                    items-center
                    gap-2
                    border
                    transition-all
                    duration-300
                    active:scale-95
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#087FF5]
                    ${
                      active
                        ? 'bg-[#087FF5] text-white border-[#087FF5] shadow-lg shadow-[#087FF5]/20'
                        : 'bg-white text-[#0B2A5B] border-slate-200 hover:border-[#087FF5]/40 hover:text-[#087FF5] hover:-translate-y-0.5'
                    }
                  `}
                >
                  <span>{category}</span>

                  <span
                    className={`
                      min-w-[20px]
                      h-5
                      px-1.5
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-[10px]
                      ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }
                    `}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            DEMO GRID
        ============================================================ */}
        {filteredDemos.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
          >
            {filteredDemos.map((demo, index) => (
              <DemoCard
                key={demo.id}
                demo={demo}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <Monitor className="w-12 h-12 text-slate-400 mx-auto mb-4" />

            <h3 className="text-lg font-bold text-[#0B2A5B] mb-2">
              No Demos Found
            </h3>

            <p className="text-sm text-slate-500 mb-6">
              There are currently no demos in this category.
            </p>

            <button
              onClick={() => setActiveCategory('All')}
              className="min-h-[44px] px-6 py-2.5 bg-[#087FF5] text-white font-bold text-xs rounded-xl hover:bg-[#066ed4] transition-colors"
            >
              Show All Demos
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================================================================
   DEMO CARD
================================================================ */

function DemoCard({
  demo,
  index,
  shouldReduceMotion,
}: {
  demo: DemoItem;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const isLive = demo.status === 'live' && demo.liveUrl.length > 0;

  const accent = {
    orange: {
      border: 'hover:border-[#FF6A00]/60',
      glow: 'group-hover:shadow-[#FF6A00]/15',
      line: 'bg-[#FF6A00]',
      text: 'text-[#FF6A00]',
      button: 'bg-[#FF6A00] hover:bg-[#e85d00]',
    },
    blue: {
      border: 'hover:border-[#087FF5]/60',
      glow: 'group-hover:shadow-[#087FF5]/15',
      line: 'bg-[#087FF5]',
      text: 'text-[#087FF5]',
      button: 'bg-[#087FF5] hover:bg-[#066ed4]',
    },
    green: {
      border: 'hover:border-[#67D63B]/60',
      glow: 'group-hover:shadow-[#67D63B]/15',
      line: 'bg-[#67D63B]',
      text: 'text-[#3cae18]',
      button: 'bg-[#13B89A] hover:bg-[#0fa286]',
    },
    teal: {
      border: 'hover:border-[#13B89A]/60',
      glow: 'group-hover:shadow-[#13B89A]/15',
      line: 'bg-[#13B89A]',
      text: 'text-[#0d9c83]',
      button: 'bg-[#13B89A] hover:bg-[#0d9f88]',
    },
  }[demo.accent || 'blue'];

  return (
    <motion.article
      layout
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        margin: '-50px',
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.07, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -7,
            }
      }
      className={`
        group
        relative
        flex
        flex-col
        h-full
        overflow-hidden
        rounded-[24px]
        bg-white
        border
        border-slate-200
        ${accent.border}
        shadow-sm
        ${accent.glow}
        hover:shadow-2xl
        transition-shadow
        duration-500
      `}
    >

      {/* TOP ACCENT */}
      <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
        <motion.div
          className={`h-full w-full ${accent.line}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* ==========================================================
          IMAGE
      ========================================================== */}
      <div className="p-3 sm:p-4 pb-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-[#F4F7FA] border border-slate-100">

          <Image
            src={demo.image}
            alt={`${demo.name} Preview`}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 31vw"
            priority={index < 2}
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.045]
            "
          />

          {/* SUBTLE HOVER OVERLAY */}
          <div className="absolute inset-0 bg-[#0B2A5B]/0 group-hover:bg-[#0B2A5B]/10 transition-colors duration-500 pointer-events-none" />

          {/* CATEGORY */}
          <div className="absolute top-3 left-3">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#0B2A5B]/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold border border-white/15 shadow-lg">
              {demo.category}
            </div>
          </div>

          {/* STATUS */}
          <div className="absolute top-3 right-3">
            {isLive ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#13B89A]/95 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Live
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B2A5B]/90 backdrop-blur-md text-amber-300 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide shadow-lg">
                <Clock className="w-3 h-3" />
                Soon
              </div>
            )}
          </div>

          {/* FEATURED */}
          {demo.featured && (
            <div className="absolute bottom-3 left-3">
              <div className="px-2.5 py-1 rounded-full bg-[#FF6A00] text-white text-[9px] font-black uppercase tracking-wider shadow-lg">
                Featured
              </div>
            </div>
          )}

          {/* HOVER VIEW */}
          {isLive && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-white/95 text-[#0B2A5B] text-xs font-extrabold shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                View Live Demo
                <ArrowRight className="inline-block w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==========================================================
          CONTENT
      ========================================================== */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">

        <div className="flex-1">

          {/* TITLE */}
          <h3
            className="
              text-lg
              sm:text-xl
              font-extrabold
              text-[#0B2A5B]
              leading-snug
              mb-2
              transition-colors
              duration-300
              group-hover:text-[#087FF5]
            "
          >
            {demo.name}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-5">
            {demo.description}
          </p>

          {/* TECHNOLOGIES
          <div className="flex flex-wrap gap-1.5 mb-6">
            {demo.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  px-2.5
                  py-1.5
                  rounded-lg
                  bg-[#F8FAFC]
                  border
                  border-slate-200
                  text-[10px]
                  sm:text-[11px]
                  font-semibold
                  text-slate-600
                  transition-all
                  duration-200
                  group-hover:border-[#087FF5]/20
                "
              >
                {tech}
              </span>
            ))}
          </div>*/}
        </div> 

        {/* ========================================================
            ACTIONS
        ======================================================== */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">

          {isLive ? (
            <a
              href={demo.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Live Demo for ${demo.name}`}
              className={`
                min-h-[46px]
                flex-1
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-3
                ${accent.button}
                text-white
                font-bold
                text-xs
                rounded-xl
                shadow-md
                hover:shadow-lg
                transition-all
                duration-300
                active:scale-[0.98]
              `}
            >
              <span>View Demo</span>

              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          ) : (
            <button
              disabled
              className="
                min-h-[46px]
                flex-1
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-3
                bg-slate-100
                text-slate-400
                font-bold
                text-xs
                rounded-xl
                cursor-not-allowed
              "
            >
              <span>Coming Soon</span>
              <Clock className="w-3.5 h-3.5" />
            </button>
          )}

          {demo.slug &&
            (
              demo.id === 'vegetable' ||
              demo.id === 'hostel' ||
              demo.id === 'fashion-ecommerce' ||
              demo.id === 'furniture'
            ) && (
              <Link
                href={`/demos/${demo.slug}`}
                aria-label={`View detailed breakdown of ${demo.name}`}
                className="
                  min-h-[46px]
                  sm:w-auto
                  px-5
                  py-3
                  bg-white
                  border
                  border-slate-200
                  hover:border-[#087FF5]/40
                  hover:bg-[#F4F8FF]
                  text-[#0B2A5B]
                  hover:text-[#087FF5]
                  font-bold
                  text-xs
                  rounded-xl
                  transition-all
                  duration-300
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  active:scale-[0.98]
                "
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            )}
        </div>
      </div>
    </motion.article>
  );
}