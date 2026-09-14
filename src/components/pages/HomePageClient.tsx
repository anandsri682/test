'use client';

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StarfieldBackground from "@/components/common/StarfieldBackground";

import HeroSection from "@/components/Sections/HeroSection";
import PortfolioSection from "@/components/Sections/PortfolioSection";
import ProjectProcess from "@/components/ProjectProcess";
import ContactSection from "@/components/Sections/ContactSection";

import {
  Code2,
  Search,
  Star,
  Sparkles,
  Zap,
  Lock,
  Layers,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

// STATS DATA
const STATS = [
  { value: 120, label: "Projects Completed", suffix: "+" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
  { value: 25, label: "Business Partners", suffix: "+" },
  { value: 5, label: "Years Experience", suffix: "+" }
];

// WHY CHOOSE US
const WHY_US = [
  { title: "Modern Design", desc: "Aesthetics tailored like Apple, Linear, and Vercel.", icon: Sparkles },
  { title: "Lightning Fast", desc: "Optimized for sub-second page loads and high Lighthouse scores.", icon: Zap },
  { title: "Fully Responsive", desc: "Flawless performance across all viewport sizes.", icon: Layers },
  { title: "Secure Development", desc: "Bank-grade encryption and security best practices.", icon: Lock },
  { title: "SEO Optimized", desc: "Built ground-up to rank higher on Google search results.", icon: Search },
  { title: "Lifetime Support", desc: "Dedicated maintenance long after your project launches.", icon: ShieldCheck },
  { title: "Clean Code", desc: "Maintainable TypeScript & Next.js architecture.", icon: Code2 },
  { title: "Transparent Agency Rates", desc: "Clear packages without hidden surprises.", icon: Star }
];

// TECH STACK
const TECH_STACK = [
  "Next.js", "React", "Node.js", "Express", "MongoDB", "Firebase",
  "Tailwind", "TypeScript", "JavaScript", "Figma", "AWS", "GitHub", "Vercel"
];

// FAQS
const FAQS = [
  {
    q: "How long does development take?",
    a: "Standard website builds typically take between 2 to 4 weeks, depending on scope and client feedback turnarounds. Complex web applications or custom mobile apps range from 4 to 8 weeks."
  },
  {
    q: "Do you provide hosting & domain setup?",
    a: "Yes! We assist in deploying your project onto premium platforms like Vercel, AWS, or Netlify, guaranteeing enterprise-grade uptime, SSL, and global CDN delivery."
  },
  {
    q: "Will the website be mobile responsive?",
    a: "Every single experience we build follows a mobile-first engineering approach. Your site will look and perform flawlessly across all screen sizes, from mobile devices to desktop monitors."
  },
  {
    q: "How do I view your service packages and pricing?",
    a: "Click on 'Services' in the navigation bar at the top of the page to view our full capabilities, numbered packages, and custom quotation options."
  }
];

export default function HomePageClient() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-[#07070a] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden antialiased">
      <StarfieldBackground />

      <div className="relative z-10">
        <Navbar />

        <main className="pt-16 sm:pt-20">
          {/* HERO SECTION */}
          <HeroSection />

          {/* STATS SECTION */}
          <section className="py-10 sm:py-14 px-4 border-y border-white/10 bg-black/40">
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <div className="font-black text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-400">
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section id="why-us" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Engineering Mastery & Design</h2>
              <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
                We combine creative brilliance with battle-tested software architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {WHY_US.map((item, i) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PORTFOLIO SECTION */}
          <PortfolioSection />

          {/* PROCESS SECTION */}
          <ProjectProcess />

          {/* TECHNOLOGIES */}
          <section className="py-14 sm:py-20 bg-white/[0.01] border-y border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Technologies We Master</h2>
              <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 max-w-5xl mx-auto">
                {TECH_STACK.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#0a0a0f] border border-white/10 text-slate-300 text-xs sm:text-sm font-semibold hover:border-amber-500/50 hover:text-white transition-colors shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400 text-sm">Everything you need to know about partnering with AVM Smart.</p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="rounded-2xl bg-[#0a0a0f] border border-white/10 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
