"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {
  Users,
  Search,
  Layout,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Smartphone,
  Laptop,
  Database,
  Server,
  Layers,
  Terminal,
  Cpu,
  Zap,
  Globe,
  Lock,
  Boxes,
  HelpCircle,
  MessageSquare,
  Calendar,
  Code,
  Shield,
  Cloud,
} from "lucide-react";

// ==========================================
// DATA CONFIGURATIONS
// ==========================================

const STEPS = [
  {
    id: 1,
    title: "Requirement Gathering",
    icon: Users,
    subtitle: "Understanding your vision, business scope & core targets.",
    tags: ["Scope Definition", "User Personas", "Milestones"],
    details: [
      "Business goals alignment",
      "Target audience profiling",
      "Budget & timeline estimates",
      "Core feature matrix & prioritization",
    ],
    type: "requirements",
  },
  {
    id: 2,
    title: "Research & Planning",
    icon: Search,
    subtitle: "Architecting a future-proof roadmap and data schema.",
    tags: ["Market Analysis", "System Design", "Tech Stack"],
    details: [
      "Competitor landscape & UX benchmarks",
      "Scalable system & database planning",
      "Tech stack strategy selection",
      "API & third-party integration mapping",
    ],
    type: "research",
  },
  {
    id: 3,
    title: "Wireframing & Logic",
    icon: Layout,
    subtitle: "Laying down structural blueprints & interactive user flows.",
    tags: ["Low-Fi UX", "Information Architecture", "User Journeys"],
    details: [
      "Structural wireframe blueprints",
      "Information architecture mapping",
      "User path & logic optimization",
      "Clickable low-fidelity prototypes",
    ],
    type: "wireframe",
  },
  {
    id: 4,
    title: "UI / UX Design",
    icon: Palette,
    subtitle: "Crafting modern, pixel-perfect, and high-converting visual UIs.",
    tags: ["Design System", "Figma", "Glassmorphism", "Micro-Interactions"],
    details: [
      "Custom high-fidelity UI screens",
      "Interactive Figma prototypes",
      "Design token system & dark mode guidelines",
      "Responsive layout & fluid typography",
    ],
    type: "ui",
  },
  {
    id: 5,
    title: "Agile Development",
    icon: Code2,
    subtitle: "Engineering high-performance, clean code across frontend & backend.",
    tags: ["Next.js 16", "Spring Boot", "TypeScript", "REST/GraphQL"],
    details: [], // Handled dynamically by custom multi-tier card layout
    type: "development",
  },
  {
    id: 6,
    title: "Rigorous QA & Testing",
    icon: CheckCircle2,
    subtitle: "Zero-compromise security, performance, and cross-device testing.",
    tags: ["Automated QA", "Pen-Testing", "Core Web Vitals"],
    details: [
      "Cross-browser & multi-device responsiveness",
      "Lighthouse 95+ performance optimization",
      "Automated unit & integration tests",
      "Vulnerability scan & OWASP security audits",
    ],
    type: "testing",
  },
  {
    id: 7,
    title: "Deployment & Launch",
    icon: Rocket,
    subtitle: "Seamless automated deployment with zero-downtime architecture.",
    tags: ["CI/CD Pipeline", "Edge Hosting", "SSL & DNS"],
    details: [
      "Production CI/CD deployment pipelines",
      "SSL, domain DNS, & edge caching",
      "Environment isolation & secret vault management",
      "Real-time launch day telemetry monitoring",
    ],
    type: "deployment",
  },
  {
    id: 8,
    title: "Maintenance & SLA",
    icon: ShieldCheck,
    subtitle: "Long-term security updates, monitoring, and feature iteration.",
    tags: ["24/7 Uptime", "Automated Backups", "SLA Support"],
    details: [
      "Proactive security patches & dependency updates",
      "Automated daily database backups",
      "Performance & error reporting (Sentry)",
      "Agreement-based SLA & feature enhancement sprints",
    ],
    type: "maintenance",
  },
];

const TECHNOLOGIES = [
  { name: "React 19", category: "Frontend", icon: Code },
  { name: "Next.js 16", category: "Framework", icon: Zap },
  { name: "TypeScript", category: "Language", icon: Terminal },
  { name: "Tailwind CSS", category: "Styling", icon: Palette },
  { name: "Java", category: "Backend", icon: Cpu },
  { name: "Spring Boot", category: "Enterprise", icon: Server },
  { name: "Node.js", category: "Runtime", icon: Layers },
  { name: "Express", category: "API", icon: Code2 },
  { name: "MongoDB", category: "NoSQL DB", icon: Database },
  { name: "PostgreSQL", category: "SQL DB", icon: Database },
  { name: "Docker", category: "DevOps", icon: Boxes },
  { name: "AWS", category: "Cloud", icon: Cloud },
  { name: "Firebase", category: "BaaS", icon: Zap },
  { name: "Vercel", category: "Edge", icon: Globe },
  { name: "GitHub", category: "VCS", icon: Lock },
];

const FAQS = [
  {
    q: "How long does a complete custom project development take?",
    a: "Timeline depends on scope. Standard web applications take around 4 to 8 weeks, while complex enterprise platforms or native mobile applications range from 8 to 14 weeks. We follow strict bi-weekly milestone deliverables.",
  },
  {
    q: "How much does a custom software development project cost?",
    a: "Every project is tailored specifically to your requirements. We offer fixed-scope pricing for defined deliverables, as well as monthly dedicated engineering team sprints. Schedules and budget matrices are defined in Step 1.",
  },
  {
    q: "Will I completely own the source code and IP?",
    a: "Yes, 100%. Upon final sign-off and deployment, full IP rights, GitHub repositories, design systems, and cloud credentials are completely transferred over to your organization.",
  },
  {
    q: "Do you provide post-launch maintenance and SLA support?",
    a: "Absolutely. We offer long-term SLA maintenance tiers covering 24/7 uptime monitoring, critical security patching, performance tuning, and continuous monthly feature iterations.",
  },
  {
    q: "Can I request revisions during the design and development phases?",
    a: "Yes. Our workflow includes structured review gates after Wireframing (Step 3), UI Design (Step 4), and Milestone Sprints (Step 5). Revisions inside project scope are executed iteratively.",
  },
  {
    q: "How are milestone payments structured?",
    a: "We work on milestone-based billing (e.g., 25% kickoff, 25% UI signoff, 25% beta build, 25% deployment). This ensures complete transparency and accountability at every milestone.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function ProjectProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Scroll Progress Tracking for the Central Zig-Zag Path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const pathLength = useTransform(smoothProgress, [0.08, 0.9], [0, 1]);

  const scrollToRoadmap = () => {
    const el = document.getElementById("roadmap-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-100 font-sans antialiased overflow-hidden selection:bg-[#7C3AED] selection:text-white relative">
      {/* GLOBAL AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#7C3AED]/20 via-[#7C3AED]/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#7C3AED]/15 blur-[160px] rounded-full" />
        {/* Fine Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        {/* ==========================================
            HERO SECTION
           ========================================== */}
        <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-[#7C3AED]/40 backdrop-blur-md shadow-[0_0_20px_rgba(124,58,237,0.25)] mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              End-to-End Engineering Methodology
            </span>
          </motion.div>

          {/* Large Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1]"
          >
            Let's Build Your <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#7C3AED] via-purple-400 to-[#F59E0B] bg-clip-text text-transparent drop-shadow-sm">
              Dream Digital Product
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl leading-relaxed"
          >
            Explore our transparent, battle-tested software engineering journey. 
            From initial logic wireframes to scalable cloud deployment, see how we convert ideas into high-converting digital platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => alert("Consultation modal triggered")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-600 hover:to-[#7C3AED] text-white font-bold text-base shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              <span>Start Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToRoadmap}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-semibold text-base backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/80 flex items-center justify-center gap-2"
            >
              <span>View Process Roadmap</span>
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </button>
          </motion.div>

          {/* INTERACTIVE DEVICE HERO ILLUSTRATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-16 w-full max-w-4xl relative"
          >
            {/* Background Halo */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/30 via-amber-500/10 to-purple-600/30 blur-3xl rounded-3xl -z-10" />

            <div className="p-6 sm:p-10 rounded-3xl bg-slate-950/80 border border-white/10 shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-white/5">
                  process_architecture_v2.1.tsx
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#F59E0B] font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  <Zap className="w-3 h-3" /> Live Blueprint
                </div>
              </div>

              {/* Animated Desktop & Mobile Layout Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Desktop Mockup View */}
                <div className="md:col-span-8 p-4 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg relative group-hover:border-[#7C3AED]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs">
                    <Laptop className="w-4 h-4 text-[#7C3AED]" />
                    <span>Responsive Web Platform</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded-md bg-slate-800 animate-pulse" />
                    <div className="h-20 rounded-xl bg-gradient-to-r from-[#7C3AED]/20 to-purple-900/20 border border-[#7C3AED]/30 p-3 flex items-center justify-between">
                      <div className="space-y-1.5">
                        <div className="h-3 w-32 bg-slate-700 rounded" />
                        <div className="h-2 w-20 bg-slate-800 rounded" />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center text-white font-bold text-xs">
                        99%
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 rounded-lg bg-slate-800/80" />
                      <div className="h-12 rounded-lg bg-slate-800/80" />
                      <div className="h-12 rounded-lg bg-slate-800/80" />
                    </div>
                  </div>
                </div>

                {/* Mobile Mockup View */}
                <div className="md:col-span-4 p-4 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg relative group-hover:border-[#F59E0B]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs">
                    <Smartphone className="w-4 h-4 text-[#F59E0B]" />
                    <span>Native iOS / Android</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-3 w-1/2 bg-slate-800 rounded" />
                    <div className="h-28 rounded-xl bg-slate-800/60 border border-white/5 p-3 flex flex-col justify-between">
                      <div className="w-6 h-6 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 w-full bg-slate-700 rounded" />
                        <div className="h-2 w-2/3 bg-slate-700 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Glass Shapes */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-12 right-6 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-[11px] font-mono text-amber-300 shadow-xl hidden sm:flex items-center gap-2 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Sprint Active: Step 05
              </motion.div>
            </div>
          </motion.div>

          {/* Animated Scroll Down Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={scrollToRoadmap}
            className="mt-14 cursor-pointer flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest font-mono">Scroll To Explore</span>
            <ChevronDown className="w-4 h-4 text-[#7C3AED]" />
          </motion.div>
        </section>

        {/* ==========================================
            ROADMAP FEATURE SECTION (ZIG-ZAG)
           ========================================== */}
        <section
          id="roadmap-section"
          ref={containerRef}
          className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
            <h2 className="text-xs font-mono tracking-widest text-[#F59E0B] uppercase font-bold mb-3">
              // Step-By-Step Execution
            </h2>
            <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              An Interactive Engineering Roadmap
            </p>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Every phase is designed to minimize risk, accelerate velocity, and deliver enterprise-grade performance.
            </p>
          </div>

          {/* MAIN TIMELINE WRAPPER */}
          <div className="relative">
            {/* DESKTOP ZIG-ZAG ANIMATED SVG PATH (Lg Screens) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 2400"
                fill="none"
                preserveAspectRatio="xMidYMin slice"
              >
                {/* Background Dim Guide Path */}
                <path
                  d="M 500,60 
                     C 500,160 820,180 820,320 
                     C 820,460 180,480 180,620 
                     C 180,760 820,780 820,920 
                     C 820,1060 180,1080 180,1220 
                     C 180,1360 820,1380 820,1520 
                     C 820,1660 180,1680 180,1820 
                     C 180,1960 500,1980 500,2120"
                  stroke="#27272A"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />

                {/* Scroll-Driven Animated Glowing Path */}
                <motion.path
                  d="M 500,60 
                     C 500,160 820,180 820,320 
                     C 820,460 180,480 180,620 
                     C 180,760 820,780 820,920 
                     C 820,1060 180,1080 180,1220 
                     C 180,1360 820,1380 820,1520 
                     C 820,1660 180,1680 180,1820 
                     C 180,1960 500,1980 500,2120"
                  stroke="url(#purpleGlowGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ pathLength }}
                />

                <defs>
                  <linearGradient id="purpleGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* MOBILE & TABLET VERTICAL TIMELINE LINE */}
            <div className="block lg:hidden absolute left-6 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7C3AED] via-[#F59E0B] to-[#7C3AED] opacity-30 -translate-x-1/2" />

            {/* ROADMAP STEPS GRID */}
            <div className="space-y-16 sm:space-y-24 relative z-20">
              {STEPS.map((step, index) => {
                const isEven = index % 2 === 1;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 50, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, delay: index * 0.05 }}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${
                      isEven ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* STEP CARD */}
                    <div className="w-full lg:w-[46%]">
                      <div className="group relative p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-white/10 hover:border-[#7C3AED]/50 transition-all duration-500 shadow-2xl backdrop-blur-xl hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]">
                        {/* Top Badge Info */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300 shadow-md">
                              <StepIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-[11px] font-mono tracking-wider text-[#F59E0B] uppercase font-bold">
                                Phase 0{step.id}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <span className="text-3xl font-extrabold font-mono text-slate-800 group-hover:text-purple-500/20 transition-colors">
                            0{step.id}
                          </span>
                        </div>

                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                          {step.subtitle}
                        </p>

                        {/* CUSTOM STEP CONTENT INJECTIONS */}
                        {step.type === "development" ? (
                          /* Custom Split Card for Development Phase */
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
                              <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED] mb-2">
                                <Laptop className="w-4 h-4" /> Frontend Stack
                              </div>
                              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                                <li className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> React 19 / Next.js 16
                                </li>
                                <li className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Tailwind CSS v4
                                </li>
                                <li className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Framer Motion UI
                                </li>
                              </ul>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
                              <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B] mb-2">
                                <Server className="w-4 h-4" /> Backend & DB
                              </div>
                              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                                <li className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Java / Spring Boot
                                </li>
                                <li className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Node.js & REST APIs
                                </li>
                                <li className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> MongoDB / Postgres
                                </li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          /* Standard Details List */
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                            {step.details.map((detail, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-xl border border-white/5"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tags Footnote */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                          {step.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-white/5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CENTRAL NODE INDICATOR (Desktop centered) */}
                    <div className="hidden lg:flex w-[8%] justify-center items-center relative">
                      <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-[#7C3AED] flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] z-20 font-bold font-mono text-sm">
                        0{step.id}
                      </div>
                    </div>

                    {/* EMPTY BALANCING COLUMN FOR DESKTOP */}
                    <div className="hidden lg:block w-[46%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            TECHNOLOGIES MARQUEE SECTION
           ========================================== */}
        <section className="py-20 border-y border-white/10 bg-slate-950/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
            <h3 className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest font-bold">
              // Modern Tech Ecosystem
            </h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Powered By Enterprise Standards
            </p>
          </div>

          {/* Marquee Track */}
          <div className="flex overflow-hidden space-x-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex space-x-6 shrink-0"
            >
              {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => {
                const TechIcon = tech.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-slate-200 text-sm font-semibold shrink-0 shadow-lg hover:border-[#7C3AED]/50 transition-colors"
                  >
                    <TechIcon className="w-4 h-4 text-[#7C3AED]" />
                    <span>{tech.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                      {tech.category}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            FAQ ACCORDION SECTION
           ========================================== */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-amber-400 mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Everything You Need To Know
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-950 border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 text-slate-200 hover:text-white font-semibold text-base sm:text-lg"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#7C3AED] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm sm:text-base text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            FINAL CTA SECTION
           ========================================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 border border-[#7C3AED]/40 p-8 sm:p-16 text-center overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.2)]">
            {/* Background Accent Mesh */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7C3AED]/30 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                Ready To Launch?
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-6 tracking-tight">
                Ready to Build Your Next Digital Product?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mb-10 leading-relaxed">
                Let's transform your vision into a scalable, high-converting digital platform with our enterprise engineering squad.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => alert("Redirecting to contact form")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-600 hover:to-[#7C3AED] text-white font-bold text-base shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Contact Our Engineering Team</span>
                </button>

                <button
                  onClick={() => alert("Opening calendar modal")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-white/20 hover:border-white/40 text-white font-semibold text-base transition-all duration-300 hover:bg-slate-800 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5 text-[#F59E0B]" />
                  <span>Book Free Discovery Call</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}