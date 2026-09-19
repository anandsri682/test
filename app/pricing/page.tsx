import type { Metadata } from 'next';
import PricingClient from '@/components/pages/PricingClient';

export const metadata: Metadata = {
  title: "Transparent Pricing & Plans | AVM Smart Solutions",
  description: "Explore fair, transparent pricing packages for Website Development, Mobile App Development, Digital Marketing, and Logo Design with zero hidden charges.",
  keywords: [
    "AVM Smart Pricing",
    "Website Development Cost Kurnool",
    "Mobile App Development Pricing",
    "Digital Marketing Packages AP",
    "Logo Design Pricing"
  ],
  alternates: { canonical: "https://www.avmsmart.in/pricing" },
  openGraph: {
    title: "Transparent Pricing & Plans | AVM Smart Solutions",
    description: "Explore fair, transparent pricing for Web, App, Marketing, and Branding.",
    url: "https://www.avmsmart.in/pricing",
    siteName: "AVM Smart Solutions",
    images: ["https://www.avmsmart.in/og-image.png"],
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
