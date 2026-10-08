'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface TopOfferBannerProps {
  isVisible: boolean;
  bannerText?: string;
  price?: string;
  bannerCta?: string;
  ctaLink?: string;
}

export default function TopOfferBanner({
  isVisible,
  bannerText = 'Website + WhatsApp + 3-Month Maintenance',
  price = '₹2,499',
  bannerCta = 'View Offer',
  ctaLink = '/offer/',
}: TopOfferBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-[#0B2A5B] border-b border-[#087FF5]/40 text-white transition-all duration-300 relative z-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <Link
          href={ctaLink}
          className="group flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold transition-colors hover:opacity-95"
          aria-label={`View Special Offer for ${price}`}
        >
          {/* Mobile-optimized compact row (sm:hidden) */}
          <div className="flex sm:hidden items-center gap-1.5 min-w-0 text-slate-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#67D63B]/20 border border-[#67D63B]/40 px-2 py-0.5 text-[9px] font-black uppercase text-[#67D63B] shrink-0">
              <Sparkles className="h-2.5 w-2.5" />
              OFFER
            </span>

            <span className="font-bold text-white text-[11px] truncate">
              Website Setup
            </span>

            <span className="font-black text-[#67D63B] text-xs shrink-0">
              {price}
            </span>
          </div>

          {/* Desktop row (hidden sm:flex) */}
          <div className="hidden sm:flex items-center gap-2 text-slate-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#67D63B]/20 border border-[#67D63B]/40 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#67D63B] tracking-wider shrink-0">
              <Sparkles className="h-3 w-3" />
              SPECIAL OFFER
            </span>

            <span className="font-bold text-white">
              {bannerText}
            </span>

            <span className="text-slate-400">|</span>

            <span className="font-black text-[#67D63B] text-sm">
              {price}
            </span>
          </div>

          {/* Action CTA Button */}
          <div className="inline-flex items-center gap-1 rounded-full bg-[#087FF5] hover:bg-[#066FD6] px-2.5 py-1 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs font-black text-white shadow-xs transition-all duration-200 group-hover:translate-x-0.5 shrink-0">
            <span>{bannerCta}</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
