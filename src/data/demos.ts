export interface DemoItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'E-Commerce' | 'Management Systems' | 'Business Solutions' | 'Websites' | 'Mobile Apps' | 'Education' | string;
  technologies: string[];
  image: string;
  liveUrl: string;
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
    id: "vegetable",
    name: "Vegetable E-Commerce Platform",
    slug: "vegetable-ecommerce",
    description: "A modern digital platform for managing vegetable products, inventory, customer orders, and online store operations with real-time analytics.",
    shortDesc: "Enterprise vegetable supply chain & direct-to-consumer digital commerce platform.",
    category: "E-Commerce",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express"],
    image: "/images/demos/vegetable.png",
    liveUrl: "https://vegetable.avmsmart.in",
    featured: false,
    overview: "Vegetable E-Commerce Platform is an end-to-end digital commerce solution designed to streamline fresh produce supply, daily order fulfillment, dynamic inventory pricing, and doorstep deliveries for agricultural businesses.",
    businessProblem: "Local agricultural vendors and produce suppliers struggled with inefficient offline order processing, dynamic inventory price shifts, high logistics wastage, and lack of customer order tracking.",
    solution: "We engineered a real-time web platform enabling customers to order fresh produce, while giving managers instant controls over stock levels, delivery routes, and digital payment reconciliations.",
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
    name: "Hostel Management System",
    slug: "hostel-management",
    description: "An integrated digital solution for managing hostel room allocations, resident check-ins, monthly fee collections, and maintenance requests.",
    shortDesc: "Comprehensive hostel accommodation & facility management platform.",
    category: "Management Systems",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/images/demos/hostel.png",
    liveUrl: "https://hostel.avmsmart.in",
    featured: false,
    overview: "Hostel Management System simplifies facility operations for educational institutions and private hostel chains through automated room management, attendance tracking, and transparent digital fee receipts.",
    businessProblem: "Hostel wardens and administrators faced manual recordkeeping errors, delayed fee tracking, unmonitored visitor logs, and untracked maintenance complaints across multiple blocks.",
    solution: "A unified cloud application allowing administrators to monitor occupancy, automate monthly rent reminders, manage digital check-in records, and resolve resident support tickets.",
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
  name: "Fashion E-Commerce Platform",
  slug: "fashion-ecommerce",
  description:
    "A modern e-commerce platform designed for fashion businesses to showcase products, manage collections, process customer orders, and deliver a seamless online shopping experience.",
  shortDesc:
    "Complete fashion e-commerce platform for product management, online shopping, orders, and customer management.",
  category: "E-Commerce",
  technologies: [
    "React",
    "Express",
    "MongoDB",
    "Redux",
    "Tailwind CSS"
  ],
  image: "/images/demos/fashion.png",
  liveUrl: "https://fashion.avmsmart.in",
  featured: false,

  overview:
    "Fashion E-Commerce Platform enables fashion brands and retailers to manage their online store, showcase collections, manage products and inventory, process customer orders, and provide customers with a smooth and engaging shopping experience.",

  businessProblem:
    "Fashion businesses often rely on traditional sales channels and disconnected systems, making it difficult to manage products, track inventory, handle customer orders, and provide customers with a convenient online shopping experience.",

  solution:
    "We built a modern web-based fashion e-commerce platform that brings product management, online shopping, inventory, customer accounts, order processing, and business operations together in one scalable digital solution.",

  keyFeatures: [
    "Modern Fashion Product & Collection Management",
    "Product Search, Filtering & Category Navigation",
    "Customer Shopping Cart & Wishlist",
    "Secure Online Order Management",
    "Inventory & Stock Management",
    "Customer Account & Order Tracking",
    "Responsive Mobile-First Shopping Experience",
    "Admin Dashboard for Store Management"
  ],

  relatedServices: [
    "custom-web-development",
    "ecommerce-development",
    "ui-ux-design",
    "cloud-solutions"
  ]
}
];

export const DEMO_CATEGORIES = [
  "All",
  "E-Commerce",
  "Management Systems",
  "Business Solutions",
  "Websites",
  "Mobile Apps"
];
