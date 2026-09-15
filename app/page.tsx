'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  METRICS,
  SERVICES,
  PORTFOLIO,
  BLOG_POSTS,
  TESTIMONIALS,
} from '@/data/siteData';
import {
  Globe,
  Smartphone,
  TrendingUp,
  Cloud,
  Palette,
  Users,
  ArrowRight,
  Star,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  Rocket,
  CheckCircle2,
  Sparkles,
  User,
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

const serviceIconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-7 h-7" />,
  Smartphone: <Smartphone className="w-7 h-7" />,
  TrendingUp: <TrendingUp className="w-7 h-7" />,
  Cloud: <Cloud className="w-7 h-7" />,
  Palette: <Palette className="w-7 h-7" />,
  Users: <Users className="w-7 h-7" />,
};

export default function HomePage() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPortfolio =
    activeCategory === 'All'
      ? PORTFOLIO.slice(0, 3)
      : PORTFOLIO.filter((p) => p.category === activeCategory);

  // Duplicate testimonials array for smooth infinite marquee looping
  const marqueeTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="w-full bg-[#F4F7FA] text-slate-900 font-sans selection:bg-[#087FF5] selection:text-white overflow-x-hidden">
      
      {/* 1. SEAMLESS CORPORATE HERO SECTION - INTEGRATED BACKGROUND & NO ISOLATED BOX */}
      <section className="relative bg-[#0B1528] text-white pt-8 pb-16 lg:py-24 overflow-hidden border-b border-slate-800">
        
        {/* Subtle Ambient Color Beams */}
        <div className="pointer-events-none absolute -top-24 -left-20 w-[500px] h-[500px] bg-[#087FF5]/20 blur-[150px] rounded-full z-0" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#13B89A]/15 blur-[140px] rounded-full z-0" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-[500px] h-[500px] bg-[#FF6A00]/15 blur-[160px] rounded-full z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT-SIDE EDITORIAL CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#087FF5] animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-[#13B89A]"></span>
                <span className="w-2 h-2 rounded-full bg-[#FF6A00]"></span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
                  AVM SMART SOLUTIONS
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                <span className="text-white block">Digital Solutions for</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00]">
                  Real Business Growth
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                We build high-performance websites, enterprise mobile applications, and scalable digital solutions that help businesses work smarter, operate efficiently, and compete with confidence.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setProjectModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] bg-[length:200%_auto] hover:bg-right text-white font-black text-sm rounded-xl shadow-lg hover:shadow-[#087FF5]/40 transition-all duration-500 flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Start a Project</span>
                  <Rocket className="w-4 h-4" />
                </button>

                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl border border-white/20 hover:border-white/40 transition-all backdrop-blur-md flex items-center gap-2"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Integrated Metrics Row */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {METRICS.map((metric, idx) => {
                  const borderColors = ['border-[#087FF5]', 'border-[#13B89A]', 'border-[#FF6A00]', 'border-[#087FF5]'];
                  return (
                    <div key={idx} className={`border-l-3 ${borderColors[idx]} pl-3`}>
                      <p className="text-2xl sm:text-3xl font-black text-white">{metric.value}</p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{metric.label}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT-SIDE SEAMLESS BACKGROUND-BLENDED HERO IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] overflow-hidden rounded-3xl group">
                
                {/* Seamless Edge Gradient Blend Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B1528] via-transparent to-transparent opacity-90 pointer-events-none" />

                {/* Scaled Office Image */}
                <Image
                  src="/avm-hero-office.jpg"
                  alt="AVM Smart Solutions Engineering Team and Incubation Headquarters"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Achievement Accent Pill */}
                <div className="absolute bottom-6 left-6 right-6 z-20 p-4 rounded-2xl bg-[#0B1528]/85 border border-white/15 backdrop-blur-xl flex items-center justify-between text-white shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#087FF5] to-[#13B89A] flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-slate-300">Incubation Center</p>
                      <p className="text-sm font-bold text-white">G Pulla Reddy Engineering College</p>
                    </div>
                  </div>
                  <span className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-[#13B89A] bg-[#13B89A]/20 px-3 py-1 rounded-full border border-[#13B89A]/30">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES SECTION - VIBRANT 3-COLOR CARDS */}
      <section className="py-20 bg-[#F4F7FA] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#087FF5]/10 text-[#087FF5] text-xs font-black uppercase tracking-widest rounded-full mb-3 border border-[#087FF5]/20">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Our Services</h2>
            <p className="text-slate-600 text-base sm:text-lg">
              End-to-end digital engineering designed to turn your enterprise vision into high-performing products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => {
              const cardThemes = [
                {
                  borderTop: 'border-t-4 border-t-[#087FF5]',
                  iconBg: 'bg-[#087FF5] text-white',
                  badgeBg: 'bg-[#087FF5]/10 text-[#087FF5]',
                  hoverGlow: 'hover:shadow-[#087FF5]/20',
                  btnColor: 'text-[#087FF5] hover:text-blue-700',
                },
                {
                  borderTop: 'border-t-4 border-t-[#13B89A]',
                  iconBg: 'bg-[#13B89A] text-white',
                  badgeBg: 'bg-[#13B89A]/10 text-[#13B89A]',
                  hoverGlow: 'hover:shadow-[#13B89A]/20',
                  btnColor: 'text-[#13B89A] hover:text-teal-700',
                },
                {
                  borderTop: 'border-t-4 border-t-[#FF6A00]',
                  iconBg: 'bg-[#FF6A00] text-white',
                  badgeBg: 'bg-[#FF6A00]/10 text-[#FF6A00]',
                  hoverGlow: 'hover:shadow-[#FF6A00]/20',
                  btnColor: 'text-[#FF6A00] hover:text-orange-700',
                },
              ];

              const theme = cardThemes[idx % 3];

              return (
                <div
                  key={service.id}
                  className={`group bg-white rounded-3xl border border-slate-200/80 ${theme.borderTop} p-8 shadow-md ${theme.hoverGlow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        {serviceIconMap[service.iconName]}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg}`}>
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-[#087FF5] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={`/services/${service.slug}`}
                      className={`inline-flex items-center text-sm font-black gap-2 transition-colors ${theme.btnColor}`}
                    >
                      <span>Explore Capabilities</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-3.5 bg-[#0B1528] hover:bg-slate-900 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-slate-900/30 transition-all"
            >
              <span>View All Services & Capabilities</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PARTNER WITH US SECTION - SOFT BLUE TINT & ACCENTED CARDS */}
      <section className="py-20 bg-[#EFF6FF] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#13B89A]/10 text-[#13B89A] text-xs font-black uppercase tracking-widest rounded-full mb-3 border border-[#13B89A]/20">
              Strategic Growth Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Why Partner With AVM Smart</h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We bring engineering precision, speed, and continuous support to ensure your business digital solutions scale effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white rounded-3xl border-2 border-[#087FF5]/30 shadow-md hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#087FF5] text-white flex items-center justify-center font-bold shadow-md">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Client-Centered Strategy</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Custom engineering roadmaps tailored around your exact business goals and user expectations.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border-2 border-[#13B89A]/30 shadow-md hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#13B89A] text-white flex items-center justify-center font-bold shadow-md">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Cutting-Edge Tech Stack</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Built on next-gen frameworks like Next.js 16, React 19, Spring Boot, AWS, and MongoDB architectures.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border-2 border-[#FF6A00]/30 shadow-md hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6A00] text-white flex items-center justify-center font-bold shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">On-Time Milestones</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Agile sprint workflows ensuring on-schedule delivery, continuous testing, and zero-downtime launches.
              </p>
            </div>

            <div className="p-8 bg-[#0B1528] text-white rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#087FF5] to-[#13B89A] text-white flex items-center justify-center font-bold shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">24/7 Dedicated Support</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Long-term application maintenance, security compliance updates, and continuous cloud scalability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK SECTION */}
      <section className="py-20 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#087FF5] mb-2 block">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Featured Work</h2>
            <p className="text-slate-600 text-base sm:text-lg">A few of our recent successful enterprise projects.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {['All', 'Websites', 'Mobile Apps', 'Platforms'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 text-xs font-extrabold rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#087FF5] to-[#13B89A] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 bg-[#0B1528]/90 backdrop-blur-md text-white text-xs font-black rounded-full border border-white/10">
                    {item.category}
                  </div>
                </div>
                <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-[#087FF5] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="inline-flex items-center text-sm font-black text-[#087FF5] hover:text-blue-700 gap-1.5"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLIENT REVIEWS SECTION - NEUTRAL AVATAR & MARQUEE QUEUE (PAUSE ON HOVER) */}
      <section className="py-20 bg-[#0B1528] text-white border-y border-slate-800 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#13B89A] mb-2 block">
            Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">What Our Clients Say</h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">Hover over any review card to pause scrolling.</p>
        </div>

        {/* Marquee Container with Group Hover Pause */}
        <div className="relative w-full overflow-hidden group py-4">
          
          {/* Left/Right Fade Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0B1528] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0B1528] to-transparent z-10 pointer-events-none" />

          {/* Marquee Row */}
          <div className="animate-marquee gap-6">
            {marqueeTestimonials.map((testimonial, idx) => {
              const borderAccents = ['border-l-4 border-l-[#087FF5]', 'border-l-4 border-l-[#13B89A]', 'border-l-4 border-l-[#FF6A00]'];
              const accentClass = borderAccents[idx % 3];

              return (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className={`w-[320px] sm:w-[380px] shrink-0 bg-slate-900/90 border border-slate-800 ${accentClass} p-6 sm:p-7 rounded-3xl shadow-xl hover:scale-102 hover:border-slate-700 transition-all duration-300 space-y-4 cursor-pointer`}
                >
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#FFC21A]">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#FFC21A]" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-slate-200 text-xs sm:text-sm italic leading-relaxed line-clamp-3">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Neutral Profile Avatar Icon */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                      <User className="w-5 h-5 text-[#087FF5]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{testimonial.name}</h4>
                      <p className="text-[11px] font-bold text-[#13B89A]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. LATEST INSIGHTS (BLOG) */}
      <section className="py-20 bg-[#ECFDF5]/50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#13B89A] mb-2 block">
                Industry Knowledge
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Latest Insights</h2>
            </div>
            <Link
              href="/blog"
              className="mt-4 md:mt-0 text-sm font-black text-[#13B89A] hover:text-teal-700 flex items-center gap-1"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div key={post.id} className="rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
                <div>
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-bold text-[#087FF5] uppercase">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 line-clamp-2 hover:text-[#087FF5] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-black text-[#087FF5] hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER */}
      <section className="bg-gradient-to-r from-[#0B1528] via-[#1E293B] to-[#0B1528] text-white py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Ready to Take the Next Step?</h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Let&apos;s discuss how AVM Smart Solutions can help your business build custom websites, applications, and scalable digital products.
          </p>
          <div>
            <button
              onClick={() => setProjectModalOpen(true)}
              className="px-9 py-4 bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] bg-[length:200%_auto] hover:bg-right text-white font-black text-sm rounded-xl shadow-xl hover:shadow-[#087FF5]/40 transition-all duration-500 transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>Start a Project</span>
              <Rocket className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Global Project Modal */}
      <QuoteModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}