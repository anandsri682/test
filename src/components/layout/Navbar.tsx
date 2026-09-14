'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Menu, X } from "lucide-react";

const BRAND = {
  name: "AVM Smart",
  shortName: "AVM"
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isServicesPage = pathname === "/services";
  const isAboutPage = pathname === "/about";

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      {/* NAVBAR BACKGROUND */}
      <div className="bg-[linear-gradient(90deg,#0d0d08_0%,#050508_50%,#0d0d08_100%)] backdrop-blur-2xl border-b border-amber-500/20 shadow-lg shadow-amber-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* BRAND LOGO */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0 text-left group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 border border-amber-300/40 flex items-center justify-center font-black text-slate-950 text-sm shadow-lg shadow-amber-950/50 group-hover:scale-105 transition-transform duration-200">
              {BRAND.shortName}
            </div>
            <span className="text-base sm:text-xl xl:text-2xl font-black tracking-tight text-white whitespace-nowrap">
              AVM{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                Smart
              </span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden xl:flex items-center gap-7 text-sm font-medium text-slate-200">
            <Link
              href="/"
              className={`py-2 transition-colors ${
                pathname === "/" ? "text-amber-400 font-bold" : "hover:text-amber-400"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`py-2 transition-colors ${
                isAboutPage ? "text-amber-400 font-bold" : "hover:text-amber-400"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/services"
              className={`py-2 transition-colors flex items-center gap-1.5 ${
                isServicesPage ? "text-amber-400 font-bold" : "hover:text-amber-400"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse" />
              Services
            </Link>

            <Link href="/#why-us" className="py-2 hover:text-amber-400 transition-colors">
              Why Us
            </Link>

            <Link href="/#portfolio" className="py-2 hover:text-amber-400 transition-colors">
              Portfolio
            </Link>

            <Link href="/#process" className="py-2 hover:text-amber-400 transition-colors">
              Process
            </Link>

            <Link href="/#contact" className="py-2 hover:text-amber-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* DESKTOP START PROJECT CTA */}
          <div className="hidden xl:flex items-center shrink-0">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 shadow-lg shadow-amber-950/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Start Project</span>
              <Rocket className="w-4 h-4 text-slate-950" />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden relative z-[200] w-11 h-11 shrink-0 rounded-xl bg-white/[0.06] border border-white/10 text-white flex items-center justify-center hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/40 active:scale-95 transition-all duration-200"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* DARK BACKDROP */}
            <motion.div
              className="fixed inset-0 z-[9990] bg-black/80 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* RIGHT SIDE DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[#07070a] border-l border-amber-500/20 z-[9999] p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2 font-black text-white text-lg">
                    <span>AVM</span>
                    <span className="text-amber-400">Smart</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-3 text-slate-200 font-medium text-base">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-lg ${pathname === "/" ? "bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30" : "hover:bg-white/5"}`}
                  >
                    Home
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-lg ${isAboutPage ? "bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30" : "hover:bg-white/5"}`}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-lg flex items-center justify-between ${isServicesPage ? "bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30" : "hover:bg-white/5"}`}
                  >
                    <span>Services & Pricing</span>
                    <span className="text-[10px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-bold">
                      Popular
                    </span>
                  </Link>

                  <Link
                    href="/#why-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg hover:bg-white/5"
                  >
                    Why Us
                  </Link>

                  <Link
                    href="/#portfolio"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg hover:bg-white/5"
                  >
                    Portfolio
                  </Link>

                  <Link
                    href="/#process"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg hover:bg-white/5"
                  >
                    Process
                  </Link>

                  <Link
                    href="/#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg hover:bg-white/5"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-950/50"
                >
                  <span>Start Project</span>
                  <Rocket className="w-4 h-4 text-slate-950" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
