import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";

export const metadata: Metadata = {
  title: "AVM Smart | Website & Mobile App Development Solutions",
  description:
    "High-performance websites, mobile apps, and custom software engineered for modern business growth. We blend engineering mastery with luxury UI/UX aesthetics.",
  alternates: {
    canonical: "https://www.avmsmart.in/",
  },
  openGraph: {
    title: "AVM Smart | Website & Mobile App Development Solutions",
    description:
      "High-performance websites, mobile apps, and custom software engineered for modern business growth.",
    url: "https://www.avmsmart.in/",
  },
};

export default function Home() {
  return <HomePageClient />;
}