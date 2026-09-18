'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEMOS, DEMO_CATEGORIES, DemoItem } from '@/data/demos';
import { ExternalLink, ArrowRight, Sparkles, Monitor, Layers, Code, CheckCircle2, Clock } from 'lucide-react';

export default function DemosClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredDemos =
    activeCategory === 'All'
      ? DEMOS
      : DEMOS.filter((demo) => demo.category === activeCategory);

  const featuredDemos = DEMOS.filter((demo) => demo.featured);
  const liveCount = DEMOS.filter((demo) => demo.status === 'live').length;

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen text-slate-900 pb-24 antialiased">
      {/* ============================================================
          HERO BANNER
      ============================================================ */}
      <section aria-labelledby="demos-hero-heading" className="bg-[#0B2A5B] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#087FF5_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#13B89A] border border-white/10 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>AVM SMART DEMO SHOWCASE</span>
            </div>

            <h1 id="demos-hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              Explore Our Live Product Demos
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Interact directly with live web applications, e-commerce stores, education platforms, and custom management systems built by AVM Smart. Click &quot;View Demo&quot; to test real working workflows.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#67D63B] animate-pulse" />
                <span>{liveCount} Live Interactive Demos</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#087FF5]" />
                <span>Production Subdomains</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#FF6A00]" />
                <span>Full-Stack Enterprise Codebase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT AREA
      ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        
        {/* Category Filters Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0B2A5B] tracking-tight">Project Portfolio ({filteredDemos.length})</h2>
            <p className="text-xs text-slate-600 font-medium mt-1">Filter by industry domain or product category</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {DEMO_CATEGORIES.map((category) => {
              const count = category === 'All' ? DEMOS.length : DEMOS.filter(d => d.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-label={`Filter demos by ${category}`}
                  className={`min-h-[44px] px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                    activeCategory === category
                      ? 'bg-[#087FF5] text-white shadow-md scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeCategory === category ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Grid: 3 columns Desktop, 2 columns Tablet, 1 column Mobile */}
        {filteredDemos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDemos.map((demo) => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <Monitor className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#0B2A5B] mb-2">No Demos Found</h3>
            <p className="text-xs text-slate-600 mb-6">There are currently no demos in this category. Check back soon as we continuously add new applications.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="min-h-[44px] px-6 py-2.5 bg-[#087FF5] text-white font-bold text-xs rounded-xl hover:bg-blue-600 transition-colors"
            >
              Show All Demos
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function DemoCard({ demo }: { demo: DemoItem }) {
  const isLive = demo.status === 'live' && demo.liveUrl.length > 0;

  // Accent Color Mapping based on brand palette
  const accentBorderClass = {
    orange: 'hover:border-[#FF6A00]/50',
    blue: 'hover:border-[#087FF5]/50',
    green: 'hover:border-[#67D63B]/50',
    teal: 'hover:border-[#13B89A]/50',
  }[demo.accent || 'blue'];

  const accentTopBarClass = {
    orange: 'bg-[#FF6A00]',
    blue: 'bg-[#087FF5]',
    green: 'bg-[#67D63B]',
    teal: 'bg-[#13B89A]',
  }[demo.accent || 'blue'];

  return (
    <article className={`group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full relative ${accentBorderClass}`}>
      
      {/* Top Accent Strip */}
      <div className={`h-1.5 w-full ${accentTopBarClass}`} />

      <div>
        {/* Preview Image with CLS-Protected Aspect Ratio */}
        <div className="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden">
          <Image
            src={demo.image}
            alt={`${demo.name} Preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Badge (Top Left) */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0B2A5B]/90 backdrop-blur-xs text-white text-[11px] font-bold rounded-lg border border-white/10 shadow-xs">
            {demo.category}
          </div>

          {/* Status Badge (Top Right) */}
          {isLive ? (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Live Demo</span>
            </div>
          ) : (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800/90 backdrop-blur-xs text-amber-300 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>Coming Soon</span>
            </div>
          )}

          {demo.featured && (
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#FF6A00] text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-xs">
              Featured Project
            </div>
          )}
        </div>

        {/* Card Content Body */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#0B2A5B] mb-2 group-hover:text-[#087FF5] transition-colors leading-snug">
            {demo.name}
          </h3>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-5">
            {demo.description}
          </p>

          {/* Technology Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {demo.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-md border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {isLive ? (
          <a
            href={demo.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View Live Demo for ${demo.name}`}
            className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#087FF5] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors duration-200"
          >
            <span>View Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button
            disabled
            className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 text-slate-500 font-bold text-xs rounded-xl cursor-not-allowed"
          >
            <span>Coming Soon</span>
            <Clock className="w-3.5 h-3.5" />
          </button>
        )}

        {demo.slug && (demo.id === 'vegetable' || demo.id === 'hostel' || demo.id === 'fashion-ecommerce' || demo.id === 'furniture') && (
          <Link
            href={`/demos/${demo.slug}`}
            aria-label={`View detailed breakdown of ${demo.name}`}
            className="min-h-[44px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B2A5B] font-bold text-xs rounded-xl transition-colors duration-200 inline-flex items-center justify-center gap-1.5"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
