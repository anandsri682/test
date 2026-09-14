import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/data/siteData';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    return { title: 'Service Not Found | AVM Smart Solutions' };
  }

  return {
    title: `${service.title} Services | AVM Smart Solutions`,
    description: service.fullDesc,
    keywords: [service.title, ...service.features, "AVM Smart Services", "Software Development"],
    alternates: { canonical: `https://www.avmsmart.in/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | AVM Smart Solutions`,
      description: service.shortDesc,
      url: `https://www.avmsmart.in/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{service.title}</h1>
          <p className="text-slate-300 text-lg max-w-2xl">{service.shortDesc}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Overview</h2>
                <p className="text-slate-600 text-base leading-relaxed">{service.fullDesc}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Key Capabilities & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-800 text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Business Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-700 text-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-primary"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-6">
                <h3 className="text-xl font-bold">Ready to Get Started?</h3>
                <p className="text-slate-300 text-sm">
                  Schedule a technical consultation for your {service.title} project.
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-3 bg-blue-primary hover:bg-blue-600 text-white font-bold text-center rounded-xl transition-colors"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
