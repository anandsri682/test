'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/data/siteData';
import { Globe, Smartphone, TrendingUp, Cloud, Palette, Users, ArrowRight } from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

const serviceIconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-10 h-10 text-blue-primary" />,
  Smartphone: <Smartphone className="w-10 h-10 text-blue-primary" />,
  TrendingUp: <TrendingUp className="w-10 h-10 text-blue-primary" />,
  Cloud: <Cloud className="w-10 h-10 text-blue-primary" />,
  Palette: <Palette className="w-10 h-10 text-blue-primary" />,
  Users: <Users className="w-10 h-10 text-blue-primary" />,
};

export default function ServicesClient() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="w-full">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Solutions for every stage of your growth</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Our Services</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Home <span className="mx-2 text-slate-500">/</span> Services
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Comprehensive Digital Services</h2>
            <p className="text-slate-600 text-base">
              From idea to execution, we provide end-to-end brand and digital solutions tailored to your business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => {
              const cardThemes = [
                { borderTop: 'border-t-4 border-t-[#087FF5]', iconBg: 'bg-[#087FF5]/10 text-[#087FF5]' },
                { borderTop: 'border-t-4 border-t-[#13B89A]', iconBg: 'bg-[#13B89A]/10 text-[#13B89A]' },
                { borderTop: 'border-t-4 border-t-[#FF6A00]', iconBg: 'bg-[#FF6A00]/10 text-[#FF6A00]' },
              ];
              const theme = cardThemes[idx % 3];

              return (
                <div
                  key={service.id}
                  className={`group p-8 bg-slate-50 rounded-2xl border border-slate-200 ${theme.borderTop} shadow-2xs hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className={`w-16 h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      {serviceIconMap[service.iconName]}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.fullDesc}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-primary"></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-blue-primary hover:text-blue-700 gap-1.5"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-teal-brand text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Need a Custom Solution?</h2>
          <p className="text-teal-50 text-base max-w-xl mx-auto">
            Let's discuss your custom technical specifications with our solutions architect.
          </p>
          <div>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-8 py-3.5 bg-white text-teal-900 font-bold rounded-xl shadow-lg hover:bg-slate-100 transition-colors"
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
