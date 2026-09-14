import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = {
  title: "About Us | AVM Smart Solutions",
  description: "Learn about AVM Smart Solutions, our founding team, mission, vision, core engineering pillars, and corporate digital software background.",
  keywords: ["About AVM Smart", "AVM Smart Solutions Story", "Software Company Hyderabad", "Anand Founder", "IT Services India"],
  alternates: { canonical: "https://www.avmsmart.in/about" },
  openGraph: {
    title: "About Us | AVM Smart Solutions",
    description: "Building technology solutions to power real growth.",
    url: "https://www.avmsmart.in/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
