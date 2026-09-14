import type { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';

export const metadata: Metadata = {
  title: "Our Digital Services | Web, Mobile, Cloud & Marketing | AVM Smart",
  description: "Explore AVM Smart Solutions' core services: Web Development, Mobile Apps, Digital Marketing, Cloud & DevOps, UI/UX Design, and IT Consulting.",
  keywords: ["Website Development", "Mobile App Development", "Digital Marketing", "Cloud DevOps", "UI UX Design", "IT Consulting Hyderabad"],
  alternates: { canonical: "https://www.avmsmart.in/services" },
  openGraph: {
    title: "Our Digital Services | AVM Smart Solutions",
    description: "End-to-end digital solutions designed to transform your ideas into real-world business impact.",
    url: "https://www.avmsmart.in/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
