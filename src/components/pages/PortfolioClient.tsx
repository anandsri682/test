'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO } from '@/data/siteData';
import { ArrowRight } from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const filteredItems =
    activeCategory === 'All'
      ? PORTFOLIO
      : PORTFOLIO.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Real projects. Real impact.</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Our Portfolio</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Home <span className="mx-2 text-slate-500">/</span> Portfolio
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {['All', 'Websites', 'Mobile Apps', 'Platforms', 'Branding'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-navy-deep/85 backdrop-blur-md text-white text-xs font-bold rounded-full">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-blue-primary mb-1">{item.client}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.technologies.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-blue-primary hover:text-blue-700 gap-1.5"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Have a Project in Mind?</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Let's discuss how we can build a high-performance web or mobile platform for your brand.
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
