import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PORTFOLIO } from '@/data/siteData';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return PORTFOLIO.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = PORTFOLIO.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return { title: 'Project Not Found | AVM Smart Solutions' };
  }

  return {
    title: `${project.title} Case Study | AVM Smart Solutions`,
    description: project.description,
    keywords: [project.title, project.client, project.category, ...project.technologies, "Case Study"],
    alternates: { canonical: `https://www.avmsmart.in/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} Case Study | ${project.client}`,
      description: project.description,
      url: `https://www.avmsmart.in/portfolio/${project.slug}`,
      images: [{ url: project.image }],
    },
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = PORTFOLIO.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full mb-3">
            {project.category}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">{project.title}</h1>
          <p className="text-slate-300 text-lg">Client: {project.client}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-96 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Overview</h2>
                <p className="text-slate-600 text-base leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Technologies & Stack Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-blue-50 text-blue-primary font-semibold text-sm rounded-lg border border-blue-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Results & Measured Impact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.results.map((res, i) => (
                    <div key={i} className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-emerald-900 font-bold text-sm">{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-6">
                <h3 className="text-xl font-bold">Want Similar Results?</h3>
                <p className="text-slate-300 text-sm">
                  Let's discuss how we can engineer a custom solution for your business.
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
