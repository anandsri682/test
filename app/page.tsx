'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, Variants } from "framer-motion";
import ProjectProcess from "@/components/ProjectProcess";
import AboutUs from "@/components/AboutUs";
import {
  Rocket,
  User,
  ChevronRight,
} from "lucide-react";
import {
  Code2,
  Smartphone,
  ShoppingBag,
  Palette,
  Search,
  Wrench,
  CheckCircle2,
  Star,
  ChevronDown,
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import StarfieldBackground from "@/components/common/StarfieldBackground";
import ContactSection from "@/components/Sections/ContactSection";

// BRAND CONFIGURATION
const BRAND = {
  name: "AVM Smart",
  shortName: "AVM",
  tagline: "Premium Websites & Mobile Apps for Modern Businesses",
  email: "contact@thefreelancingmind.com",
  phone: "+1 555-019-2831",
  whatsapp: "+1 555-019-2831",
  location: "San Francisco, CA / Remote Worldwide",
  hours: "Mon - Fri: 9:00 AM - 6:00 PM EST"
};

// STATS DATA
const STATS = [
  { value: 120, label: "Projects Completed", suffix: "+" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
  { value: 25, label: "Business Partners", suffix: "+" },
  { value: 5, label: "Years Experience", suffix: "+" }
];

// SERVICES DATA
const SERVICES = [
  {
    icon: Code2,
    title: "Website Development",
    items: ["Business Websites", "Corporate Portals", "Landing Pages", "Portfolios", "Web Applications"]
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce",
    items: ["Online Stores", "Payment Integration", "Admin Dashboards", "Inventory Systems", "Custom Checkout"]
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    items: ["Android Apps", "iOS Native Apps", "React Native", "Flutter Cross-Platform", "App Store Publishing"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    items: ["Figma Design Systems", "Modern Interfaces", "Wireframes & Flows", "Interactive Prototypes", "Brand Guidelines"]
  },
  {
    icon: Search,
    title: "SEO Optimization",
    items: ["Google Ranking", "Core Web Vitals", "Performance Audits", "Technical SEO", "Content Strategy"]
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    items: ["Regular Security Updates", "Bug Fixes", "Cloud Hosting Setup", "24/7 Monitoring", "Priority Support"]
  }
];

// WHY CHOOSE US
const WHY_US = [
  { title: "Modern Design", desc: "Aesthetics tailored like Apple, Linear, and Vercel.", icon: Sparkles },
  { title: "Lightning Fast", desc: "Optimized for sub-second page loads and high Lighthouse scores.", icon: Zap },
  { title: "Fully Responsive", desc: "Flawless performance across all viewport sizes.", icon: Layers },
  { title: "Secure Development", desc: "Bank-grade encryption and security best practices.", icon: Lock },
  { title: "SEO Optimized", desc: "Built ground-up to rank higher on Google search results.", icon: Search },
  { title: "Lifetime Support", desc: "Dedicated maintenance long after your project launches.", icon: ShieldCheck },
  { title: "Clean Code", desc: "Maintainable TypeScript & Next.js architecture.", icon: Code2 },
  { title: "Affordable Pricing", desc: "Transparent agency rates without hidden surprises.", icon: Star }
];

// PORTFOLIO DATA (local mockups — avoids relying on an external image domain
// that would need to be whitelisted in next.config.js)
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

// PROCESS STEPS
const PROCESS_STEPS = [
  { step: "01", title: "Discovery", desc: "We analyze your business targets, requirements, and target audience." },
  { step: "02", title: "Planning", desc: "Architecture roadmap, technology stack selection, and feature specs." },
  { step: "03", title: "UI Design", desc: "High-fidelity Figma prototypes with modern aesthetics and micro-interactions." },
  { step: "04", title: "Development", desc: "Clean code development using Next.js, React, and responsive Tailwind CSS." },
  { step: "05", title: "Testing", desc: "Rigorous cross-browser testing, SEO audit, and speed optimization." },
  { step: "06", title: "Deployment", desc: "Smooth launch to production servers with automated CI/CD setup." },
  { step: "07", title: "Support", desc: "Continuous maintenance, security monitoring, and post-launch enhancements." }
];

// TECH STACK
const TECH_STACK = [
  "Next.js", "React", "Node.js", "Express", "MongoDB", "Firebase",
  "Tailwind", "TypeScript", "JavaScript", "Figma", "AWS", "GitHub", "Vercel"
];

// INDUSTRIES
const INDUSTRIES = [
  "Healthcare", "Education", "Restaurants", "Fashion", "Real Estate",
  "Fitness", "Travel", "Finance", "Construction", "Law Firms", "Hotels",
  "Startups", "Small Businesses"
];

// TESTIMONIALS
const TESTIMONIALS = [
  {
    quote: "The Freelancing Mind completely overhauled our digital presence. Communication was flawless, and the performance gains were immediate.",
    author: "Elena Rostova",
    role: "CEO at Veloce Digital",
    rating: 5
  },
  {
    quote: "Our new website converts twice as many visitors as our old one. The design feels like it belongs alongside Stripe or Vercel.",
    author: "Marcus Chen",
    role: "Founder at TechPulse",
    rating: 5
  },
  {
    quote: "Delivered our complex e-commerce project days before the deadline without compromising on clean code or visual quality.",
    author: "Sarah Jenkins",
    role: "Marketing Director at Artisanal",
    rating: 5
  }
];

// PRICING TIERS
const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$1,499",
    desc: "Perfect for landing pages, portfolio sites, and small businesses needing a clean web presence.",
    features: ["Custom 1-5 Page Website", "Responsive Mobile Design", "Basic SEO Optimization", "Contact Form Setup", "2 Weeks Post-Launch Support"],
    popular: false
  },
  {
    name: "Professional",
    price: "$3,299",
    desc: "Ideal for growing businesses requiring custom web apps, dynamic features, or CMS integration.",
    features: ["Up to 12 Custom Pages", "Advanced Animations & UI/UX", "Full CMS / Admin Dashboard", "E-Commerce or Portal Features", "Comprehensive SEO Setup", "1 Month Dedicated Support"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$6,999+",
    desc: "Comprehensive digital solutions, cross-platform mobile apps, and scalable web architectures.",
    features: ["Full Custom Web & Mobile App", "Cross-Platform (iOS + Android)", "Tailored Backend / Database", "Custom API Integrations", "Priority 24/7 SLA Support", "Dedicated Project Manager"],
    popular: false
  }
];

// FAQ DATA
const FAQS = [
  {
    q: "How long does development take?",
    a: "Standard website builds typically take between 2 to 4 weeks, depending on scope and client feedback turnarounds. Complex web applications or custom mobile apps range from 4 to 8 weeks."
  },
  {
    q: "Do you provide hosting?",
    a: "Yes! We assist in deploying your project onto premium platforms like Vercel, AWS, or Netlify, guaranteeing enterprise-grade uptime, SSL, and global CDN delivery."
  },
  {
    q: "Will the website be mobile responsive?",
    a: "Every single experience we build follows a mobile-first engineering approach. Your site will look and perform flawlessly across all screen sizes, from mobile devices to desktop monitors."
  },
  {
    q: "Can I edit the website content later?",
    a: "Absolutely. We build with modern CMS integrations (Sanity, Strapi, or custom dashboards) allowing your team to easily edit text, images, blog posts, or inventory without writing code."
  },
  {
    q: "Do you offer post-launch maintenance?",
    a: "Yes, we offer ongoing support plans that cover security updates, performance monitoring, feature expansions, and regular backups."
  },
  {
    q: "How do payments work?",
    a: "We usually operate on a milestone structure: 50% upfront to commence discovery and design, and 50% upon project completion and your approval prior to final launch."
  }
];

// ============================================================================
// SHARED ANIMATION VARIANTS
// ============================================================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }
  })
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

// Reusable scroll-reveal heading wrapper
function SectionHeading({
  eyebrow,
  title,
  desc
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="text-center mb-12 sm:mb-16"
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-semibold uppercase tracking-wider mb-4"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black text-white mb-4">
        {title}
      </motion.h2>
      {desc && (
        <motion.p variants={fadeUp} className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          {desc}
        </motion.p>
      )}
    </motion.div>
  );
}

// COUNTER ANIMATION COMPONENT
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = value;
    const duration = 1800;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, hasStarted]);

  return (
    <motion.span
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true, amount: 0.6 }}
      className="tabular-nums font-black text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#7C3AED]"
    >
      {count}
      {suffix}
    </motion.span>
  );
}

export default function Home() {
  // FORM & CALCULATOR STATES
  const [projectScope, setProjectScope] = useState("both");
  const [pageCount, setPageCount] = useState(5);
  const [includeAdmin, setIncludeAdmin] = useState(true);
  const [includeDesign, setIncludeDesign] = useState(true);
  const [showProcess, setShowProcess] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [showAbout, setShowAbout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
const [showContactOnly, setShowContactOnly] = useState(false);

  // const [showProcess, setShowProcess] = useState(false);
  // const [showAbout, setShowAbout] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const BRAND = {
  //   shortName: "TFM",
  // };

  const handleGoHome = () => {
  setShowAbout(false);
  setShowProcess(false);
  setShowContactOnly(false); // <-- Add this
  setMobileMenuOpen(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const handleOpenAbout = () => {
  setShowProcess(false);
  setShowContactOnly(false); // <-- Add this
  setShowAbout(true);
  setMobileMenuOpen(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

 const handleOpenProcess = () => {
  setShowAbout(false);
  setShowContactOnly(false); // <-- Add this
  setShowProcess(true);
  setMobileMenuOpen(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  useEffect(() => {
    // Set timer for 10 seconds (10000ms)
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    // Clean up timer if user navigates away before 10 sec
    return () => clearTimeout(timer);
  }, []);

  // HERO SLIDER STATE & MOCKUPS
  const [currentSlide, setCurrentSlide] = useState(0);
  const showcaseImages = [
    { src: "/images/image3.png", alt: "Website Showcase Mockup 1" },
    { src: "/images/image4.png", alt: "Website Showcase Mockup 2" },
    { src: "/images/image1.png", alt: "Website Showcase Mockup 3" },
    { src: "/images/image4.png", alt: "Website Showcase Mockup 4" },
    { src: "/images/image3.png", alt: "Website Showcase Mockup 5" }
  ];

  // PORTFOLIO FILTER STATE
  const [selectedCategory, setSelectedCategory] = useState("All");

  // TESTIMONIAL SLIDER STATE
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ TOGGLE STATE
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // SCROLL PROGRESS BAR
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.011 });

  // Auto slider effect for hero mockups
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [showcaseImages.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Cost calculation logic
  const calculateEstimate = () => {
    let base = projectScope === "web" ? 500 : projectScope === "mobile" ? 800 : 1200;
    let pagesCost = pageCount * 60;
    let adminCost = includeAdmin ? 350 : 0;
    let designCost = includeDesign ? 250 : 0;
    return base + pagesCost + adminCost + designCost;
  };

  const filteredPortfolio = selectedCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 font-sans selection:bg-[#7C3AED] selection:text-white overflow-x-hidden antialiased">
      {/* SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C3AED] via-purple-400 to-[#F59E0B] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* BACKGROUND DECORATION */}
      <StarfieldBackground />

      <div className="relative z-10">
        {/* TOP ANNOUNCEMENT BAR
        <div className="bg-gradient-to-r from-purple-950 via-[#7C3AED] to-amber-600 text-white font-medium text-[11px] sm:text-xs py-2 px-3 sm:px-8 flex items-center justify-between gap-2 border-b border-purple-500/20 backdrop-blur-md">
          <div className="flex items-center gap-3 sm:gap-6 text-slate-100 min-w-0">
            <span className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" /> <span className="truncate">{BRAND.email}</span></span>
            <span className="hidden sm:flex items-center gap-1.5 shrink-0"><Phone className="w-3.5 h-3.5 text-amber-300" /> {BRAND.phone}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1 rounded-full font-semibold text-[10px] sm:text-[11px] transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
            >
              Get a Quote &rarr;
            </a>
          </div>
        </div> */}



       {/* NAVIGATION BAR */}
{/* =========================================================
    NAVBAR
========================================================= */}

<nav className="fixed top-0 left-0 right-0 z-[100]">

  {/* =======================================================
      NAVBAR BACKGROUND
  ======================================================= */}

  <div className="bg-[linear-gradient(90deg,#140B23_0%,#0A0A10_50%,#140B23_100%)] backdrop-blur-2xl border-b border-purple-500/15 shadow-lg shadow-purple-900/20">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">

      {/* ===================================================
          BRAND
      =================================================== */}

      <button
        type="button"
        onClick={() => {
          setMobileMenuOpen(false);
          handleGoHome();
        }}
        className="
          flex
          items-center
          gap-2.5
          sm:gap-3
          shrink-0
          min-w-0
          text-left
          group
        "
      >

        {/* LOGO */}
        <div
          className="
            w-9
            h-9
            sm:w-10
            sm:h-10
            shrink-0
            rounded-xl
            bg-gradient-to-br
            from-[#7C3AED]
            to-purple-900
            border
            border-purple-400/30
            flex
            items-center
            justify-center
            font-black
            text-white
            text-sm
            shadow-lg
            shadow-purple-900/30
            group-hover:scale-105
            transition-transform
            duration-200
          "
        >
          {BRAND.shortName}
        </div>

        {/* BRAND NAME */}
        <span className="text-base sm:text-xl xl:text-2xl font-black tracking-tight text-white whitespace-nowrap">
          The Freelancing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-amber-400">
            Mind
          </span>
        </span>

      </button>


      {/* ===================================================
          DESKTOP NAVIGATION
      =================================================== */}

      <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">

        {/* HOME */}
        <button
          type="button"
          onClick={handleGoHome}
          className={`
            py-2
            transition-colors
            ${
              !showAbout && !showProcess && !showContactOnly
                ? "text-amber-400"
                : "hover:text-amber-400"
            }
          `}
        >
          Home
        </button>


        {/* ABOUT */}
        <button
          type="button"
          onClick={handleOpenAbout}
          className={`
            py-2
            transition-colors
            ${
              showAbout
                ? "text-amber-400"
                : "hover:text-amber-400"
            }
          `}
        >
          About Us
        </button>


        {/* SERVICES */}
        <a
          href="#services"
          onClick={() => handleGoHome()}
          className="py-2 hover:text-amber-400 transition-colors"
        >
          Services
        </a>


        {/* WHY US */}
        <a
          href="#why-us"
          onClick={() => handleGoHome()}
          className="py-2 hover:text-amber-400 transition-colors"
        >
          Why Us
        </a>


        {/* PORTFOLIO */}
        <a
          href="#portfolio"
          onClick={() => handleGoHome()}
          className="py-2 hover:text-amber-400 transition-colors"
        >
          Portfolio
        </a>


        {/* PROCESS */}
        <a
          href="#process"
          onClick={() => handleGoHome()}
          className="py-2 hover:text-amber-400 transition-colors"
        >
          Process
        </a>


        {/* ESTIMATOR */}
        <a
          href="#estimator"
          onClick={() => handleGoHome()}
          className="py-2 hover:text-amber-400 transition-colors"
        >
          Estimator
        </a>


        {/* PRICING */}
        <a
          href="#pricing"
          onClick={() => handleGoHome()}
          className="py-2 hover:text-amber-400 transition-colors"
        >
          Pricing
        </a>


        {/* CONTACT */}
        <a
          href="#contact"
          onClick={() => handleGoHome()}
          className="py-2 hover:text-amber-400 transition-colors"
        >
          Contact
        </a>

      </div>


      {/* ===================================================
          DESKTOP START PROJECT
      =================================================== */}

      <div className="hidden xl:flex items-center shrink-0">

        <motion.button
          type="button"
          onClick={handleOpenProcess}
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-5
            py-2.5
            rounded-xl
            text-sm
            font-bold
            text-white
            bg-gradient-to-r
            from-[#7C3AED]
            to-amber-500
            shadow-lg
            shadow-purple-900/30
            hover:shadow-xl
            hover:shadow-purple-600/40
            transition-all
            duration-300
          "
        >
          <span>Start Project</span>
          <Rocket className="w-4 h-4" />
        </motion.button>

      </div>


      {/* ===================================================
          MOBILE MENU BUTTON
      =================================================== */}

      <button
        type="button"
        onClick={() => {
          setMobileMenuOpen(true);
        }}
        className="
          xl:hidden
          relative
          z-[200]
          w-11
          h-11
          shrink-0
          rounded-xl
          bg-white/[0.06]
          border
          border-white/10
          text-white
          flex
          items-center
          justify-center
          hover:text-amber-400
          hover:bg-purple-500/10
          hover:border-purple-500/40
          active:scale-95
          transition-all
          duration-200
        "
        aria-label="Open navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        <Menu className="w-6 h-6" />
      </button>

    </div>

  </div>


  {/* =========================================================
      MOBILE MENU
      SLIDES FROM LEFT
  ========================================================= */}

  <AnimatePresence>

    {mobileMenuOpen && (
      <>

        {/* ===================================================
            DARK BACKDROP
        =================================================== */}

        <motion.div
          className="
            fixed
            inset-0
            z-[9990]
            bg-black/70
            backdrop-blur-sm
            xl:hidden
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={() => {
            setMobileMenuOpen(false);
          }}
        />


        {/* ===================================================
            LEFT SIDE DRAWER
        =================================================== */}

        <motion.aside
          className="
            fixed
            left-0
            top-0
            bottom-0
            z-[9999]
            w-[85vw]
            max-w-[380px]
            bg-[#09070F]
            border-r
            border-purple-500/20
            shadow-[20px_0_80px_rgba(76,29,149,0.35)]
            overflow-y-auto
            xl:hidden
          "
          initial={{
            x: "-100%",
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "-100%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >

          {/* =================================================
              DRAWER HEADER
          ================================================= */}

          <div
            className="
              sticky
              top-0
              z-20
              h-20
              flex
              items-center
              justify-between
              px-5
              bg-[#09070F]/95
              backdrop-blur-xl
              border-b
              border-white/10
            "
          >

            {/* DRAWER BRAND */}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleGoHome();
              }}
              className="flex items-center gap-3 min-w-0"
            >

              <div
                className="
                  w-10
                  h-10
                  shrink-0
                  rounded-xl
                  bg-gradient-to-br
                  from-[#7C3AED]
                  to-purple-900
                  border
                  border-purple-400/30
                  flex
                  items-center
                  justify-center
                  text-white
                  font-black
                  shadow-lg
                  shadow-purple-900/30
                "
              >
                {BRAND.shortName}
              </div>

              <div className="text-left min-w-0">

                <p className="text-sm font-black text-white truncate">
                  The Freelancing
                </p>

                <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-amber-400">
                  Mind
                </p>

              </div>

            </button>


            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="
                w-10
                h-10
                shrink-0
                rounded-xl
                bg-white/[0.05]
                border
                border-white/10
                text-slate-300
                flex
                items-center
                justify-center
                hover:text-white
                hover:bg-purple-500/10
                hover:border-purple-500/40
                active:scale-95
                transition-all
              "
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>

          </div>


          {/* =================================================
              DRAWER CONTENT
          ================================================= */}

          <div className="px-5 py-7">

            {/* MENU TITLE */}

            <div className="flex items-center gap-3 px-2 mb-5">

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-slate-500
                "
              >
                Navigation
              </span>

              <div
                className="
                  flex-1
                  h-px
                  bg-gradient-to-r
                  from-purple-500/30
                  to-transparent
                "
              />

            </div>


            {/* =================================================
                MENU LINKS
            ================================================= */}

            <div className="space-y-2">


              {/* HOME */}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>Home</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </button>


              {/* ABOUT */}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenAbout();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>About Us</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </button>


              {/* SERVICES */}

              <a
                href="#services"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>Services</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </a>


              {/* WHY US */}

              <a
                href="#why-us"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>Why Choose Us</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </a>


              {/* PORTFOLIO */}

              <a
                href="#portfolio"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>Portfolio</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </a>


              {/* PROCESS */}

              <a
                href="#process"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>Process</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </a>


              {/* ESTIMATOR */}

              <a
                href="#estimator"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>Cost Estimator</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </a>


              {/* PRICING */}

              <a
                href="#pricing"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>Pricing</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </a>


              {/* CONTACT */}

              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGoHome();
                }}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  border
                  border-transparent
                  text-slate-300
                  text-sm
                  font-semibold
                  hover:text-white
                  hover:bg-purple-500/10
                  hover:border-purple-500/20
                  transition-all
                  duration-200
                "
              >

                <span>Contact</span>

                <ChevronRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    group-hover:text-amber-400
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </a>

            </div>


            {/* =================================================
                DIVIDER
            ================================================= */}

            <div
              className="
                my-7
                h-px
                bg-gradient-to-r
                from-transparent
                via-purple-500/30
                to-transparent
              "
            />


            {/* =================================================
                START PROJECT
            ================================================= */}

            <motion.button
              type="button"
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenProcess();
              }}
              className="
                group
                relative
                w-full
                overflow-hidden
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-4
                rounded-xl
                text-sm
                font-bold
                text-white
                bg-gradient-to-r
                from-[#7C3AED]
                to-amber-500
                shadow-xl
                shadow-purple-900/30
                transition-all
                duration-300
              "
            >

              {/* SHINE EFFECT */}

              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  group-hover:translate-x-full
                  transition-transform
                  duration-700
                "
              />

              <span className="relative flex items-center gap-2">

                <span>
                  Start Project
                </span>

                <Rocket
                  className="
                    w-5
                    h-5
                    group-hover:translate-x-1
                    transition-transform
                  "
                />

              </span>

            </motion.button>


            {/* DESCRIPTION */}

            <p className="mt-5 text-center text-[11px] leading-5 text-slate-500">
              Let's build something amazing together.
            </p>

          </div>

        </motion.aside>

      </>
    )}

  </AnimatePresence>

</nav>

     
<div className="pt-16 sm:pt-20">
  {showAbout ? (
  <AboutUs
    onStartProject={() => {
      setShowAbout(false);
      setShowProcess(true);

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 50);
    }}
     onContact={() => {
        setShowAbout(false);
        setShowProcess(false);
        setShowContactOnly(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    />
  ) : showProcess ? (
    <ProjectProcess />
  ) : showContactOnly ? (
    <>
      <ContactSection />
      
    </>
  ) : (
    <>
        {/* HERO SECTION */}
      <section
  id="hero"
  className="relative pt-0 pb-16 sm:pt-0 sm:pb-14 px-2 sm:px-10 w-full max-w-[1500px] mx-auto overflow-hidden"
>
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-24 -left-32 w-[380px] h-[380px] rounded-full bg-[#7C3AED]/20 blur-[120px]" />
          <div className="pointer-events-none absolute top-32 -right-24 w-[340px] h-[340px] rounded-full bg-[#F59E0B]/10 blur-[120px]" />

         <div className="relative grid grid-cols-1 lg:grid-cols-[48%_52%] gap-0 lg:gap-0 items-center">
            {/* LEFT COLUMN: HERO CONTENT */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-left z-10 space-y-4 sm:space-y-6"
            >
              <motion.div variants={fadeUp} className="inline-block">
                <span className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 backdrop-blur-md">
                  Premium Websites & Mobile Apps for Modern Businesses
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                We Design & Build <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                  Websites & Apps
                </span>{" "}
                <br />
                That Drive Results
              </motion.h1>

              <motion.p variants={fadeUp} className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl leading-relaxed">
                High-performance websites and mobile apps crafted specifically for modern business growth. We blend engineering mastery with luxury aesthetics.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors shadow-lg shadow-purple-600/30 text-sm sm:text-base"
                >
                  Explore Services &rarr;
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#portfolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 backdrop-blur-md transition-colors text-sm sm:text-base"
                >
                  View Our Work
                </motion.a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2 text-slate-500 text-[11px] sm:text-xs font-medium">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                  <span className="ml-1">4.9/5 average rating</span>
                </div>
                <span className="hidden sm:inline w-px h-4 bg-white/10" />
                <span className="hidden sm:inline">120+ projects delivered</span>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: MOCKUP CAROUSEL */}
           <div className="relative w-full mt-5 lg:mt-0 -ml-10 xl:-ml-38">
             <div className="relative w-[120%] lg:w-[145%] aspect-[16/10]">
                <AnimatePresence mode="sync">
                  {showcaseImages.map((img, idx) =>
                    idx === currentSlide ? (
                      <motion.img
                        key={img.src + idx}
                        src={img.src}
                        alt={img.alt}
                        initial={{ opacity: 0, scale: 0.64, y: 16 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: [0, -12, 0]
                        }}
                        exit={{ opacity: 0, scale: 0.96, y: -12 }}
                        transition={{
                          opacity: { duration: 0.6 },
                          scale: { duration: 0.6 },
                          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                       className="absolute left-[-10%] lg:left-[-18%] w-[125%] lg:w-[145%] h-auto object-contain drop-shadow-2xl"
                      />
                    ) : null
                  )}
                </AnimatePresence>
              </div>

              {/* Dots indicator */}
              <div className="relative flex justify-center items-center gap-2.5 mt-4 sm:mt-6 z-20">
                {showcaseImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "w-6 bg-[#7C3AED]" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-10 sm:py-14 px-4 border-y border-white/10 bg-black/40">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center"
          >
            {STATS.map((stat, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Core Services"
            desc="Tailored web, mobile, and strategic engineering services designed to elevate enterprise brands."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {SERVICES.map((srv, i) => {
              const IconComp = srv.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group relative p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-[#7C3AED]/50 transition-colors duration-300 shadow-xl overflow-hidden backdrop-blur-md"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all" />

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#7C3AED] mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{srv.title}</h3>

                  <ul className="space-y-2.5">
                    {srv.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-us" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
          <SectionHeading
            title="Why Choose Us"
            desc="We combine creative brilliance with battle-tested software architecture."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {WHY_US.map((item, i) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-slate-950 border border-white/10 hover:border-amber-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#F59E0B] flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10 sm:mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black text-white mb-4">Featured Work</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
              Explore our recent digital transformations across key global industries.
            </motion.p>

            {/* Category Filter Pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {PORTFOLIO_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-900/40"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </motion.div>

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
                  className="group rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-xl"
                >
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-[#7C3AED]/15 via-slate-900 to-amber-500/10 flex items-center justify-center">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="max-h-[85%] max-w-[85%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-bold text-amber-400 border border-white/10">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                    <p className="text-slate-400 text-xs mb-6 line-clamp-2">{proj.desc}</p>

                    <div className="flex items-center gap-3">
                      <a
                        href="#contact"
                        className="flex-1 py-2 text-center bg-purple-600/20 hover:bg-[#7C3AED] text-purple-300 hover:text-white text-xs font-bold rounded-lg border border-purple-500/30 transition-all flex items-center justify-center gap-1.5"
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
{/* DEVELOPMENT PROCESS */}
<section
  id="process"
  className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10"
>
  <SectionHeading
    title="Development Process"
    desc="A transparent, step-by-step engineering roadmap from concept to deployment."
  />

  <div className="relative">
    {/* Animated Timeline (Desktop Only) */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="hidden lg:block absolute top-10 left-16 right-16 h-[3px] origin-left bg-gradient-to-r from-[#7C3AED] via-purple-500 to-amber-400 rounded-full z-0"
    />

    <div className="hidden lg:grid lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
      {PROCESS_STEPS.map((ps, i) => (
  <div key={i} className="relative">

    {/* Timeline */}
    <div className="absolute left-1/2 -translate-x-1/2 -top-8 flex items-center w-full">

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: i * 0.4 }}
        className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-amber-400 shadow-[0_0_20px_#7C3AED] z-10"
      />

      {i !== PROCESS_STEPS.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: i * 0.4 }}
          className="origin-left flex-1 h-1 bg-gradient-to-r from-[#7C3AED] to-amber-400"
        />
      )}
    </div>

    {/* Card */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.4 }}
      whileHover={{
  y: -8,
  scale: 1.02,
  transition: {
    duration: 0.15
  }
}}
      className="bg-slate-900/80 border border-white/10 rounded-xl
            p-5
            min-h-[220px]
            hover:border-purple-500/40
            transition-all"
                >
      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-amber-400">
        {ps.step}
      </div>

      <h3 className="mt-3 text-white font-bold">
        {ps.title}
      </h3>

      <p className="mt-2 text-slate-400">
        {ps.desc}
      </p>
    </motion.div>

  </div>
))}
    </div>
    <div className="lg:hidden mt-8 space-y-6">
  {PROCESS_STEPS.map((ps, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.2 }}
      className="flex gap-4"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-amber-400 shadow-[0_0_20px_#7C3AED]" />

        {i !== PROCESS_STEPS.length - 1 && (
          <div className="w-[3px] flex-1 min-h-20 mt-2 rounded-full bg-gradient-to-b from-[#7C3AED] to-amber-400" />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex-1 rounded-2xl bg-slate-900/80 border border-white/10 p-5"
      >
        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-amber-400">
          {ps.step}
        </div>

        <h3 className="mt-2 text-base font-bold text-white">
          {ps.title}
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          {ps.desc}
        </p>
      </motion.div>
    </motion.div>
  ))}
</div>
  </div>
</section>


        {/* TECHNOLOGIES */}
        <section className="py-14 sm:py-20 bg-white/[0.01] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-8"
            >
              Technologies We Master
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 max-w-5xl mx-auto"
            >
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs sm:text-sm font-semibold hover:border-purple-500/50 hover:text-white transition-colors shadow-md"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* INDUSTRIES WE SERVE */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <SectionHeading title="Industries We Serve" desc="Deep expertise across diverse commercial verticals." />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="p-4 rounded-xl bg-slate-900/40 border border-white/10 text-center text-xs sm:text-sm font-bold text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
              >
                {ind}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/10">
          <SectionHeading title="Client Feedback" desc="Trusted by founders, leaders, and innovation teams worldwide." />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl text-center overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-600/10 blur-[100px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="flex justify-center gap-1 mb-6 text-amber-400">
                  {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-lg sm:text-xl font-medium text-slate-200 italic mb-8 leading-relaxed min-h-[6rem] sm:min-h-[3.5rem]">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>

                <h3 className="text-base font-bold text-white">{TESTIMONIALS[activeTestimonial].author}</h3>
                <p className="text-xs text-purple-400 mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeTestimonial === idx ? "w-8 bg-[#7C3AED]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
          <SectionHeading title="Transparent Pricing" desc="Predictable agency pricing designed to deliver high ROI." />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start"
          >
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className={`relative p-6 sm:p-8 rounded-3xl bg-slate-900 border ${
                  tier.popular ? "border-[#7C3AED] shadow-2xl shadow-purple-900/30 md:-translate-y-3" : "border-white/10"
                } flex flex-col justify-between h-full`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#7C3AED] to-amber-500 rounded-full text-[10px] font-black uppercase tracking-wider text-white whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-4">{tier.price}</div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">{tier.desc}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-center transition-all ${
                    tier.popular
                      ? "bg-[#7C3AED] hover:bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  Choose {tier.name}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* COST ESTIMATOR SECTION */}
        <section id="estimator" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-950 border border-white/10 rounded-3xl p-5 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-black text-white text-center mb-3">Project Cost Estimator</h2>
            <p className="text-slate-400 text-center mb-8 sm:mb-10 text-xs sm:text-sm">Configure your scope to receive an instant estimate.</p>

            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Project Type</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: "web", label: "Web Only" },
                    { id: "mobile", label: "Mobile Only" },
                    { id: "both", label: "Web + Mobile" }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setProjectScope(type.id)}
                      className={`py-2.5 sm:py-3 px-1 rounded-xl font-bold text-[11px] sm:text-sm border transition-all ${
                        projectScope === type.id
                          ? "bg-[#7C3AED] text-white border-purple-400 shadow-lg shadow-purple-900/40"
                          : "bg-slate-900 text-slate-300 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-200 mb-3">
                  <span>Number of Views / Screens</span>
                  <span className="text-amber-400 font-bold">{pageCount} Screens</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="w-full accent-[#7C3AED] bg-slate-900 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setIncludeAdmin(!includeAdmin)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    includeAdmin ? "bg-purple-950/40 border-purple-500 text-white" : "bg-slate-900 border-white/10 text-slate-400"
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Include Admin Dashboard</div>
                  <div className="text-[11px] text-slate-400 mt-1">+$350 (CMS, Analytics, Content Control)</div>
                </button>

                <button
                  onClick={() => setIncludeDesign(!includeDesign)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    includeDesign ? "bg-purple-950/40 border-purple-500 text-white" : "bg-slate-900 border-white/10 text-slate-400"
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Custom UI/UX Design System</div>
                  <div className="text-[11px] text-slate-400 mt-1">+$250 (Figma Prototypes & Components)</div>
                </button>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Estimated Investment</div>
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    ${calculateEstimate()} <span className="text-xs font-normal text-slate-400">USD</span>
                  </div>
                </div>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#7C3AED] to-purple-800 hover:from-purple-600 hover:to-purple-900 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors shadow-xl shadow-purple-900/30 text-center"
                >
                  Request Proposal
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/10">
          <SectionHeading title="Frequently Asked Questions" desc="Everything you need to know about partnering with us." />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4"
          >
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div key={i} custom={i} variants={fadeUp} className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* FULL-WIDTH CTA BANNER */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-gradient-to-r from-purple-950 via-[#7C3AED] to-amber-600 p-8 sm:p-16 text-center overflow-hidden shadow-2xl"
          >
            <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-black/20 blur-[100px]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
                Ready to Build Your Dream Digital Product?
              </h2>
              <p className="text-slate-100 text-sm sm:text-base mb-8 opacity-90">
                Let&apos;s transform your idea into an enterprise-grade digital experience that converts.
              </p>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-100 font-black px-8 py-4 rounded-xl text-sm transition-colors shadow-xl"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION — now the interactive version with the social-channel switcher */}
        <ContactSection />
</>
        )}
      </div>
        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-slate-950 pt-14 sm:pt-16 pb-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-black text-lg text-white mb-4">
                The Freelancing <span className="text-purple-400">Mind</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                High performance digital engineering and bespoke UI/UX design for global forward-thinking companies.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>UI/UX Design</li>
                <li>E-Commerce</li>
                <li>SEO Optimization</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs text-slate-400">
              {/* <li><a href="#services" onClick={handleGoHome} className="hover:text-white transition-colors">Services</a></li>  */}
              <li><a href="#why-us" onClick={handleGoHome} className="hover:text-white transition-colors">Why Us</a></li>
              <li><a href="#portfolio" onClick={handleGoHome} className="hover:text-white transition-colors">Portfolio</a></li> 
              <li><a href="#process" onClick={handleGoHome} className="hover:text-white transition-colors">Process</a></li> 
                <li><a href="#estimator" onClick={handleGoHome} className="hover:text-white transition-colors">Estimator</a></li>
                <li><a href="#pricing" onClick={handleGoHome} className="hover:text-white transition-colors">Pricing</a></li>
                {/* <li><a href="#contact" onClick={handleGoHome} className="hover:text-white transition-colors">Contact</a></li> */}
                  </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Newsletter</h4>
              <p className="text-xs text-slate-400 mb-3">Subscribe for tech trends & UI inspiration.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button className="bg-[#7C3AED] hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0">
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
      </div>
    </div>
  );
}