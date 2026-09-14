'use client';

import React from "react";
import Link from "next/link";

const BRAND = {
  name: "AVM Smart",
  shortName: "AVM"
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050508] pt-14 sm:pt-16 pb-8 px-4 sm:px-6 text-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-black text-lg text-white mb-4">
            {BRAND.name} <span className="text-amber-400">Solutions</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            High performance digital engineering, software solutions, and bespoke UI/UX design for modern businesses.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Services</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/services" className="hover:text-amber-400 transition-colors">Logo & Branding</Link></li>
            <li><Link href="/services" className="hover:text-amber-400 transition-colors">Website Development</Link></li>
            <li><Link href="/services" className="hover:text-amber-400 transition-colors">Mobile App Development</Link></li>
            <li><Link href="/services" className="hover:text-amber-400 transition-colors">Software Solutions</Link></li>
            <li><Link href="/services" className="hover:text-amber-400 transition-colors">SEO Optimization</Link></li>
            <li><Link href="/services" className="hover:text-amber-400 transition-colors">Website Maintenance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services & Pricing</Link></li>
            <li><Link href="/#why-us" className="hover:text-white transition-colors">Why Us</Link></li>
            <li><Link href="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
            <li><Link href="/#process" className="hover:text-white transition-colors">Process</Link></li>
            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Newsletter</h4>
          <p className="text-xs text-slate-400 mb-3">Subscribe for tech trends & digital growth insights.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-[#0e0e14] border border-white/10 rounded-lg px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
