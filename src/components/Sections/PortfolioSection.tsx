'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const PORTFOLIO_CATEGORIES = [
  "All",
  "Fashion",
  "Food",
  "Furniture",
  "Education",
  "Travel",
  "Healthcare",
  "Finance",
  "Gym",
  "Real Estate",
  "Restaurant"
];

const PORTFOLIO_PROJECTS = [
  { title: "Luxe Couture", category: "Fashion", image: "/images/image1.png", desc: "High-end fashion e-commerce experience with smooth page transitions." },
  { title: "Gourmet Bites", category: "Food", image: "/images/image2.png", desc: "Artisanal food delivery platform with live order tracking." },
  { title: "Nordic Living", category: "Furniture", image: "/images/image3.png", desc: "Minimalist interior furniture showroom featuring 3D previews." },
  { title: "EduPulse Learning", category: "Education", image: "/images/image4.png", desc: "Interactive LMS dashboard designed for remote students." },
  { title: "Wanderlust Excursions", category: "Travel", image: "/images/image5.png", desc: "Luxury travel booking engine with real-time availability." },
  { title: "MediCare Plus", category: "Healthcare", image: "/images/image1.png", desc: "Telehealth management platform with HIPAA-compliant security." },
  { title: "Aura Capital", category: "Finance", image: "/images/image2.png", desc: "Next-gen fintech analytics portal with real-time metrics." },
  { title: "IronPulse Fitness", category: "Gym", image: "/images/image3.png", desc: "Membership app with workout logging and scheduling." },
  { title: "Horizon Estates", category: "Real Estate", image: "/images/image4.png", desc: "Luxury villa listings portal with interactive virtual tours." },
  { title: "SmartDine OS", category: "Restaurant", image: "/images/image5.png", desc: "Comprehensive POS & table reservation web application." }
];

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPortfolio = selectedCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Featured Work</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
          Explore our recent digital transformations across key global industries.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-950/60"
                  : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPortfolio.map((proj) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
              key={proj.title}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-[#0c0c12] border border-white/10 overflow-hidden shadow-xl"
            >
              <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-amber-950/30 via-slate-900 to-black flex items-center justify-center">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="max-h-[85%] max-w-[85%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-[10px] font-bold text-amber-400 border border-amber-500/30">
                  {proj.category}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                <p className="text-slate-400 text-xs mb-6 line-clamp-2">{proj.desc}</p>

                <div className="flex items-center gap-3">
                  <a
                    href="#contact"
                    className="flex-1 py-2 text-center bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 text-xs font-black rounded-lg border border-amber-500/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="#contact"
                    className="px-4 py-2 border border-white/10 hover:border-white/30 text-slate-300 text-xs font-bold rounded-lg transition-all"
                  >
                    Details
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
