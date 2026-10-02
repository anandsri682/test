'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Globe,
  ShieldCheck,
  MessageCircle,
  Server,
  ArrowRight,
  CheckCircle2,
  Code,
  Laptop,
  Zap,
  Clock,
  Headphones,
  FileCheck,
  ChevronRight,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

export default function OfferLandingClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const OFFER_BENEFITS = [
    {
      title: 'Website Development',
      desc: 'Complete 5-page business website built on modern Next.js architecture.',
      highlight: '₹2,499 Setup',
      icon: Globe,
      iconBg: 'bg-[#087FF5]/15 text-[#087FF5] border-[#087FF5]/30',
    },
    {
      title: '3 Months Maintenance',
      desc: '3 months of dedicated technical support, updates, and monitoring.',
      highlight: '3 Months Included',
      icon: ShieldCheck,
      iconBg: 'bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/30',
    },
    {
      title: 'WhatsApp Integration',
      desc: 'Direct click-to-chat WhatsApp lead capture button integrated on every page.',
      highlight: 'Integration Included',
      icon: MessageCircle,
      iconBg: 'bg-[#67D63B]/15 text-[#67D63B] border-[#67D63B]/30',
    },
    {
      title: 'Free Domain (1 Year)',
      desc: 'Free .com or .in domain registration included for your first year.',
      highlight: '1st Year Included',
      icon: Server,
      iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    },
  ];

  const PACKAGE_DETAILS = [
    {
      title: '5-Page Professional Web Design',
      desc: 'Home, About Us, Services Showcase, Contact & Portfolio/Gallery pages with mobile-first responsive layout.',
    },
    {
      title: 'Instant WhatsApp Chat Lead Capture',
      desc: 'Connect visitors directly to your WhatsApp business account with one click for faster sales conversion.',
    },
    {
      title: '3 Months Technical Maintenance',
      desc: 'Includes server uptime monitoring, speed optimization, regular backups, and minor text/image updates.',
    },
    {
      title: 'Free Custom Domain Registration',
      desc: 'We register and connect your official business domain name (.com / .in) included for the first year.',
    },
    {
      title: 'Contact Form & Google Maps',
      desc: 'Lead enquiry contact form connected directly to your email plus interactive Google Maps location pin.',
    },
    {
      title: 'On-Page SEO & Fast Loading',
      desc: 'Optimized meta titles, descriptions, image compression, and Core Web Vitals structure for Google search visibility.',
    },
  ];

  const FAQS = [
    {
      question: 'What is included in the ₹2,499 website development offer?',
      answer: 'The package includes complete 5-page website development, 3 months of technical maintenance, WhatsApp click-to-chat integration, and custom domain purchase for the first year.',
    },
    {
      question: 'Is the domain renewal free after the first year?',
      answer: 'The domain purchase is included free for your first year. Subsequent annual domain renewals are billed at standard registrar cost (approx. ₹800 - ₹1,100/yr).',
    },
    {
      question: 'How long does it take to launch the website?',
      answer: 'Once your business details, logo, and content are provided, our engineering team completes and launches your website within 5 to 7 working days.',
    },
    {
      question: 'What is covered under 3 months of maintenance?',
      answer: 'Our 3-month technical maintenance covers server uptime monitoring, speed tuning, security updates, and minor content updates such as updating phone numbers, address, or team photos.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#F4F7FA] text-slate-900 font-sans selection:bg-[#087FF5] selection:text-white overflow-x-hidden min-h-screen">
      
      {/* Top Breadcrumb Header */}
      <div className="bg-[#061B3A] text-slate-400 text-xs py-3 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white font-semibold">Special Offer</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061B3A] via-[#0B2A5B] to-[#0A1E3F] text-white pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-800">
        <div className="pointer-events-none absolute top-0 left-1/3 h-96 w-96 rounded-full bg-[#087FF5]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#67D63B]/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <motion.div
              className="lg:col-span-7 space-y-6 text-left"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#67D63B]/40 bg-[#67D63B]/10 px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#67D63B]" />
                <span className="text-xs font-black uppercase tracking-widest text-[#67D63B]">
                  SPECIAL PROMOTIONAL PACKAGE
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                Your Business Website Starts at Just{' '}
                <span className="bg-gradient-to-r from-[#67D63B] via-[#087FF5] to-[#FF6A00] bg-clip-text text-transparent inline-block">
                  ₹2,499
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl">
                Everything you need to establish your business online, with WhatsApp integration, three months of maintenance, and a domain included for the first year.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="min-h-[48px] px-8 py-3.5 bg-[#FF6A00] hover:bg-[#E05B00] text-white font-extrabold text-xs sm:text-sm rounded-2xl inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <Link
                  href="/pricing/website-development"
                  className="min-h-[48px] px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 inline-flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-md"
                >
                  <span>Compare All Website Plans</span>
                  <ArrowRight className="h-4 w-4 text-[#087FF5]" />
                </Link>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#67D63B]" /> Fast 5-7 Day Launch
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#67D63B]" /> Mobile Responsive
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#67D63B]" /> 100% Quality Guaranteed
                </span>
              </div>
            </motion.div>

            {/* Right Hero Graphic Mockup */}
            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#0B2A5B] to-[#041228] border-2 border-[#67D63B]/40 shadow-2xl p-4 flex flex-col justify-between overflow-hidden group">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">avmsmart.in/offer</span>
                </div>

                <div className="my-auto text-center space-y-2 py-4">
                  <span className="px-3 py-1 rounded-full bg-[#087FF5]/20 text-[#087FF5] text-[10px] font-extrabold uppercase tracking-wider border border-[#087FF5]/30">
                    Website Package
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#67D63B] tracking-tight">
                    ₹2,499
                  </div>
                  <p className="text-xs text-slate-300 font-semibold max-w-xs mx-auto">
                    Website + WhatsApp Integration + 3 Months Maintenance + Domain
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-[#67D63B]">
                    <Code className="h-3.5 w-3.5" /> Ready To Deploy
                  </span>
                  <Laptop className="h-4 w-4 text-[#087FF5]" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 4 Inclusions Grid */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#087FF5] text-xs font-extrabold uppercase tracking-widest rounded-full">
            WHAT IS INCLUDED
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B2A5B]">
            4 Core Offer Benefits
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything essential to get your business established online without hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFFER_BENEFITS.map((benefit, index) => {
            const IconComp = benefit.icon;
            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className={`h-12 w-12 rounded-2xl border ${benefit.iconBg} flex items-center justify-center font-bold shadow-xs`}>
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0B2A5B]">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {benefit.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-[#087FF5]">
                  {benefit.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* Detailed Inclusions List */}
      <section className="py-16 lg:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
              Detailed Package Specifications
            </h2>
            <p className="text-slate-600 text-sm">
              Learn exactly what you receive in our ₹2,499 website development package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGE_DETAILS.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 space-y-2">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#0B2A5B]">
                  <CheckCircle2 className="h-5 w-5 text-[#67D63B] shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-16 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
            Offer Questions & Answers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Frequently asked questions about the ₹2,499 website package.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, fIdx) => {
            const isOpen = openFaqIndex === fIdx;
            return (
              <div key={fIdx} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => toggleFaq(fIdx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-[#0B2A5B] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 pt-0 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* Bottom CTA Banner */}
      <section className="relative overflow-hidden bg-[#061B3A] text-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 z-10 relative">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Launch Your Website for ₹2,499?
          </h2>
          <p className="text-slate-300 text-xs sm:text-base font-normal max-w-lg mx-auto">
            Get started today with our engineering team and build a professional online presence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="min-h-[48px] px-8 py-3.5 bg-[#FF6A00] hover:bg-[#E05B00] text-white font-extrabold text-xs sm:text-sm rounded-2xl inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Claim Offer Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <Link
              href="/pricing/website-development"
              className="min-h-[48px] px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 inline-flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-md"
            >
              <span>Compare All Plans</span>
              <ArrowRight className="h-4 w-4 text-[#087FF5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quote/Enquiry Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService="Website Development ₹2,499 Package"
      />
    </div>
  );
}
