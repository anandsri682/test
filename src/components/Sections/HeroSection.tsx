'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, Sparkles, Code2, Smartphone, ShieldCheck, Zap, Layers } from "lucide-react";

const HERO_QUOTES = [
  {
    quote: "We don't just build websites & apps; we engineer high-converting digital experiences.",
    author: "AVM Smart Engineering Principle",
    tag: "High Conversion"
  },
  {
    quote: "Where luxury UI/UX aesthetics meet ultra-fast, scalable software architecture.",
    author: "Craftsmanship & Speed",
    tag: "Performance First"
  },
  {
    quote: "Turning ambitious business visions into market-leading digital realities.",
    author: "Bespoke Engineering",
    tag: "Scalable Growth"
  }
];

const FLOATING_BADGES = [
  { icon: Code2, label: "Next.js 16 & React", desc: "Sub-second speed", delay: 0 },
  { icon: Smartphone, label: "iOS & Android Apps", desc: "Cross-platform native", delay: 0.2 },
  { icon: Layers, label: "Custom Software", desc: "Java & Microservices", delay: 0.4 },
  { icon: Sparkles, label: "Luxury UI/UX Systems", desc: "Figma & Framer Motion", delay: 0.6 }
];

export default function HeroSection() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % HERO_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeQuote = HERO_QUOTES[currentQuoteIndex];

  return (
    <section
      id="hero"
      className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-8 w-full max-w-7xl mx-auto overflow-hidden text-white bg-black"
    >
      {/* Background ambient particle glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-black blur-[160px] rounded-full z-0" />
      <div className="pointer-events-none absolute top-40 -left-20 w-[300px] h-[300px] bg-yellow-500/10 blur-[130px] rounded-full z-0" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
        
        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Engineering The Future of Digital Products</span>
        </motion.div>

        {/* ANIMATED QUOTATION BOX */}
        <div className="relative w-full py-4 px-2 sm:px-6">
          <span className="absolute -top-6 left-2 sm:left-6 text-6xl sm:text-8xl font-serif text-amber-400/20 select-none pointer-events-none">
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
                &ldquo;
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-white">
                  {activeQuote.quote}
                </span>
                &rdquo;
              </h1>
              <p className="text-xs sm:text-sm text-amber-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="w-2 h-0.5 bg-amber-400 inline-block" />
                {activeQuote.author}
                <span className="w-2 h-0.5 bg-amber-400 inline-block" />
              </p>
            </motion.div>
          </AnimatePresence>

          <span className="absolute -bottom-10 right-2 sm:right-6 text-6xl sm:text-8xl font-serif text-amber-400/20 select-none pointer-events-none">
            ”
          </span>
        </div>

        {/* SUBHEADLINE DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2"
        >
          AVM Smart builds high-performance web applications, mobile platforms, and custom business software designed to elevate modern enterprises.
        </motion.p>

        {/* CALL TO ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2"
        >
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 shadow-xl shadow-amber-950/60 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore Services & Pricing</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-amber-500/40 backdrop-blur-md transition-all duration-300"
          >
            <span>Meet Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* QUICK STATS & PROOF BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 pt-6 text-slate-400 text-xs font-semibold border-t border-white/10 w-full max-w-3xl"
        >
          <div className="flex items-center gap-1.5 text-amber-400">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="ml-1 text-slate-200 font-bold">4.9/5 Rating</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Sub-Second Page Loads</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>120+ Delivered Projects</span>
          </div>
        </motion.div>

        {/* FLOATING TECH BADGES ORBIT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-10">
          {FLOATING_BADGES.map((badge, idx) => {
            const IconComp = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0]
                }}
                transition={{
                  opacity: { duration: 0.5, delay: badge.delay },
                  y: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }
                }}
                className="p-4 rounded-2xl bg-[#0c0c12] border border-white/10 hover:border-amber-500/40 text-left transition-all duration-300 shadow-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="font-bold text-white text-xs sm:text-sm">{badge.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{badge.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
