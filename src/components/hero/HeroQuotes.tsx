'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const HERO_BUSINESS_QUOTES = [
  {
    quote: "Good technology should not just look impressive. It should make your business better.",
    author: "AVM Smart Engineering Philosophy",
    category: "Business Value"
  },
  {
    quote: "Your business deserves technology that works as hard as you do.",
    author: "Enterprise Product Commitment",
    category: "Performance First"
  },
  {
    quote: "Great digital experiences turn visitors into customers and ideas into opportunities.",
    author: "Growth & UI/UX Principles",
    category: "High Conversion"
  },
  {
    quote: "The right digital solution can change the way your business grows.",
    author: "Scalable Architecture Standard",
    category: "Digital Transformation"
  },
  {
    quote: "We build technology with your business in mind — not just technology for technology's sake.",
    author: "Customer-Centered Delivery",
    category: "Pragmatic Solutions"
  }
];

export default function HeroQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_BUSINESS_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_BUSINESS_QUOTES.length) % HERO_BUSINESS_QUOTES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_BUSINESS_QUOTES.length);
  };

  const current = HERO_BUSINESS_QUOTES[currentIndex];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 text-left transition-all duration-300">
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-[#087FF5]/10 text-[#087FF5] flex items-center justify-center shrink-0">
          <Quote className="w-6 h-6" />
        </div>
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#087FF5]/10 text-[#087FF5] border border-[#087FF5]/20">
          {current.category}
        </span>
      </div>

      {/* Quote Text Container */}
      <div className="space-y-4 my-auto min-h-[130px] flex flex-col justify-center">
        <blockquote className="text-xl sm:text-2xl font-bold text-[#0B2A5B] leading-snug tracking-tight">
          &ldquo;{current.quote}&rdquo;
        </blockquote>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          — {current.author}
        </p>
      </div>

      {/* Touch-Friendly Controls & Progress Dots */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4 mt-6">
        
        {/* Dots Indicator */}
        <div className="flex items-center gap-1.5">
          {HERO_BUSINESS_QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to quotation ${idx + 1}`}
              className={`min-w-[28px] min-h-[28px] flex items-center justify-center transition-all`}
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-[#087FF5]' : 'w-2 bg-slate-300'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Prev / Next Buttons (Min 44x44px Touch Targets) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous quote"
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-[#087FF5] hover:border-[#087FF5] flex items-center justify-center transition-colors shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next quote"
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-[#087FF5] hover:border-[#087FF5] flex items-center justify-center transition-colors shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
