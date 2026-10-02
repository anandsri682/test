import type { Metadata } from 'next';
import OfferLandingClient from '@/components/pages/OfferLandingClient';

export const metadata: Metadata = {
  title: 'Website Development Offer for Just ₹2,499 | AVM Smart',
  description:
    'Launch your business website for just ₹2,499 with WhatsApp integration, 3 months of maintenance, and a free domain included for the first year.',
  keywords: [
    'AVM Smart Website Offer',
    'Website Development ₹2499',
    'Affordable Website Package',
    'Website Development Kurnool',
    'Small Business Website Offer',
    'WhatsApp Integration Website',
    'Website with Free Domain'
  ],
  alternates: {
    canonical: 'https://www.avmsmart.in/offer/',
  },
  openGraph: {
    title: 'Website Development Offer for Just ₹2,499 | AVM Smart',
    description:
      'Launch your business website for just ₹2,499 with WhatsApp integration, 3 months of maintenance, and a free domain for the first year.',
    url: 'https://www.avmsmart.in/offer/',
    siteName: 'AVM Smart Solutions',
    images: ['https://www.avmsmart.in/og-image.png'],
    type: 'website',
  },
};

export default function OfferPage() {
  return <OfferLandingClient />;
}
