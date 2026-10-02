'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  X,
  Sparkles,
  Globe,
  ShieldCheck,
  MessageCircle,
  Server,
  ArrowRight,
  Code,
  Laptop,
} from 'lucide-react';

interface OfferPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
}

export default function OfferPopupModal({
  isOpen,
  onClose,
  onClaim,
}: OfferPopupModalProps) {
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
      aria-labelledby="popup-offer-title"
    >
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl bg-[#061838] border-2 border-[#67D63B]/40 shadow-2xl text-white overflow-hidden my-auto"
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#087FF5] via-[#67D63B] to-[#FF6A00]" />

        {/* Close Button (×) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close promotional offer popup"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Ambient lighting inside popup */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[#087FF5]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[#67D63B]/20 blur-3xl" />

        {/* Inner Content Area */}
        <div className="p-5 sm:p-8 max-h-[85vh] overflow-y-auto">
          
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#67D63B]/20 border border-[#67D63B]/40 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#67D63B]">
              <Sparkles className="h-3.5 w-3.5" />
              WEBSITE DEVELOPMENT OFFER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Content Column */}
            <div className="md:col-span-7 space-y-4">
              <h2
                id="popup-offer-title"
                className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
              >
                Launch Your Business Website for Just{' '}
                <span className="bg-gradient-to-r from-[#67D63B] via-[#087FF5] to-[#FF6A00] bg-clip-text text-transparent">
                  ₹2,499!
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                Take your business online with an affordable website package designed to help your business build a professional digital presence.
              </p>

              {/* 4 Benefits Inclusions List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-2 text-xs font-semibold text-slate-100">
                  <Globe className="h-4 w-4 text-[#087FF5] shrink-0" />
                  <span>Website Dev (₹2,499)</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-2 text-xs font-semibold text-slate-100">
                  <ShieldCheck className="h-4 w-4 text-[#FF6A00] shrink-0" />
                  <span>3 Months Maintenance</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-2 text-xs font-semibold text-slate-100">
                  <MessageCircle className="h-4 w-4 text-[#67D63B] shrink-0" />
                  <span>WhatsApp Integration</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-2 text-xs font-semibold text-slate-100">
                  <Server className="h-4 w-4 text-purple-400 shrink-0" />
                  <span>Free Domain (1 Year)</span>
                </div>
              </div>
            </div>

            {/* Right Graphic / Mockup Column */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[210px] sm:max-w-[240px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#0B2A5B] to-[#041228] border border-white/15 shadow-xl p-3 flex flex-col justify-between overflow-hidden group">
                {/* Simulated Web Browser Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">avmsmart.in</span>
                </div>

                {/* Central Price Display Focal Point */}
                <div className="my-auto text-center space-y-1 py-2">
                  <div className="text-[10px] uppercase tracking-widest text-[#087FF5] font-extrabold">Complete Setup</div>
                  <div className="text-3xl sm:text-4xl font-black text-[#67D63B] tracking-tight">
                    ₹2,499
                  </div>
                  <div className="text-[10px] text-slate-300 font-semibold">Website + WhatsApp + Maintenance</div>
                </div>

                {/* Simulated Floating Code Floating Element */}
                <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono border-t border-white/10 pt-1.5">
                  <span className="flex items-center gap-1 text-[#67D63B]">
                    <Code className="h-3 w-3" /> Ready to Launch
                  </span>
                  <Laptop className="h-3.5 w-3.5 text-[#087FF5]" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Action CTA Row */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 font-medium text-center sm:text-left">
              Includes Domain, WhatsApp Chat & 3 Months Technical Support.
            </div>

            <button
              type="button"
              onClick={onClaim}
              className="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-gradient-to-r from-[#FF6A00] to-[#E05B00] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Claim This Offer</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
