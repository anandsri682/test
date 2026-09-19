'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/siteData';
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { Users, Lightbulb, Target, Heart, Quote, ArrowRight, Sparkles } from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

// Quotes & customized attributes for team members matching reference template
const MEMBER_EXTRAS: Record<
  string,
  {
    quote: string;
    sideCaptionLeft: string;
    sideCaptionRight: string;
    signature: string;
  }
> = {
  founder: {
    quote: 'Great technology starts with people who believe in a better tomorrow.',
    sideCaptionLeft: 'LEAD • INNOVATE • INSPIRE',
    sideCaptionRight: 'BUILDING A SMARTER TOMORROW',
    signature: 'Anand',
  },
  'mahendra-cheerla': {
    quote: 'Clean code. Real solutions. Lasting impact.',
    sideCaptionLeft: 'IDEAS INTO IMPACT',
    sideCaptionRight: 'DEVELOP • SCALE • DELIVER',
    signature: 'Mahendra',
  },
  'lead-frontend': {
    quote: 'Design is not just what it looks like, but how it works for real people.',
    sideCaptionLeft: 'DESIGN • DEVELOP • DELIVER',
    sideCaptionRight: 'BEAUTIFUL SOLUTIONS • BRIGHTER BUSINESSES',
    signature: 'B.V. Madhukar',
  },
  'surya-teja': {
    quote: 'Build. Learn. Improve. Repeat.',
    sideCaptionLeft: 'CLOUD • CODE • COLLABORATE',
    sideCaptionRight: 'LEARN • BUILD • GROW',
    signature: 'Sai Guru',
  },
  karthik: {
    quote: 'Robust backend architecture powers enterprise resilience.',
    sideCaptionLeft: 'BACKEND • LOGIC • DATA',
    sideCaptionRight: 'SCALABLE MICROSERVICES',
    signature: 'Karthik',
  },
  vandana: {
    quote: 'Empowering web applications with intelligent data pipelines.',
    sideCaptionLeft: 'PYTHON • AI • FULLSTACK',
    sideCaptionRight: 'SMART MACHINE LEARNING',
    signature: 'Vandana',
  },
  reddiswapna: {
    quote: 'Human-centered design meets seamless full stack execution.',
    sideCaptionLeft: 'CREATIVITY • UI/UX • CODE',
    sideCaptionRight: 'USER EXPERIENCE FIRST',
    signature: 'Reddiswapna',
  },
  janshi: {
    quote: 'Precision engineering with modern React and clean database schemas.',
    sideCaptionLeft: 'REACT • NODE • DATABASE',
    sideCaptionRight: 'CLEAN CORE ARCHITECTURE',
    signature: 'Jhansi Rani',
  },
  subhashini: {
    quote: 'Pioneering AI algorithms and full-stack software development.',
    sideCaptionLeft: 'AI • ML • INNOVATION',
    sideCaptionRight: 'FUTURE READY SYSTEMS',
    signature: 'Subhashini',
  },
};

const THEMES = [
  {
    bg: 'from-[#F0F6FF] via-[#F4F8FE] to-[#E6F0FA]',
    accent: '#087FF5',
    number: 'text-blue-900/10',
    blobBg: 'bg-blue-400/20',
    cardBorder: 'border-blue-100',
    quoteBorder: 'border-blue-200/80',
    quoteBg: 'bg-white/95',
  },
  {
    bg: 'from-[#F0FDF4] via-[#F5FCF7] to-[#E6F7ED]',
    accent: '#10B981',
    number: 'text-emerald-900/10',
    blobBg: 'bg-emerald-400/20',
    cardBorder: 'border-emerald-100',
    quoteBorder: 'border-emerald-200/80',
    quoteBg: 'bg-white/95',
  },
  {
    bg: 'from-[#FFFBEB] via-[#FFFDF5] to-[#FEF3C7]',
    accent: '#FF6A00',
    number: 'text-amber-900/10',
    blobBg: 'bg-amber-400/20',
    cardBorder: 'border-amber-100',
    quoteBorder: 'border-amber-200/80',
    quoteBg: 'bg-white/95',
  },
  {
    bg: 'from-[#F5F3FF] via-[#F8F7FF] to-[#EDE9FE]',
    accent: '#8B5CF6',
    number: 'text-purple-900/10',
    blobBg: 'bg-purple-400/20',
    cardBorder: 'border-purple-100',
    quoteBorder: 'border-purple-200/80',
    quoteBg: 'bg-white/95',
  },
];

export default function TeamClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Order team members logically: Founder -> Co-Founders -> Team Members
  const founderMembers = TEAM_MEMBERS.filter((m) => m.isFounder);
  const coFounderMembers = TEAM_MEMBERS.filter((m) => m.isCoFounder);
  const regularMembers = TEAM_MEMBERS.filter((m) => !m.isFounder && !m.isCoFounder);
  const sortedMembers = [...founderMembers, ...coFounderMembers, ...regularMembers];

  return (
    <div className="w-full bg-white overflow-hidden">
      
      {/* ============================================================
          TOP HERO / HEADER SECTION
      ============================================================ */}
      <section className="relative overflow-hidden bg-[#061B3A] text-white py-14 lg:py-20 border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="absolute right-8 top-12 hidden lg:block opacity-15 pointer-events-none select-none font-serif italic text-4xl text-blue-200">
          People Build Possibilities
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
              LEADERSHIP & ENGINEERING
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Our Team
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Meet the engineers, architects, and founders behind AVM Smart Solutions.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm">
              <Users className="h-4 w-4 text-[#087FF5]" />
              <span className="text-xs font-semibold text-slate-200">Skilled Professionals</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm">
              <Lightbulb className="h-4 w-4 text-[#10B981]" />
              <span className="text-xs font-semibold text-slate-200">Innovative Thinkers</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm">
              <Target className="h-4 w-4 text-[#FF6A00]" />
              <span className="text-xs font-semibold text-slate-200">Problem Solvers</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-[#EC4899]" />
              <span className="text-xs font-semibold text-slate-200">Committed to Success</span>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================
          EDITORIAL TEAM MEMBER PROFILES WITH PROMINENT LEVEL BADGES
      ============================================================ */}
      <div className="w-full">
        {sortedMembers.map((member, index) => {
          const isEven = index % 2 === 0;
          const theme = THEMES[index % THEMES.length];
          const extras = MEMBER_EXTRAS[member.id] || {
            quote: 'Building robust, scalable digital solutions for modern businesses.',
            sideCaptionLeft: 'INNOVATION • PERFORMANCE • QUALITY',
            sideCaptionRight: 'SMART DIGITAL SOLUTIONS',
            signature: member.name.split(' ')[0],
          };

          const formattedNumber = String(index + 1).padStart(2, '0');
          const displayRole = member.title || member.role;

          // Level determinations
          const isFounder = member.isFounder;
          const isCoFounder = member.isCoFounder;

          const levelBadgeTitle = isFounder
            ? 'Founder & CEO'
            : isCoFounder
            ? 'Co-Founder & Technical Lead'
            : 'Team Member';

          const levelBadgeStyle = isFounder
            ? 'bg-[#087FF5]/15 text-[#087FF5] border-[#087FF5]/30'
            : isCoFounder
            ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
            : 'bg-[#FF6A00]/15 text-[#F05A00] border-[#FF6A00]/30';

          return (
            <section
              key={member.id}
              className={`relative overflow-hidden bg-gradient-to-br ${theme.bg} py-8 sm:py-16 lg:py-20 border-b border-slate-200/60`}
            >
              {/* LARGE LOW-OPACITY SECTION NUMBER */}
              <div
                className={`absolute ${
                  isEven ? 'left-3 sm:left-10' : 'right-3 sm:right-10'
                } top-4 sm:top-8 select-none font-black text-5xl sm:text-8xl lg:text-9xl ${theme.number} pointer-events-none z-0 opacity-40 sm:opacity-100`}
              >
                {formattedNumber}
              </div>

              {/* DECORATIVE SIDE CAPTION (DESKTOP ONLY) */}
              <div
                className={`hidden xl:block absolute ${
                  isEven ? 'left-6 top-40' : 'right-6 top-40'
                } z-0 opacity-40 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 max-w-[120px] text-center leading-relaxed pointer-events-none`}
              >
                {isEven ? extras.sideCaptionLeft : extras.sideCaptionRight}
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div
                  className={`grid grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  
                  {/* PORTRAIT IMAGE CONTAINER */}
                  <motion.div
                    className={`col-span-5 sm:col-span-5 lg:col-span-5 flex justify-center ${
                      isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                    }`}
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <div className="relative w-full max-w-[130px] sm:max-w-[280px] lg:max-w-[340px] aspect-[4/5] group">
                      {/* ANGLED BACKDROP ACCENT SHAPE */}
                      <div
                        className={`absolute -inset-1.5 sm:-inset-3 rounded-2xl sm:rounded-3xl ${theme.blobBg} transform -rotate-2 sm:-rotate-3 transition-transform duration-500 group-hover:rotate-0 blur-xs`}
                      />

                      {/* MAIN PORTRAIT FRAME */}
                      <div
                        className={`relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 ${theme.cardBorder} shadow-md sm:shadow-xl transition-transform duration-500 group-hover:scale-[1.01]`}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          priority={index < 2}
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
                      </div>
                    </div>
                  </motion.div>

                  {/* CONTENT CONTAINER */}
                  <motion.div
                    className={`col-span-7 sm:col-span-7 lg:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-4 ${
                      isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                    }`}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {/* PROMINENT LEVEL / TITLE BADGE CENTER-TOP ABOVE NAME */}
                    <div className="flex items-center justify-start">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-xs ${levelBadgeStyle}`}
                      >
                        {isFounder && '👑 '}
                        {levelBadgeTitle}
                      </span>
                    </div>

                    {/* NAME & DESIGNATION */}
                    <div>
                      <h2 className="text-base sm:text-3xl lg:text-4xl font-extrabold text-[#0B2A5B] tracking-tight leading-tight">
                        {member.name}
                      </h2>
                      <p
                        className="text-xs sm:text-sm lg:text-base font-bold mt-0.5 sm:mt-1 leading-snug"
                        style={{ color: theme.accent }}
                      >
                        {displayRole}
                      </p>
                    </div>

                    {/* BIO / DESCRIPTION */}
                    <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {member.bio}
                    </p>

                    {/* SOCIAL ICONS & SIGNATURE ROW */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                      {/* Social Icons */}
                      <div className="flex items-center gap-1.5 sm:gap-2.5">
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
                            aria-label="LinkedIn"
                          >
                            <FaLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                          </a>
                        )}
                        {member.socials.github && (
                          <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-900/10 hover:bg-slate-900 text-slate-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
                            aria-label="GitHub"
                          >
                            <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                          </a>
                        )}
                        {member.socials.youtube && (
                          <a
                            href={member.socials.youtube}
                            target="_blank"
                            rel="noreferrer"
                            className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
                            aria-label="YouTube"
                          >
                            <FaYoutube className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                          </a>
                        )}
                        {member.socials.instagram && (
                          <a
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#f09433]/15 via-[#dc2743]/15 to-[#bc1888]/15 hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-[#dc2743] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
                            aria-label="Instagram"
                          >
                            <FaInstagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                          </a>
                        )}
                      </div>

                      {/* Signature Element */}
                      <div className="font-serif italic text-base sm:text-xl text-slate-600 font-bold opacity-75 select-none">
                        {extras.signature}
                      </div>
                    </div>

                    {/* COMPACT QUOTE CARD */}
                    <div
                      className={`w-full rounded-xl sm:rounded-2xl border ${theme.quoteBorder} ${theme.quoteBg} p-2.5 sm:p-3.5 shadow-xs backdrop-blur-md flex items-start gap-2.5 mt-1 sm:mt-2`}
                    >
                      <Quote className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 opacity-70" style={{ color: theme.accent }} />
                      <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-700 italic leading-snug">
                        "{extras.quote}"
                      </p>
                    </div>
                  </motion.div>

                </div>
              </div>
            </section>
          );
        })}
      </div>


      {/* ============================================================
          BOTTOM CTA SECTION
      ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0F6FF] to-[#E6F0FA] py-14 lg:py-20 border-t border-slate-200">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 z-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2A5B] tracking-tight">
            Want to work with this amazing team?
          </h2>
          
          <p className="text-slate-600 text-xs sm:text-base max-w-xl mx-auto font-normal">
            Let's build something great together. Get in touch with our engineering team today.
          </p>

          <div>
            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#087FF5] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#066FD6] hover:shadow-xl hover:shadow-blue-500/35 active:scale-95 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
