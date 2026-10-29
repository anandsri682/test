import React from 'react';
import Hero from '@/components/hero/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectProcess from '@/components/ProjectProcess';
import SolutionsSection from '@/components/home/SolutionsSection';
import FeaturedDemosSection from '@/components/home/FeaturedDemosSection';
import HomePricingSection from '@/components/home/HomePricingSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import CTASection from '@/components/home/CTASection';
import InfluencerPromoCard from '@/components/home/InfluencerPromoCard';

export default function HomePage() {
  return (
    <div className="w-full bg-[#F4F7FA] text-slate-900 font-sans selection:bg-[#087FF5] selection:text-white overflow-x-hidden antialiased">
      {/* 1. White Executive Hero with Rotating Business Quotes */}
      <Hero />

      {/* 2. Core Capabilities / Services Section */}
      <ServicesSection />

      {/* 3. From Concept to Scale: Our 6-Step Approach (Sticky Scroll Animation) */}
      <ProjectProcess />

      {/* 4. Service & Pricing Showcase */}
      <HomePricingSection />

      {/* 5. Strategic Growth Partnership / Solutions Section */}
      <SolutionsSection />

      {/* 6. Influencer Partner Promotion Card */}
      <InfluencerPromoCard />

      {/* 7. Featured Work / Portfolio Section */}
      {/* <PortfolioSection /> */}

      {/* 8. Dynamic Customer Reviews Marquee Section */}
      {/* <ReviewsSection /> */}

      {/* 9. Bottom CTA Banner */}
      {/* <CTASection /> */}
    </div>
  );
}