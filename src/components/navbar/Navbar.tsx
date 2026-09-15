'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Rocket } from 'lucide-react';
import ProjectModal from '../forms/ProjectModal';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* Top 3-Color Accent Stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00]" />

        {/* Main Nav Bar */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#ffff] backdrop-blur-md shadow-lg py-2.5 border-b border-slate-800'
              : 'bg-[#ffff] py-3.5 border-b border-slate-800'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 min-h-[44px]">
              <div className="relative w-44 sm:w-48 h-10 flex items-center">
                <Image
                  src="/logo.png"
                  alt="AVM Smart Solutions Logo"
                  width={100}
                  height={50}
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Nav Items */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`min-h-[44px] min-w-[44px] px-3.5 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center ${
                      isActive
                        ? 'text-white bg-[#087FF5] shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button (Min 44px touch target) */}
            <div className="hidden lg:flex items-center shrink-0">
              <button
                onClick={() => setProjectModalOpen(true)}
                className="min-h-[44px] px-6 py-2.5 bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] bg-[length:200%_auto] hover:bg-right text-white font-bold text-xs rounded-xl shadow-md hover:shadow-[#087FF5]/30 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Start a Project</span>
                <Rocket className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Button (Clean 3 lines, min 44x44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden min-w-[44px] min-h-[44px] p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Right-Side Sliding Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
            {/* Dark Backdrop */}
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Sliding Drawer Container (Width 80-85%, max 360px) */}
            <div className="relative w-[82%] max-w-[360px] h-full bg-[#0B1528] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-800 z-10">
              
              <div>
                {/* Drawer Top Row */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-800">
                  <div className="relative w-36 h-8 flex items-center">
                    <Image
                      src="/logo.png"
                      alt="AVM Smart Solutions"
                      width={140}
                      height={36}
                      className="object-contain"
                    />
                  </div>

                  {/* Close Button (Min 44x44px Touch Target) */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-w-[44px] min-h-[44px] p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`min-h-[44px] flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                          isActive
                            ? 'bg-[#087FF5] text-white'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-6 border-t border-slate-800 mt-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setProjectModalOpen(true);
                  }}
                  className="w-full min-h-[48px] py-3.5 bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Start a Project</span>
                  <Rocket className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Global Project Modal */}
      <ProjectModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </>
  );
}
