export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  benefits: string[];
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  industry: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  keyHighlights: string[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: 'Websites' | 'Mobile Apps' | 'Platforms' | 'Branding';
  client: string;
  image: string;
  description: string;
  technologies: string[];
  results: string[];
  liveUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title?: string;
  experience?: string;
  bio: string;
  image: string;
  skills: string[];
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  isFounder?: boolean;
  isCoFounder?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
}

export const COMPANY_DETAILS = {
  name: "AVM Smart Solutions",
  brandName: "AVM Smart",
  domain: "https://www.avmsmart.in",
  tagline: "Digital Solutions for Real Business Growth",
  subtitle: "We build websites, applications and digital solutions that help your business scale faster and perform better.",
  email: "AVMSmart.official@gmail.com",
  phones: ["8978040537", "8247329044", "9347495620"],
  phone: "8978040537",
  whatsappNumber: "9553357971",
  whatsappUrl: "https://wa.me/919553357971",
  address: "Innovation and Incubation Center, G Pulla Reddy Engineering College, Near Pasupula Village, Kurnool - Nandyal Main Road, Kurnool, Andhra Pradesh 518007, India",
  googleMapsUrl: "https://maps.google.com/?q=G%20pulla%20Reddy%20Engineering%20College%20Near%20Pasupula%20Village,%20Kurnool%20-%20Nandyal,%20Main%20Road,%20Kurnool,%20Andhra%20Pradesh%20518007,%20India",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.7554867566087!2d78.0772739!3d15.8168962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5e2f75cf52541%3A0x6a05f187a4192b0!2sG.%20Pulla%20Reddy%20Engineering%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  socials: {
    linkedin: "https://www.linkedin.com/company/avmsmart",
    twitter: "https://twitter.com/avmsmart",
    facebook: "https://facebook.com/avmsmart",
    instagram: "https://instagram.com/avmsmart",
  }
};

export const METRICS = [
  { value: "50+", label: "Happy Clients" },
  { value: "100+", label: "Projects Delivered" },
  { value: "3+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development",
    shortDesc: "Modern, scalable and secure websites.",
    fullDesc: "We craft custom, responsive, high-performance websites and web applications optimized for SEO, speed, and user conversion. From corporate platforms to complex web portals.",
    iconName: "Globe",
    features: [
      "Custom Next.js & React Architectures",
      "Headless CMS Integration",
      "SEO & Core Web Vitals Optimization",
      "Responsive Cross-Device Layouts",
      "High Security & SSL Standards"
    ],
    benefits: [
      "Higher search engine visibility",
      "Sub-second page load times",
      "Increased user conversion rates"
    ]
  },
  {
    id: "mobile-app",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDesc: "Android & iOS applications tailored to your business.",
    fullDesc: "End-to-end mobile app design and development for native iOS, Android, and cross-platform Flutter/React Native solutions. Engineered for seamless UI and offline resilience.",
    iconName: "Smartphone",
    features: [
      "Cross-Platform Flutter & React Native",
      "Native iOS (Swift) & Android (Kotlin)",
      "Push Notifications & Real-Time Sync",
      "App Store & Google Play Publishing",
      "Secure Payment Gateway Integration"
    ],
    benefits: [
      "Direct mobile channel engagement",
      "Smooth 60fps user experience",
      "Scalable backend connectivity"
    ]
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDesc: "Drive growth with data-driven strategies.",
    fullDesc: "Accelerate your customer acquisition with strategic Search Engine Optimization (SEO), Pay-Per-Click advertising, content marketing, and targeted social media campaigns.",
    iconName: "TrendingUp",
    features: [
      "Technical & On-Page SEO",
      "Google & Social Media PPC Ads",
      "Content Marketing & Strategy",
      "Conversion Rate Optimization (CRO)",
      "Detailed Analytics & ROI Reporting"
    ],
    benefits: [
      "Qualified lead generation",
      "Enhanced brand reputation",
      "Measurable marketing ROI"
    ]
  },
  {
    id: "cloud-devops",
    slug: "cloud-and-devops",
    title: "Cloud & DevOps",
    shortDesc: "Solid cloud infrastructure.",
    fullDesc: "Design, deploy, and manage secure cloud server infrastructures on AWS, Google Cloud, and Vercel with automated CI/CD pipelines, Docker containerization, and 24/7 monitoring.",
    iconName: "Cloud",
    features: [
      "AWS & GCP Server Setup",
      "Docker & Kubernetes Orchestration",
      "Automated CI/CD Pipelines",
      "24/7 Infrastructure Monitoring",
      "Disaster Recovery & Backup Systems"
    ],
    benefits: [
      "99.99% system uptime",
      "Automated zero-downtime deployments",
      "Reduced infrastructure costs"
    ]
  },
  {
    id: "ui-ux",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDesc: "User-centric and modern designs.",
    fullDesc: "User-centered design that turns visitors into loyal customers. We craft intuitive wireframes, interactive Figma prototypes, dynamic design systems, and delightful interfaces.",
    iconName: "Palette",
    features: [
      "User Research & Journey Mapping",
      "Figma Wireframing & Prototyping",
      "Corporate Design Systems & Tokens",
      "Usability Testing & Iteration",
      "Mobile-First Responsive UI"
    ],
    benefits: [
      "Reduced user drop-off rate",
      "Consistent brand aesthetic",
      "Accelerated developer handoff"
    ]
  },
  {
    id: "it-consulting",
    slug: "it-consulting",
    title: "IT Consulting",
    shortDesc: "Expert guidance for digital transformation.",
    fullDesc: "Strategic technology advisory services to help enterprise organizations modernize legacy software, streamline IT workflows, optimize cloud costs, and scale engineering operations.",
    iconName: "Users",
    features: [
      "Digital Architecture Audits",
      "Legacy Codebase Modernization",
      "Cybersecurity Compliance Checks",
      "Tech Stack & Vendor Selection",
      "CTO-as-a-Service Advisory"
    ],
    benefits: [
      "Aligned technology and business goals",
      "Mitigated technical debt risk",
      "Optimized operational expenditure"
    ]
  }
];

export const SOLUTIONS: SolutionItem[] = [
  {
    id: "edu",
    slug: "education",
    title: "Education Solutions",
    industry: "Education",
    shortDesc: "Smart solutions for schools, colleges and learning platforms.",
    fullDesc: "Empower educational institutions with modern Student Information Systems (SIS), custom Learning Management Systems (LMS), online examination engines, and virtual classroom tools.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    keyHighlights: ["Automated Attendance & Grading", "Live Classrooms & Video Conferencing", "Parent & Student Mobile Portals", "Multi-Tenant Institution Management"]
  },
  {
    id: "health",
    slug: "healthcare",
    title: "Healthcare Solutions",
    industry: "Healthcare",
    shortDesc: "Digital tools for better patient care and management.",
    fullDesc: "HIPAA-compliant health tech solutions including Telemedicine platforms, Electronic Health Records (EHR), patient scheduling apps, and hospital management software.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    keyHighlights: ["Telehealth Video Consultations", "Encrypted Patient Record Systems", "Appointment Scheduling & Reminders", "Pharmacy & Inventory Control"]
  },
  {
    id: "logistics",
    slug: "travel-transport",
    title: "Travel & Transport",
    industry: "Travel & Logistics",
    shortDesc: "Solutions for travel agencies and logistics businesses.",
    fullDesc: "Comprehensive fleet tracking, logistics dispatching, hotel & flight booking engines, and route optimization software designed for high operational performance.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    keyHighlights: ["GPS Real-Time Fleet Tracking", "Automated Booking Engines", "Dynamic Pricing Algorithms", "Driver & Carrier Mobile Apps"]
  },
  {
    id: "realestate",
    slug: "real-estate",
    title: "Real Estate Platforms",
    industry: "Real Estate",
    shortDesc: "Modern platforms for property management.",
    fullDesc: "Interactive property listing platforms, virtual 3D tour integrations, CRM lead tracking for agents, and automated lease management software.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    keyHighlights: ["Advanced Property Search Filters", "Agent CRM & Lead Assignment", "Mortgage Calculators", "Tenant Portal & Online Rent Payments"]
  },
  {
    id: "retail",
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    industry: "Retail",
    shortDesc: "Grow your online business with powerful solutions.",
    fullDesc: "High-converting headless E-commerce stores, multi-vendor marketplaces, inventory synchronization tools, and omnichannel POS system integration.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    keyHighlights: ["Lightning-Fast Checkout Workflows", "Stripe, Razorpay & UPI Integrations", "Inventory & Warehouse Sync", "Personalized Recommendation Engine"]
  },
  {
    id: "custom",
    slug: "custom-solutions",
    title: "Custom Business Solutions",
    industry: "Enterprise",
    shortDesc: "Tailored solutions for your unique business needs.",
    fullDesc: "Bespoke enterprise software tailored to solve complex operational challenges, legacy data migrations, specialized internal dashboards, and custom API integrations.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    keyHighlights: ["Tailor-Made Business Logic", "Legacy Infrastructure Bridge", "Scalable Cloud Architecture", "End-to-End SLA Support"]
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "edutrack",
    slug: "edutrack-portal",
    title: "EduTrack",
    category: "Websites",
    client: "EduTrack Systems",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
    description: "School Management System with real-time student tracking, automated attendance, and interactive parent dashboard.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    results: ["300% increase in portal usage", "90% reduction in paper reports"]
  },
  {
    id: "citytravels",
    slug: "city-travels-app",
    title: "City Travels",
    category: "Mobile Apps",
    client: "City Travels Pvt Ltd",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    description: "Travel Booking Platform offering instant ticket reservations, live bus tracking, and digital ticket QR codes.",
    technologies: ["React Native", "Node.js", "Express", "PostgreSQL"],
    results: ["50,000+ app downloads", "4.8 star average rating"]
  },
  {
    id: "retailstore",
    slug: "retailstore-ecommerce",
    title: "RetailStore",
    category: "Platforms",
    client: "RetailStore Enterprises",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    description: "E-Commerce Website featuring multi-currency checkout, dynamic discounts, and automated warehouse dispatch.",
    technologies: ["Next.js", "Tailwind CSS", "Stripe API", "GraphQL"],
    results: ["140% sales increase in Q1", "1.2s page load speed"]
  },
  {
    id: "healthcaresuit",
    slug: "healthcare-pro-suite",
    title: "HealthCare Pro",
    category: "Platforms",
    client: "MedHealth Alliance",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    description: "Hospital Management Platform enabling digital EHR access, doctor scheduling, and online labs.",
    technologies: ["React", "Express", "Node.js", "MongoDB"],
    results: ["Over 200 daily doctors onboarded", "Zero HIPAA compliance flags"]
  },
  {
    id: "realestatepro",
    slug: "realestate-pro-listing",
    title: "RealEstate Pro",
    category: "Websites",
    client: "Apex Properties",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    description: "Property Listing Platform with interactive Google Maps layer, VR walkthroughs, and buyer lead scoring.",
    technologies: ["Next.js", "Tailwind CSS", "Mapbox", "Node.js"],
    results: ["250+ properties listed weekly", "45% higher lead conversions"]
  },
  {
    id: "foodie",
    slug: "foodie-ordering-app",
    title: "Foodie",
    category: "Mobile Apps",
    client: "Foodie Global",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop",
    description: "Restaurant Website & Mobile App for online ordering, kitchen management, and customer loyalty points.",
    technologies: ["Flutter", "Firebase", "Node.js"],
    results: ["15,000+ monthly active orders", "Avg delivery time cut by 8 mins"]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "how-a-website-can-grow-your-business",
    title: "How a Website Can Grow Your Business",
    category: "Strategy",
    date: "Sep 10, 2024",
    readTime: "5 min read",
    author: "Anand",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    excerpt: "A professional website acts as your 24/7 storefront, building trust, attracting organic search traffic, and converting visitors into loyal paying customers.",
    content: "In today's digital-first economy, a website is no longer optional—it is the foundation of corporate credibility. From establishing brand authority to automating lead capture, a fast and responsive website works continuously for your business..."
  },
  {
    id: "2",
    slug: "top-digital-marketing-strategies-for-2024",
    title: "Top Digital Marketing Strategies for 2024",
    category: "Marketing",
    date: "Aug 25, 2024",
    readTime: "6 min read",
    author: "Bukke Reddiswapna",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Explore the most effective digital marketing channels to grow your brand authority and maximize return on ad spend in 2024.",
    content: "Digital marketing strategies have shifted towards high-intent search optimization, video content, and hyper-personalized campaign funnels. Learn how top brands leverage data analytics..."
  },
  {
    id: "3",
    slug: "why-mobile-apps-are-important-for-business",
    title: "Why Mobile Apps Are Important for Businesses",
    category: "Development",
    date: "Aug 12, 2024",
    readTime: "4 min read",
    author: "Mahendra Cheerla",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Mobile apps increase user engagement, improve customer retention, and streamline operations for modern enterprises.",
    content: "With over 85% of mobile time spent inside applications, native mobile apps provide direct push notification touchpoints and frictionless experiences..."
  },
  {
    id: "4",
    slug: "cloud-solutions-a-smarter-future",
    title: "Cloud Solutions: A Smarter Future",
    category: "Cloud",
    date: "Jul 30, 2024",
    readTime: "5 min read",
    author: "Sai Guru Surya Teja",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Learn how Cloud Technology helps your business become more efficient, secure, and infinitely scalable.",
    content: "Migrating on-premise workloads to scalable cloud platforms unlocks instant scaling, automated disaster recovery, and reduced hardware capital expenditure..."
  },
  {
    id: "5",
    slug: "ui-ux-trends-to-watch-in-2024",
    title: "UI/UX Trends to Watch in 2024",
    category: "Design",
    date: "Jul 15, 2024",
    readTime: "6 min read",
    author: "B.V. Madhukar",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Discover the latest strategic design trends shaping digital products this year.",
    content: "Design systems, accessible color contrast, micro-animations, and minimal corporate layouts are driving higher conversion metrics across modern web applications..."
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder",
    name: "Anand",
    role: "Founder & CEO",
    title: "Full Stack Developer | UI/UX Designer | YouTube Educator",
    experience: "Full Stack Engineer & Tech Lead",
    bio: "Full-stack developer, designer, and tech educator passionate about building high-performance web applications and scaling tech solutions.",
    image: "/images/profiles/anand.png",
    skills: ["React", "Next.js", "Java", "Spring Boot", "Node.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "REST APIs"],
    socials: {
      linkedin: "https://www.linkedin.com/in/arekanti-anand-raju-2615a0377/",
      github: "https://github.com/anandsri682",
      youtube: "https://youtube.com/@mr_anandtechintelugu",
      instagram: "https://instagram.com/techwithmranand",
    },
    isFounder: true,
  },
  {
    id: "mahendra-cheerla",
    name: "Mahendra Cheerla",
    role: "Java Full Stack Developer",
    title: "Spring Boot | Microservices | React Developer",
    experience: "Full Stack Developer",
    bio: "Specializing in Java, Spring Boot, Microservices, React, Next.js, and MySQL. Passionate about building scalable enterprise backends.",
    image: "/images/profiles/mahendra.png",
    skills: ["Java", "Spring Boot", "Microservices", "React", "Next.js", "MySQL", "Hibernate", "REST APIs"],
    socials: {
      github: "https://github.com/Cheerlamahendra",
      linkedin: "https://www.linkedin.com/in/cheerla-mahendra-aa9334377/",
    },
    isCoFounder: true,
  },
  {
    id: "lead-frontend",
    name: "B.V. Madhukar",
    role: "Frontend Lead & UI/UX Architect",
    title: "Senior UI/UX & React Architect",
    experience: "Frontend Specialist",
    bio: "Crafting fluid, pixel-perfect user experiences with low latency, modern design tokens, and cutting-edge web technologies.",
    image: "/images/profiles/madhukar.jpg",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "UI/UX Design"],
    socials: {
      linkedin: "https://www.linkedin.com/in/bathula-venkata-madhukar-517489253/",
      github: "https://github.com/MADHU-BATHULA",
      instagram: "https://www.instagram.com/b_madhu_yadav/",
    },
    isCoFounder: true,
  },
  {
    id: "surya-teja",
    name: "Sai Guru Surya Teja",
    role: "MERN Stack & DevOps Engineer",
    experience: "Full Stack & DevOps",
    bio: "Full Stack Developer specializing in MERN Stack, Java Full Stack, Docker, and AWS cloud deployment architectures.",
    image: "/images/profiles/surya.jpg",
    skills: ["MERN Stack", "Java", "Spring Boot", "Node.js", "MongoDB", "Docker", "AWS"],
    socials: {
      linkedin: "https://www.linkedin.com/in/suryateja78335a334",
      github: "https://github.com/saisurya123658",
      instagram: "https://www.instagram.com/suryateja_9985",
    },
  },
  {
    id: "karthik",
    name: "Telugu Dasari Karthik",
    role: "Java Full Stack Developer",
    experience: "Backend Developer",
    bio: "Dedicated Java Full Stack Developer focused on building robust backends with Spring Boot, MySQL, and microservices.",
    image: "/images/profiles/karthik.jpg",
    skills: ["Java", "Spring Boot", "MySQL", "React", "Microservices", "REST APIs"],
    socials: {
      linkedin: "https://www.linkedin.com/in/karthik-telugu-dasari-b7a679394/",
      github: "https://github.com/tdkarthik6",
      instagram: "https://www.instagram.com/_mr._.karthik_59/",
    },
  },
  {
    id: "vandana",
    name: "Vandana Karanam",
    role: "MERN Stack & Python Developer",
    experience: "Full Stack Developer",
    bio: "Software developer with expertise in React, Node.js, Python, and Machine Learning applications.",
    image: "/images/profiles/vandana.jpeg",
    skills: ["Python", "React", "Node.js", "JavaScript", "Machine Learning", "DSA"],
    socials: {
      github: "https://github.com/VandanaRam",
      linkedin: "https://www.linkedin.com/in/karanam-vandana-454b552a2",
    },
  },
  {
    id: "reddiswapna",
    name: "Bukke Reddiswapna",
    role: "MERN Developer & UI/UX Specialist",
    experience: "Full Stack & UI/UX",
    bio: "Passionate developer building user-friendly web interfaces using MERN Stack, Java, and human-centered design principles.",
    image: "/images/profiles/Reddiswapna.png",
    skills: ["React.js", "Node.js", "Express", "MongoDB", "Java", "UI/UX Design"],
    socials: {
      github: "https://github.com/bukkereddiswapna",
      linkedin: "https://www.linkedin.com/in/reddiswapna-bukke-53a805374/",
    },
  },
  {
    id: "janshi",
    name: "Dakka Jhansi Rani",
    role: "MERN Stack Developer",
    experience: "Full Stack Developer",
    bio: "Web developer with solid foundation in React, Node.js, SQL, MongoDB, and Data Structures.",
    image: "/images/profiles/janshi.jpeg",
    skills: ["Java", "React.js", "Node.js", "MongoDB", "SQL", "DSA"],
    socials: {
      github: "https://github.com/jhansirani2607",
      linkedin: "https://www.linkedin.com/in/dakka-jhansi-rani-7a9752378",
    },
  },
  {
    id: "subhashini",
    name: "Subhashini Konda",
    role: "Full Stack & AI/ML Developer",
    experience: "Full Stack & AI/ML",
    bio: "Developer specializing in MERN stack, Python, Machine Learning, and building scalable web applications.",
    image: "/images/profiles/subhashini.jpeg",
    skills: ["JavaScript", "React.js", "Node.js", "MongoDB", "Python", "Machine Learning"],
    socials: {
      github: "https://github.com/KONDA-SUBHASHINI",
      linkedin: "https://www.linkedin.com/in/subhashini-konda-012228387/",
      instagram: "https://www.instagram.com/subhashini_speaks/",
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sai Teja",
    role: "Digital Solutions Partner",
    company: "Business Solutions",
    quote: "Great experience working with AVM Smart. The team was supportive, professional, and focused on delivering a quality digital solution.",
    rating: 5
  },
  {
    id: "2",
    name: "Anjali",
    role: "Web Application Client",
    company: "E-Commerce Venture",
    quote: "AVM Smart understood our requirements clearly and delivered a clean and professional website with a smooth user experience.",
    rating: 5
  },
  {
    id: "3",
    name: "Venkatesh",
    role: "Software Client",
    company: "Enterprise Systems",
    quote: "The team communicated well throughout the project and provided a practical solution that matched our business requirements.",
    rating: 5
  },
  {
    id: "4",
    name: "Priya",
    role: "UI/UX Project Lead",
    company: "EdTech Platform",
    quote: "Very good experience with the AVM Smart team. Their attention to design, functionality, and responsiveness was impressive.",
    rating: 5
  },
  {
    id: "5",
    name: "Ramesh",
    role: "Technical Client",
    company: "Cloud & Mobile",
    quote: "Professional service and good technical support. The team was helpful throughout the development process.",
    rating: 5
  },
  {
    id: "6",
    name: "Karthik",
    role: "App Development Client",
    company: "Mobile Platform",
    quote: "AVM Smart provided a smooth development experience with good communication and attention to detail.",
    rating: 5
  }
];

export const CORE_VALUES = [
  { title: "Client First", desc: "We prioritize our clients' success and build long-term relationships.", icon: "HeartHandshake" },
  { title: "Quality", desc: "We maintain high standards in design, code, and project delivery.", icon: "ShieldCheck" },
  { title: "Innovation", desc: "We continuously adopt modern tools to solve complex challenges.", icon: "Lightbulb" },
  { title: "Accountability", desc: "We deliver on commitments with transparency and integrity.", icon: "Award" }
];

export const FOUR_PILLARS = [
  { title: "Innovation", desc: "We embrace new ideas and continuous advancement.", icon: "Sparkles" },
  { title: "Integrity", desc: "Honesty and ethical practice in all client relations.", icon: "Shield" },
  { title: "Growth", desc: "Building scalable technology for long-term impact.", icon: "TrendingUp" },
  { title: "Collaboration", desc: "Working as true extended partners with our clients.", icon: "Users" }
];
