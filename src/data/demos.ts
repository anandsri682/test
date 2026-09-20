export interface DemoItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  status: 'live' | 'coming_soon';
  accent: 'orange' | 'blue' | 'green' | 'teal';
  featured: boolean;
  shortDesc?: string;
  overview?: string;
  businessProblem?: string;
  solution?: string;
  keyFeatures?: string[];
  relatedServices?: string[];
}

export const DEMOS: DemoItem[] = [
  {
    id: "furniture",
    name: "Furniture E-Commerce",
    slug: "furniture",
    description: "A modern furniture business website and e-commerce experience designed to showcase products, categories, product details and online customer interaction.",
    shortDesc: "Modern furniture shopping platform with rich product discovery and customer interaction.",
    category: "E-Commerce",
    technologies: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    image: "/images/demos/furniture.png",
    liveUrl: "https://furniture.avmsmart.in/",
    status: "live",
    accent: "green",
    featured: false,
    overview: "Furniture Platform is a high-performance e-commerce website designed to showcase luxury living room, bedroom, dining, and office furniture with interactive product catalogs.",
    businessProblem: "Traditional furniture retailers struggled to present high-resolution product catalogs, dimensions, and online order processing for modern customers.",
    solution: "We engineered a clean, responsive e-commerce web platform offering seamless product filtering, shopping cart functionality, and direct customer inquiry channels.",
    keyFeatures: [
      "Interactive Product Catalog & Filtering",
      "High-Resolution Visual Showcase & Dimensions",
      "Responsive Shopping Cart & Checkout Workflow",
      "Customer Inquiry & Quotation Requests",
      "Admin Inventory & Category Control"
    ],
    relatedServices: ["custom-web-development", "ecommerce-development", "ui-ux-design"]
  },
  {
    id: "vegetable",
    name: "Vegetable E-Commerce",
    slug: "vegetable-ecommerce",
    description: "A modern digital platform for managing vegetable products, inventory, customer orders, and online store operations with real-time analytics.",
    shortDesc: "Enterprise vegetable supply chain & direct-to-consumer digital commerce platform.",
    category: "E-Commerce",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express"],
    image: "/images/demos/vegetable.png",
    liveUrl: "https://vegetable.avmsmart.in",
    status: "live",
    accent: "orange",
    featured: false,
    overview: "Vegetable E-Commerce Platform is an end-to-end digital commerce solution designed to streamline fresh produce supply, daily order fulfillment, dynamic inventory pricing, and doorstep deliveries.",
    businessProblem: "Local agricultural vendors and produce suppliers struggled with inefficient offline order processing, dynamic inventory price shifts, and lack of order tracking.",
    solution: "We engineered a real-time web platform enabling customers to order fresh produce, while giving managers instant controls over stock levels and daily route dispatching.",
    keyFeatures: [
      "Dynamic Daily Produce Catalog & Pricing",
      "Real-Time Order Tracking & SMS Notifications",
      "Integrated Digital Payments & Cash on Delivery",
      "Inventory Stock Warnings & Automated Reordering",
      "Admin Analytics Dashboard for Sales & Route Optimization"
    ],
    relatedServices: ["custom-web-development", "mobile-app-development", "cloud-solutions"]
  },
  {
    id: "hostel",
    name: "Hostel Management",
    slug: "hostel-management",
    description: "An integrated digital solution for managing hostel room allocations, resident check-ins, monthly fee collections, and maintenance requests.",
    shortDesc: "Comprehensive hostel accommodation & facility management platform.",
    category: "Management Systems",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/images/demos/hostel.png",
    liveUrl: "https://hostel.avmsmart.in",
    status: "live",
    accent: "blue",
    featured: false,
    overview: "Hostel Management System simplifies facility operations for educational institutions and private hostel chains through automated room management and fee receipts.",
    businessProblem: "Hostel wardens and administrators faced manual recordkeeping errors, delayed fee tracking, unmonitored visitor logs, and untracked maintenance complaints.",
    solution: "A unified cloud application allowing administrators to monitor occupancy, automate monthly rent reminders, manage digital check-in records, and resolve maintenance tickets.",
    keyFeatures: [
      "Interactive Room & Bed Allocation Grid",
      "Automated Fee Invoicing & Payment Reminders",
      "Resident Digital ID & Visitor Management",
      "Maintenance Ticket System with Status Tracking",
      "Multi-Building Admin Portal with Role Access"
    ],
    relatedServices: ["custom-web-development", "enterprise-software", "cloud-solutions"]
  },
  {
    id: "fashion-ecommerce",
    name: "Fashion E-Commerce",
    slug: "fashion-ecommerce",
    description: "A modern e-commerce platform designed for fashion businesses to showcase products, manage collections, process customer orders, and deliver a seamless online shopping experience.",
    shortDesc: "Complete fashion e-commerce platform for product management, online shopping, orders, and customer management.",
    category: "E-Commerce",
    technologies: ["React", "Express", "MongoDB", "Redux", "Tailwind CSS"],
    image: "/images/demos/fashion.png",
    liveUrl: "https://fashion.avmsmart.in",
    status: "live",
    accent: "orange",
    featured: false,
    overview: "Fashion E-Commerce Platform enables fashion brands and retailers to manage their online store, showcase collections, process orders, and provide customers with a smooth shopping experience.",
    businessProblem: "Fashion retailers often rely on disconnected systems, making it difficult to manage products, track inventory, and handle customer orders conveniently.",
    solution: "We built a modern web-based fashion e-commerce platform that brings product management, online shopping, inventory, customer accounts, and order processing together.",
    keyFeatures: [
      "Modern Fashion Product & Collection Management",
      "Product Search, Filtering & Category Navigation",
      "Customer Shopping Cart & Wishlist",
      "Secure Online Order Management",
      "Responsive Mobile-First Shopping Experience"
    ],
    relatedServices: ["custom-web-development", "ecommerce-development", "ui-ux-design"]
  },
  {
    id: "homefood",
    name: "Home Food Ordering",
    slug: "home-food",
    description: "A modern home food ordering and management platform designed to showcase online food discovery, menu browsing, ordering and business management functionality.",
    shortDesc: "Authentic home food discovery and daily meal subscription platform.",
    category: "Food",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/demos/homefood.png",
    liveUrl: "https://homefood.avmsmart.in/",
    status: "live",
    accent: "orange",
    featured: false
  },
  {
    id: "hotelbooking",
    name: "Hotel Booking",
    slug: "hotel-booking",
    description: "A modern hotel booking platform designed to showcase hotel discovery, room browsing, booking workflows and customer-friendly travel experiences.",
    shortDesc: "Hotel discovery, room reservation, and travel itinerary portal.",
    category: "Travel",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/demos/hotelbooking-demo.svg",
    liveUrl: "https://hotelbooking.avmsmart.in/",
    status: "coming_soon",
    accent: "blue",
    featured: false
  },
  {
    id: "school",
    name: "School Management",
    slug: "school-management",
    description: "A modern school website and management platform designed to showcase academic information, announcements, student services and school administration features.",
    shortDesc: "Complete school administration, academic marks, and parent-teacher communication portal.",
    category: "Education",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    image: "/images/demos/school-demo.svg",
    liveUrl: "https://school.avmsmart.in/",
    status: "coming_soon",
    accent: "teal",
    featured: false
  },
  {
    id: "college",
    name: "College Management",
    slug: "college-management",
    description: "A modern college website and management platform designed to showcase departments, courses, admissions, student services and institutional information.",
    shortDesc: "Higher education portal for autonomous colleges, departments, admissions, and LMS.",
    category: "Education",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/demos/college-demo.svg",
    liveUrl: "https://college.avmsmart.in/",
    status: "coming_soon",
    accent: "blue",
    featured: false
  },
  {
    id: "travels",
    name: "Travel Management",
    slug: "travel-tourism",
    description: "A modern travel platform designed to showcase destinations, packages, bookings and travel management functionality.",
    shortDesc: "Holiday package booking, itinerary planner, and agency CRM.",
    category: "Travel",
    technologies: ["React", "Redux", "Node.js", "MongoDB"],
    image: "/images/demos/travel-demo.svg",
    liveUrl: "https://travels.avmsmart.in/",
    status: "coming_soon",
    accent: "green",
    featured: false
  },
  {
    id: "catering",
    name: "Catering Services",
    slug: "catering-services",
    description: "A modern catering business website designed to showcase catering services, menus, packages, events and customer enquiries.",
    shortDesc: "Grand event catering, wedding feast packages, and customer inquiry management.",
    category: "Food",
    technologies: ["Next.js", "Tailwind CSS", "Node.js"],
    image: "/images/demos/catering-demo.svg",
    liveUrl: "https://catering.avmsmart.in/",
    status: "coming_soon",
    accent: "orange",
    featured: false
  },
  {
    id: "creative-design",
    name: "Creative Design Studio",
    slug: "creative-design",
    description: "A creative design showcase demonstrating professional visual design, branding and digital creative work.",
    shortDesc: "Brand identity, graphic design, and UI/UX creative portfolio.",
    category: "Creative",
    technologies: ["Photoshop", "Figma", "Branding", "UI/UX"],
    image: "/images/demos/creative-demo.svg",
    liveUrl: "",
    status: "coming_soon",
    accent: "orange",
    featured: false
  },
  {
    id: "event-photography",
    name: "Event Photography",
    slug: "event-photography",
    description: "A modern event photography website concept designed to showcase photography portfolios, events, galleries and client experiences.",
    shortDesc: "Visual storytelling, wedding photography, and event portfolio.",
    category: "Creative",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/images/demos/photography-demo.svg",
    liveUrl: "",
    status: "coming_soon",
    accent: "teal",
    featured: false
  }
];

export const DEMO_CATEGORIES = [
  "All",
  "E-Commerce",
  "Education",
  "Food",
  "Travel",
  "Management Systems",
  "Creative"
];
