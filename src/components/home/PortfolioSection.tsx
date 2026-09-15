'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PORTFOLIO } from '@/data/siteData';
import { ArrowRight } from 'lucide-react';

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPortfolio =
    activeCategory === 'All'
      ? PORTFOLIO.slice(0, 3)
      : PORTFOLIO.filter((p) => p.category === activeCategory);

  return (
    <section aria-labelledby="portfolio-heading" className="py-20 bg-[#F4F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#087FF5] mb-2 block">
            Proven Track Record
          </span>
          <h2 id="portfolio-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A5B] mb-4">
            Featured Work
          </h2>
          <p className="text-slate-700 text-base sm:text-lg">
            A few of our recent successful enterprise software and web projects.
          </p>
        </div>

        {/* Filter Buttons (Min 44px touch targets) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {['All', 'Websites', 'Mobile Apps', 'Platforms'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-label={`Filter portfolio by ${cat}`}
              className={`min-h-[44px] px-6 py-2.5 text-xs font-bold rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-[#087FF5] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1 bg-[#0B2A5B]/90 backdrop-blur-xs text-white text-xs font-bold rounded-full border border-white/10">
                  {item.category}
                </div>
              </div>
              <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2A5B] mb-2 group-hover:text-[#087FF5] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="min-h-[44px] inline-flex items-center text-sm font-bold text-[#087FF5] hover:text-blue-700 gap-1.5"
                  aria-label={`View case study for ${item.title}`}
                >
                  <span>View Case Study for {item.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
