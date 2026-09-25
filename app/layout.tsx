import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY_DETAILS } from "@/data/siteData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B2A5B",
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_DETAILS.domain),
  title: {
    default: "AVM Smart | Web, App & Digital Solutions",
    template: "%s | AVM Smart",
  },
  description:
    "AVM Smart is a digital solutions company offering website development, mobile app development, custom software, SEO and technology solutions for businesses.",
  keywords: [
    "AVM Smart",
    "AVM Smart Solutions",
    "avmsmart",
    "avmsmart.in",
    "Website Development Kurnool",
    "Mobile App Development Kurnool",
    "Software Development Company Kurnool",
    "Web Design Kurnool",
    "SEO Services Kurnool",
    "Digital Solutions Kurnool",
    "AVM Smart Solutions Location Kurnool",
  ],
  authors: [{ name: "AVM Smart", url: COMPANY_DETAILS.domain }],
  creator: "AVM Smart",
  publisher: "AVM Smart Solutions",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: COMPANY_DETAILS.domain,
  },
  openGraph: {
    title: "AVM Smart | Web, App & Digital Solutions",
    description:
      "AVM Smart is a digital solutions company offering website development, mobile app development, custom software, SEO and technology solutions for businesses.",
    url: COMPANY_DETAILS.domain,
    siteName: "AVM Smart",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${COMPANY_DETAILS.domain}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AVM Smart Corporate Logo & Identity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVM Smart | Web, App & Digital Solutions",
    description:
      "AVM Smart is a digital solutions company offering website development, mobile app development, custom software, SEO and technology solutions for businesses.",
    images: [`${COMPANY_DETAILS.domain}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${COMPANY_DETAILS.domain}/#organization`,
      "name": "AVM Smart",
      "alternateName": "AVM Smart Solutions",
      "url": `${COMPANY_DETAILS.domain}/`,
      "logo": `${COMPANY_DETAILS.domain}/logo.png`,
      "image": `${COMPANY_DETAILS.domain}/og-image.png`,
      "description":
        "AVM Smart is a digital solutions company providing website development, mobile app development, custom software, SEO and technology solutions for businesses.",
      "email": COMPANY_DETAILS.email,
      "telephone": "+91-8978040537",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "AVM Smart Solutions",
        "addressLocality": "Kurnool",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "518002",
        "addressCountry": "IN",
      },
      "sameAs": Object.values(COMPANY_DETAILS.socials),
      "founder": {
        "@type": "Person",
        "@id": `${COMPANY_DETAILS.domain}/founder/#person`,
        "name": "A. Anand Raju",
        "jobTitle": "Founder & CEO",
        "url": `${COMPANY_DETAILS.domain}/founder/`,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${COMPANY_DETAILS.domain}/#localbusiness`,
      "name": "AVM Smart",
      "alternateName": "AVM Smart Solutions",
      "url": `${COMPANY_DETAILS.domain}/`,
      "logo": `${COMPANY_DETAILS.domain}/logo.png`,
      "image": `${COMPANY_DETAILS.domain}/og-image.png`,
      "telephone": "+91-8978040537",
      "email": COMPANY_DETAILS.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "AVM Smart Solutions",
        "addressLocality": "Kurnool",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "518002",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 15.7749214,
        "longitude": 78.0582479,
      },
      "priceRange": "$$",
    },
    {
      "@type": "WebSite",
      "@id": `${COMPANY_DETAILS.domain}/#website`,
      "url": `${COMPANY_DETAILS.domain}/`,
      "name": "AVM Smart",
      "alternateName": "AVM Smart Solutions",
      "publisher": {
        "@id": `${COMPANY_DETAILS.domain}/#organization`,
      },
      "inLanguage": "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F4F7FA] text-slate-900 selection:bg-[#087FF5] selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
