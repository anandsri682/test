'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

import {
  Mail,
  Phone,
  Clock,
  MapPin,
  ExternalLink,
  Send,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

// Social Platform Configuration
interface SocialPlatform {
  id: "whatsapp" | "instagram" | "youtube" | "linkedin" | "github" | "email";
  name: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  glowColor: string;
  gradient: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  actionText: string;
  href: string;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "text-green-400",
    borderColor: "border-green-500/50",
    glowColor: "shadow-green-500/20",
    gradient: "from-green-500/20 to-emerald-500/10",
    subtitle: "+91 98765 43210",
    metricLabel: "Response Time",
    metricValue: "Usually within 10 mins",
    actionText: "Chat on WhatsApp",
    href: "https://wa.me/919876543210"
  },

  {
    id: "instagram",
    name: "Instagram",
    icon: FaInstagram,
    color: "text-pink-400",
    borderColor: "border-pink-500/50",
    glowColor: "shadow-pink-500/20",
    gradient: "from-pink-500/20 to-purple-500/10",
    subtitle: "@thefreelancingmind",
    metricLabel: "Followers",
    metricValue: "10K+ Followers",
    actionText: "Visit Instagram",
    href: "https://instagram.com/thefreelancingmind"
  },

  {
    id: "youtube",
    name: "YouTube",
    icon: FaYoutube,
    color: "text-red-400",
    borderColor: "border-red-500/50",
    glowColor: "shadow-red-500/20",
    gradient: "from-red-500/20 to-orange-500/10",
    subtitle: "Mr Anand Tech",
    metricLabel: "Subscribers",
    metricValue: "7.1K Subscribers",
    actionText: "Watch on YouTube",
    href: "https://youtube.com/@mranandtech"
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "text-blue-400",
    borderColor: "border-blue-500/50",
    glowColor: "shadow-blue-500/20",
    gradient: "from-blue-500/20 to-sky-500/10",
    subtitle: "Anand Raju",
    metricLabel: "Professional",
    metricValue: "Open for Work",
    actionText: "View LinkedIn",
    href: "https://linkedin.com/in/your-profile"
  },

  {
    id: "github",
    name: "GitHub",
    icon: FaGithub,
    color: "text-white",
    borderColor: "border-gray-500/50",
    glowColor: "shadow-gray-500/20",
    gradient: "from-gray-500/20 to-slate-500/10",
    subtitle: "github.com/yourusername",
    metricLabel: "Projects",
    metricValue: "50+ Repositories",
    actionText: "View GitHub",
    href: "https://github.com/yourusername"
  },

  {
    id: "email",
    name: "Email",
    icon: Mail,
    color: "text-yellow-400",
    borderColor: "border-yellow-500/50",
    glowColor: "shadow-yellow-500/20",
    gradient: "from-yellow-500/20 to-orange-500/10",
    subtitle: "contact@thefreelancingmind.com",
    metricLabel: "Response",
    metricValue: "Within 24 Hours",
    actionText: "Send Email",
    href: "mailto:contact@thefreelancingmind.com"
  }
];
export default function ContactSection() {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>(SOCIAL_PLATFORMS[0]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  const ActiveIcon = activePlatform.icon;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7C3AED]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* LEFT COLUMN: Contact Details & Message Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Let's Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-purple-300 to-[#F59E0B]">
                Something Amazing
              </span> <br />
              Together
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Have a vision for a web platform, app, or enterprise system? Reach out via our direct contact details, form, or interactive channels.
            </p>
          </div>

          {/* Quick Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
              <Mail className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Email</p>
                <a href="mailto:contact@thefreelancingmind.com" className="text-xs font-semibold text-white hover:text-amber-400 transition-colors truncate block">
                  contact@thefreelancingmind.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
              <Phone className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Phone</p>
                <a href="tel:+15550192831" className="text-xs font-semibold text-white hover:text-amber-400 transition-colors">
                  +1 555-019-2831
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
              <Clock className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Business Hours</p>
                <p className="text-xs font-semibold text-white">Mon – Fri (9 AM - 6 PM)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
              <MapPin className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Location</p>
                <p className="text-xs font-semibold text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleFormSubmit}
            className="space-y-4 bg-slate-950 p-5 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative"
          >
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-purple-950/80 border border-purple-500 text-purple-300 text-xs sm:text-sm text-center font-medium overflow-hidden"
                >
                  ✓ Message sent successfully! Our team will reply within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your Email"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project requirements..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#7C3AED] hover:bg-purple-600 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-colors shadow-lg shadow-purple-900/40 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </motion.button>
          </motion.form>
        </motion.div>

        {/* RIGHT COLUMN: Interactive Social Contact Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-white/10 shadow-2xl backdrop-blur-xl relative">

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Social Channels</h3>
                <p className="text-xs text-slate-400">Select a network to preview details and connect.</p>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Instant Access
              </span>
            </div>

            {/* Social Icons Selector Grid */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-8">
              {SOCIAL_PLATFORMS.map((platform) => {
                const PlatformIcon = platform.icon;
                const isActive = activePlatform.id === platform.id;

                return (
                  <button
                    key={platform.id}
                    onClick={() => setActivePlatform(platform)}
                    aria-label={`Select ${platform.name}`}
                    className={`relative p-3.5 sm:p-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? `bg-slate-900 ${platform.borderColor} border-2 ${platform.glowColor} shadow-lg scale-105 -translate-y-1`
                        : "bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <PlatformIcon
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                        isActive ? platform.color : "text-slate-400"
                      }`}
                    />

                    {/* Active Indicator Glow Dot */}
                    {isActive && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute -bottom-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Interactive Platform Display Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${activePlatform.gradient} border ${activePlatform.borderColor} shadow-xl`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-slate-950/80 border ${activePlatform.borderColor} ${activePlatform.color} ${activePlatform.glowColor} shadow-xl`}>
                      <ActiveIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                        {activePlatform.name}
                      </span>
                      <h4 className="text-xl font-bold text-white">
                        {activePlatform.subtitle}
                      </h4>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-md">
                    <p className="text-[11px] text-slate-400 font-medium">{activePlatform.metricLabel}</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-200">{activePlatform.metricValue}</p>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">
                    Opens external connection securely in a new tab.
                  </p>

                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={activePlatform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-600 hover:to-[#7C3AED] text-white font-bold text-sm shadow-xl shadow-purple-950/50 transition-all shrink-0"
                  >
                    <span>{activePlatform.actionText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}