'use client';

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StarfieldBackground from "@/components/common/StarfieldBackground";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#07070a] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between overflow-x-hidden antialiased">
      <StarfieldBackground />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar />

        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32 max-w-3xl mx-auto my-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Error 404 • Page Not Found</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-white mb-4">
            40<span className="text-amber-400">4</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Looking for Digital Engineering Excellence?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 shadow-lg shadow-amber-950/60 transition-all duration-300"
            >
              <Home className="w-4 h-4 text-slate-950" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-white/5 border border-white/15 hover:bg-white/10 transition-all duration-300"
            >
              <span>Explore Services & Pricing</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
