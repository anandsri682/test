import React from 'react';
import Hero from '@/components/hero/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import SolutionsSection from '@/components/home/SolutionsSection';
import FeaturedDemosSection from '@/components/home/FeaturedDemosSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="w-full bg-[#F4F7FA] text-slate-900 font-sans selection:bg-[#087FF5] selection:text-white overflow-x-hidden antialiased">
      {/* 1. White Executive Hero with Rotating Business Quotes */}
      <Hero />

      {/* 2. Core Capabilities / Services Section */}
      <ServicesSection />

      {/* 3. Strategic Growth Partnership / Solutions Section */}
      <SolutionsSection />

      {/* 4. Live Product Demos Showcase */}
      <FeaturedDemosSection />

      {/* 5. Featured Work / Portfolio Section */}
      <PortfolioSection />

      {/* 5. Dynamic Customer Reviews Marquee Section */}
      <ReviewsSection />

      {/* 6. Bottom CTA Banner */}
      <CTASection />
    </div>
  );
}