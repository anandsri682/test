import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DEMOS, DemoItem } from '@/data/demos';
import { COMPANY_DETAILS, SERVICES } from '@/data/siteData';
import { ExternalLink, CheckCircle2, ArrowLeft, Layers, ShieldCheck, ArrowRight, PhoneCall } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEMOS.map((demo) => ({
    slug: demo.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = DEMOS.find((d) => d.slug === slug);

  if (!demo) {
    return {
      title: 'Demo Not Found | AVM Smart',
    };
  }

  return {
    title: `${demo.name} | AVM Smart`,
    description: demo.shortDesc || demo.description,
    alternates: {
      canonical: `${COMPANY_DETAILS.domain}/demos/${demo.slug}`,
    },
    openGraph: {
      title: `${demo.name} Demo | AVM Smart`,
      description: demo.shortDesc || demo.description,
      url: `${COMPANY_DETAILS.domain}/demos/${demo.slug}`,
      siteName: 'AVM Smart',
      type: 'website',
      images: [`${COMPANY_DETAILS.domain}/og-image.png`],
    },
  };
}

export default async function DemoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const demo = DEMOS.find((d) => d.slug === slug);

  if (!demo) {
    notFound();
  }

  const relatedServiceObjs = SERVICES.filter((s) =>
    demo.relatedServices?.includes(s.slug)
  );

  return (
    <div className="w-full bg-[#F4F7FA] text-slate-900 pb-20 antialiased min-h-screen">
      {/* Top Banner */}
      <section className="bg-[#0B2A5B] text-white py-14 sm:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Demos</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#087FF5]/20 text-[#087FF5] text-xs font-bold uppercase tracking-wider mb-4">
              {demo.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              {demo.name}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              {demo.overview || demo.description}
            </p>

            <a
              href={demo.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#087FF5] hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-200"
            >
              <span>Launch Live Demo ({demo.liveUrl.replace('https://', '')})</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Live Preview Image Container */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-slate-500 font-semibold">{demo.liveUrl}</span>
                <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Live</span>
              </div>
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={demo.image}
                  alt={`${demo.name} Overview`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Business Problem & Solution */}
            {demo.businessProblem && demo.solution && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
                    !
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2A5B] mb-2">The Business Challenge</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{demo.businessProblem}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2A5B] mb-2">Our Digital Solution</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{demo.solution}</p>
                </div>
              </div>
            )}

            {/* Key Features */}
            {demo.keyFeatures && demo.keyFeatures.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-xl font-bold text-[#0B2A5B] mb-6">Key Product Capabilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {demo.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#13B89A] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-700 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Summary Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-[#0B2A5B] border-b border-slate-100 pb-3">Demo Details</h3>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Live URL</span>
                <a
                  href={demo.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#087FF5] hover:underline flex items-center gap-1"
                >
                  <span>{demo.liveUrl}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Application Type</span>
                <span className="text-xs font-bold text-[#0B2A5B]">{demo.category}</span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Technology Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {demo.technologies.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-md border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <a
                  href={demo.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#087FF5] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  <span>Test Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-[#0B2A5B] text-white p-6 rounded-2xl shadow-xs space-y-4">
              <h4 className="text-base font-bold text-white">Need a Custom Application Like This?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We design and engineer tailored web and mobile applications for businesses across India. Contact our expert team for a free consultation.
              </p>
              <Link
                href="/contact"
                className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Start a Project</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
