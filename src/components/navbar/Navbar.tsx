'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Rocket } from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team', badge: 'Meet' },
  { label: 'Services', href: '/services', badge: 'Hot' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Demos', href: '/demos', badge: 'Live' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  /* ================================================================
     SCROLL
  ================================================================ */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  /* ================================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ================================================================ */

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);


  /* ================================================================
     LOCK BODY SCROLL WHEN DRAWER IS OPEN
  ================================================================ */

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


  /* ================================================================
     ACTIVE ROUTE
  ================================================================ */

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };


  return (
    <>
      {/* ============================================================
          HEADER
      ============================================================ */}

      <header className="sticky top-0 z-50 w-full">


        {/* ==========================================================
            TOP BRAND LINE
        ========================================================== */}

        <div className="h-[3px] w-full bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00]" />


        {/* ==========================================================
            MAIN NAVBAR
        ========================================================== */}

        <div
          className={`
            w-full
            border-b
            border-slate-200
            bg-white
            transition-all
            duration-300
            ${
              isScrolled
                ? 'py-2 shadow-md'
                : 'py-3 shadow-sm'
            }
          `}
        >

          <div
            className="
              mx-auto
              flex
              max-w-7xl
              items-center
              justify-between
              gap-4
              px-4
              sm:px-6
              lg:px-8
            "
          >


            {/* ======================================================
                LOGO
            ====================================================== */}

            <Link
              href="/"
              aria-label="AVM Smart Solutions Home"
              className="group flex shrink-0 items-center"
            >

              <Image
                src="/logo.png"
                alt="AVM Smart Solutions"
                width={350}
                height={250}
                priority
                className="
                  h-15
                  w-auto
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-[1.03]
                  sm:h-11
                "
              />

            </Link>


            {/* ======================================================
                DESKTOP NAVIGATION
                DESKTOP ONLY
            ====================================================== */}

            <nav
              aria-label="Main navigation"
              className="
                hidden
                items-center
                gap-1
                rounded-full
                border
                border-slate-200
                bg-slate-50
                p-1
                xl:flex
              "
            >

              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative
                      flex
                      items-center
                      gap-1.5
                      whitespace-nowrap
                      rounded-full
                      px-3.5
                      py-2
                      text-xs
                      font-semibold
                      transition-all
                      duration-200

                      ${
                        active
                          ? 'bg-[#087FF5] font-bold text-white shadow-md'
                          : 'text-slate-600 hover:bg-white hover:text-[#0B2A5B] hover:shadow-sm'
                      }
                    `}
                  >

                    <span>
                      {item.label}
                    </span>


                    {item.badge && !active && (
                      <span
                        className="
                          rounded-full
                          border
                          border-[#FF6A00]/20
                          bg-[#FF6A00]/10
                          px-1.5
                          py-0.5
                          text-[8px]
                          font-black
                          uppercase
                          tracking-wide
                          text-[#F05A00]
                        "
                      >
                        {item.badge}
                      </span>
                    )}


                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}

                  </Link>
                );
              })}

            </nav>


            {/* ======================================================
                DESKTOP CTA
            ====================================================== */}

            <div className="hidden shrink-0 xl:flex">

              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#087FF5]
                  px-6
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#066FD6]
                  hover:shadow-lg
                "
              >

                <span>
                  Start a Project
                </span>

                <Rocket
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-1
                  "
                />

              </button>

            </div>


            {/* ======================================================
                MOBILE MENU BUTTON
                NO BOX
                NO BORDER
            ====================================================== */}

            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? 'Close menu'
                  : 'Open menu'
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                setMobileMenuOpen((value) => !value);
              }}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                border-0
                bg-transparent
                p-0
                text-[#0B2A5B]
                outline-none
                xl:hidden
              "
            >

              {mobileMenuOpen ? (
                <X
                  className="
                    h-7
                    w-7
                    stroke-[1.8]
                  "
                />
              ) : (
                <Menu
                  className="
                    h-7
                    w-7
                    stroke-[1.8]
                  "
                />
              )}

            </button>

          </div>

        </div>


        {/* ============================================================
            MOBILE BACKDROP
        ============================================================ */}

        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`
            fixed
            inset-0
            z-[60]
            bg-black/20
            transition-opacity
            duration-300
            xl:hidden

            ${
              mobileMenuOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            }
          `}
        />


        {/* ============================================================
            MOBILE SIDE MENU
            SLIDES FROM RIGHT
        ============================================================ */}

        <aside
          className={`
            fixed
            right-0
            top-0
            z-[70]
            flex
            h-screen
            w-[82%]
            max-w-[360px]
            flex-col
            overflow-y-auto
            bg-white
            shadow-[-12px_0_35px_rgba(0,0,0,0.12)]
            transition-transform
            duration-300
            ease-out
            xl:hidden

            ${
              mobileMenuOpen
                ? 'translate-x-0'
                : 'translate-x-full'
            }
          `}
        >


          {/* ==========================================================
              MOBILE DRAWER HEADER
          ========================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-slate-100
              px-5
              py-4
            "
          >

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >

              <Image
                src="/logo.png"
                alt="AVM Smart Solutions"
                width={180}
                height={50}
                priority
                className="h-10 w-auto object-contain"
              />

            </Link>


            {/* Plain X */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                border-0
                bg-transparent
                p-0
                text-[#0B2A5B]
                outline-none
                active:scale-90
              "
            >

              <X
                className="
                  h-7
                  w-7
                  stroke-[1.8]
                "
              />

            </button>

          </div>


          {/* ==========================================================
              COMPANY INFORMATION
          ========================================================== */}

          <div className="px-5 pt-6">

            <div
              className="
                flex
                items-center
                gap-3
                border-b
                border-slate-100
                pb-5
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                "
              >

                <Image
                  src="/logo.png"
                  alt="AVM Smart"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />

              </div>


              <div>

                <p className="text-sm font-bold text-[#0B2A5B]">
                  AVM Smart Solutions
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Digital Solutions for Growth
                </p>

              </div>

            </div>

          </div>


          {/* ==========================================================
              MOBILE LINKS
          ========================================================== */}

          <nav
            aria-label="Mobile navigation"
            className="px-5 pt-5"
          >

            <div className="space-y-1">

              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex
                      min-h-[52px]
                      items-center
                      justify-between
                      rounded-xl
                      px-4
                      text-sm
                      transition-colors
                      duration-200

                      ${
                        active
                          ? 'bg-[#087FF5] font-bold text-white shadow-[0_5px_15px_rgba(8,127,245,0.18)]'
                          : 'font-medium text-[#0B2A5B] hover:bg-slate-50 hover:text-[#087FF5]'
                      }
                    `}
                  >

                    <div className="flex items-center gap-2.5">

                      <span>
                        {item.label}
                      </span>

                      {item.badge && (
                        <span
                          className={`
                            rounded-full
                            px-2
                            py-0.5
                            text-[9px]
                            font-black
                            uppercase

                            ${
                              active
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
                        h-4
                        w-4
                        ${
                          active
                            ? 'text-white'
                            : 'text-slate-400'
                        }
                      `}
                    />

                  </Link>
                );
              })}

            </div>

          </nav>


          {/* ==========================================================
              MOBILE CTA
          ========================================================== */}

          <div className="mt-auto px-5 pb-6 pt-6">

            <div className="mb-5 h-px w-full bg-slate-200" />

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#087FF5]
                px-5
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-[0_6px_16px_rgba(8,127,245,0.18)]
                transition-all
                duration-300
                hover:bg-[#066FD6]
                active:scale-[0.98]
              "
            >

              <span>
                Start a Project
              </span>

              <Rocket
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />

            </button>


            {/* Bottom brand line */}
            <div className="mt-6 flex h-[3px] w-full overflow-hidden rounded-full">

              <div className="w-[45%] bg-[#087FF5]" />

              <div className="w-[30%] bg-[#13B89A]" />

              <div className="flex-1 bg-[#FF6A00]" />

            </div>

          </div>

        </aside>

      </header>


      {/* ============================================================
          QUOTE MODAL
      ============================================================ */}

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}