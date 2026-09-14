'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TEAM_MEMBERS } from '@/data/siteData';
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa6';
import QuoteModal from '@/components/QuoteModal';

export default function TeamClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const founder = TEAM_MEMBERS.filter((m) => m.isFounder);
  const coFounders = TEAM_MEMBERS.filter((m) => m.isCoFounder);
  const teamMembers = TEAM_MEMBERS.filter((m) => !m.isFounder && !m.isCoFounder);

  const renderMemberCard = (member: (typeof TEAM_MEMBERS)[0], colorTheme: 'blue' | 'green' | 'orange') => {
    const displayRole = member.isFounder ? 'Java Full Stack Developer' : member.role;

    const accentClasses = {
      blue: {
        borderTop: 'border-t-4 border-t-[#087FF5]',
        roleText: 'text-[#087FF5]',
        glow: 'hover:shadow-[#087FF5]/15',
      },
      green: {
        borderTop: 'border-t-4 border-t-[#13B89A]',
        roleText: 'text-[#13B89A]',
        glow: 'hover:shadow-[#13B89A]/15',
      },
      orange: {
        borderTop: 'border-t-4 border-t-[#FF6A00]',
        roleText: 'text-[#FF6A00]',
        glow: 'hover:shadow-[#FF6A00]/15',
      },
    }[colorTheme];

    return (
      <div
        key={member.id}
        className={`bg-white rounded-2xl border border-slate-200/90 ${accentClasses.borderTop} p-6 shadow-md ${accentClasses.glow} hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 group`}
      >
        <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-100 shadow-xs">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-primary transition-colors truncate">
              {member.name}
            </h3>
            <p className={`text-xs font-bold ${accentClasses.roleText} mt-0.5 leading-snug`}>
              {displayRole}
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xs"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4 fill-current" />
              </a>
            )}
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900/10 hover:bg-slate-900 text-slate-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xs"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4 fill-current" />
              </a>
            )}
            {member.socials.youtube && (
              <a
                href={member.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xs"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4 fill-current" />
              </a>
            )}
            {member.socials.instagram && (
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f09433]/15 via-[#dc2743]/15 to-[#bc1888]/15 hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-[#dc2743] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xs"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4 fill-current" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#F6F9FC] min-h-screen">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Leadership & Engineering</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold">Our Team</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Meet the engineers, architects, and founders behind AVM Smart Solutions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        <div>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-primary text-xs font-bold uppercase tracking-widest rounded-full mb-2">
              Top Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Founder & CEO</h2>
          </div>
          <div className="max-w-md mx-auto">
            {founder.map((m) => renderMemberCard(m, 'blue'))}
          </div>
        </div>

        <div>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-emerald-500/10 text-teal-brand text-xs font-bold uppercase tracking-widest rounded-full mb-2">
              Executive Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Co-Founders & Technical Leads</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {coFounders.map((m) => renderMemberCard(m, 'green'))}
          </div>
        </div>

        <div>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-brand text-xs font-bold uppercase tracking-widest rounded-full mb-2">
              Engineering Force
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Team Members</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((m, idx) => {
              const themes: ('blue' | 'green' | 'orange')[] = ['blue', 'green', 'orange'];
              return renderMemberCard(m, themes[idx % 3]);
            })}
          </div>
        </div>
      </div>

      <section className="bg-navy-deep text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Build Your Project With Us?</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Get in touch with our engineering team for a free technical consultation.
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
