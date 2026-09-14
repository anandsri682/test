'use client';

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StarfieldBackground from "@/components/common/StarfieldBackground";
import ServicesPricingSection from "@/components/Sections/ServicesPricingSection";
import ContactSection from "@/components/Sections/ContactSection";

export default function ServicesPageClient() {
  return (
    <div className="relative min-h-screen bg-[#07070a] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden antialiased">
      <StarfieldBackground />

      <div className="relative z-10">
        <Navbar />

        <main className="pt-20 sm:pt-24">
          <ServicesPricingSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
