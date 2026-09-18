import type { Metadata } from 'next';
import BlogClient from '@/components/pages/BlogClient';

export const metadata: Metadata = {
  title: "AVM Smart Blog | Technology, Web & Business Insights",
  description: "Read the latest engineering articles, web development guides, mobile app trends, and software technology insights from AVM Smart.",
  keywords: [
    "AVM Smart Blog",
    "Tech Blog Kurnool",
    "Software Development Articles",
    "Digital Marketing Strategies",
    "Mobile App Insights"
  ],
  alternates: { canonical: "https://www.avmsmart.in/blog" },
  openGraph: {
    title: "AVM Smart Blog | Technology, Web & Business Insights",
    description: "Insights, technology trends, and engineering guides from AVM Smart.",
    url: "https://www.avmsmart.in/blog",
    siteName: "AVM Smart",
    images: ["https://www.avmsmart.in/og-image.png"],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
