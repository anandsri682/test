'use client';

import React, { useEffect, useState } from 'react';
import { Star, User } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '@/data/siteData';
import { getApiUrl } from '@/lib/api';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);

  useEffect(() => {
    fetch(getApiUrl('/api/reviews'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section aria-labelledby="reviews-heading" className="py-20 bg-[#0B1528] text-white border-y border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#13B89A] mb-2 block">
          Client Feedback
        </span>
        <h2 id="reviews-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
          What Our Clients Say
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          Hover over any review card to pause scrolling.
        </p>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full overflow-hidden group py-4">
        {/* Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0B1528] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0B1528] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-6">
          {marqueeReviews.map((testimonial, idx) => {
            const borderAccents = ['border-l-4 border-l-[#087FF5]', 'border-l-4 border-l-[#13B89A]', 'border-l-4 border-l-[#FF6A00]'];
            const accentClass = borderAccents[idx % 3];

            return (
              <div
                key={`${testimonial.id || idx}-${idx}`}
                className={`w-[320px] sm:w-[380px] shrink-0 bg-slate-900 border border-slate-800 ${accentClass} p-6 sm:p-7 rounded-3xl shadow-lg hover:scale-102 hover:border-slate-700 transition-all duration-300 space-y-4 cursor-pointer`}
              >
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#FFC21A]">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#FFC21A]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-200 text-xs sm:text-sm italic leading-relaxed line-clamp-3">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Neutral Profile Avatar Icon (NO REAL PHOTOS) */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[#087FF5] shrink-0">
                    <User className="w-5 h-5 text-[#087FF5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{testimonial.name}</h3>
                    <p className="text-[11px] font-semibold text-[#13B89A]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
