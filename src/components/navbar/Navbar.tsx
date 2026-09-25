'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Rocket,
  Info,
  Users,
  Briefcase,
  FolderKanban,
  FileText,
  Globe,
  Smartphone,
  TrendingUp,
  Cloud,
  Palette,
  GraduationCap,
  Activity,
  Truck,
  Building,
  ShoppingBag,
  Sparkles,
  ShoppingCart,
  Apple,
  HomeIcon,
  Shirt,
  Tag,
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

interface NavDropdownItem {
  title: string;
  desc?: string;
  href: string;
  icon?: React.ElementType;
  badge?: string;
}

interface NavCategory {
  label: string;
  href: string;
  badge?: string;
  hasDropdown?: boolean;
  dropdownItems?: NavDropdownItem[];
}

const NAV_STRUCTURE: NavCategory[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    hasDropdown: true,
    dropdownItems: [
      { title: 'About AVM Smart', desc: 'Our mission, vision and growth story', href: '/about', icon: Info },
      { title: 'Founder & CEO', desc: 'Meet A. Anand Raju, Founder of AVM Smart', href: '/founder', icon: Users, badge: 'Profile' },
      { title: 'Leadership & Team', desc: 'Meet our founders and tech architects', href: '/team', icon: Users, badge: 'Meet' },
      { title: 'Our Portfolio', desc: 'Explore successful client deployments', href: '/portfolio', icon: FolderKanban },
      { title: 'Tech Blog & Insights', desc: 'Latest articles on AI, Cloud & Web', href: '/blog', icon: FileText },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    badge: 'Hot',
    hasDropdown: true,
    dropdownItems: [
      { title: 'Web Development', desc: 'Next.js, React & modern web apps', href: '/services/web-development', icon: Globe },
      { title: 'Mobile App Development', desc: 'iOS & Android native / Flutter', href: '/services/mobile-app-development', icon: Smartphone },
      { title: 'Digital Marketing', desc: 'SEO, PPC & conversion rate growth', href: '/services/digital-marketing', icon: TrendingUp },
      { title: 'Cloud & DevOps', desc: 'AWS, GCP, CI/CD & Kubernetes', href: '/services/cloud-and-devops', icon: Cloud },
      { title: 'UI/UX Design', desc: 'Figma prototypes & design systems', href: '/services/ui-ux-design', icon: Palette },
      { title: 'IT Consulting', desc: 'Architecture audits & CTO advisory', href: '/services/it-consulting', icon: Briefcase },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    hasDropdown: true,
    dropdownItems: [
      { title: 'Education Solutions', desc: 'LMS, SIS & digital learning platforms', href: '/solutions/education', icon: GraduationCap },
      { title: 'Healthcare Solutions', desc: 'EHR, telehealth & hospital portals', href: '/solutions/healthcare', icon: Activity },
      { title: 'Travel & Transport', desc: 'Fleet tracking & booking engines', href: '/solutions/travel-transport', icon: Truck },
      { title: 'Real Estate Platforms', desc: 'Property listing & tenant portals', href: '/solutions/real-estate', icon: Building },
      { title: 'Retail & E-commerce', desc: 'Headless stores & inventory sync', href: '/solutions/retail-ecommerce', icon: ShoppingBag },
      { title: 'Custom Business', desc: 'Tailor-made enterprise software', href: '/solutions/custom-solutions', icon: Sparkles },
    ],
  },
  {
    label: 'Demos',
    href: '/demos',
    badge: 'Live',
    hasDropdown: true,
    dropdownItems: [
      { title: 'Furniture E-Commerce', desc: 'Luxury living catalog & cart', href: '/demos/furniture', icon: ShoppingCart, badge: 'Live' },
      { title: 'Vegetable E-Commerce', desc: 'Supply chain & produce store', href: '/demos/vegetable-ecommerce', icon: Apple, badge: 'Live' },
      { title: 'Hostel Management', desc: 'Room allocation & resident portal', href: '/demos/hostel-management', icon: HomeIcon, badge: 'Live' },
      { title: 'Fashion E-Commerce', desc: 'Clothing catalog & checkout', href: '/demos/fashion-ecommerce', icon: Shirt },
    ],
  },
  { label: 'Pricing', href: '/pricing', badge: 'New' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Desktop active dropdown state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile expanded accordions
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

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

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* TOP BRAND LINE */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00]" />

        {/* MAIN NAVBAR */}
        <div
          className={`
            w-full
            border-b
            border-slate-200
            bg-white
            transition-all
            duration-300
            ${isScrolled ? 'py-2 shadow-md' : 'py-3 shadow-sm'}
          `}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* LOGO */}
            <Link href="/" aria-label="AVM Smart Solutions Home" className="group flex shrink-0 items-center">
              <Image
                src="/logo.png"
                alt="AVM Smart Solutions"
                width={350}
                height={250}
                priority
                className="h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-11"
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 xl:flex"
            >
              {NAV_STRUCTURE.map((item) => {
                const active = isActive(item.href);
                const isDropdownOpen = activeDropdown === item.label;

                if (!item.hasDropdown) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200
                        ${
                          active
                            ? 'bg-[#087FF5] font-bold text-white shadow-md'
                            : 'text-slate-600 hover:bg-white hover:text-[#0B2A5B] hover:shadow-sm'
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      {item.badge && !active && (
                        <span className="rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-[#F05A00]">
                          {item.badge}
                        </span>
                      )}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`
                        relative flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200
                        ${
                          active
                            ? 'bg-[#087FF5] font-bold text-white shadow-md'
                            : 'text-slate-600 hover:bg-white hover:text-[#0B2A5B] hover:shadow-sm'
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      {item.badge && !active && (
                        <span className="rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-[#F05A00]">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        } ${active ? 'text-white' : 'text-slate-400'}`}
                      />
                    </Link>

                    {/* DESKTOP DROPDOWN MENU */}
                    {isDropdownOpen && item.dropdownItems && (
                      <div
                        className="absolute left-0 top-full pt-2 z-50 w-72 animate-in fade-in slide-in-from-top-2 duration-150"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="rounded-2xl border border-slate-100 bg-white p-2.5 shadow-xl ring-1 ring-slate-900/5">
                          <div className="space-y-0.5">
                            {item.dropdownItems.map((subItem) => {
                              const SubIcon = subItem.icon;
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                                >
                                  {SubIcon && (
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#087FF5] transition-colors group-hover:bg-[#087FF5] group-hover:text-white">
                                      <SubIcon className="h-4 w-4" />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-bold text-[#0B2A5B] group-hover:text-[#087FF5]">
                                        {subItem.title}
                                      </span>
                                      {subItem.badge && (
                                        <span className="rounded-full bg-[#FF6A00]/10 px-1.5 py-0.2 text-[8px] font-black uppercase text-[#F05A00]">
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    {subItem.desc && (
                                      <p className="line-clamp-1 text-[11px] text-slate-500 font-normal">
                                        {subItem.desc}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-2 border-t border-slate-100 pt-2 px-1">
                            <Link
                              href={item.href}
                              className="flex items-center justify-between text-[11px] font-bold text-[#087FF5] hover:text-[#066FD6]"
                            >
                              <span>Explore all {item.label}</span>
                              <ChevronRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* DESKTOP CTA */}
            <div className="hidden shrink-0 xl:flex">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#087FF5] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#066FD6] hover:shadow-lg"
              >
                <span>Start a Project</span>
                <Rocket className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
              </button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-[#0B2A5B] outline-none xl:hidden"
            >
              {mobileMenuOpen ? <X className="h-7 w-7 stroke-[1.8]" /> : <Menu className="h-7 w-7 stroke-[1.8]" />}
            </button>
          </div>
        </div>

        {/* MOBILE BACKDROP */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 z-[60] bg-black/20 transition-opacity duration-300 xl:hidden ${
            mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />

        {/* MOBILE SIDE MENU */}
        <aside
          className={`fixed right-0 top-0 z-[70] flex h-screen w-[85%] max-w-[360px] flex-col overflow-y-auto bg-white shadow-[-12px_0_35px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out xl:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* MOBILE DRAWER HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
              <Image
                src="/logo.png"
                alt="AVM Smart Solutions"
                width={180}
                height={50}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center border-0 bg-transparent p-0 text-[#0B2A5B] outline-none active:scale-90"
            >
              <X className="h-7 w-7 stroke-[1.8]" />
            </button>
          </div>

          {/* MOBILE LINKS */}
          <nav aria-label="Mobile navigation" className="px-4 pt-3">
            <div className="space-y-1">
              {NAV_STRUCTURE.map((item) => {
                const active = isActive(item.href);
                const isExpanded = !!mobileExpanded[item.label];

                if (!item.hasDropdown) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                        active ? 'bg-[#087FF5]/10 font-bold text-[#087FF5]' : 'font-medium text-[#0B2A5B] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-[#FF6A00]/10 px-2 py-0.5 text-[9px] font-black text-[#F05A00]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="rounded-xl overflow-hidden">
                    <div
                      className={`flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                        active ? 'bg-[#087FF5]/10 text-[#087FF5] font-bold' : 'text-[#0B2A5B] hover:bg-slate-50'
                      }`}
                      onClick={() => toggleMobileAccordion(item.label)}
                    >
                      <div className="flex items-center gap-3">
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMobileMenuOpen(false);
                          }}
                          className="hover:underline"
                        >
                          {item.label}
                        </Link>
                        {item.badge && (
                          <span className="rounded-full bg-[#FF6A00]/10 px-2 py-0.5 text-[9px] font-black text-[#F05A00]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    {isExpanded && item.dropdownItems && (
                      <div className="ml-4 pl-3 border-l border-slate-200 py-1 space-y-1 my-1">
                        {item.dropdownItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 hover:text-[#087FF5]"
                            >
                              {SubIcon && <SubIcon className="h-3.5 w-3.5 text-[#087FF5]" />}
                              <span className="font-semibold">{subItem.title}</span>
                              {subItem.badge && (
                                <span className="rounded-full bg-[#FF6A00]/10 px-1.5 text-[8px] font-bold text-[#F05A00]">
                                  {subItem.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* MOBILE CTA */}
          <div className="mt-auto px-5 pb-6 pt-6">
            <div className="mb-5 h-px w-full bg-slate-200" />
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#087FF5] px-5 py-3.5 text-sm font-bold text-white shadow-[0_6px_16px_rgba(8,127,245,0.18)] transition-all duration-300 hover:bg-[#066FD6] active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

      {/* QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  );
}