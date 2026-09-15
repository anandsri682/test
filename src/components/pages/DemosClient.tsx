'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEMOS, DEMO_CATEGORIES, DemoItem } from '@/data/demos';
import { ExternalLink, ArrowRight, Sparkles, Monitor, Layers, Code } from 'lucide-react';

export default function DemosClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredDemos =
    activeCategory === 'All'
      ? DEMOS
      : DEMOS.filter((demo) => demo.category === activeCategory);

  const featuredDemos = DEMOS.filter((demo) => demo.featured);

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen text-slate-900 pb-20 antialiased">
      {/* ============================================================
          HERO BANNER
      ============================================================ */}
      <section aria-labelledby="demos-hero-heading" className="bg-[#0B2A5B] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#087FF5_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#13B89A] border border-white/10 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE PRODUCT DEMOS</span>
            </div>

            <h1 id="demos-hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              Explore Our Live Digital Solutions
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Interact directly with live web applications, e-commerce platforms, and management systems built by AVM Smart Solutions. Click &quot;View Live Demo&quot; to test real product workflows.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#087FF5]" />
                <span>Real Working Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#13B89A]" />
                <span>Production Subdomains</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#FF6A00]" />
                <span>Modern Tech Stack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT AREA
      ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        
        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-[#0B2A5B]">All Product Demos</h2>
            <p className="text-xs text-slate-600 font-medium mt-0.5">Filter by application category</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {DEMO_CATEGORIES.map((category) => {
              const count = category === 'All' ? DEMOS.length : DEMOS.filter(d => d.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-label={`Filter demos by ${category}`}
                  className={`min-h-[44px] px-5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                    activeCategory === category
                      ? 'bg-[#087FF5] text-white shadow-xs'
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

        {/* Demo Grid */}
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
            <p className="text-xs text-slate-600 mb-6">There are currently no live demos in this category. Check back soon as we continuously add new applications.</p>
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
  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Preview Image with fixed aspect ratio to prevent CLS */}
        <div className="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden">
          <Image
            src={demo.image}
            alt={`${demo.name} Live Demo Preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {demo.featured && (
            <div className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-[#FF6A00] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-xs">
              Featured
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#0B2A5B] mb-2.5 group-hover:text-[#087FF5] transition-colors leading-snug">
            {demo.name}
          </h3>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-5">
            {demo.description}
          </p>

          {/* Tech Stack Pills */}
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
      <div className="px-6 pb-6 pt-0 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <a
          href={demo.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View Live Demo for ${demo.name}`}
          className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#087FF5] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors duration-200"
        >
          <span>View Live Demo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <Link
          href={`/demos/${demo.slug}`}
          aria-label={`View detailed breakdown of ${demo.name}`}
          className="min-h-[44px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B2A5B] font-bold text-xs rounded-xl transition-colors duration-200 inline-flex items-center justify-center gap-1.5"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
