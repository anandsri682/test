'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/data/siteData';
import {
  Globe,
  Smartphone,
  TrendingUp,
  Cloud,
  Palette,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

const serviceIconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8" />,
  Smartphone: <Smartphone className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Cloud: <Cloud className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
};

export default function ServicesClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const cardThemes = [
    {
      accent: '#087FF5',
      iconBg: 'bg-[#087FF5]/10',
      iconText: 'text-[#087FF5]',
      glow: 'group-hover:shadow-[#087FF5]/20',
    },
    {
      accent: '#13B89A',
      iconBg: 'bg-[#13B89A]/10',
      iconText: 'text-[#13B89A]',
      glow: 'group-hover:shadow-[#13B89A]/20',
    },
    {
      accent: '#FF6A00',
      iconBg: 'bg-[#FF6A00]/10',
      iconText: 'text-[#FF6A00]',
      glow: 'group-hover:shadow-[#FF6A00]/20',
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-[#F8FAFC]">

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative overflow-hidden bg-[#0B2A5B] text-white py-16 sm:py-20 lg:py-24">

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#087FF5]/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#13B89A]/10 blur-3xl" />

          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border border-white/10 bg-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />

            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8]">
              Solutions for every stage of your growth
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5">
            Our Services
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Home
            <span className="mx-2 text-slate-500">/</span>
            Services
          </p>

        </div>
      </section>

      {/* ============================================================
          SERVICES
      ============================================================ */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* SECTION HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full bg-[#087FF5]/10 text-[#087FF5] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
              What We Do
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2A5B] tracking-tight mb-4">
              Comprehensive Digital Services
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              From idea to execution, we provide end-to-end brand and digital
              solutions tailored to your business goals.
            </p>

          </div>

          {/* SERVICE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">

            {SERVICES.map((service, idx) => {
              const theme = cardThemes[idx % cardThemes.length];

              return (
                <article
                  key={service.id}
                  className={`
                    group
                    relative
                    flex
                    flex-col
                    h-full
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-slate-200
                    bg-white
                    p-6
                    sm:p-7
                    lg:p-8
                    shadow-sm
                    ${theme.glow}
                    hover:-translate-y-2
                    hover:shadow-2xl
                    transition-all
                    duration-500
                  `}
                >

                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-90"
                    style={{ backgroundColor: theme.accent }}
                  />

                  {/* Decorative glow */}
                  <div
                    className="absolute -right-16 -top-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: theme.accent }}
                  />

                  <div className="relative z-10 flex flex-col h-full">

                    {/* NUMBER + ICON */}
                    <div className="flex items-start justify-between mb-7">

                      <div
                        className={`
                          w-16
                          h-16
                          sm:w-[68px]
                          sm:h-[68px]
                          rounded-2xl
                          ${theme.iconBg}
                          ${theme.iconText}
                          flex
                          items-center
                          justify-center
                          border
                          border-white
                          shadow-sm
                          group-hover:scale-110
                          group-hover:rotate-2
                          transition-all
                          duration-500
                        `}
                      >
                        {serviceIconMap[service.iconName]}
                      </div>

                      <span className="text-xs font-black text-slate-300 tracking-widest">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                    </div>

                    {/* TITLE */}
                    <h3
                      className="
                        text-xl
                        sm:text-2xl
                        font-black
                        text-[#0B2A5B]
                        mb-3
                        tracking-tight
                        transition-colors
                        duration-300
                        group-hover:text-[#087FF5]
                      "
                    >
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-slate-600 leading-7 mb-6">
                      {service.fullDesc}
                    </p>

                    {/* FEATURES */}
                    <ul className="space-y-2.5 mb-7 flex-1">

                      {service.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700"
                        >
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: theme.accent }}
                          />

                          <span>{feat}</span>
                        </li>
                      ))}

                    </ul>

                    {/* DIVIDER */}
                    <div className="h-px bg-slate-100 mb-5" />

                    {/* LEARN MORE */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="
                        group/link
                        inline-flex
                        items-center
                        justify-between
                        w-full
                        min-h-[46px]
                        rounded-xl
                        px-4
                        py-3
                        bg-slate-50
                        border
                        border-slate-200
                        text-[#0B2A5B]
                        text-sm
                        font-bold
                        transition-all
                        duration-300
                        hover:bg-[#087FF5]
                        hover:border-[#087FF5]
                        hover:text-white
                      "
                    >
                      <span>Learn More</span>

                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/80 text-[#087FF5] group-hover/link:bg-white transition-colors">
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                      </span>
                    </Link>

                  </div>
                </article>
              );
            })}

          </div>
        </div>
      </section>

      {/* ============================================================
          CUSTOM SOLUTION CTA
      ============================================================ */}
      <section className="relative overflow-hidden bg-[#0B2A5B] text-white py-16 sm:py-20">

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#087FF5]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#13B89A]/15 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#38BDF8] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
            Custom Solutions
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Need a Custom Solution?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Let's discuss your custom technical specifications with our solutions architect.
          </p>

          <button
            onClick={() => setQuoteModalOpen(true)}
            className="
              group
              min-h-[50px]
              inline-flex
              items-center
              justify-center
              gap-2.5
              px-7
              sm:px-8
              py-3.5
              bg-white
              text-[#0B2A5B]
              font-bold
              text-sm
              rounded-xl
              shadow-xl
              hover:bg-[#FF6A00]
              hover:text-white
              transition-all
              duration-300
              active:scale-95
            "
          >
            <span>Start a Project</span>

            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

        </div>
      </section>

      {/* ============================================================
          QUOTE MODAL
      ============================================================ */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

    </div>
  );
}