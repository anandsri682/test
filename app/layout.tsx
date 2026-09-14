import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F59E0B",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.avmsmart.in"),
  title: {
    default: "AVM Smart | Website & Mobile App Development Solutions",
    template: "%s | AVM Smart",
  },
  description:
    "AVM Smart provides software and digital solutions including custom website development, mobile app development, web applications, UI/UX design, SEO optimization, and website maintenance.",
  keywords: [
    "AVM Smart",
    "AVM Smart website",
    "avmsmart.in",
    "Website Development",
    "Mobile App Development",
    "Web Application Development",
    "UI/UX Design",
    "SEO Optimization",
    "Logo Design",
    "Brand Identity",
    "Website Maintenance",
    "Custom Software Solutions",
  ],
  authors: [{ name: "AVM Smart", url: "https://www.avmsmart.in" }],
  creator: "AVM Smart",
  publisher: "AVM Smart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.avmsmart.in/",
  },
  openGraph: {
    title: "AVM Smart | Website & Mobile App Development Solutions",
    description:
      "High-performance websites, mobile apps, and custom software engineered for modern business growth.",
    url: "https://www.avmsmart.in/",
    siteName: "AVM Smart",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.avmsmart.in/images/image1.png",
        width: 1200,
        height: 630,
        alt: "AVM Smart - Website & Mobile App Development Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVM Smart | Website & Mobile App Development Solutions",
    description:
      "High-performance websites, mobile apps, and custom software engineered for modern business growth.",
    images: ["https://www.avmsmart.in/images/image1.png"],
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
      "@id": "https://www.avmsmart.in/#organization",
      "name": "AVM Smart",
      "url": "https://www.avmsmart.in/",
      "logo": "https://www.avmsmart.in/favicon.ico",
      "description":
        "AVM Smart provides website development, mobile app development, custom software solutions, UI/UX design, SEO optimization, and website maintenance.",
      "email": "contact@thefreelancingmind.com",
      "sameAs": [
        "https://www.linkedin.com/in/arekanti-anand-raju-2615a0377/",
        "https://github.com/anandsri682",
        "https://youtube.com/@mr_anandtechintelugu",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.avmsmart.in/#website",
      "url": "https://www.avmsmart.in/",
      "name": "AVM Smart",
      "publisher": {
        "@id": "https://www.avmsmart.in/#organization",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
