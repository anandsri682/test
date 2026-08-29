"use client";

import React, { useState, useEffect, useRef } from "react";
import ContactSection from "@/components/Sections/ContactSection";


import { FaFacebook } from "react-icons/fa6";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Code2,
  Sparkles,
  Rocket,
  ShieldCheck,
  Zap,
  Users,
  Target,
  Clock,
  Heart,
  ChevronRight,
  ExternalLink,
  Award,
  CheckCircle2,
  MessageSquare,
  ChevronLeft,
  Star,
  Cpu,
  Layers,
  Globe,
  Terminal,
  Database,
  Server,
  Cloud,
  Layout,
  Palette,
  Coffee,
  Lightbulb,
  Briefcase,
  Monitor,
  Laptop,
  GitBranch,
} from "lucide-react";
// ==========================================
// TYPES & DATA DEFINITIONS
// ==========================================
const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const YoutubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
interface TeamMember {
  id: string;
  name: string;
  role: string;
  title?: string;
  experience: string;
  youtubeExperience?: string;
  bio: string;
  image: string;
  skills: string[];
  socials: {
    linkedin?: string;
    github?: string;
    youtube?: string;
    instagram?: string;
    facebook?: string;
    
  };
   
  isHighlight?: boolean;
  isCoFounder?: boolean;
  isTeamMember?: boolean;
}
// Profile Images
const PROFILE_IMAGES = {
  founder: "/images/profiles/anand.png",

  mahendra: "/images/profiles/mahendra.png",
  surya: "/images/profiles/surya.jpg",

  karthik: "/images/profiles/karthik.jpg",
  madhukar: "/images/profiles/madhukar.jpg",
  reddiswapna:"/images/profiles/Reddiswapna.png",
  janshi: "/images/profiles/janshi.jpeg",
  vandana: "/images/profiles/vandana.jpeg",
  subhashini: "/images/profiles/subhashini.jpeg",
  

  default: "/images/profiles/default.png",
};
const FOUNDER_DATA: TeamMember = {
  id: "founder",
  name: "Anand",
  role: "Founder & CEO",
  title: "Full Stack Developer | UI/UX Designer | YouTube Educator",
  experience: "Fresher",
  youtubeExperience: "2+ Years YouTube Experience",
  bio: "Full-stack developer, designer, and tech YouTuber.",

  image:PROFILE_IMAGES.founder,

  skills: [
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Tailwind CSS",
    "TypeScript",
    "System Design",
    "REST APIs"
  ],

  socials: {
    linkedin: "https://www.linkedin.com/in/arekanti-anand-raju-2615a0377/",
    github: "https://github.com/anandsri682",
    youtube: "https://youtube.com/@mr_anandtechintelugu",
    instagram: "https://instagram.com/techwithmranand",
    facebook: "https://facebook.com/anandsri682",
  },

  isHighlight: true,
}
const LEADS_DATA: TeamMember[] = [
  {
  id: "mahendra-cheerla",
  name: "Mahendra Cheerla",
  role: "Java Full Stack Developer",
  title: "Spring Boot | Microservices | React Developer",
  experience: "Fresher",

  bio: "Passionate Computer Science student specializing in Java, Spring Boot, Microservices, React, Next.js, and MySQL. I enjoy building scalable web applications, solving DSA problems, and creating modern, responsive user interfaces.",

  image:PROFILE_IMAGES.mahendra ,
  skills: [
    "Java",
    "Spring Boot",
    "Microservices",
    "Spring Security",
    "JWT",
    "React",
    "Next.js",
    "Tailwind CSS",
    "MySQL",
    "Hibernate",
    "REST APIs",
    "Git",
    "DSA"
  ],

  socials: {
    github: "https://github.com/Cheerlamahendra",
    linkedin: "https://www.linkedin.com/in/cheerla-mahendra-aa9334377/",
    // leetcode: "https://leetcode.com/u/CheerlaMahendra/"
  },
   isCoFounder:true,
  },
  {
    id: "lead-frontend",
    name: "B.V.Madhukar",
    role: "Frontend Lead",
    title: "Senior UI/UX & React Architect",
    experience: "Fresher",
    bio: "Crafting fluid, pixel-perfect user experiences with ultra-low latency and cutting-edge web technologies.",
    image:PROFILE_IMAGES.madhukar,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    socials: {
      linkedin:" https://www.linkedin.com/in/bathula-venkata-madhukar-517489253/",
      github:"https://github.com/MADHU-BATHULA",
      instagram: "https://www.instagram.com/b_madhu_yadav/"
    },
     isCoFounder:true,
  },
  
];

const ADDITIONAL_TEAM: TeamMember[] = [
  {
  id: "team-1",
  name: "Sai Guru Surya Teja",
  role: "MERN Stack | Java Full Stack | DevOps Engineer",
  experience: "Fresher",
  bio: "Passionate Full Stack Developer specializing in MERN Stack, Java Full Stack, and DevOps. Experienced in building scalable web applications, REST APIs, cloud-native solutions, and AI-powered applications with a focus on clean code and modern development practices.",
  image:PROFILE_IMAGES.surya, // Replace with your image path or URL

  skills: [
    "Java",
    "Spring Boot",
    "MERN Stack",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Docker",
    "Git",
    "GitHub",
    "AWS"
  ],

  socials: {
    linkedin: "https://www.linkedin.com/in/suryateja78335a334",
    github: "https://github.com/saisurya123658",
    instagram: "https://www.instagram.com/suryateja_9985",
  },
  isTeamMember:true,
  },
 {
  id: "team-2",
  name: "Telugu Dasari Karthik",
  role: "Java Full Stack Developer",
  experience: "Fresher",
  bio: "Passionate Java Full Stack Developer with strong knowledge of Java, Spring Boot, MySQL, and Microservices. Dedicated to building scalable backend applications and continuously improving my skills.",

  image:PROFILE_IMAGES.karthik, // Replace with your profile image

  skills: ["React.js","Next.js", "Java", "MySQL", "Spring Boot", "Microservices"],

  socials: {
    linkedin: "https://www.linkedin.com/in/karthik-telugu-dasari-b7a679394/",
    github: "https://github.com/tdkarthik6",
    instagram: "https://www.instagram.com/_mr._.karthik_59/",
  },

    isTeamMember:true,
  },
  {
  "id": "team-3",
  "name": "Vandana",
  "role": "Mern Full Stack Developer",
  "experience": "Fresher",
  "bio": "Computer Science Engineering student at G Pulla Reddy Engineering College with an interest in software development, web technologies, Python, and machine learning. Currently building projects and strengthening problem-solving and technical skills.",
  image:PROFILE_IMAGES.vandana,
  "skills": [
    "Python",
    "React",
    "Node.js",
    "JavaScript",
    "Machine Learning",
    "Web Development",
    "DSA"
  ],
  "socials": {
    "github": "https://github.com/VandanaRam",
    "linkedin": "https://www.linkedin.com/in/karanam-vandana-454b552a2",
    // "leetcode": "https://leetcode.com/u/FWKMpc5Wfx/"
  },
  isTeamMember:true,
},

{
  "id": "team-4",
  "name": "Bukke Reddiswapna",
  "role": "Mern Full Stack Developer & UI/UX Designer",
  "experience": "Fresher",
  "bio": "Final year student and Full Stack Developer passionate about building user-friendly web applications using MERN Stack and Java. Interested in learning and growing with a startup team.",
  image:PROFILE_IMAGES.reddiswapna,
  "skills": ["React.js", "Node.js", "Express.js", "MongoDB", "Java", "JavaScript", "UI/UX Design", "HTML", "CSS"],
  "socials": {
    "github": "https://github.com/bukkereddiswapna",
    "linkedin": "https://www.linkedin.com/in/reddiswapna-bukke-53a805374/",
    // "leetcode": "https://leetcode.com/u/bukke_reddiswapna05/"
  },
  isTeamMember:true,
},

{
  "id": "team-5",
  "name": "Dakka Jhansi Rani",
  "role": "Mern Full Stack Developer",
  "experience": "Fresher",
  "bio": "Computer Science Engineering student graduating in 2027,interested in Full-Stack Development,Web Development and DSA",
  image:PROFILE_IMAGES.janshi ,
  "skills": [
        "C",
        "Java",
        "JavaScript",
        "HTML",
        "CSS",
        "React.js",
        "Node.js",
        "MongoDB",
        "SQL",
         "DSA"
  ],
  "socials": {
    "github": "https://github.com/jhansirani2607",
    "linkedin": "https://www.linkedin.com/in/dakka-jhansi-rani-7a9752378",
  // ?"leetcode": "https://leetcode.com/u/jhansi_rani26/"
  },
  isTeamMember:true,
},
{
  "id": "team-6",
  "name": "Subhashini Konda",
  "role": "Full Stack & AI/ML Developer",
  "experience": "Fresher",
  "bio": "Full Stack Developer specializing in the MERN stack, focused on building websites and applications that solve real problems. Has also explored AI/ML through hands-on projects during internships.",
  image:PROFILE_IMAGES.subhashini ,
  "skills": [
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PHP",
    "Python",
    "Java",
    "DSA",
    "Git & GitHub",
    "Machine Learning",
    "REST APIs"
  ],
  "socials": {
    "github": "https://github.com/KONDA-SUBHASHINI",
    "linkedin": "https://www.linkedin.com/in/subhashini-konda-012228387/",
    // "leetcode": "https://leetcode.com/u/KONDA_SUBHASHINI/",
    "instagram": "https://www.instagram.com/subhashini_speaks/"
  },
  isTeamMember:true,
},
  
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    desc: "Direct access to real-time Slack/Discord updates, daily standups, and transparent task boards.",
  },
  {
    icon: Code2,
    title: "Experienced Developers",
    desc: "Engineers with rich experience building enterprise solutions, SaaS platforms, and mobile apps.",
  },
  {
    icon: Cpu,
    title: "Modern Tech Stack",
    desc: "Built with the latest frameworks like Next.js 16, Spring Boot, React, and serverless edge tools.",
  },
  {
    icon: Zap,
    title: "Rapid Agile Delivery",
    desc: "Short sprint cycles delivering functional prototypes early and often without compromising quality.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    desc: "Clean code structures engineered to effortlessly scale from initial MVP to millions of users.",
  },
  {
    icon: Clock,
    title: "24/7 Support & Maintenance",
    desc: "Proactive real-time server monitoring, security updates, and rapid bug resolution post-launch.",
  },
  {
    icon: Palette,
    title: "Creative & Intuitive UX",
    desc: "Human-centered interfaces crafted with pixel perfection and delightful modern animations.",
  },
  {
    icon: Target,
    title: "SEO & Core Web Vitals",
    desc: "Optimized for top search ranking scores, blazingly fast load times, and ideal accessibility.",
  },
];

const VALUES = [
  {
    num: "01",
    title: "Uncompromising Innovation",
    desc: "We explore bleeding-edge web tech to ensure every client gets a future-proof product.",
  },
  {
    num: "02",
    title: "Craftsmanship & Quality",
    desc: "From clean Git commits to pixel-perfect rendering, quality is built into every step.",
  },
  {
    num: "03",
    title: "Radical Transparency",
    desc: "No hidden charges, unexpected delays, or jargon. Honest feedback and clear roadmaps.",
  },
  {
    num: "04",
    title: "Synergistic Teamwork",
    desc: "We operate as an extension of your product team, aligning with your business goals.",
  },
  {
    num: "05",
    title: "Customer-Centric Focus",
    desc: "Your growth is our North Star. We build products designed to convert and succeed.",
  },
  {
    num: "06",
    title: "Continuous Learning",
    desc: "We constantly sharpen our skills and share knowledge openly through tech education.",
  },
];

const WORK_CULTURE = [
  {
    title: "Modern Tech Hub",
    category: "Office Environment",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    icon: Monitor,
  },
  {
    title: "Remote First Flexibility",
    category: "Global Collaboration",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    icon: Laptop,
  },
  {
    title: "Collaborative Standups",
    category: "Team Meeting",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    icon: Users,
  },
  {
    title: "Interactive Brainstorming",
    category: "Product Architecture",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    icon: Lightbulb,
  },
  {
    title: "Casual Tech Discussions",
    category: "Coffee & Code",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop",
    icon: Coffee,
  },
  {
    title: "UI/UX Design Jam",
    category: "Creative Sprints",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31b272c490?q=80&w=800&auto=format&fit=crop",
    icon: Palette,
  },
];

const TECH_STACK = [
  { name: "React", icon: Globe },
  { name: "Next.js", icon: Terminal },
  { name: "Java", icon: Code2 },
  { name: "Spring Boot", icon: Server },
  { name: "Node.js", icon: Cpu },
  { name: "Express", icon: Layers },
  { name: "MongoDB", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Cloud },
  { name: "AWS", icon: Cloud },
  { name: "Firebase", icon: Zap },
  { name: "Tailwind CSS", icon: Palette },
  { name: "TypeScript", icon: Terminal },
  { name: "GitHub", icon: GitBranch},
  { name: "Vercel", icon: Rocket },
  { name: "Framer Motion", icon: Sparkles },
];

const TESTIMONIALS = [
  {
    quote:
      "The Freelancing Mind team delivered our SaaS platform 3 weeks ahead of schedule. Their attention to UX detail and smooth Framer Motion animations blown our investors away!",
    author: "David Miller",
    role: "CEO, NexaCloud Inc.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Working with Anand and his leads was a breeze. They refactored our legacy monolithic codebase into a high-speed Next.js app with zero downtime during migration.",
    author: "Elena Rostova",
    role: "CTO, FinTech Pulse",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Not only did they build our mobile & web app seamlessly, but Anand's technical breakdown videos also helped train our internal dev team. Truly world-class partners!",
    author: "Marcus Chen",
    role: "Founder, OmniHealth",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
];

// ==========================================
// HELPER COMPONENTS
// ==========================================

// Animated Counter Component
        function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
        const [count, setCount] = useState(0);
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true, margin: "-100px" });

        useEffect(() => {
            if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = Math.ceil(end / (duration / 16));

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                setCount(end);
                clearInterval(timer);
                } else {
                setCount(start);
                }
            }, 16);

            return () => clearInterval(timer);
            }
        }, [isInView, value]);

        return (
            <span ref={ref} className="font-extrabold text-white">
            {count}
            {suffix}
            </span>
        );
        }

        // Social Button Link
        function SocialLink({
        href,
        icon: Icon,
        label,
        isHighlight = false,
        }: {
        href?: string;
        icon: React.ElementType;
        label: string;
        isHighlight?: boolean;
        }) {
        if (!href) return null;

        return (
            <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.2, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 flex items-center justify-center ${
                isHighlight
                ? "bg-red-500/20 border-red-500/40 text-red-400 hover:text-white hover:bg-red-500 shadow-lg shadow-red-500/20"
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-purple-600/30 hover:border-purple-500/50"
            }`}
            >
            <Icon className="w-4 h-4" />
            </motion.a>
        );
        }

        // Org Card Component
        function TeamCard({ member }: { member: TeamMember }) {
        return (
            <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className={`relative group rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                member.isHighlight
                ? "bg-gradient-to-b from-[#180e2e] via-[#120a24] to-[#09090B] border-purple-500/40 shadow-2xl shadow-purple-900/40 hover:border-purple-400/80"
                : "bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-white/10 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-900/20"
            }`}
            >
            {/* Soft Hover Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-purple-600/0 via-purple-500/20 to-amber-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        {(member.isHighlight || member.isCoFounder || member.isTeamMember) && (
  <div
    className={`absolute top-4 right-4 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 ${
      member.isHighlight
        ? "bg-gradient-to-r from-purple-600 to-amber-500 shadow-purple-900/50"
        : member.isCoFounder
        ? "bg-gradient-to-r from-cyan-600 to-blue-500 shadow-cyan-900/40"
        : "bg-gradient-to-r from-emerald-600 to-green-500 shadow-green-900/40"
    }`}
  >
    <Award className="w-2.5 h-3" />
    {member.isHighlight
      ? "Founder"
      : member.isCoFounder
      ? "Co-Founder"
      : "Team Member"}
  </div>
)}

      <div className="flex flex-col items-center text-center">
        {/* Profile Image with Zoom on Hover */}
       <div className="relative w-32 h-40 sm:w-36 sm:h-44 mb-6 group">
            {/* Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-purple-300 via-amber-400 to-purple-700 blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500" />

            {/* Frame */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                <img
                src={member.image || PROFILE_IMAGES.default}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            </div>

        {/* Member Details */}
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
          {member.name}
        </h3>
        <p className="text-amber-400 text-sm font-semibold mt-0.5">
          {member.role}
        </p>
        {member.title && (
          <p className="text-purple-300/80 text-xs mt-1 font-medium max-w-xs">
            {member.title}
          </p>
        )}

        <span className="mt-2 inline-block bg-white/5 border border-white/10 text-slate-300 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
          {member.experience}
        </span>
        {member.youtubeExperience && (
          <span className="mt-2 inline-block bg-red-500/10 border border-red-500/20 text-red-300 text-[11px] font-semibold px-3 py-1 rounded-full">
            🎥 {member.youtubeExperience}
          </span>
        )}
        <p className="text-slate-300 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed">
          {member.bio}
        </p>

        {/* Skills List */}
        <div className="flex flex-wrap gap-1.5 justify-center mt-4">
          {member.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-purple-950/50 text-purple-200 border border-purple-500/20 px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>

       {/* Social Icons */}
        <div className="flex items-center gap-2 mt-5">
          <SocialLink
            href={member.socials.linkedin}
            icon={LinkedinIcon}
            label="LinkedIn"
          />
          <SocialLink
            href={member.socials.github}
            icon={GithubIcon}
            label="GitHub"
          />
          <SocialLink
            href={member.socials.youtube}
            icon={YoutubeIcon}
            label="YouTube"
            isHighlight={!!member.socials.youtube}
          />
          <SocialLink
            href={member.socials.instagram}
            icon={InstagramIcon}
            label="Instagram"
          />
          {/* <SocialLink
            href={member.socials.facebook}
            icon={FacebookIcon}
            label="Facebook"
          /> */}
        </div>
      </div>
    </motion.div>
  );
}
// ==========================================
// MAIN REUSABLE COMPONENT: AboutUs
// ==========================================

interface AboutUsProps {
  onStartProject: () => void;
  onContact: () => void;
}

export default function AboutUs({
  onStartProject,
  onContact,
}: AboutUsProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const contactRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
  // Auto-slide Testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-[#09090B] text-white overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* BACKGROUND FLOATING PARTICLES & GLOW GRADIENTS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-800/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px]" />

        {/* Animated Background Mesh Grid */}
        <div
          className="w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-28 sm:space-y-36">
        {/* ==========================================
            1. HERO ABOUT SECTION
        ========================================== */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-amber-500/10 border border-purple-500/20 backdrop-blur-md shadow-lg shadow-purple-950/30"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-purple-200">
              Innovators & Creators
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]"
          >
            Meet The Team Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-purple-400 to-[#F59E0B]">
              The Freelancing Mind
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto"
          >
            We are a collective of passionate developers, architects, UI/UX
            designers, and tech educators helping businesses across the globe build
            high-converting, modern web applications with speed and precision.
          </motion.p>

          {/* Floating Feature Pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {[
              { icon: Code2, text: "Modern Web Stack" },
              { icon: Zap, text: "Ultra Fast Delivery" },
              { icon: ShieldCheck, text: "Enterprise Security" },
              { icon: Heart, text: "Client-Centric Ethos" },
            ].map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-slate-300 shadow-md"
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{pill.text}</span>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* ==========================================
            2. COMPANY STORY & METRICS
        ========================================== */}
        <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Animated Illustration / Glass Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-amber-500/20 rounded-3xl blur-2xl transform rotate-3" />

            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover rounded-2xl filter brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent" />

                {/* Floating Tech Badge on Image */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-4 left-4 bg-[#09090B]/80 backdrop-blur-md border border-purple-500/30 p-3 rounded-xl shadow-xl flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-purple-600 text-white">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Driven by Passion
                    </p>
                    <p className="text-[10px] text-purple-300">
                      Engineering Modern Digital Experiences
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <p className="text-purple-400 font-bold text-xs uppercase tracking-wider">
                    Our Vision
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    To build world-class digital applications that redefine user engagement.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <p className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                    Our Mission
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Delivering high-end software solutions with transparent collaboration.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Narrative & Counters */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
                From Passionate Content Creation to Full-Scale Software Agency
              </h2>
            </div>

            <p className="text-slate-300 text-base leading-relaxed">
              <strong>The Freelancing Mind</strong> started with a clear belief: modern businesses shouldn't have to choose between functional code and stunning design. Founded by Anand—a developer and YouTube educator—we originated as a knowledge-sharing community before expanding into a premier full-service development team.
            </p>

            <p className="text-slate-300 text-base leading-relaxed">
              Today, our cross-functional team designs, builds, and scales custom platforms using Next.js, React, Java Spring Boot, and cloud microservices for startups and enterprises worldwide.
            </p>

            {/* Metric Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Projects Completed", value: 50, suffix: "+" },
                { label: "Global Clients", value: 20, suffix: "+" },
                { label: "Satisfaction Rate", value: 99, suffix: "%" },
                { label: "Dedicated Support", value: 24, suffix: "/7" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 text-center shadow-lg"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ==========================================
            3. ORGANIZATIONAL HIERARCHY CHART
        ========================================== */}
        <section className="relative space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Team Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Organizational Leadership
            </h2>
            <p className="text-slate-300 text-base">
              A structured, agile leadership matrix designed for smooth execution and direct accountability.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Top Level: Founder & CEO */}
            <div className="max-w-md mx-auto relative z-10">
              <TeamCard member={FOUNDER_DATA} />
            </div>

            {/* Connecting SVG Line for Desktop */}
            {/* Animated Tree Connector */}
<div className="hidden md:flex flex-col items-center my-4 relative">

  {/* Vertical Line */}
  <motion.div
    initial={{ height: 0 }}
    whileInView={{ height: 50 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="w-[3px] bg-gradient-to-b from-purple-500 to-amber-400"
  />

  {/* Center Node */}
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.45, type: "spring" }}
    className="w-5 h-5 rounded-full bg-amber-400 shadow-[0_0_25px_#F59E0B]"
  />

  {/* Horizontal Line */}
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "70%" }}
    viewport={{ once: true }}
    transition={{ delay: 0.6, duration: 0.6 }}
    className="h-[3px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 rounded-full"
  />

  {/* Two Vertical Lines */}
  <div className="w-[70%] flex justify-between">
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: 50 }}
      viewport={{ once: true }}
      transition={{ delay: 1 }}
      className="w-[3px] bg-gradient-to-b from-amber-400 to-purple-500"
    />

    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: 50 }}
      viewport={{ once: true }}
      transition={{ delay: 1 }}
      className="w-[3px] bg-gradient-to-b from-amber-400 to-purple-500"
    />
  </div>
</div>

            {/* Mobile Vertical Connecting Line */}
            <div className="block md:hidden w-0.5 h-12 bg-gradient-to-b from-purple-500 to-amber-500 mx-auto my-2" />

            {/* Second Level: Team Leads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
  {LEADS_DATA.map((lead, index) => (
    <motion.div
      key={lead.id}
      initial={{
        opacity: 0,
        x: index === 0 ? -80 : 80,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        delay: 1.3,
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <TeamCard member={lead} />
    </motion.div>
  ))}
</div>
          </div>
        </section>

        {/* ==========================================
            4. MORE TEAM MEMBERS SECTION
        ========================================== */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Talent & Specialists
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Meet Our Amazing Team
            </h2>
            <p className="text-slate-300 text-base">
              A diverse team of skilled engineers, designers, and growth experts building software that users love.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ADDITIONAL_TEAM.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==========================================
            5. WHY CHOOSE OUR TEAM
        ========================================== */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Our Key Advantages
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Why Work With The Freelancing Mind
            </h2>
            <p className="text-slate-300 text-base">
              We combine enterprise-grade technical expertise with agile delivery and clear communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-300 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            6. COMPANY VALUES
        ========================================== */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Values That Drive Our Success
            </h2>
            <p className="text-slate-300 text-base">
              The foundational beliefs that guide our code quality, design decisions, and partner relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.01] border border-white/10 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 group overflow-hidden"
              >
                <div className="text-4xl font-black text-amber-500/30 group-hover:text-amber-400 transition-colors mb-4">
                  {val.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==========================================
            7. OUR WORK CULTURE GALLERY
        ========================================== */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Inside Our Agency
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Our Work Culture
            </h2>
            <p className="text-slate-300 text-base">
              A peek into how we brainstorm, design, code, and collaborate every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORK_CULTURE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-64 sm:h-72 shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
                      <Icon className="w-3.5 h-3.5" />
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            8. TECHNOLOGIES WE LOVE (MARQUEE)
        ========================================== */}
        <section className="space-y-8 overflow-hidden">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Modern Stack
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technologies We Love & Master
            </h2>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            {/* Gradient Side Fades */}
            <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <div className="flex gap-4 w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
              {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-slate-200 text-sm font-semibold shadow-md whitespace-nowrap hover:border-purple-500/50 hover:bg-white/[0.08] transition-all"
                  >
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            9. CLIENT TRUST & TESTIMONIALS
        ========================================== */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Trusted by Product Leaders
            </h2>
            <p className="text-slate-300 text-base">
              Read what founders and CTOs say about collaborating with our engineering team.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl text-center space-y-6"
              >
                {/* Star Ratings */}
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  {[...Array(TESTIMONIALS[activeTestimonial].rating)].map(
                    (_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    )
                  )}
                </div>

                <p className="text-lg sm:text-2xl text-slate-100 italic leading-relaxed font-light">
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </p>

                <div className="flex flex-col items-center gap-2 pt-2">
                  <img
                    src={TESTIMONIALS[activeTestimonial].avatar}
                    alt={TESTIMONIALS[activeTestimonial].author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 shadow-lg"
                  />
                  <div>
                    <h4 className="text-white font-bold text-base">
                      {TESTIMONIALS[activeTestimonial].author}
                    </h4>
                    <p className="text-xs text-amber-400 font-medium">
                      {TESTIMONIALS[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() =>
                  setActiveTestimonial(
                    (prev) =>
                      (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                  )
                }
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-purple-600/30 transition-all"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeTestimonial === i
                        ? "w-8 bg-amber-400"
                        : "w-2.5 bg-white/20"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setActiveTestimonial(
                    (prev) => (prev + 1) % TESTIMONIALS.length
                  )
                }
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-purple-600/30 transition-all"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ==========================================
            10. FINAL CTA SECTION
        ========================================== */}
        <section className="relative">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-16 border border-purple-500/30 bg-gradient-to-r from-[#180d30] via-[#110822] to-[#09090B] text-center shadow-2xl shadow-purple-950/50 space-y-8">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-amber-500/10 to-purple-800/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                Ready to Accelerate Your Product?
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Let's Build Something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-300 to-amber-500">
                  Amazing Together
                </span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Whether you need a full SaaS web application, a mobile platform, or dedicated frontend & backend engineers, our team is ready to turn your vision into production code.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
           <button
  onClick={onStartProject}
  className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#7C3AED] via-purple-600 to-[#F59E0B] shadow-xl shadow-purple-900/40 hover:shadow-2xl hover:shadow-purple-700/50 transition-all duration-300 hover:scale-105 active:scale-95"
>
  {/* Shine Effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700" />

  <span className="relative z-10 flex items-center gap-2">
    Start Project
    <Rocket className="w-5 h-5 group-hover:rotate-12 group-hover:translate-x-1 transition-all duration-300" />
  </span>
</button>

         <button
  onClick={onContact}
  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 text-base backdrop-blur-md"
>
  <span>Contact Us</span>
  <ChevronRight className="w-5 h-5" />
</button>

            </div>
          </div>
        </section>
      </div>

      {/* Tailwind Marquee Keyframes Inline Utility */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
