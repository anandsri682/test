import type { Metadata } from "next";
import AboutPageClient from "@/components/pages/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | AVM Smart Team & Engineering Culture",
  description:
    "Meet the AVM Smart leadership, full-stack developers, UI/UX designers, and engineering leads building modern web and mobile applications.",
  alternates: {
    canonical: "https://www.avmsmart.in/about",
  },
  openGraph: {
    title: "About Us | AVM Smart Team & Engineering Culture",
    description:
      "Meet the AVM Smart leadership, full-stack developers, UI/UX designers, and engineering leads building modern web and mobile applications.",
    url: "https://www.avmsmart.in/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
