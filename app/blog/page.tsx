import type { Metadata } from 'next';
import BlogClient from '@/components/pages/BlogClient';

export const metadata: Metadata = {
  title: "Tech Blog & Industry Trends | AVM Smart Solutions",
  description: "Read the latest engineering articles, digital marketing strategies, mobile app trends, and cloud technology insights from AVM Smart.",
  keywords: ["Tech Blog", "Software Engineering Insights", "Digital Marketing 2024", "Mobile Apps Trends", "Cloud Architecture"],
  alternates: { canonical: "https://www.avmsmart.in/blog" },
  openGraph: {
    title: "Tech Blog & Industry Trends | AVM Smart Solutions",
    description: "Insights, news, and industry trends from software engineering specialists.",
    url: "https://www.avmsmart.in/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
