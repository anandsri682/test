import type { Metadata } from 'next';
import TeamClient from '@/components/pages/TeamClient';

export const metadata: Metadata = {
  title: "Meet Our Team | Leadership & Engineering | AVM Smart Solutions",
  description: "Meet the engineers, architects, and founders behind AVM Smart Solutions driving custom software, web platforms, and mobile apps.",
  keywords: ["AVM Smart Team", "Anand Founder AVM Smart", "Mahendra Cheerla", "Madhukar", "AVM Smart Leadership", "Software Engineers Hyderabad"],
  alternates: { canonical: "https://www.avmsmart.in/team" },
  openGraph: {
    title: "Meet Our Team | AVM Smart Solutions",
    description: "Meet the engineers, architects, and founders behind AVM Smart Solutions.",
    url: "https://www.avmsmart.in/team",
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
