import type { Metadata } from 'next';
import PortfolioClient from '@/components/pages/PortfolioClient';

export const metadata: Metadata = {
  title: "Case Studies & Featured Projects | Portfolio | AVM Smart",
  description: "Browse AVM Smart Solutions' portfolio of delivered enterprise projects: EduTrack, City Travels, RetailStore, HealthCare Pro, RealEstate Pro, and Foodie.",
  keywords: ["AVM Smart Portfolio", "Case Studies", "Web Apps Showcase", "Mobile Apps Portfolio", "React Next.js Projects"],
  alternates: { canonical: "https://www.avmsmart.in/portfolio" },
  openGraph: {
    title: "Portfolio & Case Studies | AVM Smart Solutions",
    description: "Real projects, real impact delivered for enterprise clients worldwide.",
    url: "https://www.avmsmart.in/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
