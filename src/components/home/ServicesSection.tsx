import React from 'react';
import Link from 'next/link';
import { SERVICES } from '@/data/siteData';
import { Globe, Smartphone, TrendingUp, Cloud, Palette, Users, ArrowRight } from 'lucide-react';

const serviceIconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-7 h-7" />,
  Smartphone: <Smartphone className="w-7 h-7" />,
  TrendingUp: <TrendingUp className="w-7 h-7" />,
  Cloud: <Cloud className="w-7 h-7" />,
  Palette: <Palette className="w-7 h-7" />,
  Users: <Users className="w-7 h-7" />,
};

export default function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="py-20 bg-[#F4F7FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#087FF5]/10 text-[#087FF5] text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-[#087FF5]/20">
            Core Capabilities
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A5B] mb-4">
            Our Services
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            End-to-end digital engineering designed to turn your enterprise vision into high-performing products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const cardThemes = [
              {
                borderTop: 'border-t-4 border-t-[#087FF5]',
                iconBg: 'bg-[#087FF5] text-white',
                badgeBg: 'bg-[#087FF5]/10 text-[#087FF5]',
                btnColor: 'text-[#087FF5] hover:text-blue-700',
              },
              {
                borderTop: 'border-t-4 border-t-[#13B89A]',
                iconBg: 'bg-[#13B89A] text-white',
                badgeBg: 'bg-[#13B89A]/10 text-[#13B89A]',
                btnColor: 'text-[#13B89A] hover:text-teal-700',
              },
              {
                borderTop: 'border-t-4 border-t-[#FF6A00]',
                iconBg: 'bg-[#FF6A00] text-white',
                badgeBg: 'bg-[#FF6A00]/10 text-[#FF6A00]',
                btnColor: 'text-[#FF6A00] hover:text-orange-700',
              },
            ];

            const theme = cardThemes[idx % 3];

            return (
              <div
                key={service.id}
                className={`group bg-white rounded-3xl border border-slate-200 ${theme.borderTop} p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-xs`}>
                      {serviceIconMap[service.iconName]}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${theme.badgeBg}`}>
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2A5B] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                <div>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`min-h-[44px] inline-flex items-center text-sm font-bold gap-2 transition-colors ${theme.btnColor}`}
                    aria-label={`Explore ${service.title}`}
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="min-h-[44px] inline-flex items-center px-8 py-3.5 bg-[#0B2A5B] hover:bg-blue-900 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
          >
            <span>View All Services & Capabilities</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
