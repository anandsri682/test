'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  X,
  Sparkles,
  Gift,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  CheckCircle,
} from 'lucide-react';

interface ReferralPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim?: () => void;
  headline?: string;
  price?: string | number;
  supportingText?: string;
  benefits?: string[];
}

export default function OfferPopupModal({
  isOpen,
  onClose,
  onClaim,
}: ReferralPopupModalProps) {
  const shouldReduceMotion = useReducedMotion();

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-referral-title"
    >
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl bg-[#0B0B0B] border-2 border-[#FFD600]/60 shadow-2xl text-white overflow-hidden my-auto"
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Top Accent Yellow Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FFD600] via-amber-400 to-[#FFD600]" />

        {/* Close Button (×) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close referral program popup"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Ambient yellow lighting inside popup */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FFD600]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl" />

        {/* Inner Content Area */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6">
          
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD600]/20 border border-[#FFD600]/40 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#FFD600]">
              <Sparkles className="h-3.5 w-3.5" />
              PARTNER & REFERRAL OPPORTUNITY
            </span>
          </div>

          <div className="space-y-3">
            <h2
              id="popup-referral-title"
              className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug"
            >
              Become an <span className="text-[#FFD600]">AVM Smart Referral Partner</span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              Share our digital services with people you know and earn commissions for qualifying successful referrals.
            </p>
          </div>

          {/* Key Program Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
              <Users className="h-4 w-4 text-[#FFD600] shrink-0 mt-0.5" />
              <span>Everyone can join — open to both individuals and creators.</span>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
              <ShieldCheck className="h-4 w-4 text-[#FFD600] shrink-0 mt-0.5" />
              <span>Individual referral partners only need basic contact details.</span>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
              <Gift className="h-4 w-4 text-[#FFD600] shrink-0 mt-0.5" />
              <span>Receive your unique 6-character coupon code by email.</span>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
              <TrendingUp className="h-4 w-4 text-[#FFD600] shrink-0 mt-0.5" />
              <span>Help customers save ₹1,000 on the eligible website package.</span>
            </div>
          </div>

          {/* Bottom Action CTA Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-2 px-3"
            >
              Maybe Later
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/influencer-program"
                onClick={onClaim || onClose}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-[#FFD600] hover:bg-[#FFE033] text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#FFD600]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join the Referral Program</span>
                <ArrowRight className="h-4 w-4 text-slate-950" />
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
