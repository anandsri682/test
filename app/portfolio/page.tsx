import type { Metadata } from 'next';
import PortfolioClient from '@/components/pages/PortfolioClient';

export const metadata: Metadata = {
  title: "Projects & Portfolio | AVM Smart",
  description: "Browse AVM Smart's portfolio of delivered enterprise web apps, mobile solutions, and custom software case studies.",
  keywords: [
    "AVM Smart Portfolio",
    "AVM Smart Case Studies",
    "Web Development Showcase",
    "Mobile Apps Portfolio",
    "Software Development Projects Kurnool"
  ],
  alternates: { canonical: "https://www.avmsmart.in/portfolio" },
  openGraph: {
    title: "Projects & Portfolio | AVM Smart",
    description: "Real projects, real impact delivered for enterprise clients.",
    url: "https://www.avmsmart.in/portfolio",
    siteName: "AVM Smart",
    images: ["https://www.avmsmart.in/og-image.png"],
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
