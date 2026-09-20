'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import {
  COMPANY_DETAILS,
  TEAM_MEMBERS,
  FOUR_PILLARS,
  CORE_VALUES,
} from '@/data/siteData';

import {
  Sparkles,
  Shield,
  TrendingUp,
  Users,
  HeartHandshake,
  ShieldCheck,
  Lightbulb,
  Award,
  Play,
  ArrowUpRight,
} from 'lucide-react';

import {
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa6';

import QuoteModal from '@/components/QuoteModal';

// ==========================================
// ICON MAP
// ==========================================

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-6 w-6 text-blue-primary" />,
  Shield: <Shield className="h-6 w-6 text-blue-primary" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-blue-primary" />,
  Users: <Users className="h-6 w-6 text-blue-primary" />,
  HeartHandshake: (
    <HeartHandshake className="h-6 w-6 text-blue-primary" />
  ),
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-blue-primary" />,
  Lightbulb: <Lightbulb className="h-6 w-6 text-blue-primary" />,
  Award: <Award className="h-6 w-6 text-blue-primary" />,
};

export default function AboutClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // ==========================================
  // TEAM GROUPS
  // ==========================================

  const founder = TEAM_MEMBERS.filter((member) => member.isFounder);

  const coFounders = TEAM_MEMBERS.filter(
    (member) => member.isCoFounder
  );

  const teamMembers = TEAM_MEMBERS.filter(
    (member) => !member.isFounder && !member.isCoFounder
  );

  // ==========================================
  // TEAM MEMBER COMPONENT
  // ==========================================

  const renderTeamMember = (
    member: (typeof TEAM_MEMBERS)[0],
    type: 'founder' | 'cofounder' | 'member'
  ) => {
    const isFounder = type === 'founder';
    const isCoFounder = type === 'cofounder';

    const designation = isFounder
      ? 'Founder & CEO'
      : isCoFounder
      ? 'Co-Founder & Technical Lead'
      : 'Team Member';

    const theme = isFounder
      ? {
          ring: 'border-[#087FF5]',
          glow: 'bg-[#087FF5]',
          badge:
            'border-[#087FF5]/30 bg-[#087FF5]/10 text-[#087FF5]',
          dot: 'bg-[#087FF5]',
          role: 'text-[#087FF5]',
          hover: 'group-hover:text-[#087FF5]',
          line:
            'from-transparent via-[#087FF5]/30 to-transparent',
        }
      : isCoFounder
      ? {
          ring: 'border-[#13B89A]',
          glow: 'bg-[#13B89A]',
          badge:
            'border-[#13B89A]/30 bg-[#13B89A]/10 text-[#0B9F88]',
          dot: 'bg-[#13B89A]',
          role: 'text-[#0B9F88]',
          hover: 'group-hover:text-[#0B9F88]',
          line:
            'from-transparent via-[#13B89A]/30 to-transparent',
        }
      : {
          ring: 'border-[#FF6A00]/70',
          glow: 'bg-[#FF6A00]',
          badge:
            'border-[#FF6A00]/30 bg-[#FF6A00]/10 text-[#FF6A00]',
          dot: 'bg-[#FF6A00]',
          role: 'text-[#FF6A00]',
          hover: 'group-hover:text-[#FF6A00]',
          line:
            'from-transparent via-[#FF6A00]/20 to-transparent',
        };

    return (
      <div
        key={member.id}
        className="group relative flex flex-col items-center text-center"
      >
        {/* ==========================================
            PROFILE IMAGE
        ========================================== */}

        <div className="relative">

          {/* Glow */}
          <div
            className={`absolute -inset-5 rounded-full ${theme.glow} opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-20`}
          />

          {/* Image Circle */}
          <div
            className={`relative h-28 w-28 overflow-hidden rounded-full border-[4px] bg-white shadow-xl transition-all duration-500 group-hover:scale-105 sm:h-32 sm:w-32 lg:h-36 lg:w-36 ${theme.ring}`}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="144px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Online / Active Dot */}
          <span
            className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-white shadow-md ${theme.dot}`}
          />
        </div>

        {/* ==========================================
            REQUIRED DESIGNATION TAG
        ========================================== */}

        <div className="mt-5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] shadow-sm sm:text-[10px] ${theme.badge}`}
          >
            <Award className="h-3 w-3" />
            {designation}
          </span>
        </div>

        {/* Name */}
        <h3
          className={`mt-3 max-w-[230px] text-lg font-extrabold tracking-tight text-slate-900 transition-colors duration-300 sm:text-xl ${theme.hover}`}
        >
          {member.name}
        </h3>

        {/* Actual Role */}
        <p
          className={`mt-1 max-w-[240px] text-xs font-bold leading-relaxed sm:text-sm ${theme.role}`}
        >
          {member.role}
        </p>

        {/* Social Links */}
        <div className="mt-4 flex items-center justify-center gap-2">

          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A66C2] hover:text-white"
            >
              <FaLinkedin className="h-3.5 w-3.5" />
            </a>
          )}

          {member.socials.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} GitHub`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900 hover:text-white"
            >
              <FaGithub className="h-3.5 w-3.5" />
            </a>
          )}

          {member.socials.youtube && (
            <a
              href={member.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} YouTube`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white"
            >
              <FaYoutube className="h-3.5 w-3.5" />
            </a>
          )}

          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} Instagram`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white"
            >
              <FaInstagram className="h-3.5 w-3.5" />
            </a>
          )}

        </div>
      </div>
    );
  };

  // ==========================================
  // SECTION DIVIDER
  // ==========================================

  const sectionDivider = (
    title: string,
    color: 'blue' | 'green' | 'orange'
  ) => {
    const colors = {
      blue: {
        line: 'via-[#087FF5]/30',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        text: 'text-[#087FF5]',
      },
      green: {
        line: 'via-[#13B89A]/30',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        text: 'text-[#0B9F88]',
      },
      orange: {
        line: 'via-[#FF6A00]/30',
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        text: 'text-[#FF6A00]',
      },
    }[color];

    return (
      <div className="mb-10 flex items-center gap-4">

        <div
          className={`h-px flex-1 bg-gradient-to-r from-transparent ${colors.line}`}
        />

        <span
          className={`rounded-full border px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.15em] ${colors.bg} ${colors.border} ${colors.text}`}
        >
          {title}
        </span>

        <div
          className={`h-px flex-1 bg-gradient-to-l from-transparent ${colors.line}`}
        />

      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden bg-white">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-navy-deep py-16 text-white sm:py-20">

        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            People. Passion. Progress.
          </p>

          <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">
            About Us
          </h1>

          <p className="text-sm text-slate-300 sm:text-base">
            Home
            <span className="mx-2 text-slate-500">/</span>
            About Us
          </p>

        </div>
      </section>

      {/* ==========================================
          WHO WE ARE
      ========================================== */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

            <div className="space-y-6 lg:col-span-6">

              <span className="block text-xs font-bold uppercase tracking-widest text-blue-primary">
                Who We Are
              </span>

              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Building technology solutions to power real growth.
              </h2>

              <p className="text-base leading-relaxed text-slate-600">
                AVM Smart was founded with a single goal — to help businesses
                leverage technology for scalable growth. Over 3+ years of
                passionate service, we have built custom software, web
                platforms, and mobile apps for clients across multiple
                enterprise domains.
              </p>

              <p className="text-base leading-relaxed text-slate-600">
                Our approach combines user-centered design, robust backend
                engineering, and high-converting marketing strategies to ensure
                every product delivers concrete ROI.
              </p>

            </div>

            <div className="lg:col-span-6">

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-xl">

                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                  alt="AVM Smart Office Story"
                  width={600}
                  height={400}
                  className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-96"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          FOUR PILLARS
      ========================================== */}

      <section className="border-y border-slate-200/80 bg-light-section py-12">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">

            {FOUR_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6"
              >

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  {iconMap[pillar.icon]}
                </div>

                <h3 className="mb-1 text-sm font-bold text-slate-900 sm:text-base">
                  {pillar.title}
                </h3>

                <p className="text-xs leading-relaxed text-slate-600">
                  {pillar.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ==========================================
          VIDEO / STORY
      ========================================== */}

      <section className="relative overflow-hidden bg-navy-dark py-20 text-white">

        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl space-y-6 px-4 text-center sm:px-6 lg:px-8">

          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Turning Ideas into Impact
          </h2>

          <p className="mx-auto max-w-xl text-base text-slate-300">
            Watch how our engineering team crafts digital experiences from
            concept to scale.
          </p>

          <div className="group relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">

            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
              alt="Video Backdrop"
              width={1000}
              height={500}
              className="h-80 w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 flex items-center justify-center">

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-primary/90 text-white shadow-2xl transition-transform duration-300 hover:scale-110"
                aria-label="Play video demo"
              >
                <Play className="ml-1 h-8 w-8 fill-current" />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          MISSION / VISION
      ========================================== */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            <div className="group space-y-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-primary text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Our Mission
              </h3>

              <p className="text-base leading-relaxed text-slate-600">
                To empower businesses with innovative, dependable, and scalable
                digital solutions that streamline operations, attract
                customers, and unlock enterprise potential.
              </p>

            </div>

            <div className="group space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-brand text-white">
                <Lightbulb className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Our Vision
              </h3>

              <p className="text-base leading-relaxed text-slate-600">
                To be a trusted global technology partner for businesses,
                recognized for engineering excellence, human-centered UI
                design, and long-term client success.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          VALUES
      ========================================== */}

      <section className="border-t border-slate-200/80 bg-light-section py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto mb-16 max-w-3xl text-center">

            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-primary">
              Core Principles
            </span>

            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Our Values
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-transform duration-300 group-hover:scale-110">
                  {iconMap[val.icon]}
                </div>

                <h4 className="mb-2 text-lg font-bold text-slate-900">
                  {val.title}
                </h4>

                <p className="text-xs leading-relaxed text-slate-600">
                  {val.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ==========================================
          TEAM SECTION
      ========================================== */}

      <section className="relative overflow-hidden border-t border-slate-200/80 bg-[#F6F9FC] py-20 sm:py-24">

        {/* Background Decorations */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />

          <div className="absolute left-0 top-32 h-px w-full rotate-[12deg] bg-slate-300/30" />

          <div className="absolute left-0 top-72 h-px w-full -rotate-[8deg] bg-slate-300/20" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ==========================================
              TEAM HEADER
          ========================================== */}

          <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">

            {/* Left heading */}

            <div className="lg:col-span-5">

              <div className="relative overflow-hidden rounded-[40px] bg-white p-8 shadow-sm sm:p-10">

                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-slate-100" />

                <div className="relative">

                  <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-primary">
                    <Users className="h-3.5 w-3.5" />
                    Leadership & Engineering
                  </span>

                  <h2 className="max-w-md text-4xl font-black leading-[1.05] tracking-tight text-[#102A43] sm:text-5xl lg:text-6xl">
                    Meet the
                    <br />
                    <span>Team</span>
                  </h2>

                  <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
                    The people behind AVM Smart Solutions — bringing together
                    technology, creativity, and business-focused thinking.
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-[#087FF5]" />
                    Building digital solutions together
                  </div>

                </div>

              </div>

            </div>

            {/* Right circular team preview */}

            <div className="relative hidden min-h-[330px] lg:col-span-7 lg:block">

              {/* Connecting lines */}

              <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 bg-slate-300/60" />

              <div className="absolute left-1/2 top-1/2 h-[70%] w-px -translate-y-1/2 bg-slate-300/40" />

              {/* Founder */}

              {founder[0] && (
                <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">

                  <div className="relative">

                    <div className="absolute -inset-4 rounded-full bg-blue-400/10 blur-xl" />

                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#087FF5] bg-white shadow-xl">

                      <Image
                        src={founder[0].image}
                        alt={founder[0].name}
                        fill
                        sizes="128px"
                        className="object-cover object-top"
                      />

                    </div>

                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#087FF5] px-4 py-2 text-center text-white shadow-lg">

                      <p className="text-[9px] font-extrabold uppercase tracking-wider">
                        Founder & CEO
                      </p>

                      <p className="mt-0.5 text-[10px] opacity-90">
                        {founder[0].name}
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* Floating Team Photos */}

              {[
                ...coFounders.slice(0, 2),
                ...teamMembers.slice(0, 5),
              ].map((member, index) => {

                const positions = [
                  'left-[8%] top-[8%]',
                  'right-[8%] top-[8%]',
                  'left-[2%] bottom-[5%]',
                  'left-[32%] top-[0%]',
                  'right-[30%] top-[0%]',
                  'right-[2%] bottom-[5%]',
                  'left-[32%] bottom-[0%]',
                ];

                return (
                  <div
                    key={member.id}
                    className={`absolute ${positions[index]}`}
                  >

                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-[3px] border-white bg-white shadow-lg transition-transform duration-300 hover:scale-110">

                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* ==========================================
              FOUNDER
          ========================================== */}

          <div className="relative mb-20">

            {sectionDivider('Founder & CEO', 'blue')}

            <div className="flex justify-center">

              {founder.map((member) => (
                <div
                  key={member.id}
                  className="w-full max-w-xs"
                >
                  {renderTeamMember(member, 'founder')}
                </div>
              ))}

            </div>

          </div>

          {/* ==========================================
              DESKTOP CONNECTOR
          ========================================== */}

          <div className="relative mx-auto mb-20 hidden h-16 max-w-4xl lg:block">

            <div className="absolute left-1/2 top-0 h-8 w-px bg-slate-300" />

            <div className="absolute left-1/4 right-1/4 top-8 h-px bg-slate-300" />

            <div className="absolute left-1/4 top-8 h-8 w-px bg-slate-300" />

            <div className="absolute right-1/4 top-8 h-8 w-px bg-slate-300" />

          </div>

          {/* ==========================================
              CO-FOUNDERS
          ========================================== */}

          <div className="mb-20">

            {sectionDivider(
              'Co-Founders & Technical Leads',
              'green'
            )}

            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-20">

              {coFounders.map((member) => (
                <div key={member.id}>
                  {renderTeamMember(member, 'cofounder')}
                </div>
              ))}

            </div>

          </div>

          {/* ==========================================
              TEAM MEMBERS
          ========================================== */}

          <div>

            {sectionDivider('Team Members', 'orange')}

            <div className="grid grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-20">

              {teamMembers.map((member) => (
                <div key={member.id}>
                  {renderTeamMember(member, 'member')}
                </div>
              ))}

            </div>

          </div>

          {/* ==========================================
              TEAM FOOTER
          ========================================== */}

          <div className="mx-auto mt-20 max-w-2xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-500 shadow-sm">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              One Team · One Vision · Real Digital Solutions

            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          FINAL CTA
      ========================================== */}

      <section className="relative overflow-hidden bg-navy-deep py-16 text-white">

        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl space-y-6 px-4 text-center sm:px-6 lg:px-8">

          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Let's Build the Future Together
          </h2>

          <p className="mx-auto max-w-xl text-base text-slate-300">
            We're always excited to discuss new opportunities and digital
            projects.
          </p>

          <div>

            <button
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-primary px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </button>

          </div>

        </div>

      </section>

      {/* ==========================================
          QUOTE MODAL
      ========================================== */}

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

    </div>
  );
}