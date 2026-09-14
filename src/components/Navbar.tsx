'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Rocket } from 'lucide-react';
import QuoteModal from './QuoteModal';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team', badge: 'Meet' },
  { label: 'Services', href: '/services', badge: 'Hot' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">

        {/* =========================================================
            TOP BRAND COLOR LINE
            Blue → Teal → Green → Orange
        ========================================================= */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#087FF5] via-[#13B89A] via-[#63C745] to-[#FF6A00]" />

        {/* =========================================================
            MAIN NAVBAR
        ========================================================= */}
        <div
          className={`
            w-full
            bg-white/95
            backdrop-blur-xl
            border-b
            border-slate-200
            transition-all
            duration-300
            ${isScrolled
              ? 'shadow-md py-2'
              : 'shadow-sm py-3'
            }
          `}
        >
          <div
            className="
              max-w-7xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              flex
              items-center
              justify-between
              gap-4
            "
          >

            {/* =====================================================
                LOGO
            ===================================================== */}
            <Link
              href="/"
              className="
                flex
                items-center
                shrink-0
                group
                focus:outline-none
              "
              aria-label="AVM Smart Solutions Home"
            >
              <div
                className="
                  relative
                  w-40
                  sm:w-48
                  h-11
                  flex
                  items-center
                "
              >
                <Image
                  src="/logo.png"
                  alt="AVM Smart Solutions"
                  width={350}
                  height={50}
                  priority
                  className="
                    w-auto
                    h-10
                    sm:h-11
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-[1.03]
                  "
                />
              </div>
            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION
            ===================================================== */}
            <nav
              className="
                hidden
                xl:flex
                items-center
                gap-1
                p-1
                bg-slate-50
                border
                border-slate-200
                rounded-full
              "
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative
                      px-3.5
                      py-2
                      text-xs
                      font-semibold
                      rounded-full
                      transition-all
                      duration-200
                      flex
                      items-center
                      gap-1.5
                      whitespace-nowrap

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-[#087FF5]
                            to-[#13B89A]
                            text-white
                            shadow-md
                            font-bold
                          `
                          : `
                            text-slate-600
                            hover:text-[#0B2A5B]
                            hover:bg-white
                            hover:shadow-sm
                          `
                      }
                    `}
                  >
                    <span>{item.label}</span>

                    {/* Badge */}
                    {item.badge && !isActive && (
                      <span
                        className="
                          px-1.5
                          py-0.5
                          text-[8px]
                          font-black
                          uppercase
                          tracking-wide
                          rounded-full
                          bg-[#FF6A00]/10
                          text-[#F05A00]
                          border
                          border-[#FF6A00]/20
                        "
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <span
                        className="
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-white
                          opacity-90
                        "
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* =====================================================
                DESKTOP CTA
            ===================================================== */}
            <div className="hidden xl:flex items-center shrink-0">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-2.5
                  rounded-full
                  bg-[#087FF5]
                  hover:bg-[#066FD6]
                  text-white
                  text-xs
                  font-bold
                  shadow-sm
                  hover:shadow-lg
                  hover:shadow-[#087FF5]/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  active:scale-95
                "
              >
                <span>Start a Project</span>

                <Rocket
                  className="
                    w-3.5
                    h-3.5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-0.5
                  "
                />
              </button>
            </div>

            {/* =====================================================
                MOBILE MENU BUTTON
            ===================================================== */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="
                xl:hidden
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                text-[#0B2A5B]
                border
                border-slate-200
                bg-white
                hover:bg-slate-50
                hover:border-[#087FF5]/30
                transition-all
                duration-200
              "
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* =========================================================
            MOBILE NAVIGATION
        ========================================================= */}
        {mobileMenuOpen && (
          <div
            className="
              xl:hidden
              fixed
              inset-x-0
              top-[66px]
              bottom-0
              bg-white
              border-b
              border-slate-200
              shadow-2xl
              overflow-y-auto
              z-40
            "
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

              {/* Mobile menu header */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-5
                  pb-4
                  border-b
                  border-slate-100
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-slate-50
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Image
                    src="/logo.png"
                    alt="AVM Smart"
                    width={36}
                    height={36}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#0B2A5B]">
                    AVM Smart Solutions
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Digital Solutions for Growth
                  </p>
                </div>
              </div>

              {/* Mobile navigation links */}
              <nav
                className="space-y-2"
                aria-label="Mobile navigation"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex
                        items-center
                        justify-between
                        px-4
                        py-3.5
                        rounded-xl
                        text-sm
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? `
                              bg-gradient-to-r
                              from-[#087FF5]
                              to-[#13B89A]
                              text-white
                              font-bold
                              shadow-md
                            `
                            : `
                              text-slate-700
                              font-medium
                              hover:bg-slate-50
                              hover:text-[#087FF5]
                            `
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <span>{item.label}</span>

                        {item.badge && (
                          <span
                            className={`
                              px-2
                              py-0.5
                              text-[9px]
                              font-black
                              uppercase
                              rounded-full

                              ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-[#FF6A00]/10 text-[#F05A00]'
                              }
                            `}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <ChevronRight
                        className={`
                          w-4
                          h-4
                          transition-transform
                          duration-200
                          ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-400'
                          }
                        `}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* ===================================================
                  MOBILE CTA
              =================================================== */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setQuoteModalOpen(true);
                  }}
                  className="
                    w-full
                    py-3.5
                    rounded-xl
                    bg-[#087FF5]
                    hover:bg-[#066FD6]
                    text-white
                    font-bold
                    text-sm
                    shadow-md
                    hover:shadow-lg
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    gap-2
                    active:scale-[0.98]
                  "
                >
                  <span>Start a Project</span>
                  <Rocket className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile brand colors */}
              <div
                className="
                  mt-6
                  h-1
                  rounded-full
                  bg-gradient-to-r
                  from-[#087FF5]
                  via-[#13B89A]
                  via-[#63C745]
                  to-[#FF6A00]
                "
              />
            </div>
          </div>
        )}
      </header>

      {/* ===========================================================
          PROJECT REQUEST MODAL
      =========================================================== */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}