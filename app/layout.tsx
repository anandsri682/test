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
    default: "AVM Smart Solutions | Digital Solutions for Real Growth",
    template: "%s | AVM Smart Solutions",
  },
  description:
    "We design, develop, and deliver digital solutions that help businesses work smarter, grow faster, and create a better tomorrow.",
  keywords: [
    "AVM Smart",
    "AVM Smart Solutions",
    "avmsmart.in",
    "Website Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Marketing",
    "Cloud Solutions",
    "Software Agency Kurnool",
    "G Pulla Reddy Engineering College Incubation",
  ],
  authors: [{ name: "AVM Smart Solutions", url: COMPANY_DETAILS.domain }],
  creator: "AVM Smart Solutions",
  publisher: "AVM Smart Solutions",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: COMPANY_DETAILS.domain,
  },
  openGraph: {
    title: "AVM Smart Solutions | Digital Solutions for Real Growth",
    description:
      "We design, develop, and deliver digital solutions that help businesses work smarter, grow faster, and create a better tomorrow.",
    url: COMPANY_DETAILS.domain,
    siteName: "AVM Smart Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${COMPANY_DETAILS.domain}/logo.png`,
        width: 1200,
        height: 630,
        alt: "AVM Smart Solutions Corporate Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVM Smart Solutions | Technology That Moves Business Forward",
    description:
      "We design, develop, and deliver digital solutions that help businesses work smarter, grow faster, and create a better tomorrow.",
    images: [`${COMPANY_DETAILS.domain}/logo.png`],
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
      "name": COMPANY_DETAILS.name,
      "url": COMPANY_DETAILS.domain,
      "logo": `${COMPANY_DETAILS.domain}/logo.png`,
      "description": COMPANY_DETAILS.subtitle,
      "email": COMPANY_DETAILS.email,
      "telephone": "+91-8978040537",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Innovation and Incubation Center, G Pulla Reddy Engineering College, Near Pasupula Village, Kurnool - Nandyal Main Road",
        "addressLocality": "Kurnool",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "518007",
        "addressCountry": "IN"
      },
      "sameAs": Object.values(COMPANY_DETAILS.socials),
    },
    {
      "@type": "WebSite",
      "@id": `${COMPANY_DETAILS.domain}/#website`,
      "url": COMPANY_DETAILS.domain,
      "name": COMPANY_DETAILS.name,
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
        <link rel="icon" href="/icon.png" type="image/png" />
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
