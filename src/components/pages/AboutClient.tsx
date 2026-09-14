'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_DETAILS, TEAM_MEMBERS, FOUR_PILLARS, CORE_VALUES } from '@/data/siteData';
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
} from 'lucide-react';
import { FaLinkedin, FaTwitter, FaGithub, FaYoutube, FaInstagram } from 'react-icons/fa6';
import QuoteModal from '@/components/QuoteModal';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-blue-primary" />,
  Shield: <Shield className="w-6 h-6 text-blue-primary" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-blue-primary" />,
  Users: <Users className="w-6 h-6 text-blue-primary" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-blue-primary" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-blue-primary" />,
  Lightbulb: <Lightbulb className="w-6 h-6 text-blue-primary" />,
  Award: <Award className="w-6 h-6 text-blue-primary" />,
};

export default function AboutClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const founder = TEAM_MEMBERS.filter((m) => m.isFounder);
  const coFounders = TEAM_MEMBERS.filter((m) => m.isCoFounder);
  const teamMembers = TEAM_MEMBERS.filter((m) => !m.isFounder && !m.isCoFounder);

  const renderCard = (member: (typeof TEAM_MEMBERS)[0], colorTheme: 'blue' | 'green' | 'orange') => {
    const displayRole = member.isFounder ? 'Java Full Stack Developer' : member.role;

    const accentClasses = {
      blue: { borderTop: 'border-t-4 border-t-[#087FF5]', roleText: 'text-[#087FF5]' },
      green: { borderTop: 'border-t-4 border-t-[#13B89A]', roleText: 'text-[#13B89A]' },
      orange: { borderTop: 'border-t-4 border-t-[#FF6A00]', roleText: 'text-[#FF6A00]' },
    }[colorTheme];

    return (
      <div
        key={member.id}
        className={`bg-white rounded-2xl border border-slate-200 ${accentClasses.borderTop} p-5 shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group`}
      >
        <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <h4 className="font-extrabold text-slate-900 text-base truncate group-hover:text-blue-primary transition-colors">
            {member.name}
          </h4>
          <p className={`text-xs font-bold ${accentClasses.roleText} leading-snug`}>{displayRole}</p>

          <div className="flex items-center gap-2 pt-1">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-3.5 h-3.5 fill-current" />
              </a>
            )}
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900/10 hover:bg-slate-900 text-slate-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub className="w-3.5 h-3.5 fill-current" />
              </a>
            )}
            {member.socials.youtube && (
              <a
                href={member.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube className="w-3.5 h-3.5 fill-current" />
              </a>
            )}
            {member.socials.instagram && (
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433]/15 via-[#dc2743]/15 to-[#bc1888]/15 hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-[#dc2743] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-3.5 h-3.5 fill-current" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">People. Passion. Progress.</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Home <span className="mx-2 text-slate-500">/</span> About Us
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-primary block">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Building technology solutions to power real growth.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                AVM Smart was founded with a single goal — to help businesses leverage technology for scalable growth. Over 3+ years of passionate service, we have built custom software, web platforms, and mobile apps for clients across multiple enterprise domains.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Our approach combines user-centered design, robust backend engineering, and high-converting marketing strategies to ensure every product delivers concrete ROI.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                  alt="AVM Smart Office Story"
                  width={600}
                  height={400}
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-light-section border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FOUR_PILLARS.map((pillar, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  {iconMap[pillar.icon]}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Turning Ideas into Impact</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Watch how our engineering team crafts digital experiences from concept to scale.
          </p>
          <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
              alt="Video Backdrop"
              width={1000}
              height={500}
              className="w-full h-80 object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="w-20 h-20 rounded-full bg-blue-primary/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                aria-label="Play video demo"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-primary text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                To empower businesses with innovative, dependable, and scalable digital solutions that streamline operations, attract customers, and unlock enterprise potential.
              </p>
            </div>

            <div className="p-8 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-brand text-white flex items-center justify-center font-bold">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                To be a trusted global technology partner for businesses, recognized for engineering excellence, human-centered UI design, and long-term client success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-section border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-primary mb-2 block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  {iconMap[val.icon]}
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F6F9FC] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-primary mb-2 block">
              Leadership & Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Meet Our Team</h2>
            <p className="text-slate-600 text-base">The team driving digital innovation at AVM Smart Solutions.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center border-b border-slate-200 pb-2">
              Founder & CEO
            </h3>
            <div className="max-w-md mx-auto">
              {founder.map((m) => renderCard(m, 'blue'))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center border-b border-slate-200 pb-2">
              Co-Founders & Technical Leads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coFounders.map((m) => renderCard(m, 'green'))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center border-b border-slate-200 pb-2">
              Team Members
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((m, idx) => {
                const themes: ('blue' | 'green' | 'orange')[] = ['blue', 'green', 'orange'];
                return renderCard(m, themes[idx % 3]);
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Let's Build the Future Together</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            We're always excited to discuss new opportunities and digital projects.
          </p>
          <div>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-8 py-3.5 bg-blue-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
