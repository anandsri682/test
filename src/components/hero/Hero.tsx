import React from 'react';
import HeroQuotes from './HeroQuotes';

export default function Hero() {
  return (
    <section aria-label="Introduction" className="bg-white text-slate-900 pt-10 pb-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* LEFT-SIDE CONTENT - SOLID TEXT ONLY, NO GRADIENTS, NO CTA BUTTONS, NO STATS */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            
            {/* Small Branding Accent */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087FF5]" />
              <span className="w-2 h-2 rounded-full bg-[#13B89A]" />
              <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                AVM SMART SOLUTIONS
              </span>
            </div>

            {/* Main Headline - Solid Dark Navy (#0B2A5B) Only */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-[#0B2A5B]">
              AVM Smart — Digital Solutions for Real Business Growth
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              We design, develop, and deliver high-performance websites, enterprise mobile applications, and scalable digital solutions that help businesses work smarter and grow faster.
            </p>
          </div>

          {/* RIGHT-SIDE CONTENT - ROTATING BUSINESS QUOTATION AREA (NO IMAGE, NO CARD FRAME) */}
          <div className="lg:col-span-6 flex items-center">
            <HeroQuotes />
          </div>

        </div>
      </div>
    </section>
  );
}
