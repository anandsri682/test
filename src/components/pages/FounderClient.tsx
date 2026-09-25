'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Code,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Users,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
} from 'lucide-react';
import { FaLinkedin, FaGithub, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa6';
import QuoteModal from '@/components/QuoteModal';

export default function FounderClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const SKILLS = [
    'React & Next.js Architecture',
    'Full Stack Engineering',
    'Java & Spring Boot Backends',
    'Node.js & REST API Systems',
    'TypeScript & Tailwind CSS',
    'Mobile App Architecture',
    'Cloud & DevOps Deployment',
    'UI/UX & Systems Design',
    'Tech Education & Mentorship',
  ];

  const CONTENT_TOPICS = [
    { title: 'Programming & Web Development', desc: 'Modern web frameworks, JavaScript, TypeScript, Next.js, and clean software architecture.' },
    { title: 'Software Engineering Practices', desc: 'Backend microservices, REST APIs, database design, and cloud deployment pipelines.' },
    { title: 'Startup & Tech Business Awareness', desc: 'Digital transformation strategies, technology adoption for businesses, and MVP development.' },
    { title: 'Student & Developer Guidance', desc: 'Career advice, tech stack selection, practical coding tutorials, and industry insights.' },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-x-hidden min-h-screen">
      
      {/* ============================================================
          HERO SECTION
      ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061B3A] via-[#0B2A5B] to-[#0A1E3F] text-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
        
        {/* LIGHTING GLOWS */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT PROFILE CONTENT */}
            <motion.div
              className="lg:col-span-7 space-y-6 text-left"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* EYEBROW BADGE */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#087FF5]" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  FOUNDER PROFILE
                </span>
              </div>

              {/* MAIN NAME */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                A. Anand Raju
              </h1>

              {/* DESIGNATION */}
              <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#087FF5] via-emerald-400 to-amber-300 bg-clip-text text-transparent">
                Founder & CEO — AVM Smart Solutions
              </p>

              {/* SHORT INTRODUCTION */}
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl">
                A. Anand Raju is the Founder & CEO of AVM Smart Solutions, a technology startup focused on web development, mobile applications, digital solutions, software development, digital marketing, and customized technology solutions for businesses.
              </p>

              {/* KEY IDENTITIES */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-semibold text-slate-200">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 border border-white/10 backdrop-blur-xs">
                  <Briefcase className="h-3.5 w-3.5 text-[#087FF5]" /> Technology Entrepreneur
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 border border-white/10 backdrop-blur-xs">
                  <Code className="h-3.5 w-3.5 text-emerald-400" /> Software Developer
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 border border-white/10 backdrop-blur-xs">
                  <FaYoutube className="h-3.5 w-3.5 text-red-500" /> YouTube Content Creator
                </span>
              </div>

              {/* SOCIAL ACTION BUTTONS */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-[#087FF5] px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-[#066FD6] transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>AVM Smart Solutions</span>
                </Link>

                <a
                  href="https://www.linkedin.com/in/arekanti-anand-raju-2615a0377/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-white/10 p-2.5 text-white hover:bg-[#0A66C2] transition-colors border border-white/10"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>

                <a
                  href="https://github.com/anandsri682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-white/10 p-2.5 text-white hover:bg-slate-900 transition-colors border border-white/10"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="h-5 w-5" />
                </a>

                <a
                  href="https://youtube.com/@mr_anandtechintelugu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-white/10 p-2.5 text-white hover:bg-[#FF0000] transition-colors border border-white/10"
                  aria-label="YouTube Channel"
                >
                  <FaYoutube className="h-5 w-5" />
                </a>

                <a
                  href="https://instagram.com/techwithmranand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-white/10 p-2.5 text-white hover:bg-[#E4405F] transition-colors border border-white/10"
                  aria-label="Instagram Profile"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* RIGHT PORTRAIT IMAGE FRAME */}
            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-400/30 group">
                <Image
                  src="/images/profiles/anand.png"
                  alt="A. Anand Raju, Founder & CEO of AVM Smart Solutions"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061B3A] via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0B2A5B]/85 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-xs font-extrabold text-white">A. Anand Raju</div>
                  <div className="text-[11px] text-blue-300 font-semibold">Founder & CEO</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ============================================================
          SECTION 1: ABOUT A. ANAND RAJU
      ============================================================ */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#087FF5] text-xs font-extrabold uppercase tracking-widest rounded-full">
              ABOUT THE FOUNDER
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2A5B]">
              Building Technology Solutions for Real Business Growth
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A. Anand Raju is a technology entrepreneur, full-stack software engineer, and founder based in Andhra Pradesh, India. With a deep passion for modern web technologies, scalable mobile architecture, and digital transformation, he founded AVM Smart Solutions to deliver enterprise-grade software to businesses of all sizes.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              He combines technical expertise in Next.js, React, Java, Spring Boot, Node.js, and cloud systems with a practical understanding of business growth strategies. Under his leadership, AVM Smart Solutions has delivered tailored web applications, custom software platforms, and mobile apps for clients across multiple industries.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#087FF5]">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2A5B]">Entrepreneurship</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Founding and scaling AVM Smart Solutions to provide end-to-end software, web, and mobile app development services.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2A5B]">Full-Stack Engineering</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hands-on development of high-speed Next.js portals, RESTful APIs, Spring Boot microservices, and mobile apps.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <FaYoutube className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2A5B]">Content Creation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Creator of "Mr Anand Tech in Telugu", sharing practical programming, software development, and tech business education.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2A5B]">Team Leadership</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Guiding a talented team of full-stack engineers, UI/UX designers, and digital strategists at AVM Smart Solutions.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================
          SECTION 2: FOUNDER OF AVM SMART SOLUTIONS
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#087FF5] text-xs font-extrabold uppercase tracking-widest rounded-full">
              COMPANY LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2A5B]">
              Founder & CEO of AVM Smart Solutions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              AVM Smart Solutions was established to bridge the gap between complex software engineering and real business goals. As Founder & CEO, A. Anand Raju oversees company vision, technical architecture, and client success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-xs space-y-3">
              <CheckCircle className="h-6 w-6 text-[#087FF5]" />
              <h3 className="text-base font-bold text-[#0B2A5B]">Core Services Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Directing the development of 5-page to 50-page corporate websites, cross-platform mobile apps, e-commerce platforms, and custom management software.
              </p>
              <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FF5] hover:underline pt-2">
                <span>Explore Our Services</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-xs space-y-3">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <h3 className="text-base font-bold text-[#0B2A5B]">Quality & Security Standards</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Ensuring every digital product adheres to clean code standards, SSL encryption, fast Core Web Vitals performance, and mobile responsive design.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline pt-2">
                <span>Learn About AVM Smart</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-xs space-y-3">
              <Users className="h-6 w-6 text-purple-600" />
              <h3 className="text-base font-bold text-[#0B2A5B]">Engineering Leadership</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Mentoring developers and designers to build robust digital solutions with transparent communication and on-time project delivery.
              </p>
              <Link href="/team" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline pt-2">
                <span>Meet Our Team</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================
          SECTION 3 & 5: TECHNOLOGY, SOFTWARE DEVELOPMENT & SKILLS
      ============================================================ */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#087FF5] text-xs font-extrabold uppercase tracking-widest rounded-full">
              TECHNICAL EXPERTISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
              Technology & Software Architecture
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              As a full-stack engineer and tech architect, A. Anand Raju specializes in modern software engineering practices that prioritize speed, maintainability, and clean user interfaces.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Terminal className="h-5 w-5 text-[#087FF5] shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B2A5B]">Frontend Architecture</h3>
                  <p className="text-xs text-slate-500">React.js, Next.js App Router, TypeScript, Tailwind CSS, Framer Motion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B2A5B]">Backend & API Engineering</h3>
                  <p className="text-xs text-slate-500">Java, Spring Boot, Node.js, Express.js, RESTful Microservices, JWT Security.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Layers className="h-5 w-5 text-purple-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B2A5B]">Database & Cloud Platforms</h3>
                  <p className="text-xs text-slate-500">MongoDB, PostgreSQL, Render, Vercel, Firebase, AWS Cloud Services.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md space-y-4">
            <h3 className="text-xl font-black text-[#0B2A5B] flex items-center gap-2">
              <Award className="h-5 w-5 text-[#087FF5]" />
              Professional Skills & Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SKILLS.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs font-bold text-slate-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================
          SECTION 4: YOUTUBE / CONTENT CREATION (MR ANAND TECH IN TELUGU)
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-[#1A0505] via-[#2D0B0B] to-[#1A0505] text-white border-y border-red-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 backdrop-blur-md">
                <FaYoutube className="h-4 w-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-300">
                  TECHNOLOGY CONTENT CREATOR
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Mr Anand Tech in Telugu
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A. Anand Raju is also a technology content creator associated with the <strong className="text-white">Mr Anand Tech in Telugu</strong> YouTube channel, where he creates technology, programming, software development, startup, and digital-awareness content.
              </p>

              <p className="text-slate-300 text-sm leading-relaxed">
                Through practical coding breakdowns, software tutorials, and digital awareness guides, he helps students, aspiring software engineers, and small business owners understand modern technology tools and career pathways.
              </p>

              <div className="pt-2">
                <a
                  href="https://youtube.com/@mr_anandtechintelugu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-2.5 rounded-xl bg-[#FF0000] px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-red-700 transition-colors"
                >
                  <FaYoutube className="h-4 w-4" />
                  <span>Visit Mr Anand Tech in Telugu Channel</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-3">
              {CONTENT_TOPICS.map((topic, index) => (
                <div key={index} className="rounded-2xl border border-red-500/20 bg-white/5 p-4 backdrop-blur-sm space-y-1">
                  <div className="text-xs font-bold text-red-400 flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{topic.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal">{topic.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ============================================================
          SECTION 6: PROJECTS / WORK
      ============================================================ */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#087FF5] text-xs font-extrabold uppercase tracking-widest rounded-full">
            PORTFOLIO HIGHLIGHTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
            Work & Enterprise Projects
          </h2>
          <p className="text-slate-600 text-sm">
            A selection of software platforms and client solutions engineered under the technical direction of A. Anand Raju at AVM Smart Solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <span className="text-[10px] font-black uppercase text-[#087FF5] tracking-wider">Web Architecture</span>
            <h3 className="text-base font-extrabold text-[#0B2A5B]">Corporate Web Portals</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Responsive Next.js web applications built for business conversion, fast load speeds, and high search engine ranking.
            </p>
            <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FF5] hover:underline pt-2">
              <span>View Portfolio Cases</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider">Mobile Engineering</span>
            <h3 className="text-base font-extrabold text-[#0B2A5B]">Cross-Platform Mobile Apps</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              High-rating Android & iOS apps published on Google Play Store and Apple App Store with cloud database sync.
            </p>
            <Link href="/pricing/app-development" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline pt-2">
              <span>View Mobile App Plans</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Interactive Solutions</span>
            <h3 className="text-base font-extrabold text-[#0B2A5B]">Live Product Demos</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Custom e-commerce platforms, educational portals, and hostel management software demo environments.
            </p>
            <Link href="/demos" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline pt-2">
              <span>Explore Live Demos</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>


      {/* ============================================================
          SECTION 7: CONNECT / SOCIAL PROFILES
      ============================================================ */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Connect with A. Anand Raju
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Official public profiles and professional channels representing A. Anand Raju, Founder & CEO of AVM Smart Solutions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <a
              href="https://www.linkedin.com/in/arekanti-anand-raju-2615a0377/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-[#0A66C2] transition-all flex flex-col items-center gap-2 group"
            >
              <FaLinkedin className="h-6 w-6 text-[#0A66C2] group-hover:text-white transition-colors" />
              <span className="text-xs font-bold text-white">LinkedIn Profile</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-200">@arekanti-anand-raju</span>
            </a>

            <a
              href="https://github.com/anandsri682"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-slate-800 transition-all flex flex-col items-center gap-2 group"
            >
              <FaGithub className="h-6 w-6 text-slate-300 group-hover:text-white transition-colors" />
              <span className="text-xs font-bold text-white">GitHub Profile</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-200">@anandsri682</span>
            </a>

            <a
              href="https://youtube.com/@mr_anandtechintelugu"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-[#FF0000] transition-all flex flex-col items-center gap-2 group"
            >
              <FaYoutube className="h-6 w-6 text-red-500 group-hover:text-white transition-colors" />
              <span className="text-xs font-bold text-white">YouTube Channel</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-200">@mr_anandtechintelugu</span>
            </a>

            <a
              href="https://instagram.com/techwithmranand"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-[#E4405F] transition-all flex flex-col items-center gap-2 group"
            >
              <FaInstagram className="h-6 w-6 text-pink-500 group-hover:text-white transition-colors" />
              <span className="text-xs font-bold text-white">Instagram Profile</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-200">@techwithmranand</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              AVM Smart Solutions — Kurnool, Andhra Pradesh, India
            </div>

            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB800] px-6 py-2.5 text-xs font-bold text-slate-900 shadow-md hover:bg-[#E6A600] transition-colors"
            >
              <span>Contact AVM Smart</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
