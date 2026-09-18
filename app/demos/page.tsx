import type { Metadata } from 'next';
import React from 'react';
import DemosClient from '@/components/pages/DemosClient';
import { COMPANY_DETAILS } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Live Product Demos | AVM Smart',
  description:
    'Explore live demos of digital products, business applications, websites and custom software solutions developed by AVM Smart.',
  alternates: {
    canonical: `${COMPANY_DETAILS.domain}/demos`,
  },
  openGraph: {
    title: 'Live Product Demos | AVM Smart',
    description:
      'Explore live demos of digital products, business applications, websites and custom software solutions developed by AVM Smart.',
    url: `${COMPANY_DETAILS.domain}/demos`,
    siteName: 'AVM Smart',
    type: 'website',
    images: [`${COMPANY_DETAILS.domain}/og-image.png`],
  },
};

export default function DemosPage() {
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: COMPANY_DETAILS.domain,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Demos',
        item: `${COMPANY_DETAILS.domain}/demos`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <DemosClient />
    </>
  );
}
