'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SOLUTIONS } from '@/data/siteData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

export default function SolutionsClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="w-full">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Industry-Focused Digital Solutions</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Solutions</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Home <span className="mx-2 text-slate-500">/</span> Solutions
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Tailored Solutions for Your Industry</h2>
            <p className="text-slate-600 text-base">
              We understand that every industry has unique challenges. Our software solutions are designed to address your exact vertical needs.
            </p>
          </div>

          <div className="space-y-12">
            {SOLUTIONS.map((sol, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={sol.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-xl overflow-hidden shadow-md h-72 w-full">
                      <Image
                        src={sol.image}
                        alt={sol.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-primary text-xs font-bold rounded-full">
                      {sol.industry}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">{sol.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{sol.fullDesc}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {sol.keyHighlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/solutions/${sol.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-primary hover:text-blue-700"
                      >
                        <span>Explore Industry Solution</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Don't See Your Industry?</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            We build custom tailored software architectures for businesses of all domain verticals.
          </p>
          <div>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-8 py-3.5 bg-blue-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
