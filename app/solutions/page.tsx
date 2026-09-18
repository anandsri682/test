import type { Metadata } from 'next';
import SolutionsClient from '@/components/pages/SolutionsClient';

export const metadata: Metadata = {
  title: "Digital Solutions | AVM Smart",
  description: "Industry-focused enterprise digital solutions engineered by AVM Smart for Education, Healthcare, Travel & Transport, Real Estate, and E-commerce.",
  keywords: [
    "Digital Solutions AVM Smart",
    "Education Software Solutions",
    "Healthcare Tech Platforms",
    "Logistics & Transport Tracking",
    "Real Estate Portals",
    "E-commerce Business Solutions"
  ],
  alternates: { canonical: "https://www.avmsmart.in/solutions" },
  openGraph: {
    title: "Digital Solutions | AVM Smart",
    description: "Tailored software solutions designed for your specific industry domain.",
    url: "https://www.avmsmart.in/solutions",
    siteName: "AVM Smart",
    images: ["https://www.avmsmart.in/og-image.png"],
  },
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
