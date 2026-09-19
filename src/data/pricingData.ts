export interface PricingMainService {
  num: string;
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  startingPrice: string;
  features: string[];
  color: 'blue' | 'purple' | 'green' | 'pink' | 'orange';
  accentHex: string;
  bgGradient: string;
  cardBorder: string;
  btnBg: string;
  illustration: string;
}

export interface PricingPlan {
  name: string;
  badge?: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  business: string | boolean;
  professional: string | boolean;
  custom: string | boolean;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingDetailData {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  themeColor: 'blue' | 'purple' | 'green' | 'pink' | 'orange';
  accentHex: string;
  heroBg: string;
  heroImage: string;
  benefits: { iconName: string; label: string }[];
  stats: { label: string; value: string }[];
  plans: PricingPlan[];
  comparison: ComparisonRow[];
  process: ProcessStep[];
  faqs: FAQItem[];
  ctaTitle: string;
  ctaSub: string;
}

export const MAIN_PRICING_SERVICES: PricingMainService[] = [
  {
    num: '01',
    id: 'web-dev',
    slug: 'website-development',
    title: 'Website Development',
    shortDesc: 'Modern, responsive websites for growing businesses.',
    startingPrice: '₹7,000',
    features: [
      '5 Pages Website',
      'Responsive Design',
      'Contact Form',
      'Basic SEO Setup',
      '1 Month Support',
    ],
    color: 'blue',
    accentHex: '#087FF5',
    bgGradient: 'from-blue-50/70 to-[#F4F8FE]',
    cardBorder: 'border-blue-200/80 hover:border-[#087FF5]',
    btnBg: 'bg-[#087FF5] hover:bg-[#066FD6]',
    illustration: '/images/pricing/website-development-card.png',
  },
  {
    num: '02',
    id: 'app-dev',
    slug: 'app-development',
    title: 'App Development',
    shortDesc: 'Powerful mobile apps for Android & iOS.',
    startingPrice: '₹25,000',
    features: [
      'Android / iOS App',
      'Custom Features',
      'Modern UI/UX',
      'API Integration',
      '3 Months Support',
    ],
    color: 'purple',
    accentHex: '#8B5CF6',
    bgGradient: 'from-purple-50/70 to-[#FAF5FF]',
    cardBorder: 'border-purple-200/80 hover:border-[#8B5CF6]',
    btnBg: 'bg-[#8B5CF6] hover:bg-[#7C3AED]',
    illustration: '/images/pricing/app-development-card.png',
  },
  {
    num: '03',
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDesc: 'Grow your brand with data-driven strategies.',
    startingPrice: '₹5,000',
    features: [
      'Social Media Management',
      'SEO Optimization',
      'Google Ads Setup',
      'Content Strategy',
      'Monthly Reports',
    ],
    color: 'green',
    accentHex: '#10B981',
    bgGradient: 'from-emerald-50/70 to-[#F0FDF4]',
    cardBorder: 'border-emerald-200/80 hover:border-[#10B981]',
    btnBg: 'bg-[#10B981] hover:bg-[#059669]',
    illustration: '/images/pricing/digital-marketing-card.png',
  },
  {
    num: '04',
    id: 'logo-design',
    slug: 'logo-design',
    title: 'Logo Design',
    shortDesc: 'Unique logos that define your brand identity.',
    startingPrice: '₹2,500',
    features: [
      '3 Initial Concepts',
      'High-Quality Files',
      'Multiple Revisions',
      'PNG, JPG, SVG, PDF',
      'Full Commercial Rights',
    ],
    color: 'orange',
    accentHex: '#FF6A00',
    bgGradient: 'from-orange-50/70 to-[#FFFBEB]',
    cardBorder: 'border-orange-200/80 hover:border-[#FF6A00]',
    btnBg: 'bg-[#FF6A00] hover:bg-[#E05B00]',
    illustration: '/images/pricing/logo-design-card.svg',
  },
];

export const PRICING_DETAILS: Record<string, PricingDetailData> = {
  'website-development': {
    slug: 'website-development',
    title: 'Website Development Pricing',
    eyebrow: 'WEBSITE DEVELOPMENT',
    tagline: 'Professional Websites for Growing Businesses',
    description: 'Modern, responsive, and SEO-friendly websites tailored to your business goals. Choose a plan that fits your vision.',
    themeColor: 'blue',
    accentHex: '#087FF5',
    heroBg: 'bg-gradient-to-b from-[#061B3A] via-[#0B2A5B] to-[#0A1E3F]',
    heroImage: '/images/pricing/website-development-hero.png',
    benefits: [
      { iconName: 'Smartphone', label: 'Responsive Design' },
      { iconName: 'TrendingUp', label: 'SEO Optimized' },
      { iconName: 'ShieldCheck', label: 'Fast & Secure' },
      { iconName: 'Headphones', label: 'Dedicated Support' },
    ],
    stats: [
      { label: 'Websites Delivered', value: '100+' },
      { label: 'Client Satisfaction', value: '100%' },
      { label: 'On-Time Delivery', value: 'Guaranteed' },
      { label: 'Support & Maintenance', value: '24/7' },
    ],
    plans: [
      {
        name: 'Starter',
        price: '₹7,000',
        period: 'One-Time Payment',
        desc: 'Perfect for small businesses and personal projects looking for a fast online presence.',
        features: [
          'Up to 5 Pages',
          'Responsive Design',
          'Basic SEO Setup',
          'Contact Form Integration',
          'Social Media Integration',
          '1 Month Support',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Business',
        badge: 'Most Popular',
        isPopular: true,
        price: '₹10,000',
        period: 'One-Time Payment',
        desc: 'Ideal for growing companies needing advanced SEO, map integration, and blog channels.',
        features: [
          'Up to 10 Pages',
          'Responsive Design',
          'Advanced SEO Setup',
          'Contact Form + Google Map',
          'Social Media Integration',
          'Blog / News Section',
          '3 Months Support',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Professional',
        price: '₹15,000',
        period: 'One-Time Payment',
        desc: 'Best for established businesses requiring custom UI/UX, analytics, and news platforms.',
        features: [
          '15 – 20 Pages',
          'Premium UI/UX Design',
          'Advanced SEO Setup',
          'Contact Form + Map',
          'Blog / News Platform',
          'Analytics Integration',
          '6 Months Support',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Custom',
        price: 'Let\'s Discuss',
        period: 'Custom Scope',
        desc: 'Tailored enterprise platforms, e-commerce stores, and specialized web portals.',
        features: [
          'Unlimited Pages',
          'Custom UI/UX Architecture',
          'Advanced Functionalities',
          'Third-Party API Integrations',
          'Priority 24/7 Support',
          'Dedicated Project Manager',
        ],
        ctaText: 'Get a Quote',
      },
    ],
    comparison: [
      { feature: 'Pages Included', starter: 'Up to 5', business: 'Up to 10', professional: '15 – 20', custom: 'Unlimited' },
      { feature: 'Responsive Design', starter: true, business: true, professional: true, custom: true },
      { feature: 'SEO Setup', starter: 'Basic', business: 'Advanced', professional: 'Advanced', custom: 'Enterprise' },
      { feature: 'Contact Form', starter: true, business: true, professional: true, custom: true },
      { feature: 'Google Map Integration', starter: false, business: true, professional: true, custom: true },
      { feature: 'Blog / News Section', starter: false, business: true, professional: true, custom: true },
      { feature: 'Analytics Integration', starter: false, business: false, professional: true, custom: true },
      { feature: 'Support Duration', starter: '1 Month', business: '3 Months', professional: '6 Months', custom: '12 Months' },
    ],
    process: [
      { num: '1', title: 'Discuss Requirements', desc: 'Understand your business goals, target audience, and scope.', iconName: 'MessageSquare' },
      { num: '2', title: 'Plan & Design', desc: 'Create wireframes, site map, and high-fidelity UI design mockups.', iconName: 'Palette' },
      { num: '3', title: 'Development', desc: 'Build your fast, responsive website with modern Next.js technology.', iconName: 'Code' },
      { num: '4', title: 'Review & Revisions', desc: 'Test functionality, refine design details, and ensure core Web Vitals speed.', iconName: 'CheckCircle' },
      { num: '5', title: 'Go Live', desc: 'Launch your website securely with SSL, domain setup, and ongoing support.', iconName: 'Rocket' },
    ],
    faqs: [
      { question: 'How many pages are included in website development?', answer: 'Our Starter package includes up to 5 pages, Business includes up to 10 pages, and Professional includes up to 20 pages. Custom packages support unlimited pages.' },
      { question: 'How long does website development take?', answer: 'A standard website takes between 5 to 12 working days depending on the scope and how quickly content is finalized.' },
      { question: 'Is responsive mobile design included?', answer: 'Yes, 100% of our websites are built mobile-first and look pixel-perfect across all mobile devices, tablets, and desktops.' },
      { question: 'Is SEO optimization included?', answer: 'All packages include core on-page SEO metadata, Google Search Console indexing, fast load optimization, and structured schemas.' },
      { question: 'Can I request custom features later?', answer: 'Absolutely! Our Next.js architecture is completely scalable. Additional pages, payment gateways, or custom APIs can be added seamlessly anytime.' },
    ],
    ctaTitle: 'Ready to Build Your Website?',
    ctaSub: 'Let\'s create a powerful online presence for your business today.',
  },

  'app-development': {
    slug: 'app-development',
    title: 'App Development Pricing',
    eyebrow: 'MOBILE APP DEVELOPMENT',
    tagline: 'High-Performance iOS & Android Mobile Applications',
    description: 'Native and cross-platform mobile apps engineered for speed, offline resilience, and delightful user experience.',
    themeColor: 'purple',
    accentHex: '#8B5CF6',
    heroBg: 'bg-gradient-to-b from-[#1E1B4B] via-[#2E1065] to-[#1E1035]',
    heroImage: '/images/pricing/app-development-hero.png',
    benefits: [
      { iconName: 'Smartphone', label: 'Cross-Platform' },
      { iconName: 'Zap', label: '60fps UI Speed' },
      { iconName: 'Cloud', label: 'Cloud Sync' },
      { iconName: 'Headphones', label: 'Store Publishing' },
    ],
    stats: [
      { label: 'Mobile Apps Launched', value: '45+' },
      { label: 'Store Approval Rate', value: '100%' },
      { label: 'Average User Rating', value: '4.9★' },
      { label: 'Maintenance Support', value: '24/7' },
    ],
    plans: [
      {
        name: 'Starter App',
        price: '₹25,000',
        period: 'One-Time Payment',
        desc: 'Single platform Android or iOS app with core business screens and API connectivity.',
        features: [
          'Android or iOS Platform',
          'Up to 6 App Screens',
          'Modern UI/UX Design',
          'Push Notifications',
          'Play Store Publishing',
          '2 Months Support',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Business App',
        badge: 'Most Popular',
        isPopular: true,
        price: '₹45,000',
        period: 'One-Time Payment',
        desc: 'Cross-platform Flutter / React Native app running smoothly on both Android and iOS.',
        features: [
          'Android & iOS (Cross-Platform)',
          'Up to 12 App Screens',
          'Custom UI/UX & Animations',
          'User Auth & Payment Gateway',
          'App Store & Play Store Publish',
          '4 Months Support',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Enterprise App',
        price: '₹80,000',
        period: 'One-Time Payment',
        desc: 'Advanced enterprise mobile solution with real-time database sync and admin dashboard.',
        features: [
          'Android & iOS Native Engine',
          'Unlimited App Screens',
          'Real-Time Chat / Location Tracking',
          'Backend Admin Portal Included',
          'Analytics & Crashlytics',
          '8 Months Support',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Custom App',
        price: 'Let\'s Discuss',
        period: 'Custom Scope',
        desc: 'Bespoke mobile architecture for marketplaces, Fintech, logistics, or AI applications.',
        features: [
          'Dedicated Flutter / Swift Engineers',
          'Custom Hardware & Bluetooth Integration',
          'Enterprise Security Standards',
          'Scalable Microservices Backend',
          '1 Year SLA Support',
        ],
        ctaText: 'Get a Quote',
      },
    ],
    comparison: [
      { feature: 'Supported Platforms', starter: 'Android OR iOS', business: 'Android AND iOS', professional: 'Android AND iOS', custom: 'All Platforms' },
      { feature: 'App Screens', starter: 'Up to 6', business: 'Up to 12', professional: 'Unlimited', custom: 'Custom Scope' },
      { feature: 'Payment Gateway Integration', starter: false, business: true, professional: true, custom: true },
      { feature: 'Push Notifications', starter: true, business: true, professional: true, custom: true },
      { feature: 'App Store / Play Store Publishing', starter: true, business: true, professional: true, custom: true },
      { feature: 'Admin Portal Included', starter: false, business: 'Basic', professional: 'Full Portal', custom: 'Enterprise' },
      { feature: 'Real-Time Sync / Chat', starter: false, business: false, professional: true, custom: true },
      { feature: 'Support Duration', starter: '2 Months', business: '4 Months', professional: '8 Months', custom: '12 Months' },
    ],
    process: [
      { num: '1', title: 'Concept & Blueprint', desc: 'Define mobile user flows, feature scope, and target operating systems.', iconName: 'MessageSquare' },
      { num: '2', title: 'Figma Mobile UI/UX', desc: 'Craft interactive 60fps mobile wireframes and polished UI components.', iconName: 'Palette' },
      { num: '3', title: 'App Code Build', desc: 'Develop mobile app in Flutter or React Native with clean architecture.', iconName: 'Code' },
      { num: '4', title: 'Device Testing', desc: 'Perform real-device QA testing for battery efficiency, screen sizes, and performance.', iconName: 'CheckCircle' },
      { num: '5', title: 'Store Deployment', desc: 'Submit and publish your app directly to Google Play Store & Apple App Store.', iconName: 'Rocket' },
    ],
    faqs: [
      { question: 'Do you develop for both Android and iOS?', answer: 'Yes! We build cross-platform mobile apps using Flutter and React Native that deploy seamlessly to both Google Play Store and Apple App Store.' },
      { question: 'Will you assist with App Store and Google Play publishing?', answer: 'Yes, full publishing support on both store platforms is included in all mobile development packages.' },
      { question: 'How long does mobile app development take?', answer: 'Starter apps take about 2 to 3 weeks, while business and enterprise apps typically range from 4 to 8 weeks.' },
      { question: 'Do you provide backend API servers for the app?', answer: 'Yes, we develop scalable Node.js/Express or Spring Boot backends with secure MongoDB or PostgreSQL databases.' },
    ],
    ctaTitle: 'Ready to Launch Your Mobile App?',
    ctaSub: 'Turn your app idea into a high-rating product on Play Store & App Store.',
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    title: 'Digital Marketing Pricing',
    eyebrow: 'DIGITAL MARKETING',
    tagline: 'Data-Driven Growth & Customer Acquisition',
    description: 'Accelerate your lead generation with targeted SEO, PPC campaigns, social media marketing, and high-ROI strategies.',
    themeColor: 'green',
    accentHex: '#10B981',
    heroBg: 'bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#065F46]',
    heroImage: '/images/pricing/digital-marketing-hero.svg',
    benefits: [
      { iconName: 'TrendingUp', label: 'SEO Growth' },
      { iconName: 'Target', label: 'Targeted PPC Ads' },
      { iconName: 'Users', label: 'Social Reach' },
      { iconName: 'BarChart', label: 'Weekly Reports' },
    ],
    stats: [
      { label: 'Leads Generated', value: '50k+' },
      { label: 'Avg ROI Improvement', value: '3.5x' },
      { label: 'Active Ad Campaigns', value: '120+' },
      { label: 'Client Retention Rate', value: '98%' },
    ],
    plans: [
      {
        name: 'Starter Growth',
        price: '₹5,000',
        period: 'Per Month',
        desc: 'Essential social media management and basic local SEO for small business awareness.',
        features: [
          'Social Media Management (2 Platforms)',
          '8 Custom Creative Posts / Month',
          'Basic Local SEO Optimization',
          'Google My Business Management',
          'Monthly Analytics Report',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Business Scale',
        badge: 'Most Popular',
        isPopular: true,
        price: '₹12,000',
        period: 'Per Month',
        desc: 'Comprehensive marketing package with Google PPC Ads, Meta campaigns, and high-intent SEO.',
        features: [
          'Social Media (Instagram, FB, LinkedIn)',
          '16 Custom Creative Posts & Reels',
          'Full On-Page & Technical SEO',
          'Google & Meta PPC Ad Campaigns',
          'Conversion Rate Optimization (CRO)',
          'Bi-Weekly ROI Performance Reports',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Enterprise Dominance',
        price: '₹25,000',
        period: 'Per Month',
        desc: 'Full-funnel digital marketing engine for companies wanting market dominance.',
        features: [
          'Omnichannel Social Media & Content',
          'Unlimited Graphic Design & Reels',
          'Aggressive National / Global SEO',
          'Dedicated PPC Ads Specialist',
          'Funnel Email & WhatsApp Marketing',
          'Weekly Live Strategy Review Calls',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Custom Campaign',
        price: 'Let\'s Discuss',
        period: 'Tailored Budget',
        desc: 'Custom ad spend management and brand reputation campaigns for enterprise clients.',
        features: [
          'Custom Ad Spend Optimization',
          'PR & Influencer Partnerships',
          'Video Marketing Production',
          'Dedicated Marketing Team',
          '24/7 SLA Support',
        ],
        ctaText: 'Get a Quote',
      },
    ],
    comparison: [
      { feature: 'Social Platforms', starter: '2 Platforms', business: '3 Platforms', professional: 'Omnichannel', custom: 'Custom Scope' },
      { feature: 'Monthly Posts & Reels', starter: '8 Posts', business: '16 Posts + Reels', professional: 'Unlimited', custom: 'Custom' },
      { feature: 'SEO Optimization', starter: 'Basic Local', business: 'Technical & On-Page', professional: 'Aggressive Global', custom: 'Enterprise' },
      { feature: 'Google & Meta PPC Ads Setup', starter: false, business: true, professional: true, custom: true },
      { feature: 'Google My Business Optimization', starter: true, business: true, professional: true, custom: true },
      { feature: 'Email & WhatsApp Automation', starter: false, business: false, professional: true, custom: true },
      { feature: 'Performance Reports', starter: 'Monthly', business: 'Bi-Weekly', professional: 'Weekly', custom: 'Real-Time Dashboard' },
    ],
    process: [
      { num: '1', title: 'Audit & Analysis', desc: 'Evaluate competitor positioning, search keywords, and campaign funnels.', iconName: 'MessageSquare' },
      { num: '2', title: 'Strategy Roadmap', desc: 'Craft high-converting ad copies, content calendars, and SEO targets.', iconName: 'Palette' },
      { num: '3', title: 'Campaign Launch', desc: 'Deploy Google Ads, Meta campaigns, and high-quality social creatives.', iconName: 'Code' },
      { num: '4', title: 'A/B Testing & CRO', desc: 'Optimize ad bids, landing page conversions, and click-through rates.', iconName: 'CheckCircle' },
      { num: '5', title: 'Scale & Report', desc: 'Deliver detailed ROI performance metrics and scale winning channels.', iconName: 'Rocket' },
    ],
    faqs: [
      { question: 'How quickly will I see digital marketing results?', answer: 'PPC ad campaigns (Google & Meta) drive instant leads within 24-48 hours, while SEO keyword ranking growth compounds noticeably over 2 to 3 months.' },
      { question: 'Is ad spend included in the package price?', answer: 'Package prices cover management, creative design, and technical optimization. Direct Google/Meta ad spend is paid separately based on your preferred budget.' },
      { question: 'Do you create graphics and reels for social media?', answer: 'Yes! Our design team creates high-quality custom graphic posts, infographics, and engaging short reels included in Business and Enterprise plans.' },
    ],
    ctaTitle: 'Ready to Scale Your Customer Acquisition?',
    ctaSub: 'Partner with our digital marketing specialists for guaranteed ROI growth.',
  },

  'logo-design': {
    slug: 'logo-design',
    title: 'Logo & Brand Identity Pricing',
    eyebrow: 'LOGO & BRAND IDENTITY',
    tagline: 'Distinctive Visual Identity for Iconic Brands',
    description: 'Stand out from competitors with custom logo designs, brand style guides, vector source files, and commercial rights.',
    themeColor: 'orange',
    accentHex: '#FF6A00',
    heroBg: 'bg-gradient-to-b from-[#7C2D12] via-[#9A3412] to-[#431407]',
    heroImage: '/images/pricing/logo-design-hero.svg',
    benefits: [
      { iconName: 'Palette', label: '100% Original Vector' },
      { iconName: 'CheckCircle', label: 'Full Copyright Rights' },
      { iconName: 'Sparkles', label: 'Multiple Concepts' },
      { iconName: 'ShieldCheck', label: 'Print & Web Ready' },
    ],
    stats: [
      { label: 'Logos Designed', value: '250+' },
      { label: 'Initial Concepts', value: '3 - 6' },
      { label: 'File Formats Delivered', value: 'All Vector' },
      { label: 'Customer Satisfaction', value: '100%' },
    ],
    plans: [
      {
        name: 'Basic Logo',
        price: '₹2,500',
        period: 'One-Time Payment',
        desc: 'Essential logo design for startups and local businesses.',
        features: [
          '3 Initial Logo Concepts',
          'High-Resolution Files (PNG, JPG)',
          'Vector Source Files (SVG, AI, PDF)',
          'Transparent Background Format',
          '3 Rounds of Revisions',
          'Full Commercial Usage Rights',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Brand Identity',
        badge: 'Most Popular',
        isPopular: true,
        price: '₹5,000',
        period: 'One-Time Payment',
        desc: 'Complete branding package with logo, color palette, typography guidelines, and social media kit.',
        features: [
          '5 Initial Logo Concepts',
          'All Master Vector Files (AI, EPS, SVG, PNG, PDF)',
          'Complete Brand Style Guide (Colors & Typography)',
          'Business Card & Letterhead Designs',
          'Social Media Profile & Banner Covers',
          'Unlimited Revisions',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Corporate Suite',
        price: '₹10,000',
        period: 'One-Time Payment',
        desc: 'Comprehensive visual brand architecture for corporate enterprises and franchise systems.',
        features: [
          '6+ Premium Vector Concepts',
          'Complete Brand Book (30+ Pages)',
          'Stationery Pack (Envelopes, Badges, ID Cards)',
          'Social Media Kit & Ad Templates',
          'Figma Brand System Tokens',
          'Priority 48-Hour Turnaround',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'Custom Branding',
        price: 'Let\'s Discuss',
        period: 'Custom Scope',
        desc: 'Custom re-branding, 3D logo animations, and trademark protection advisory.',
        features: [
          '3D Animated Logo Intro Video',
          'Packaging & Product Mockup Designs',
          'Trademark Legal File Audit',
          'Dedicated Creative Director',
          'Unlimited Revisions',
        ],
        ctaText: 'Get a Quote',
      },
    ],
    comparison: [
      { feature: 'Initial Logo Concepts', starter: '3 Concepts', business: '5 Concepts', professional: '6+ Concepts', custom: 'Custom' },
      { feature: 'Vector Master Files (AI, SVG, EPS, PDF)', starter: true, business: true, professional: true, custom: true },
      { feature: 'Brand Style Guide (Colors & Fonts)', starter: false, business: true, professional: true, custom: true },
      { feature: 'Business Card & Stationery Design', starter: false, business: true, professional: true, custom: true },
      { feature: 'Social Media Kit & Covers', starter: false, business: true, professional: true, custom: true },
      { feature: 'Figma Design System Tokens', starter: false, business: false, professional: true, custom: true },
      { feature: 'Revisions', starter: '3 Rounds', business: 'Unlimited', professional: 'Unlimited', custom: 'Unlimited' },
      { feature: 'Turnaround Time', starter: '3-4 Days', business: '2-3 Days', professional: '48 Hours', custom: 'Priority' },
    ],
    process: [
      { num: '1', title: 'Brand Brief', desc: 'Share your vision, company values, color preferences, and industry competitors.', iconName: 'MessageSquare' },
      { num: '2', title: 'Concept Creation', desc: 'Our senior brand designers sketch and vectorize multiple distinct logo concepts.', iconName: 'Palette' },
      { num: '3', title: 'Presentation & Feedback', desc: 'Review high-resolution concepts presented on real-world mockups.', iconName: 'Code' },
      { num: '4', title: 'Refinement', desc: 'Fine-tune typography, color contrast, and geometric symmetry based on your feedback.', iconName: 'CheckCircle' },
      { num: '5', title: 'Master Export', desc: 'Receive all print-ready vector AI, SVG, PNG, and PDF master files with full commercial rights.', iconName: 'Rocket' },
    ],
    faqs: [
      { question: 'Do I own the full copyright to my logo?', answer: 'Yes! Upon final delivery, 100% full commercial ownership and copyright rights belong entirely to you.' },
      { question: 'What file formats will I receive?', answer: 'You receive all master vector source files including AI (Adobe Illustrator), SVG, EPS, PDF, high-res PNG (transparent background), and JPG.' },
      { question: 'How many revisions can I request?', answer: 'Our Brand Identity and Corporate Suite packages include unlimited revisions until you are 100% delighted with the logo.' },
    ],
    ctaTitle: 'Ready to Craft Your Brand Identity?',
    ctaSub: 'Let\'s design a memorable logo that elevates your business authority.',
  },
};
