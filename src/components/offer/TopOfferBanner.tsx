'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface TopOfferBannerProps {
  isVisible?: boolean;
  bannerText?: string;
  price?: string | number;
  bannerCta?: string;
}

export default function TopOfferBanner({
  isVisible = true,
}: TopOfferBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-[#0B0B0B] border-b border-[#FFD600]/40 text-white transition-all duration-300 relative z-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-2">
        <Link
          href="/influencer-program"
          className="group flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold transition-colors hover:opacity-95"
          aria-label="Earn with AVM Smart — Join Our Referral Program"
        >
          {/* Mobile-optimized compact row */}
          <div className="flex sm:hidden items-center gap-1.5 min-w-0 text-slate-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFD600]/20 border border-[#FFD600]/50 px-2 py-0.5 text-[9px] font-black uppercase text-[#FFD600] shrink-0">
              <Sparkles className="h-2.5 w-2.5" />
              PARTNER
            </span>

            <span className="font-bold text-white text-[11px] truncate">
              Earn with AVM Smart
            </span>
          </div>

          {/* Desktop row */}
          <div className="hidden sm:flex items-center gap-2 text-slate-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFD600]/20 border border-[#FFD600]/50 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#FFD600] tracking-wider shrink-0">
              <Sparkles className="h-3 w-3" />
              REFERRAL PROGRAM
            </span>

            <span className="font-bold text-white">
              Earn with AVM Smart — Join Our Referral Program
            </span>

            <span className="text-slate-400">|</span>

            <span className="font-bold text-[#FFD600] text-xs">
              Give ₹1,000 Off & Earn Commissions
            </span>
          </div>

          {/* Action CTA Button */}
          <div className="inline-flex items-center gap-1 rounded-full bg-[#FFD600] hover:bg-amber-300 text-slate-950 px-3 py-1 sm:px-4 sm:py-1 text-[10px] sm:text-xs font-black shadow-xs transition-all duration-200 group-hover:translate-x-0.5 shrink-0">
            <span>Join Now</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
