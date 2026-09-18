import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = {
  title: "About AVM Smart | Digital Solutions Company",
  description: "Learn about AVM Smart, our founding team, mission, vision, core engineering pillars, and technology background in Kurnool, Andhra Pradesh.",
  keywords: [
    "About AVM Smart",
    "AVM Smart Solutions",
    "Software Company Kurnool",
    "Software Development Andhra Pradesh",
    "IT Company Kurnool",
    "AVM Smart Solutions Location Kurnool",
    "Anand Founder AVM Smart"
  ],
  alternates: { canonical: "https://www.avmsmart.in/about" },
  openGraph: {
    title: "About AVM Smart | Digital Solutions Company",
    description: "Building technology solutions to power real business growth.",
    url: "https://www.avmsmart.in/about",
    siteName: "AVM Smart",
    images: ["https://www.avmsmart.in/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
