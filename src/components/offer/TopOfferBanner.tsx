'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface TopOfferBannerProps {
  isVisible: boolean;
}

export default function TopOfferBanner({ isVisible }: TopOfferBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-[#0B2A5B] border-b border-[#087FF5]/40 text-white transition-all duration-300 relative z-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-2">
        <Link
          href="/offer/"
          className="group flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-semibold transition-colors hover:opacity-95"
          aria-label="View Special Website Development Offer for ₹2,499"
        >
          {/* Left Text & Highlight */}
          <div className="flex items-center gap-2 flex-wrap text-slate-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#67D63B]/20 border border-[#67D63B]/40 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#67D63B] tracking-wider shrink-0">
              <Sparkles className="h-3 w-3" />
              SPECIAL OFFER
            </span>

            <span className="font-bold text-white">
              Website + WhatsApp + 3-Month Maintenance
            </span>

            <span className="hidden sm:inline text-slate-400">|</span>

            <span className="font-black text-[#67D63B] text-sm">
              ₹2,499
            </span>
          </div>

          {/* Right Action CTA Button */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#087FF5] hover:bg-[#066FD6] px-3.5 py-1 text-xs font-black text-white shadow-xs transition-all duration-200 group-hover:translate-x-0.5 shrink-0 ml-auto sm:ml-0">
            <span>View Offer</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
