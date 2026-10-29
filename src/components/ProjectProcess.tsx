'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Layout,
  Code2,
  CheckCircle2,
  Rocket,
  RefreshCw,
} from 'lucide-react';

interface StepItem {
  id: number;
  badge: string;
  phase: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  deliverables: string[];
  metrics: string;
  tag: string;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    badge: 'Step 01',
    phase: 'Discovery & Strategy',
    title: 'Discovery & Strategy',
    shortDesc:
      'We begin with deep stakeholder workshops to analyze your business goals, target user personas, technical constraints, and competitive landscape to craft a high-ROI digital roadmap.',
    icon: Search,
    deliverables: [
      'Scope Definition & Feasibility Study',
      'System Architecture & Tech Stack Plan',
      'Milestone Timeline & Budget Blueprint',
      'Target User Persona & Journey Mapping',
    ],
    metrics: 'Phase 01 • Kickoff & Strategy',
    tag: 'Roadmap',
  },
  {
    id: 2,
    badge: 'Step 02',
    phase: 'Architecture & Design',
    title: 'Architecture & Design',
    shortDesc:
      'Our UI/UX specialists and systems engineers create conversion-focused wireframes, high-fidelity Figma prototypes, and modular database schemas built to scale effortlessly.',
    icon: Layout,
    deliverables: [
      'Interactive High-Fidelity Figma Prototypes',
      'Design System & Component Guidelines',
      'Database Schema & API Specifications',
      'Mobile-First Responsive UX Wireframes',
    ],
    metrics: 'Phase 02 • UX Blueprints & Schemas',
    tag: 'Design',
  },
  {
    id: 3,
    badge: 'Step 03',
    phase: 'Agile Development',
    title: 'Agile Development',
    shortDesc:
      'Senior engineers write clean, maintainable, high-performance code across frontend and backend in 2-week agile sprints, accompanied by continuous testing and bi-weekly client demos.',
    icon: Code2,
    deliverables: [
      'Modern Next.js 16 & React 19 Builds',
      'Robust Microservices & REST/GraphQL APIs',
      'TypeScript Type-Safe Architecture',
      'Bi-Weekly Milestone Demonstrations',
    ],
    metrics: 'Phase 03 • Bi-Weekly Agile Sprints',
    tag: 'Build',
  },
  {
    id: 4,
    badge: 'Step 04',
    phase: 'Quality Assurance',
    title: 'Quality Assurance (QA)',
    shortDesc:
      'Rigorous automated unit testing, multi-browser validation, cross-device responsiveness audits, and bank-grade OWASP security checks ensure flawless stability and performance.',
    icon: CheckCircle2,
    deliverables: [
      'Lighthouse 95+ Core Web Vitals Auditing',
      'End-to-End Automated Regression Testing',
      'OWASP Security & Vulnerability Auditing',
      'Cross-Device & Cross-Browser Verification',
    ],
    metrics: 'Phase 04 • Zero-Compromise Testing',
    tag: 'Testing',
  },
  {
    id: 5,
    badge: 'Step 05',
    phase: 'Secure Deployment',
    title: 'Secure Deployment',
    shortDesc:
      'Zero-downtime automated deployment pipelines, enterprise SSL certificates, edge CDN caching, and production secret vault configuration for an effortless and secure global launch.',
    icon: Rocket,
    deliverables: [
      'Automated CI/CD Deployment Pipelines',
      'Global Edge CDN & Cloud Hosting Setup',
      'Zero-Downtime Migration & Rollback Guard',
      'Real-Time Telemetry & Error Alerting',
    ],
    metrics: 'Phase 05 • Zero-Downtime Launch',
    tag: 'Deploy',
  },
  {
    id: 6,
    badge: 'Step 06',
    phase: 'Support & Evolution',
    title: 'Support & Evolution',
    shortDesc:
      'Our relationship continues post-launch with 24/7 uptime monitoring, regular security updates, automated database backups, and dedicated monthly feature enhancement sprints.',
    icon: RefreshCw,
    deliverables: [
      '24/7 SLA Uptime & Server Monitoring',
      'Automated Backups & Disaster Recovery',
      'Proactive Security Patches & Upgrades',
      'Continuous Feature Iteration Sprints',
    ],
    metrics: 'Phase 06 • Long-Term SLA Partner',
    tag: 'Support',
  },
];

// ============================================================================
// MAIN COMPONENT — REFERENCE-INSPIRED MINIMAL HOVER CARDS
// ============================================================================

export default function ProjectProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <>
      <section
        id="process"
        aria-label="From Concept to Scale: Our 6-Step Approach"
        className="relative isolate w-full overflow-hidden border-y border-slate-200 bg-gradient-to-br from-[#F7FAFF] via-white to-[#EFFAF7] py-16 sm:py-20 lg:py-24"
      >
        {/* Subtle AVM Smart atmosphere — white, blue and green */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 top-[-7rem] h-[24rem] w-[24rem] rounded-full bg-[#087FF5]/[0.08] blur-3xl" />
          <div className="absolute -right-24 bottom-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[#13B89A]/[0.09] blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Heading row — short and spacious like the reference */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 grid grid-cols-1 gap-5 md:mb-14 md:grid-cols-2 md:items-start md:gap-10 lg:mb-16"
          >
            <div>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#0B2A5B] sm:text-4xl lg:text-[3.35rem]">
                From Concept to Scale: Our
                <span className="block">6-Step Approach</span>
              </h2>
            </div>
            <p className="max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8 md:pt-1">
              We’ve found that the best software comes from the best partnerships. Here’s how we work with you as a trusted software development company.
            </p>
          </motion.div>

          {/* Desktop: six horizontal cards; hover expands only the selected card */}
          <div
            className="hidden h-[400px] w-full items-stretch overflow-hidden rounded-[18px] border border-[#0B2A5B]/10 shadow-[0_24px_70px_rgba(11,42,91,0.13)] lg:flex xl:h-[450px]"
            onMouseLeave={() => setActiveStep(0)}
          >
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const StepIcon = step.icon;

              return (
                <motion.article
                  key={step.id}
                  layout
                  onMouseEnter={() => setActiveStep(idx)}
                  onFocus={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  tabIndex={0}
                  aria-expanded={isActive}
                  transition={{
                    layout: { type: 'spring', stiffness: 190, damping: 26 },
                  }}
                  className={`group relative flex min-w-0 cursor-pointer flex-col justify-between overflow-hidden outline-none transition-colors duration-500 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#087FF5] ${
                    isActive
                      ? 'flex-[3.2] bg-white text-[#0B2A5B]'
                      : 'flex-1 border-l border-white/15 bg-gradient-to-b from-[#0B2A5B] to-[#124A76] text-white hover:from-[#0B3766] hover:to-[#126B82]'
                  }`}
                >
                  {/* Grid texture appears on the active card, like the reference */}
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(8,127,245,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(8,127,245,0.055)_1px,transparent_1px)] [background-size:34px_34px]"
                    />
                  )}

                  {/* Top step pill — visible on every card */}
                  <div className="relative z-10 p-5 sm:p-6 xl:p-7">
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#087FF5] to-[#13B89A] text-white'
                          : 'bg-white text-[#0B2A5B]'
                      }`}
                    >
                      Step {step.id}
                    </span>
                  </div>

                  {/* Only the selected card reveals its short description */}
                  <div className={`relative z-10 mt-auto p-5 sm:p-6 xl:p-7 ${isActive ? '' : 'flex h-full flex-col justify-end'}`}>
                    <AnimatePresence mode="wait" initial={false}>
                      {isActive ? (
                        <motion.div
                          key={`active-content-${step.id}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.24, ease: 'easeOut' }}
                        >
                          <h3 className="max-w-[520px] text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#0B2A5B] xl:text-[1.7rem]">
                            {step.title}
                          </h3>
                          <p className="mt-3 max-w-[520px] text-sm leading-6 text-slate-700 xl:text-base xl:leading-7">
                            {step.shortDesc}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key={`compact-title-${step.id}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="max-w-full text-base font-semibold leading-snug text-white xl:text-lg"
                        >
                          {step.title}
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Mobile/tablet: simple selectable cards, no extra deliverables */}
          <div className="grid grid-cols-1 gap-3 lg:hidden sm:grid-cols-2">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <motion.button
                  key={step.id}
                  type="button"
                  layout
                  onClick={() => setActiveStep(idx)}
                  aria-expanded={isActive}
                  className={`relative min-w-0 overflow-hidden rounded-2xl border p-5 text-left shadow-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'border-[#087FF5]/40 bg-white shadow-[0_14px_36px_rgba(8,127,245,0.12)]'
                      : 'border-slate-200 bg-gradient-to-br from-[#0B2A5B] to-[#124A76] text-white'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(8,127,245,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(8,127,245,0.05)_1px,transparent_1px)] [background-size:28px_28px]"
                    />
                  )}
                  <span
                    className={`relative inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                      isActive
                        ? 'bg-gradient-to-r from-[#087FF5] to-[#13B89A] text-white'
                        : 'bg-white text-[#0B2A5B]'
                    }`}
                  >
                    Step {step.id}
                  </span>
                  <div className="relative mt-8">
                    <h3 className={`text-lg font-semibold leading-snug ${isActive ? 'text-[#0B2A5B]' : 'text-white'}`}>
                      {step.title}
                    </h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: 8 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: 6 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden pt-3 text-sm leading-6 text-slate-600"
                        >
                          {step.shortDesc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
