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
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    glowColor: "shadow-amber-500/20",
    gradient: "from-amber-500/20 to-yellow-500/10",
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
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    glowColor: "shadow-amber-500/20",
    gradient: "from-amber-500/20 to-yellow-500/10",
    subtitle: "@techwithmranand",
    metricLabel: "Followers",
    metricValue: "10K+ Community",
    actionText: "Visit Instagram",
    href: "https://instagram.com/techwithmranand"
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: FaYoutube,
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    glowColor: "shadow-amber-500/20",
    gradient: "from-amber-500/20 to-yellow-500/10",
    subtitle: "Mr Anand Tech",
    metricLabel: "Subscribers",
    metricValue: "7.1K Subscribers",
    actionText: "Watch on YouTube",
    href: "https://youtube.com/@mr_anandtechintelugu"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    glowColor: "shadow-amber-500/20",
    gradient: "from-amber-500/20 to-yellow-500/10",
    subtitle: "Anand Raju",
    metricLabel: "Professional",
    metricValue: "AVM Smart Team",
    actionText: "View LinkedIn",
    href: "https://www.linkedin.com/in/arekanti-anand-raju-2615a0377/"
  },
  {
    id: "github",
    name: "GitHub",
    icon: FaGithub,
    color: "text-white",
    borderColor: "border-amber-500/50",
    glowColor: "shadow-amber-500/20",
    gradient: "from-amber-500/20 to-yellow-500/10",
    subtitle: "github.com/anandsri682",
    metricLabel: "Code Base",
    metricValue: "50+ Repositories",
    actionText: "View GitHub",
    href: "https://github.com/anandsri682"
  },
  {
    id: "email",
    name: "Email",
    icon: Mail,
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    glowColor: "shadow-amber-500/20",
    gradient: "from-amber-500/20 to-yellow-500/10",
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
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 relative overflow-hidden bg-[#07070a]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Let&apos;s Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                Something Amazing
              </span> <br />
              Together
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Have a vision for a web platform, app, or enterprise system? Reach out via our direct contact details, form, or interactive channels.
            </p>
          </div>

          {/* Quick Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0a0a0f] border border-white/10 backdrop-blur-md">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Email</p>
                <a href="mailto:contact@thefreelancingmind.com" className="text-xs font-semibold text-white hover:text-amber-400 transition-colors truncate block">
                  contact@thefreelancingmind.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0a0a0f] border border-white/10 backdrop-blur-md">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Phone</p>
                <a href="tel:+919876543210" className="text-xs font-semibold text-white hover:text-amber-400 transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0a0a0f] border border-white/10 backdrop-blur-md">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Business Hours</p>
                <p className="text-xs font-semibold text-white">Mon – Fri (9 AM - 6 PM)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0a0a0f] border border-white/10 backdrop-blur-md">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Location</p>
                <p className="text-xs font-semibold text-white">Hyderabad / Remote</p>
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
            aria-label="Contact AVM Smart Form"
            className="space-y-4 bg-[#0a0a0f] p-5 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative"
          >
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-amber-500/20 border border-amber-500 text-amber-300 text-xs sm:text-sm text-center font-medium overflow-hidden"
                >
                  ✓ Message sent successfully! Our team will reply within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">Your Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email"
                  className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">Project Requirements</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your project requirements..."
                className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-3.5 sm:py-4 rounded-xl transition-colors shadow-lg shadow-amber-950/60 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4 text-slate-950" />
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
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 shadow-2xl backdrop-blur-xl relative">

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
                        ? `bg-slate-900 border-2 border-amber-400 shadow-lg scale-105 -translate-y-1`
                        : "bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <PlatformIcon
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                        isActive ? "text-amber-400" : "text-slate-400"
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
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/40 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-[#07070a] border border-amber-500/40 text-amber-400 shadow-xl">
                      <ActiveIcon className="w-8 h-8 text-amber-400" />
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

                  <div className="bg-[#07070a] border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-md">
                    <p className="text-[11px] text-slate-400 font-medium">{activePlatform.metricLabel}</p>
                    <p className="text-xs sm:text-sm font-bold text-amber-400">{activePlatform.metricValue}</p>
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
                    aria-label={`Connect via ${activePlatform.name}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/50 transition-all shrink-0"
                  >
                    <span>{activePlatform.actionText}</span>
                    <ExternalLink className="w-4 h-4 text-slate-950" />
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