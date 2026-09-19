'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Users, Star, Zap } from 'lucide-react';

const SERVICE_CARDS = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Web Development',
    description: 'Modern, scalable and secure websites for businesses of all sizes.',
    features: [
      'Business Websites',
      'E-commerce Solutions',
      'Custom Web Applications',
    ],
    ctaText: 'Explore Web Development',
    caption: 'Build for Tomorrow',
    image: '/images/services/web-development.svg',
    href: '/services/web-development',
    theme: {
      topBorder: 'border-t-[#087FF5]',
      badgeBg: 'bg-[#087FF5]/10 text-[#087FF5] border border-[#087FF5]/20',
      checkBg: 'bg-[#087FF5] text-white',
      btnBg: 'bg-[#087FF5] hover:bg-[#066FD6] text-white shadow-[0_6px_20px_rgba(8,127,245,0.22)]',
      glow: 'from-[#087FF5]/8 to-transparent',
      captionText: 'text-slate-500',
    },
  },
  {
    id: 'mobile-app',
    number: '02',
    title: 'Mobile App Development',
    description: 'Android & iOS applications tailored to your business goals.',
    features: [
      'Android App Development',
      'iOS App Development',
      'Cross-Platform Solutions',
    ],
    ctaText: 'Explore Mobile App Development',
    caption: 'Apps for a Smarter World',
    image: '/images/services/mobile-app.svg',
    href: '/services/mobile-app-development',
    theme: {
      topBorder: 'border-t-[#13B89A]',
      badgeBg: 'bg-[#13B89A]/10 text-[#13B89A] border border-[#13B89A]/20',
      checkBg: 'bg-[#13B89A] text-white',
      btnBg: 'bg-[#13B89A] hover:bg-[#0EA287] text-white shadow-[0_6px_20px_rgba(19,184,154,0.22)]',
      glow: 'from-[#13B89A]/8 to-transparent',
      captionText: 'text-slate-500',
    },
  },
  {
    id: 'digital-mkt',
    number: '03',
    title: 'Digital Marketing',
    description: 'Drive growth with data-driven marketing strategies.',
    features: [
      'SEO & Content Marketing',
      'Social Media Management',
      'Paid Ads (Google & Meta)',
    ],
    ctaText: 'Explore Digital Marketing',
    caption: 'Visibility Drives Opportunity',
    image: '/images/services/digital-marketing.svg',
    href: '/services/digital-marketing',
    theme: {
      topBorder: 'border-t-[#FF6A00]',
      badgeBg: 'bg-[#FF6A00]/10 text-[#F05A00] border border-[#FF6A00]/20',
      checkBg: 'bg-[#FF6A00] text-white',
      btnBg: 'bg-[#FF6A00] hover:bg-[#E55F00] text-white shadow-[0_6px_20px_rgba(255,106,0,0.22)]',
      glow: 'from-[#FF6A00]/8 to-transparent',
      captionText: 'text-slate-500',
    },
  },
  {
    id: 'cloud-devops',
    number: '04',
    title: 'Cloud & DevOps',
    description: 'Build, deploy and scale with reliable cloud infrastructure.',
    features: [
      'Cloud Deployment',
      'CI/CD Pipelines',
      'Server Management',
    ],
    ctaText: 'Explore Cloud & DevOps',
    caption: 'Scale Without Limits',
    image: '/images/services/cloud-devops.svg',
    href: '/services/cloud-and-devops',
    theme: {
      topBorder: 'border-t-[#6366F1]',
      badgeBg: 'bg-[#6366F1]/10 text-[#4F46E5] border border-[#6366F1]/20',
      checkBg: 'bg-[#6366F1] text-white',
      btnBg: 'bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-[0_6px_20px_rgba(99,102,241,0.22)]',
      glow: 'from-[#6366F1]/8 to-transparent',
      captionText: 'text-slate-500',
    },
  },
  {
    id: 'ui-ux',
    number: '05',
    title: 'UI/UX Design',
    description: 'User-centric and modern designs that create great experiences.',
    features: [
      'UI/UX Design Systems',
      'Website & App UI Design',
      'Prototyping & Wireframes',
    ],
    ctaText: 'Explore UI/UX Design',
    caption: 'Design Human Experiences',
    image: '/images/services/ui-ux-design.svg',
    href: '/services/ui-ux-design',
    theme: {
      topBorder: 'border-t-[#EC4899]',
      badgeBg: 'bg-[#EC4899]/10 text-[#DB2777] border border-[#EC4899]/20',
      checkBg: 'bg-[#EC4899] text-white',
      btnBg: 'bg-[#EC4899] hover:bg-[#DB2777] text-white shadow-[0_6px_20px_rgba(236,72,153,0.22)]',
      glow: 'from-[#EC4899]/8 to-transparent',
      captionText: 'text-slate-500',
    },
  },
  {
    id: 'it-consulting',
    number: '06',
    title: 'IT Consulting',
    description: 'Expert guidance for digital transformation and business growth.',
    features: [
      'Technology Strategy',
      'IT Infrastructure Planning',
      'Business Process Automation',
    ],
    ctaText: 'Explore IT Consulting',
    caption: 'Strategy for a Stronger Future',
    image: '/images/services/it-consulting.svg',
    href: '/services/it-consulting',
    theme: {
      topBorder: 'border-t-[#F59E0B]',
      badgeBg: 'bg-[#F59E0B]/10 text-[#D97706] border border-[#F59E0B]/20',
      checkBg: 'bg-[#F59E0B] text-white',
      btnBg: 'bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-[0_6px_20px_rgba(245,158,11,0.22)]',
      glow: 'from-[#F59E0B]/8 to-transparent',
      captionText: 'text-slate-500',
    },
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/70 to-[#F8FAFC] py-20 lg:py-24 text-slate-900 border-b border-slate-200/80"
    >
      {/* Background Decorative Soft Gradients & Dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#087FF5]/10 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#FF6A00]/8 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-96 w-96 rounded-full bg-[#13B89A]/10 blur-3xl" />

        {/* Decorative Grid Pattern */}
        <div
          className="absolute right-8 top-10 h-32 w-48 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(#0B2A5B 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================
            TOP HANDWRITTEN FLOATING ANNOTATIONS (Desktop & Tablet)
        ============================================================ */}
        
        {/* Left Annotation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden xl:flex absolute left-4 top-4 flex-col items-end pointer-events-none z-10"
        >
          <span className="font-serif italic text-lg font-bold text-[#0B2A5B]/80 tracking-wide rotate-[-6deg] select-none">
            Your Vision
          </span>
          <span className="font-serif italic text-lg font-bold text-[#0B2A5B]/80 tracking-wide rotate-[-6deg] select-none -mt-1">
            Our Technology
          </span>
          <svg className="w-12 h-10 text-[#087FF5] stroke-current mt-1 -mr-2" viewBox="0 0 50 40" fill="none">
            <path d="M10 5 C 25 15, 35 25, 40 35" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M28 35 L41 36 L38 25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Right Annotation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden xl:flex absolute right-6 top-8 flex-col items-start pointer-events-none z-10"
        >
          <span className="font-serif italic text-lg font-bold text-[#0B2A5B]/80 tracking-wide rotate-[6deg] select-none">
            Ideas
          </span>
          <span className="font-serif italic text-lg font-bold text-[#0B2A5B]/80 tracking-wide rotate-[6deg] select-none -mt-1">
            Into Impact
          </span>
          <svg className="w-12 h-10 text-[#087FF5] stroke-current mt-1 -ml-3" viewBox="0 0 50 40" fill="none">
            <path d="M40 5 C 25 15, 15 25, 10 35" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22 25 L9 36 L12 23" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* ============================================================
            SECTION HEADER
        ============================================================ */}

        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16">
          
          {/* Small Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#087FF5]/20 bg-[#087FF5]/8 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#087FF5] shadow-xs mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC4899]" />
            <span>OUR SERVICES</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#13B89A]" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B2A5B] leading-[1.15]"
          >
            Solutions Built for{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="bg-gradient-to-r from-[#087FF5] to-[#0264C5] bg-clip-text text-transparent">
                Your
              </span>{' '}
              <span className="bg-gradient-to-r from-[#FF6A00] via-[#F97316] to-[#E55600] bg-clip-text text-transparent">
                Growth
              </span>
              
              {/* Multi-color brush underline stroke matching reference */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 140 14"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 8 Q 35 2, 70 8 T 136 6"
                  stroke="url(#brushGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="brushGradient" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#087FF5" />
                    <stop offset="50%" stopColor="#13B89A" />
                    <stop offset="100%" stopColor="#FF6A00" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto font-normal"
          >
            We combine technology, creativity, and strategy to deliver digital solutions that help your business grow — faster and smarter.
          </motion.p>
        </div>


        {/* ============================================================
            SIX SERVICE CARDS GRID (3 Columns x 2 Rows)
        ============================================================ */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICE_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`
                group relative flex flex-col justify-between overflow-hidden
                rounded-3xl border border-slate-200/80 bg-white p-7 shadow-md
                hover:shadow-2xl transition-all duration-300 ${card.theme.topBorder} border-t-4
              `}
            >
              {/* Soft Subtle Internal Gradient Glow */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${card.theme.glow} opacity-60 transition-opacity group-hover:opacity-100`}
              />

              <div className="relative z-10 flex-1">
                
                {/* Top Row: Number Badge & Illustration Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  
                  {/* Number Badge */}
                  <span
                    className={`
                      inline-flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-2xl text-sm font-black tracking-wider shadow-xs
                      ${card.theme.badgeBg}
                    `}
                  >
                    {card.number}
                  </span>

                  {/* 3D Visual Vector Illustration */}
                  <div className="relative h-32 w-44 shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={card.image}
                      alt={`${card.title} Illustration`}
                      fill
                      className="object-contain"
                      priority={idx < 3}
                    />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-extrabold text-[#0B2A5B] tracking-tight mb-2 group-hover:text-[#087FF5] transition-colors">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 min-h-[38px]">
                  {card.description}
                </p>

                {/* Checklist Features */}
                <ul className="space-y-2.5 mb-6">
                  {card.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                      <span className={`flex h-4 opacity-90 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${card.theme.checkBg}`}>
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Card Footer: CTA Button & Sub-caption */}
              <div className="relative z-10 pt-2 border-t border-slate-100">
                <Link
                  href={card.href}
                  className={`
                    group/btn flex min-h-[46px] w-full items-center justify-center gap-2
                    rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold tracking-wide
                    transition-all duration-300 active:scale-[0.98] ${card.theme.btnBg}
                  `}
                  aria-label={`Explore ${card.title}`}
                >
                  <span>{card.ctaText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </Link>

                {/* Sub-caption next to/below button */}
                <div className="mt-2.5 text-center">
                  <span className={`text-[11px] font-semibold tracking-wide ${card.theme.captionText}`}>
                    {card.caption}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>


        {/* ============================================================
            BOTTOM VALUE STRIP & HANDWRITTEN ANNOTATION
        ============================================================ */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mt-16"
        >
          {/* Main White Card Container */}
          <div className="flex flex-col md:flex-row items-center justify-around gap-6 rounded-3xl border border-slate-200/90 bg-white/90 p-6 sm:p-8 shadow-lg backdrop-blur-md">
            
            {/* Metric 1 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#087FF5]/10 text-[#087FF5] border border-[#087FF5]/20 shadow-xs">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">100+</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Happy Clients</p>
              </div>
            </div>

            <div className="hidden md:block h-10 w-px bg-slate-200" />

            {/* Metric 2 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#13B89A]/10 text-[#13B89A] border border-[#13B89A]/20 shadow-xs">
                <Star className="h-6 w-6 fill-[#13B89A]/20" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-black text-[#0B2A5B]">High-Quality</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solutions</p>
              </div>
            </div>

            <div className="hidden md:block h-10 w-px bg-slate-200" />

            {/* Metric 3 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20 shadow-xs">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-black text-[#0B2A5B]">Long-Term</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Partnerships</p>
              </div>
            </div>

          </div>

          {/* Bottom Right Handwritten Annotation */}
          <div className="mt-4 flex items-center justify-end gap-2 pr-4">
            <svg className="w-10 h-8 text-[#087FF5] stroke-current rotate-[-12deg]" viewBox="0 0 40 30" fill="none">
              <path d="M5 25 C 15 20, 25 15, 30 5" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 7 L31 4 L28 17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-serif italic text-base font-bold text-[#0B2A5B]/80 tracking-wide select-none">
              Let&apos;s Grow Together
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
