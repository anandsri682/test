import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SOLUTIONS } from '@/data/siteData';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return SOLUTIONS.map((sol) => ({
    slug: sol.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const sol = SOLUTIONS.find((s) => s.slug === resolvedParams.slug);

  if (!sol) {
    return { title: 'Solution Not Found | AVM Smart Solutions' };
  }

  return {
    title: `${sol.title} | AVM Smart Solutions`,
    description: sol.fullDesc,
    keywords: [sol.title, sol.industry, ...sol.keyHighlights, "Industry Software Solutions"],
    alternates: { canonical: `https://www.avmsmart.in/solutions/${sol.slug}` },
    openGraph: {
      title: `${sol.title} | Industry Digital Solutions`,
      description: sol.shortDesc,
      url: `https://www.avmsmart.in/solutions/${sol.slug}`,
      images: [{ url: sol.image }],
    },
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const sol = SOLUTIONS.find((s) => s.slug === resolvedParams.slug);

  if (!sol) {
    notFound();
  }

  return (
    <div className="w-full">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Solutions</span>
          </Link>
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full mb-3">
            {sol.industry} Vertical
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{sol.title}</h1>
          <p className="text-slate-300 text-lg max-w-2xl">{sol.shortDesc}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 w-full">
                <Image
                  src={sol.image}
                  alt={sol.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Solution Overview</h2>
                <p className="text-slate-600 text-base leading-relaxed">{sol.fullDesc}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Core Modules & Architecture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sol.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-800 text-sm font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-6">
                <h3 className="text-xl font-bold">Request Industry Demo</h3>
                <p className="text-slate-300 text-sm">
                  Get a live interactive walkthrough of our {sol.title} solution.
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-3 bg-blue-primary hover:bg-blue-600 text-white font-bold text-center rounded-xl transition-colors"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
