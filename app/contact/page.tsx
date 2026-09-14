import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';

export const metadata: Metadata = {
  title: "Contact Us | Start a Project | AVM Smart Solutions",
  description: "Get in touch with AVM Smart Solutions for software development inquiries, technical consultations, project estimations, or office location details.",
  keywords: ["Contact AVM Smart", "Hire Software Developers", "Software Office Hyderabad", "AVM Smart Contact Number", "Inquire Web Development"],
  alternates: { canonical: "https://www.avmsmart.in/contact" },
  openGraph: {
    title: "Contact Us | AVM Smart Solutions",
    description: "Start a conversation with our engineering team.",
    url: "https://www.avmsmart.in/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
