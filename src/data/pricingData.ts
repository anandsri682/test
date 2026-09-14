export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  billingType: "one-time" | "monthly" | "yearly" | "custom";
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  isCustomQuote?: boolean;
  ctaText?: string;
  badge?: string;
  deliveryTimeline?: string;
  supportDuration?: string;
}

export interface PricingCategory {
  id: string;
  name: string;
  iconName: string;
  shortDesc: string;
  disclaimer?: string;
  plans: PricingPlan[];
}

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: "website",
    name: "Website Development",
    iconName: "Code2",
    shortDesc: "High-performance, responsive websites built with modern frameworks to turn visitors into clients.",
    plans: [
      {
        id: "web-starter",
        name: "Starter",
        price: "₹14,999",
        billingType: "one-time",
        description: "Ideal for small businesses, startups, and personal portfolios needing a sleek, fast digital presence.",
        deliveryTimeline: "5 - 7 Days",
        supportDuration: "2 Weeks Post-Launch Support",
        features: [
          "1 to 5 Custom Pages",
          "100% Mobile & Tablet Responsive",
          "Contact Form & WhatsApp Integration",
          "Basic On-Page SEO Optimization",
          "Fast Page Speed & Lighthouse Optimization",
          "Social Media & Google Maps Integration",
          "Free SSL Certificate Setup",
          "2 Weeks Dedicated Support"
        ],
        notIncluded: [
          "Domain & Hosting Fees (Client side / Managed separately)",
          "E-Commerce Payment Gateway"
        ],
        ctaText: "Get Started",
        popular: false
      },
      {
        id: "web-business",
        name: "Business",
        price: "₹29,999",
        billingType: "one-time",
        description: "Best for growing companies requiring dynamic content, custom CMS, and enhanced visual design.",
        deliveryTimeline: "10 - 14 Days",
        supportDuration: "1 Month Dedicated Support",
        features: [
          "Up to 12 Custom Pages",
          "Custom CMS / Admin Dashboard Setup",
          "Advanced UI/UX Micro-Interactions",
          "Comprehensive SEO & Meta Structure",
          "Speed & Core Web Vitals Optimization",
          "Lead Capture & CRM Contact Forms",
          "Blog / News / Article Section",
          "1 Month Priority Maintenance & Support"
        ],
        notIncluded: [
          "Third-Party API Subscription Fees"
        ],
        ctaText: "Choose Business",
        popular: true,
        badge: "MOST POPULAR"
      },
      {
        id: "web-professional",
        name: "Professional",
        price: "₹49,999",
        billingType: "one-time",
        description: "Bespoke digital experience with full custom layouts, animation, and e-commerce capabilities.",
        deliveryTimeline: "2 to 3 Weeks",
        supportDuration: "2 Months Priority Support",
        features: [
          "Up to 25 Custom Pages / Sections",
          "Full E-Commerce / Product Catalog",
          "Razorpay / Stripe Payment Gateway",
          "Customer Account & Order Portal",
          "High-End Custom Motion & Micro-Interactions",
          "Advanced On-Page & Technical SEO",
          "Multi-Language & Currency Readiness",
          "2 Months Dedicated SLA Support"
        ],
        ctaText: "Get Professional",
        popular: false
      },
      {
        id: "web-custom",
        name: "Custom / Enterprise",
        price: "Custom Pricing",
        billingType: "custom",
        isCustomQuote: true,
        description: "Large enterprise portals, multi-tenant web applications, and heavy custom integrations.",
        features: [
          "Unlimited Pages & Bespoke Architecture",
          "Tailored Microservices or Monolith Backend",
          "Enterprise Role-Based Access Control (RBAC)",
          "Third-Party API & ERP Integrations",
          "Custom Security Audit & Hardening",
          "Dedicated Project Manager & Tech Lead",
          "SLA-Backed 24/7 Priority Support",
          "Tailored Quote Based on Specs"
        ],
        ctaText: "Request Custom Quote",
        popular: false
      }
    ]
  },
  {
    id: "mobile",
    name: "Mobile App Development",
    iconName: "Smartphone",
    shortDesc: "Native and cross-platform mobile apps for iOS and Android built for seamless performance and high engagement.",
    plans: [
      {
        id: "app-basic",
        name: "Basic App",
        price: "₹39,999",
        billingType: "one-time",
        description: "Essential mobile application for single platform (Android or iOS) with core functionality.",
        deliveryTimeline: "3 to 4 Weeks",
        features: [
          "5 to 8 Screens App UI",
          "Single Platform (Android or iOS)",
          "Clean React Native / Flutter Architecture",
          "Basic REST API Integration",
          "User Authentication (Email / Phone)",
          "Push Notifications Setup",
          "Google Play Store or App Store Publishing Guide",
          "1 Month Post-Launch Bug Fixes"
        ],
        notIncluded: [
          "App Store / Google Play Developer Account Fees",
          "Complex Real-Time Database Sync"
        ],
        ctaText: "Launch Basic App",
        popular: false
      },
      {
        id: "app-business",
        name: "Business App",
        price: "₹74,999",
        billingType: "one-time",
        description: "Complete cross-platform mobile app for iOS and Android with custom backend integration.",
        deliveryTimeline: "5 to 6 Weeks",
        features: [
          "10 to 18 High-Fidelity Screens",
          "Cross-Platform (Dual iOS & Android Build)",
          "Custom Admin Control Panel",
          "In-App Payment Gateway Integration",
          "Real-time Data Sync & Offline Support",
          "Automated Push Notification System",
          "Full App Store & Play Store Publishing Assistance",
          "2 Months Dedicated Tech Support"
        ],
        ctaText: "Build Business App",
        popular: true,
        badge: "RECOMMENDED"
      },
      {
        id: "app-advanced",
        name: "Advanced App",
        price: "₹1,29,999",
        billingType: "one-time",
        description: "Feature-rich mobile platform with geolocation, live tracking, real-time chat, and complex logic.",
        deliveryTimeline: "7 to 10 Weeks",
        features: [
          "20+ Screen Custom Experience",
          "Dual iOS + Android Native Performance",
          "Real-Time Chat / Maps / Location Tracking",
          "Role-Based User Portals (Customer / Vendor / Admin)",
          "Analytics & User Behavior Monitoring",
          "High Concurrency Cloud Backend (Node/Firebase/AWS)",
          "App Store Optimization (ASO) Guidance",
          "3 Months Comprehensive Maintenance"
        ],
        ctaText: "Build Advanced App",
        popular: false
      },
      {
        id: "app-custom",
        name: "Custom Mobile App",
        price: "Custom Pricing",
        billingType: "custom",
        isCustomQuote: true,
        description: "Tailored enterprise mobile solutions, Uber-like platforms, healthcare, or fintech ecosystems.",
        features: [
          "Bespoke Feature Architecture",
          "Complex Bluetooth / Hardware / IoT Integration",
          "Bank-Grade Security & Encryption",
          "Scalable Microservices Backend",
          "Custom Analytics & Reporting Dashboard",
          "Full Source Code Handover & Documentation",
          "Dedicated SLA & 24/7 Emergency Support",
          "Tailored Quote Based on Specs"
        ],
        ctaText: "Get App Quotation",
        popular: false
      }
    ]
  },
  {
    id: "software",
    name: "Web Apps & Custom Software",
    iconName: "Layers",
    shortDesc: "Scalable business dashboards, CRM/ERP systems, admin portals, and custom web software.",
    plans: [
      {
        id: "sw-dashboard",
        name: "Admin Dashboard & Portals",
        price: "₹49,999",
        billingType: "one-time",
        description: "Centralized operational dashboard for data visualization, staff management, and reporting.",
        deliveryTimeline: "2 to 3 Weeks",
        features: [
          "Custom Admin Dashboard UI",
          "Role-Based Permission Matrix (Super Admin, Staff, Client)",
          "Data Tables, Charts, & Analytical Widgets",
          "CSV / PDF Data Export Capabilities",
          "Secure Auth (JWT / OAuth / 2FA)",
          "Database Architecture & API Setup",
          "1 Month Post-Launch Maintenance"
        ],
        ctaText: "Order Dashboard",
        popular: false
      },
      {
        id: "sw-business",
        name: "Business Management System",
        price: "₹99,999",
        billingType: "one-time",
        description: "Tailored web software to automate workflow, inventory, client management, or booking systems.",
        deliveryTimeline: "4 to 6 Weeks",
        features: [
          "Custom Workflow & Automation Modules",
          "Inventory / Booking / CRM Management",
          "Automated Email & SMS Alerts Integration",
          "Third-Party Service API Connections",
          "High Performance Database (PostgreSQL / MongoDB)",
          "Cloud Server Deployment (AWS / Vercel / DigitalOcean)",
          "2 Months Dedicated Tech Support"
        ],
        ctaText: "Build Business System",
        popular: true,
        badge: "BEST VALUE"
      },
      {
        id: "sw-custom",
        name: "Enterprise Software & ERP",
        price: "Custom Pricing",
        billingType: "custom",
        isCustomQuote: true,
        description: "Heavy custom business software, multi-tenant SaaS products, ERPs, and complex API integrations.",
        features: [
          "Tailored End-to-End Software Architecture",
          "SaaS Multi-Tenancy & Subscription Billing",
          "Heavy API Integrations & Webhooks",
          "HIPAA / SOC2 / Security Compliant Design",
          "Load Testing & DevOps Pipeline Setup",
          "Dedicated Engineering Team",
          "Custom SLA & Maintenance Agreements",
          "Tailored Quote Based on Scope"
        ],
        ctaText: "Discuss Custom Software",
        popular: false
      }
    ]
  },
  {
    id: "branding",
    name: "Logo & Brand Identity",
    iconName: "Palette",
    shortDesc: "Distinctive, high-impact brand identities, logos, color palettes, and visual design assets.",
    plans: [
      {
        id: "brand-basic",
        name: "Basic Logo",
        price: "₹3,499",
        billingType: "one-time",
        description: "Perfect for new startups needing a clean, professional vector logo design.",
        deliveryTimeline: "2 - 3 Days",
        features: [
          "2 Unique Logo Concepts",
          "Up to 3 Revision Rounds",
          "High-Resolution PNG (Transparent) & JPG Files",
          "Vector Source Files (AI, SVG, EPS)",
          "Favicon Version Included",
          "Full Copyright Ownership"
        ],
        ctaText: "Order Basic Logo",
        popular: false
      },
      {
        id: "brand-pro",
        name: "Professional Logo Suite",
        price: "₹6,999",
        billingType: "one-time",
        description: "Complete logo ecosystem with typography guidance and color breakdown.",
        deliveryTimeline: "4 - 5 Days",
        features: [
          "4 Unique Logo Concepts",
          "Unlimited Revisions",
          "Primary, Secondary, & Icon-Mark Variants",
          "Primary & Secondary Color Palette Specs",
          "Brand Typography & Font Recommendations",
          "Vector & Print-Ready Master Files (AI, PDF, SVG)",
          "Social Media Profile & Cover Assets"
        ],
        ctaText: "Order Professional Logo",
        popular: true,
        badge: "MOST REQUESTED"
      },
      {
        id: "brand-premium",
        name: "Premium Brand Identity",
        price: "₹14,999",
        billingType: "one-time",
        description: "Comprehensive brand guideline booklet and full commercial identity kit.",
        deliveryTimeline: "7 - 10 Days",
        features: [
          "Everything in Professional Logo Suite",
          "Comprehensive Brand Guidelines Book (PDF)",
          "Logo Usage Rules, Do's & Don'ts",
          "Stationery Design (Business Card, Letterhead, Envelope)",
          "Social Media Template Kit (Post & Story Mockups)",
          "Merchandise & Apparel Mockups",
          "Dedicated Senior Brand Designer"
        ],
        ctaText: "Get Brand Identity",
        popular: false
      }
    ]
  },
  {
    id: "seo",
    name: "SEO Optimization",
    iconName: "Search",
    shortDesc: "Organic search growth plans focused on technical health, Core Web Vitals, and keyword visibility.",
    plans: [
      {
        id: "seo-basic",
        name: "Basic SEO Setup",
        price: "₹7,999",
        billingType: "one-time",
        description: "One-time technical and on-page optimization audit for existing websites.",
        features: [
          "Full On-Page SEO Audit & Fixes",
          "Meta Titles, Descriptions, & Alt Tags Setup",
          "XML Sitemap & Robots.txt Configuration",
          "Google Search Console & Analytics Integration",
          "Core Web Vitals & Speed Optimization",
          "Google Business Profile Setup Guidance"
        ],
        ctaText: "Get SEO Setup",
        popular: false
      },
      {
        id: "seo-growth",
        name: "Growth SEO",
        price: "₹14,999",
        billingType: "monthly",
        description: "Ongoing monthly campaign to boost search engine rankings and increase target traffic.",
        features: [
          "Everything in Basic SEO",
          "Monthly Keyword Research (Up to 15 Target Keywords)",
          "Content Optimization & On-Page Keyword Tweaks",
          "Technical Error Fixes & Crawl Audit",
          "Competitor Ranking Analysis",
          "Monthly Rank Tracking & Analytics Report",
          "No Unrealistic Rank Guarantees — Transparent Metrics"
        ],
        ctaText: "Start Growth SEO",
        popular: true,
        badge: "RECOMMENDED"
      },
      {
        id: "seo-advanced",
        name: "Advanced SEO & Content",
        price: "₹27,999",
        billingType: "monthly",
        description: "Aggressive organic growth package for competitive industries and multi-location businesses.",
        features: [
          "Target Up to 35 High-Intent Keywords",
          "2 High-Quality Optimized Blog Articles / Month",
          "Local SEO & Citation Building",
          "High-Authority Backlink Acquisition Strategy",
          "Conversion Rate Optimization (CRO) Suggestions",
          "Dedicated SEO Strategist & Bi-Weekly Syncs",
          "Detailed Monthly Performance & ROI Breakdown"
        ],
        ctaText: "Start Advanced SEO",
        popular: false
      }
    ]
  },
  {
    id: "maintenance",
    name: "Website & App Maintenance",
    iconName: "Wrench",
    shortDesc: "Peace of mind maintenance plans covering updates, security monitoring, backups, and tech support.",
    plans: [
      {
        id: "maint-basic",
        name: "Basic Maintenance",
        price: "₹2,999",
        billingType: "monthly",
        description: "Essential care for standard business websites to stay secure, updated, and fast.",
        features: [
          "Monthly Database & Site Backups",
          "Up to 2 Minor Content/Text Updates per Month",
          "Uptime & Performance Monitoring",
          "Core Dependency & Plugin Security Updates",
          "SSL Renewal & Domain Health Tracking",
          "Email & Ticket Support (24h Response)"
        ],
        ctaText: "Subscribe Basic",
        popular: false
      },
      {
        id: "maint-business",
        name: "Business Care",
        price: "₹6,999",
        billingType: "monthly",
        description: "Proactive care and regular feature additions for active corporate websites & apps.",
        features: [
          "Weekly Automated Cloud Backups",
          "Up to 6 Content/UI Updates per Month",
          "Priority Bug Fixes & Hotfixes",
          "Monthly Speed & Security Audit",
          "Database Cleanup & Query Optimization",
          "Priority Support (4-8h Response SLA)"
        ],
        ctaText: "Subscribe Business Care",
        popular: true,
        badge: "POPULAR"
      },
      {
        id: "maint-premium",
        name: "Premium SLA Care",
        price: "₹14,999",
        billingType: "monthly",
        description: "Comprehensive maintenance and dedicated developer hours for critical digital platforms.",
        features: [
          "Daily Automated Backups with Instant Rollback",
          "Up to 15 Hours of Dedicated Dev Time per Month",
          "24/7 Uptime Monitoring & Emergency Alerts",
          "Advanced Cloud Server Infrastructure Monitoring",
          "Custom Feature Additions & Enhancements",
          "Dedicated Slack/WhatsApp Direct Channel Support",
          "1-Hour Emergency Response SLA"
        ],
        ctaText: "Subscribe Premium SLA",
        popular: false
      }
    ]
  }
];
