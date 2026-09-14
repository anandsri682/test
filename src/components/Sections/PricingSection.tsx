'use client';

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Code2,
  Smartphone,
  Layers,
  Palette,
  Search,
  Wrench,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  HelpCircle,
  LucideIcon
} from "lucide-react";
import { PRICING_CATEGORIES, PricingCategory, PricingPlan } from "@/data/pricingData";

// Icon mapping helper
const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Layers,
  Palette,
  Search,
  Wrench
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.06 }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("website");

  const activeCategory =
    PRICING_CATEGORIES.find((cat) => cat.id === activeCategoryId) || PRICING_CATEGORIES[0];

  const handleCtaClick = (plan: PricingPlan) => {
    if (onSelectPlan) {
      onSelectPlan(plan.name);
    }
    // Smooth scroll to contact section
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 relative">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[140px] rounded-full z-0" />

      <div className="relative z-10">
        {/* SECTION HEADING */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Transparent & Scalable Pricing
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black text-white mb-4">
            Tailored Digital Solutions & Plans
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Choose a structured service category below to view detailed plans, deliverables, and transparent pricing tailored for your business growth.
          </motion.p>
        </motion.div>

        {/* CATEGORY SWITCHER TABS */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-3 pt-1 no-scrollbar">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl max-w-full">
            {PRICING_CATEGORIES.map((cat) => {
              const IconComp = ICON_MAP[cat.iconName] || Code2;
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-white shadow-lg shadow-purple-900/40"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePricingTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-purple-800 rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CATEGORY SHORT DESCRIPTION BANNER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id + "-desc"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10 max-w-3xl mx-auto px-4"
          >
            <p className="text-slate-300 text-xs sm:text-sm bg-purple-950/30 border border-purple-500/20 py-2.5 px-4 rounded-xl inline-block backdrop-blur-md">
              <span className="text-purple-400 font-bold">{activeCategory.name}: </span>
              {activeCategory.shortDesc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* PRICING CARDS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id + "-grid"}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
            variants={staggerContainer}
            className={`grid grid-cols-1 ${
              activeCategory.plans.length === 4
                ? "md:grid-cols-2 lg:grid-cols-4"
                : activeCategory.plans.length === 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-3"
            } gap-6 sm:gap-8 items-stretch mb-14`}
          >
            {activeCategory.plans.map((plan, i) => {
              const isPopular = plan.popular;
              const isCustom = plan.isCustomQuote;

              return (
                <motion.div
                  key={plan.id}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className={`relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border ${
                    isPopular
                      ? "border-[#7C3AED] shadow-2xl shadow-purple-900/40 ring-1 ring-[#7C3AED]/50"
                      : isCustom
                      ? "border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-purple-950/30"
                      : "border-white/10 hover:border-white/20"
                  } flex flex-col justify-between backdrop-blur-xl transition-all duration-300`}
                >
                  {/* BADGE (IF POPULAR OR CUSTOM) */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#7C3AED] via-purple-600 to-amber-500 rounded-full text-[10px] font-black uppercase tracking-wider text-white whitespace-nowrap shadow-lg shadow-purple-900/50">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* PLAN TITLE & DESCRIPTON */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1.5 flex items-center justify-between">
                        <span>{plan.name}</span>
                        {isCustom && (
                          <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                            Flexible
                          </span>
                        )}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm min-h-[2.5rem] leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* PRICE DISPLAY */}
                    <div className="py-4 border-y border-white/10 mb-6">
                      {isCustom ? (
                        <div>
                          <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-300">
                            Custom Pricing
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            Tailored quotation based on your exact specs
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {plan.billingType === "monthly"
                              ? "/ month"
                              : plan.billingType === "yearly"
                              ? "/ year"
                              : "one-time"}
                          </span>
                        </div>
                      )}

                      {/* TIMELINE & SUPPORT PILLS */}
                      {(plan.deliveryTimeline || plan.supportDuration) && (
                        <div className="flex flex-wrap gap-2 mt-3 text-[11px]">
                          {plan.deliveryTimeline && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              <Clock className="w-3 h-3 text-amber-400" />
                              {plan.deliveryTimeline}
                            </span>
                          )}
                          {plan.supportDuration && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/5">
                              <ShieldCheck className="w-3 h-3 text-purple-400" />
                              {plan.supportDuration}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* FEATURES LIST */}
                    <div className="mb-8">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                        What&apos;s Included:
                      </div>
                      <ul className="space-y-2.5">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-snug">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* NOT INCLUDED / NOTES */}
                      {plan.notIncluded && plan.notIncluded.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Note / Exclusions:</div>
                          <ul className="space-y-1.5">
                            {plan.notIncluded.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-400 leading-tight">
                                <XCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ACTION CTA BUTTON */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCtaClick(plan)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? "bg-gradient-to-r from-[#7C3AED] to-purple-800 hover:from-purple-600 hover:to-purple-900 text-white shadow-lg shadow-purple-900/40"
                        : isCustom
                        ? "bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white shadow-lg shadow-amber-900/20"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                    }`}
                  >
                    <span>{plan.ctaText || "Get Started"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* TRUST & TRANSPARENCY DISCLAIMER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-white/10 text-center text-xs text-slate-400 max-w-4xl mx-auto mb-14 leading-relaxed"
        >
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold mb-1.5 text-xs sm:text-sm">
            <HelpCircle className="w-4 h-4" />
            Pricing Transparency & Project Guidance
          </div>
          <p>
            Pricing may vary depending on project requirements, complexity, integrations, third-party services, and customization. Contact us for an accurate quotation.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400">
            <span>✓ Domain & Hosting can be managed or integrated</span>
            <span>✓ App Store & Google Play charges are separate</span>
            <span>✓ Third-party API subscriptions billed directly</span>
          </div>
        </motion.div>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-r from-purple-950 via-[#7C3AED]/40 to-slate-900 p-8 sm:p-12 text-center border border-purple-500/30 overflow-hidden shadow-2xl max-w-5xl mx-auto"
        >
          <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#7C3AED]/20 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Not sure which plan is right for your business?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-6">
              Tell us about your requirements and we&apos;ll recommend the right solution for you with a clear roadmap.
            </p>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-xl shadow-purple-900/40"
            >
              <span>Talk to AVM Smart</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
