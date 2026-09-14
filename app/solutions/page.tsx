import type { Metadata } from 'next';
import SolutionsClient from '@/components/pages/SolutionsClient';

export const metadata: Metadata = {
  title: "Industry Digital Solutions | Education, Healthcare, Logistics | AVM Smart",
  description: "Industry-focused enterprise digital solutions engineered by AVM Smart Solutions for Education, Healthcare, Travel & Transport, Real Estate, and E-commerce.",
  keywords: ["Education Software", "Healthcare Tech", "Logistics Tracking", "Real Estate Portal", "E-commerce Solutions"],
  alternates: { canonical: "https://www.avmsmart.in/solutions" },
  openGraph: {
    title: "Industry Digital Solutions | AVM Smart Solutions",
    description: "Tailored software solutions designed for your specific industry domain.",
    url: "https://www.avmsmart.in/solutions",
  },
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
