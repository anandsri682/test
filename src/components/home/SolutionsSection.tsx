'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Zap, Clock, ShieldCheck, ArrowUpRight, Check } from 'lucide-react';

const benefits = [
  {
    number: '01',
    title: 'Client-Centered Strategy',
    description:
      'Custom engineering roadmaps shaped around your business goals, audience needs, and long-term growth plans.',
    icon: Target,
    accent: '#087FF5',
    soft: '#EAF4FF',
    detail: 'Strategy first',
  },
  {
    number: '02',
    title: 'Modern Technology',
    description:
      'Scalable solutions built with modern frameworks and dependable architecture, selected for your project’s real needs.',
    icon: Zap,
    accent: '#13A88F',
    soft: '#E8FBF6',
    detail: 'Built to scale',
  },
  {
    number: '03',
    title: 'Clear Delivery Milestones',
    description:
      'Structured project phases, regular progress updates, and quality checks that keep delivery transparent and predictable.',
    icon: Clock,
    accent: '#087FF5',
    soft: '#EAF4FF',
    detail: 'Progress you can track',
  },
  {
    number: '04',
    title: 'Ongoing Support',
    description:
      'Practical maintenance, security updates, and continuous improvements to help your digital products stay reliable.',
    icon: ShieldCheck,
    accent: '#13A88F',
    soft: '#E8FBF6',
    detail: 'Here for the long term',
  },
];

export default function SolutionsSection() {
  return (
    <section
      aria-labelledby="solutions-heading"
      className="relative isolate overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-white via-[#F7FAFF] to-[#F0F8FC] py-20 sm:py-24 lg:py-28"
    >
      {/* Quiet blue/green ambient detail keeps the section distinct without competing with the content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-28 top-[-7rem] h-80 w-80 rounded-full bg-[#087FF5]/[0.07] blur-3xl" />
        <div className="absolute -right-24 bottom-[-8rem] h-96 w-96 rounded-full bg-[#13B89A]/[0.08] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#087FF5]/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#13B89A]/20 bg-white/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0C9B84] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#13B89A]" />
            Strategic Growth Partnership
          </span>

          <h2
            id="solutions-heading"
            className="text-balance text-3xl font-black leading-tight tracking-[-0.04em] text-[#0B2A5B] sm:text-4xl lg:text-5xl"
          >
            Why Partner With{' '}
            <span className="bg-gradient-to-r from-[#087FF5] to-[#13A88F] bg-clip-text text-transparent">
              AVM Smart
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Founded and led by{' '}
            <Link
              href="/founder"
              className="font-bold text-[#087FF5] decoration-[#087FF5]/40 underline-offset-4 transition-colors hover:text-[#065FC0] hover:underline"
            >
              A. Anand Raju
            </Link>
            , Founder &amp; CEO, we combine thoughtful strategy, reliable engineering, and ongoing support to help your digital solutions grow with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                tabIndex={0}
                className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-[0_8px_28px_rgba(11,42,91,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#087FF5]/30 hover:shadow-[0_22px_50px_rgba(11,42,91,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] focus-visible:ring-offset-4 sm:p-7"
              >
                {/* Card accent follows the existing blue and green brand palette. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#087FF5] to-[#13B89A] transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: `${benefit.accent}18` }}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-[1.04] group-hover:shadow-sm"
                    style={{
                      backgroundColor: benefit.soft,
                      borderColor: `${benefit.accent}24`,
                      color: benefit.accent,
                    }}
                  >
                    <Icon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-[0.16em] text-slate-300 transition-colors duration-300 group-hover:text-[#087FF5]">
                    {benefit.number}
                  </span>
                </div>

                <div className="relative mt-7 flex-1">
                  <h3 className="text-lg font-extrabold leading-snug tracking-[-0.02em] text-[#0B2A5B] transition-colors duration-300 group-hover:text-[#087FF5] sm:text-xl">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {benefit.description}
                  </p>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-bold tracking-wide text-slate-500">
                    {benefit.detail}
                  </span>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-all duration-300 group-hover:border-[#087FF5] group-hover:bg-[#087FF5] group-hover:text-white"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-500 sm:mt-10 sm:text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-[#087FF5]" />
            Clear communication
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-[#13A88F]" />
            Transparent milestones
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-[#087FF5]" />
            Long-term partnership
          </span>
        </motion.div>
      </div>
    </section>
  );
}
