import type { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';

export const metadata: Metadata = {
  title: "Services | AVM Smart",
  description: "Explore AVM Smart's core services: Website Development, Mobile App Development, Custom Software, SEO & Digital Marketing, Cloud & DevOps, and IT Consulting.",
  keywords: [
    "Website Development Kurnool",
    "Mobile App Development Kurnool",
    "Custom Software Development",
    "SEO Services Kurnool",
    "Digital Marketing Kurnool",
    "Cloud DevOps Solutions",
    "UI UX Design Services"
  ],
  alternates: { canonical: "https://www.avmsmart.in/services" },
  openGraph: {
    title: "Services | AVM Smart",
    description: "End-to-end digital solutions designed to transform your ideas into real-world business impact.",
    url: "https://www.avmsmart.in/services",
    siteName: "AVM Smart",
    images: ["https://www.avmsmart.in/og-image.png"],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
