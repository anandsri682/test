import type { Metadata } from "next";
import ServicesPageClient from "@/components/pages/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services & Pricing | Website, App & Software Development",
  description:
    "Explore AVM Smart transparent service packages and pricing for website development, mobile app development, software solutions, branding, SEO, and website maintenance.",
  alternates: {
    canonical: "https://www.avmsmart.in/services",
  },
  openGraph: {
    title: "Services & Pricing | AVM Smart Digital Solutions",
    description:
      "Explore transparent pricing and packages for website development, mobile apps, custom software, branding, SEO, and maintenance.",
    url: "https://www.avmsmart.in/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
