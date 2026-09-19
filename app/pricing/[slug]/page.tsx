import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRICING_DETAILS } from '@/data/pricingData';
import PricingDetailClient from '@/components/pages/PricingDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'website-development' },
    { slug: 'app-development' },
    { slug: 'digital-marketing' },
    { slug: 'logo-design' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = PRICING_DETAILS[slug];

  if (!data) {
    return {
      title: 'Pricing Page Not Found | AVM Smart',
    };
  }

  return {
    title: `${data.title} | AVM Smart Solutions`,
    description: data.description,
    keywords: [
      data.title,
      `${data.eyebrow} Pricing`,
      'AVM Smart Packages',
      'Software Development Cost Kurnool',
    ],
    alternates: { canonical: `https://www.avmsmart.in/pricing/${slug}` },
    openGraph: {
      title: `${data.title} | AVM Smart Solutions`,
      description: data.description,
      url: `https://www.avmsmart.in/pricing/${slug}`,
      siteName: 'AVM Smart Solutions',
      images: ['https://www.avmsmart.in/og-image.png'],
    },
  };
}

export default async function PricingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = PRICING_DETAILS[slug];

  if (!data) {
    notFound();
  }

  return <PricingDetailClient data={data} />;
}
