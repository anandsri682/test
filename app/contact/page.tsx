import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';

export const metadata: Metadata = {
  title: "Contact AVM Smart | Get in Touch",
  description: "Get in touch with AVM Smart for software development inquiries, technical consultations, project estimations, or office location details in Kurnool, AP.",
  keywords: [
    "Contact AVM Smart",
    "AVM Smart Solutions Contact",
    "Software Company Kurnool Address",
    "AVM Smart Phone Number",
    "Hire Web Developers Kurnool",
    "AVM Smart Solutions Location Kurnool"
  ],
  alternates: { canonical: "https://www.avmsmart.in/contact" },
  openGraph: {
    title: "Contact AVM Smart | Get in Touch",
    description: "Start a project or consultation with our engineering team.",
    url: "https://www.avmsmart.in/contact",
    siteName: "AVM Smart",
    images: ["https://www.avmsmart.in/og-image.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
