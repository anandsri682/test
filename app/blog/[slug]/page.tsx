import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/siteData';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return { title: 'Blog Post Not Found | AVM Smart Solutions' };
  }

  return {
    title: `${post.title} | AVM Smart Blog`,
    description: post.excerpt,
    keywords: [post.title, post.category, post.author, "Tech Blog", "Software Engineering Insights"],
    alternates: { canonical: `https://www.avmsmart.in/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | AVM Smart Blog`,
      description: post.excerpt,
      url: `https://www.avmsmart.in/blog/${post.slug}`,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full">
      <section className="bg-navy-deep text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-400" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-96 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
            <p className="text-xl font-medium text-slate-900 border-l-4 border-blue-primary pl-4 py-1 italic">
              {post.excerpt}
            </p>
            <p>{post.content}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
