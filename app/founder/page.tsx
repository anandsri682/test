import type { Metadata } from 'next';
import FounderClient from '@/components/pages/FounderClient';

export const metadata: Metadata = {
  title: 'A. Anand Raju | Founder & CEO of AVM Smart Solutions',
  description:
    'A. Anand Raju is the Founder & CEO of AVM Smart Solutions, a technology entrepreneur, software developer, and technology content creator behind Mr Anand Tech in Telugu.',
  keywords: [
    'A. Anand Raju',
    'Anand Raju AVM Smart',
    'Founder of AVM Smart Solutions',
    'AVM Smart CEO',
    'Mr Anand Tech in Telugu',
    'Anand Raju YouTuber',
    'Software Developer Kurnool',
    'Technology Entrepreneur'
  ],
  alternates: {
    canonical: 'https://www.avmsmart.in/founder/',
  },
  openGraph: {
    title: 'A. Anand Raju | Founder & CEO of AVM Smart Solutions',
    description:
      'A. Anand Raju is the Founder & CEO of AVM Smart Solutions, a technology entrepreneur, software developer, and YouTube content creator.',
    url: 'https://www.avmsmart.in/founder/',
    siteName: 'AVM Smart Solutions',
    images: ['https://www.avmsmart.in/images/profiles/anand.png'],
    type: 'profile',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.avmsmart.in/founder/#person',
  name: 'A. Anand Raju',
  url: 'https://www.avmsmart.in/founder/',
  image: 'https://www.avmsmart.in/images/profiles/anand.png',
  jobTitle: 'Founder & CEO',
  description:
    'A. Anand Raju is the Founder & CEO of AVM Smart Solutions and a technology entrepreneur, software developer and YouTube creator.',
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://www.avmsmart.in/#organization',
    name: 'AVM Smart Solutions',
    url: 'https://www.avmsmart.in/',
  },
  sameAs: [
    'https://www.linkedin.com/in/arekanti-anand-raju-2615a0377/',
    'https://github.com/anandsri682',
    'https://youtube.com/@mr_anandtechintelugu',
    'https://instagram.com/techwithmranand',
    'https://facebook.com/anandsri682',
  ],
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://www.avmsmart.in/founder/#profilepage',
  url: 'https://www.avmsmart.in/founder/',
  name: 'A. Anand Raju | Founder & CEO of AVM Smart Solutions',
  mainEntity: {
    '@id': 'https://www.avmsmart.in/founder/#person',
  },
};

export default function FounderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <FounderClient />
    </>
  );
}
