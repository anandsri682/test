import type { Metadata } from 'next';
import TeamClient from '@/components/pages/TeamClient';

export const metadata: Metadata = {
  title: "Our Team | AVM Smart",
  description: "Meet the engineers, architects, and leadership team behind AVM Smart driving custom software, web platforms, and mobile apps in Kurnool, AP.",
  keywords: [
    "AVM Smart Team",
    "AVM Smart Leadership",
    "Software Engineers Kurnool",
    "Anand Founder AVM Smart",
    "Mahendra Cheerla",
    "Madhukar"
  ],
  alternates: { canonical: "https://www.avmsmart.in/team" },
  openGraph: {
    title: "Our Team | AVM Smart",
    description: "Meet the engineers, architects, and leadership behind AVM Smart.",
    url: "https://www.avmsmart.in/team",
    siteName: "AVM Smart",
    images: ["https://www.avmsmart.in/og-image.png"],
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
