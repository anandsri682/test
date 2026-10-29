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
  ArrowUpRight,
  Rocket,
  Palette,
  Code2,
  RefreshCw,
  Smartphone,
  TrendingUp,
  PenTool,
  Handshake,
  Cloud,
  Briefcase,
  Sparkles,
  GraduationCap,
  Activity,
  Truck,
  Building,
  ShoppingBag,
  ShoppingCart,
  Apple,
  Shirt,
  Home as HomeIcon,
  Users,
  Info,
  FolderKanban,
  FileText,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';
import OfferSystemManager from '@/components/offer/OfferSystemManager';

// Mega Menu Types
interface MegaMenuItem {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface MegaMenuSection {
  title: string;
  subtitle: string;
  items: MegaMenuItem[];
}

interface MegaMenuPromo {
  title: string;
  highlightText: string;
  subtitle: string;
  actionText: string;
  badgeText: string;
  tags: string[];
}

interface MegaMenuConfig {
  label: string;
  href: string;
  section1: MegaMenuSection;
  section2: MegaMenuSection;
  promo: MegaMenuPromo;
}

// Mega Menu Definitions
const SERVICES_MEGA_MENU: MegaMenuConfig = {
  label: 'Services',
  href: '/services',
  section1: {
    title: 'Design & Build',
    subtitle: 'Conversion-focused B2B websites and custom web apps built for scale.',
    items: [
      {
        title: 'Web Design',
        subtitle: 'Conversion-Focused UI/UX Design',
        href: '/services/ui-ux-design',
        icon: Palette,
      },
      {
        title: 'Web Development',
        subtitle: 'Fast, Scalable Next.js & React Builds',
        href: '/services/web-development',
        icon: Code2,
        badge: 'Popular',
      },
      {
        title: 'Website Redesign',
        subtitle: 'Modernize Legacy Sites to Drive Revenue',
        href: '/services/web-development',
        icon: RefreshCw,
      },
      {
        title: 'Mobile App Development',
        subtitle: 'iOS, Android & Cross-Platform Flutter',
        href: '/services/mobile-app-development',
        icon: Smartphone,
      },
      {
        title: 'Conversion Rate Optimization',
        subtitle: 'Turn Visitors Into Paying Inquiries',
        href: '/services/digital-marketing',
        icon: TrendingUp,
      },
    ],
  },
  section2: {
    title: 'Brand, Cloud & Growth',
    subtitle: 'Build brand authority, scale cloud infrastructure and drive organic reach.',
    items: [
      {
        title: 'B2B Copywriting & Content',
        subtitle: 'High-Impact Copy That Simplifies B2B',
        href: '/services/digital-marketing',
        icon: PenTool,
      },
      {
        title: 'Brand Identity & Strategy',
        subtitle: 'Revenue-Driven Identity & Positioning',
        href: '/services/ui-ux-design',
        icon: Handshake,
      },
      {
        title: 'Cloud & DevOps Scaling',
        subtitle: 'AWS, Docker, CI/CD & 99.99% Uptime',
        href: '/services/cloud-and-devops',
        icon: Cloud,
      },
      {
        title: 'Enterprise IT Consulting',
        subtitle: 'Architecture Audits & CTO Advisory',
        href: '/services/it-consulting',
        icon: Briefcase,
      },
      {
        title: 'Custom Business Software',
        subtitle: 'Tailor-Made ERP, CRM & Internal Tools',
        href: '/solutions/custom-solutions',
        icon: Sparkles,
        badge: 'Custom',
      },
    ],
  },
  promo: {
    title: 'Looking for',
    highlightText: 'use cases',
    subtitle: "Book a 15-minute discovery call & let's architect your project roadmap.",
    actionText: 'Book A Call',
    badgeText: '100+ Projects Delivered • 98% Satisfaction',
    tags: ['Next.js 16', 'React 19', 'Flutter', 'Cloud DevOps', 'AI Integrations'],
  },
};

const SOLUTIONS_MEGA_MENU: MegaMenuConfig = {
  label: 'Solutions',
  href: '/solutions',
  section1: {
    title: 'Industry Platforms',
    subtitle: 'Purpose-built software platforms engineered for vertical markets.',
    items: [
      {
        title: 'Education Solutions',
        subtitle: 'LMS, SIS & Digital Examination Portals',
        href: '/solutions/education',
        icon: GraduationCap,
      },
      {
        title: 'Healthcare Solutions',
        subtitle: 'Telehealth, EHR & Patient Appointment Sync',
        href: '/solutions/healthcare',
        icon: Activity,
      },
      {
        title: 'Travel & Transport',
        subtitle: 'Real-Time Fleet Tracking & Booking Engines',
        href: '/solutions/travel-transport',
        icon: Truck,
      },
      {
        title: 'Real Estate Platforms',
        subtitle: 'Property Search, 3D Tours & Agent CRM',
        href: '/solutions/real-estate',
        icon: Building,
      },
    ],
  },
  section2: {
    title: 'Enterprise & Commerce',
    subtitle: 'High-volume commerce systems and custom business intelligence.',
    items: [
      {
        title: 'Retail & E-Commerce',
        subtitle: 'Headless Online Stores & Inventory Control',
        href: '/solutions/retail-ecommerce',
        icon: ShoppingBag,
      },
      {
        title: 'Custom Enterprise Software',
        subtitle: 'Tailor-Made ERP, CRM & Operations Tools',
        href: '/solutions/custom-solutions',
        icon: Sparkles,
      },
      {
        title: 'API & Gateway Integrations',
        subtitle: 'Payment Gateways, SMS & Third-Party APIs',
        href: '/services/cloud-and-devops',
        icon: Code2,
      },
      {
        title: 'Architecture & Compliance',
        subtitle: 'Cloud Audits, Data Security & Encryption',
        href: '/services/it-consulting',
        icon: ShieldCheck,
      },
    ],
  },
  promo: {
    title: 'Need a custom',
    highlightText: 'industry workflow?',
    subtitle: 'We engineer tailor-made software adapted to your exact operational challenges.',
    actionText: 'Discuss Solution',
    badgeText: 'Enterprise Grade Architecture • 99.99% Uptime',
    tags: ['LMS Portals', 'Telehealth', 'Fleet GPS', 'Headless Stores'],
  },
};

const DEMOS_MEGA_MENU: MegaMenuConfig = {
  label: 'Demos',
  href: '/demos',
  section1: {
    title: 'Live E-Commerce Stores',
    subtitle: 'Explore fully functional e-commerce demos with live carts and catalogs.',
    items: [
      {
        title: 'Furniture E-Commerce',
        subtitle: 'Luxury Living Catalog, Dimensions & Cart',
        href: '/demos/furniture',
        icon: ShoppingCart,
        badge: 'Live',
      },
      {
        title: 'Vegetable E-Commerce',
        subtitle: 'Produce Supply Chain & Consumer Store',
        href: '/demos/vegetable-ecommerce',
        icon: Apple,
        badge: 'Live',
      },
      {
        title: 'Fashion E-Commerce',
        subtitle: 'Clothing Catalog, Filters & Checkout',
        href: '/demos/fashion-ecommerce',
        icon: Shirt,
        badge: 'Live',
      },
    ],
  },
  section2: {
    title: 'Management Portals',
    subtitle: 'Interactive operations portals with dashboards and resident management.',
    items: [
      {
        title: 'Hostel Management Portal',
        subtitle: 'Room Allocation, Resident Billing & Gatepass',
        href: '/demos/hostel-management',
        icon: HomeIcon,
        badge: 'Live',
      },
      {
        title: 'Student Information System',
        subtitle: 'Attendance, Grades & Multi-Tenant Schools',
        href: '/demos',
        icon: GraduationCap,
      },
      {
        title: 'Clinic & Hospital Manager',
        subtitle: 'Doctor Scheduling & Patient Records',
        href: '/demos',
        icon: Activity,
      },
    ],
  },
  promo: {
    title: 'Experience our',
    highlightText: '11+ live demos',
    subtitle: 'Test interactive applications deployed on production domains before you build.',
    actionText: 'Browse All Demos',
    badgeText: 'Production Deployments • Instant Testing',
    tags: ['Furniture Demo', 'Produce Store', 'Hostel Portal', 'School SIS'],
  },
};

const ABOUT_MEGA_MENU: MegaMenuConfig = {
  label: 'About',
  href: '/about',
  section1: {
    title: 'Our Organization',
    subtitle: 'Engineering excellence, leadership mission and founding vision.',
    items: [
      {
        title: 'About AVM Smart',
        subtitle: 'Our Mission, Vision & Growth Story',
        href: '/about',
        icon: Info,
      },
      {
        title: 'Founder & CEO',
        subtitle: 'Meet A. Anand Raju, Founder of AVM Smart',
        href: '/founder',
        icon: Users,
        badge: 'Profile',
      },
      {
        title: 'Leadership & Team',
        subtitle: 'Meet Our Founders & Tech Architects',
        href: '/team',
        icon: Users,
        badge: 'Meet',
      },
    ],
  },
  section2: {
    title: 'Client Trust & Programs',
    subtitle: 'Proven case studies, articles and partner revenue opportunities.',
    items: [
      {
        title: 'Our Portfolio',
        subtitle: 'Explore 100+ Production Deployments',
        href: '/portfolio',
        icon: FolderKanban,
      },
      {
        title: 'Tech Blog & Insights',
        subtitle: 'Latest Guides on Next.js, Cloud, AI & Growth',
        href: '/blog',
        icon: FileText,
      },
      {
        title: 'Referral Partner Program',
        subtitle: 'Earn 10% Commission with 6-Char Codes',
        href: '/influencer-program',
        icon: Tag,
        badge: '10% Comm.',
      },
    ],
  },
  promo: {
    title: 'Delivering next-gen',
    highlightText: 'software globally',
    subtitle: 'Headquartered in Kurnool, Andhra Pradesh, engineering modern digital assets.',
    actionText: 'Meet Leadership',
    badgeText: '3+ Years Experience • 50+ Global Clients',
    tags: ['Founder-Led', 'Agile Engineering', 'Full-Stack Team', 'Kurnool HQ'],
  },
};

const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  About: ABOUT_MEGA_MENU,
  Services: SERVICES_MEGA_MENU,
  Solutions: SOLUTIONS_MEGA_MENU,
  Demos: DEMOS_MEGA_MENU,
};

interface NavCategory {
  label: string;
  href: string;
  badge?: string;
  hasDropdown?: boolean;
}

// Exact original navigation order preserved
const NAV_STRUCTURE: NavCategory[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', hasDropdown: true },
  { label: 'Services', href: '/services', badge: 'Hot', hasDropdown: true },
  { label: 'Solutions', href: '/solutions', hasDropdown: true },
  { label: 'Demos', href: '/demos', badge: 'Live', hasDropdown: true },
  { label: 'Pricing', href: '/pricing', badge: 'New' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  // Do not render main website navbar or offer banner on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Desktop active dropdown state & click pin
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Mobile expanded accordions
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    Services: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsPinned(false);
  }, [pathname]);

  // Handle click outside to close pinned desktop mega menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setIsPinned(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsPinned(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
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
    if (!isPinned) {
      setActiveDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (isPinned) return; // Keep open if pinned by user click
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleNavClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    if (activeDropdown === label && isPinned) {
      setActiveDropdown(null);
      setIsPinned(false);
    } else {
      setActiveDropdown(label);
      setIsPinned(true);
    }
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const currentMega = activeDropdown ? MEGA_MENUS[activeDropdown] : null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full" ref={navContainerRef}>
        {/* TOP OFFER BANNER ABOVE NAVBAR & POPUP CONTROL */}
        {/* <OfferSystemManager /> */}

        {/* TOP BRAND ACCENT LINE */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00]" />

        {/* MAIN PREVIOUS WHITE NAVBAR */}
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
            {/* EXACT ORIGINAL LOGO */}
            <Link
              href="/"
              aria-label="AVM Smart Solutions Home"
              className="group flex shrink-0 items-center"
              onClick={() => {
                setActiveDropdown(null);
                setIsPinned(false);
              }}
            >
             <Image
  src="/logo.png"
  alt="AVM Smart Solutions"
  width={350}
  height={350}
  priority
  className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-14 lg:h-16"
/>
            </Link>

            {/* EXACT ORIGINAL PILL NAVIGATION BAR */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-7 xl:flex"
            >
              {NAV_STRUCTURE.map((item) => {
                const active = isActive(item.href);
                const isDropdownOpen = activeDropdown === item.label;

                if (!item.hasDropdown) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsPinned(false);
                      }}
                      className={`
                        relative flex items-center gap-1.5 whitespace-nowrap px-0.5 py-3 text-sm font-medium transition-colors duration-200
                        ${
                          active
                            ? 'font-semibold text-[#087FF5]'
                            : 'text-neutral-700 hover:text-[#087FF5]'
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      {/* {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />} */}
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
                    <button
                      type="button"
                      onClick={(e) => handleNavClick(e, item.label)}
                      className={`
                        relative flex items-center gap-1 whitespace-nowrap px-0.5 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer
                        ${
                          isDropdownOpen || active
                            ? 'font-semibold text-[#087FF5]'
                            : 'text-neutral-700 hover:text-[#087FF5]'
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-[#087FF5]' : 'text-slate-400 group-hover:text-[#087FF5]'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA: opens the Contact page */}
            <div className="hidden shrink-0 xl:flex">
              <Link
                href="/contact"
                onClick={() => {
                  setActiveDropdown(null);
                  setIsPinned(false);
                }}
                className="group inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#087FF5] to-[#13B89A] px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(8,127,245,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(8,127,245,0.25)]"
              >
                Book a Call
              </Link>
            </div>

            {/* MOBILE BOOK A CALL — visible in the navbar beside the hamburger */}
            <div className="flex shrink-0 items-center gap-2 xl:hidden">
              <Link
                href="/contact"
                onClick={() => {
                  setActiveDropdown(null);
                  setIsPinned(false);
                  setMobileMenuOpen(false);
                }}
                className="inline-flex h-9 min-w-[112px] items-center justify-center whitespace-nowrap rounded-[3px] border border-[#A8E5B4] bg-[#A8E5B4] px-4 text-[11px] font-semibold uppercase tracking-[0.02em] text-[#102018] shadow-none transition-colors duration-200 hover:border-[#8FD9A0] hover:bg-[#8FD9A0] active:scale-[0.98] sm:h-10 sm:min-w-[128px] sm:px-5 sm:text-xs"
              >
                BOOK A CALL
              </Link>
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

        {/* ========================================================================= */}
        {/* NEW 3-COLUMN MEGA-MENU DROPDOWN (Matches Reference Screenshot Structure)  */}
        {/* ========================================================================= */}
        {currentMega && (
          <div
            className="w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-2xl shadow-[0_28px_70px_-22px_rgba(11,42,91,0.22)] transition-all duration-300 animate-in fade-in slide-in-from-top-2"
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* COLUMN 1: CATEGORY 1 */}
                <div className="col-span-4 space-y-4">
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight text-[#0B2A5B]">
                      {currentMega.section1.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 font-normal leading-relaxed">
                      {currentMega.section1.subtitle}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    {currentMega.section1.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => {
                            setActiveDropdown(null);
                            setIsPinned(false);
                          }}
                          className="group flex items-start gap-3.5 rounded-2xl border border-transparent p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#087FF5]/15 hover:bg-gradient-to-r hover:from-[#EFF7FF] hover:via-white hover:to-[#EFFBF7] hover:shadow-[0_8px_24px_rgba(11,42,91,0.06)]"
                        >
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#087FF5]/10 bg-gradient-to-br from-[#EAF4FF] to-white text-[#087FF5] transition-all duration-300 group-hover:scale-105 group-hover:border-[#087FF5]/30 group-hover:from-[#087FF5] group-hover:to-[#13B89A] group-hover:text-white group-hover:shadow-md">
                            <ItemIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold leading-5 text-[#0B2A5B] transition-colors group-hover:text-[#087FF5]">
                                {item.title}
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-500 transition-colors group-hover:text-slate-600 line-clamp-2">
                              {item.subtitle}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* COLUMN 2: CATEGORY 2 */}
                <div className="col-span-4 space-y-4">
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight text-[#0B2A5B]">
                      {currentMega.section2.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 font-normal leading-relaxed">
                      {currentMega.section2.subtitle}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    {currentMega.section2.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => {
                            setActiveDropdown(null);
                            setIsPinned(false);
                          }}
                          className="group flex items-start gap-3.5 rounded-2xl border border-transparent p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#087FF5]/15 hover:bg-gradient-to-r hover:from-[#EFF7FF] hover:via-white hover:to-[#EFFBF7] hover:shadow-[0_8px_24px_rgba(11,42,91,0.06)]"
                        >
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#13B89A]/15 bg-gradient-to-br from-[#E8FBF6] to-white text-[#13B89A] transition-all duration-300 group-hover:scale-105 group-hover:border-[#13B89A]/30 group-hover:from-[#13B89A] group-hover:to-[#087FF5] group-hover:text-white group-hover:shadow-md">
                            <ItemIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[13px] font-bold text-[#0B2A5B] transition-colors group-hover:text-[#13B89A]">
                                {item.title}
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-500 transition-colors group-hover:text-slate-600 line-clamp-2">
                              {item.subtitle}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* COLUMN 3: FEATURED PROMO / SHOWCASE CARD (Matches Screenshot Structure) */}
                <div className="col-span-4 flex flex-col h-full">
                  <div className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-[#0B2A5B] via-[#0B4773] to-[#087FF5] p-6 shadow-xl text-white overflow-hidden min-h-[350px]">
                    {/* Ambient subtle glow */}
                    <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />

                    {/* Promo Header Text */}
                    <div className="space-y-2 relative z-10">
                      <h4 className="text-xl font-extrabold text-white leading-snug">
                        {currentMega.promo.title}{' '}
                        <span className="text-[#67D63B] underline decoration-[#67D63B]/40 underline-offset-4">
                          {currentMega.promo.highlightText}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentMega.promo.subtitle}
                      </p>

                      <div className="pt-2">
                        <Link
                          href="/contact"
                          onClick={() => {
                            setActiveDropdown(null);
                            setIsPinned(false);
                          }}
                          className="group inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#67D63B] hover:text-[#A7F3D0] transition-colors"
                        >
                          <span>Book a Call</span>
                          <ArrowUpRight className="h-4 w-4 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Interactive Showcase Graphic Preview */}
                    <div className="mt-6 rounded-xl border border-white/15 bg-slate-950/70 p-4 shadow-lg space-y-3 relative z-10">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="ml-1 text-[10px] font-mono text-slate-400">avmsmart.in</span>
                        </div>
                        <span className="text-[9px] font-bold text-[#67D63B] bg-[#67D63B]/20 px-2 py-0.5 rounded-full border border-[#67D63B]/40">
                          Active Project
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-100">
                          Engineering High-Velocity Enterprise Software
                        </p>
                        <p className="text-[10px] text-slate-300">
                          Delivered by senior tech architects in weeks, not quarters.
                        </p>
                      </div>

                      {/* Tag Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {currentMega.promo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-white/10 px-2 py-0.5 text-[9px] font-semibold text-slate-200 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Proof Badge */}
                      <div className="flex items-center gap-1.5 pt-1 border-t border-white/10 text-[10px] text-slate-300 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#67D63B]" />
                        <span>{currentMega.promo.badgeText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Strip */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#087FF5]" />
                    <span>Free Architecture Consultation</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#13B89A]" />
                    <span>Fixed-Price Transparent Milestones</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#FF6A00]" />
                    <span>30-Day Post-Launch Warranty</span>
                  </span>
                </div>

                <Link
                  href={currentMega.href}
                  onClick={() => {
                    setActiveDropdown(null);
                    setIsPinned(false);
                  }}
                  className="font-bold text-[#087FF5] hover:text-[#066FD6] flex items-center gap-1 transition-colors"
                >
                  <span>Explore all {currentMega.label}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MOBILE NAVIGATION DRAWER & RICH ACCORDIONS (Better Mobile Experience)     */}
        {/* ========================================================================= */}
        {/* Mobile Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs transition-opacity duration-300 xl:hidden ${
            mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />

        {/* Mobile Side Drawer (Clean White Background Preserved) */}
        <aside
          className={`fixed inset-0 z-[70] flex h-[100dvh] w-full max-w-none flex-col overflow-y-auto bg-white shadow-none transition-transform duration-300 ease-out xl:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
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

            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#A8E6B4] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#123027] shadow-none transition-all duration-200 hover:bg-[#91DDA1] active:scale-[0.98] sm:px-4"
              >
                BOOK A CALL
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
          </div>

          {/* Mobile Accordions & Links */}
          <nav aria-label="Mobile navigation" className="flex-1 space-y-2 px-4 pb-8 pt-4 sm:px-5">
            {NAV_STRUCTURE.map((item) => {
              const active = isActive(item.href);
              const megaConfig = MEGA_MENUS[item.label];
              const isExpanded = !!mobileExpanded[item.label];

              if (!item.hasDropdown || !megaConfig) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex min-h-[44px] items-center justify-between rounded-md px-3.5 py-3 text-[15px] transition-colors ${
                      active
                        ? 'bg-[#EFF6FF] font-semibold text-[#0B2A5B]'
                        : 'font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2A5B]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              }

              return (
                <div key={item.label} className="overflow-hidden border-0 bg-transparent">
                  <div
                    className={`flex min-h-[44px] items-center justify-between rounded-md px-3.5 py-3 text-[15px] font-medium cursor-pointer transition-colors ${
                      active ? 'bg-[#EFF6FF] text-[#0B2A5B] font-semibold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B2A5B]'
                    }`}
                    onClick={() => toggleMobileAccordion(item.label)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#13A88F]' : ''
                      }`}
                    />
                  </div>

                  {isExpanded && (
                    <div className="space-y-3 border-t border-slate-100 bg-[#F8FAFC] px-3 pb-4 pt-4">
                      {/* Section 1 items */}
                      <div className="space-y-1">
                        <span className="block px-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                          {megaConfig.section1.title}
                        </span>
                        {megaConfig.section1.items.map((subItem) => {
                          return (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="group flex items-start rounded-md px-2.5 py-2.5 transition-colors duration-200 hover:bg-white"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium leading-5 text-slate-700 transition-colors group-hover:text-[#087FF5]">{subItem.title}</span>
                                </div>
                                <span className="mt-0.5 block text-xs leading-5 text-slate-500">{subItem.subtitle}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Section 2 items */}
                      <div className="space-y-1 pt-1 border-t border-slate-200/60">
                        <span className="block px-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                          {megaConfig.section2.title}
                        </span>
                        {megaConfig.section2.items.map((subItem) => {
                          return (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="group flex items-start rounded-md px-2.5 py-2.5 transition-colors duration-200 hover:bg-white"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium leading-5 text-slate-700 transition-colors group-hover:text-[#087FF5]">{subItem.title}</span>
                                </div>
                                <span className="mt-0.5 block text-xs leading-5 text-slate-500">{subItem.subtitle}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Drawer Footer Actions */}
          <div className="mt-auto px-5 pb-6 pt-4 border-t border-slate-200 bg-white">
            <div className="grid grid-cols-2 gap-2 pb-3">
              <a
                href="https://wa.me/919553357971"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:8978040537"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-[#087FF5]/30 bg-blue-50 py-2.5 text-xs font-bold text-[#087FF5]"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Bottom brand line */}
            <div className="mt-5 flex h-[3px] w-full overflow-hidden rounded-full">
              <div className="w-[45%] bg-[#087FF5]" />
              <div className="w-[30%] bg-[#13B89A]" />
              <div className="flex-1 bg-[#FF6A00]" />
            </div>
          </div>
        </aside>
      </header>

      {/* QUOTE MODAL */}
      {/* <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} /> */}
    </>
  );
}
