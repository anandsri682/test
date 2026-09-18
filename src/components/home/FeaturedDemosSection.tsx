'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEMOS } from '@/data/demos';
import { ExternalLink, ArrowRight, Sparkles, Clock } from 'lucide-react';

export default function FeaturedDemosSection() {
  const featured = DEMOS.filter((d) => d.featured).slice(0, 3);

  return (
    <section aria-labelledby="featured-demos-heading" className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#087FF5] mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
              Interactive Product Showcase
            </span>
            <h2 id="featured-demos-heading" className="text-3xl sm:text-4xl font-extrabold text-[#0B2A5B] tracking-tight">
              Explore Our Live Demos
            </h2>
            <p className="text-slate-600 text-base mt-2">
              See some of the digital products, e-commerce stores, and enterprise solutions we have developed.
            </p>
          </div>

          <div>
            <Link
              href="/demos"
              className="min-h-[44px] px-6 py-2.5 bg-[#0B2A5B] hover:bg-slate-800 text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>View All Demos ({DEMOS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Demos Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((demo) => {
            const isLive = demo.status === 'live' && demo.liveUrl.length > 0;
            return (
              <div
                key={demo.id}
                className="group bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden">
                    <Image
                      src={demo.image}
                      alt={demo.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0B2A5B]/90 text-white text-[11px] font-bold rounded-lg backdrop-blur-xs">
                      {demo.category}
                    </div>

                    {isLive ? (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>Live Demo</span>
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800/90 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-amber-300" />
                        <span>Coming Soon</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0B2A5B] mb-2 group-hover:text-[#087FF5] transition-colors leading-snug">
                      {demo.name}
                    </h3>
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                      {demo.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-3 border-t border-slate-200/60 pt-4">
                  {isLive ? (
                    <a
                      href={demo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#087FF5] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      <span>View Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-200 text-slate-500 font-bold text-xs rounded-xl cursor-not-allowed"
                    >
                      <span>Coming Soon</span>
                    </button>
                  )}

                  {demo.slug && (
                    <Link
                      href={`/demos/${demo.slug}`}
                      className="min-h-[44px] px-3.5 py-2 bg-white hover:bg-slate-100 text-[#0B2A5B] font-bold text-xs rounded-xl border border-slate-200 transition-colors inline-flex items-center justify-center"
                    >
                      Details
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
