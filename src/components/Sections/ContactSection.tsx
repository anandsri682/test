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
    color: "text-[#13B89A]",
    borderColor: "border-[#13B89A]/50",
    glowColor: "shadow-[#13B89A]/20",
    gradient: "from-[#13B89A]/20 to-[#13B89A]/10",
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
    color: "text-[#FF6A00]",
    borderColor: "border-[#FF6A00]/50",
    glowColor: "shadow-[#FF6A00]/20",
    gradient: "from-[#FF6A00]/20 to-[#FF6A00]/10",
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
    color: "text-[#087FF5]",
    borderColor: "border-[#087FF5]/50",
    glowColor: "shadow-[#087FF5]/20",
    gradient: "from-[#087FF5]/20 to-[#087FF5]/10",
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
    color: "text-[#087FF5]",
    borderColor: "border-[#087FF5]/50",
    glowColor: "shadow-[#087FF5]/20",
    gradient: "from-[#087FF5]/20 to-[#087FF5]/10",
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
    borderColor: "border-slate-700",
    glowColor: "shadow-slate-700/20",
    gradient: "from-slate-800 to-slate-900",
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
    color: "text-[#13B89A]",
    borderColor: "border-[#13B89A]/50",
    glowColor: "shadow-[#13B89A]/20",
    gradient: "from-[#13B89A]/20 to-[#13B89A]/10",
    subtitle: "contact@thefreelancingmind.com",
    metricLabel: "Response",
    metricValue: "Within 24 Hours",
    actionText: "Send Email",
    href: "mailto:contact@thefreelancingmind.com"
  }
];

export default function ContactSection() {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>(SOCIAL_PLATFORMS[0]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "Web Development", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", service: "Web Development", message: "" });
      }, 4000);
    } catch {
      setSubmitted(true);
    }
  };

  const ActiveIcon = activePlatform.icon;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800 relative overflow-hidden bg-[#0B1528] text-white">
      {/* Ambient Color Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#087FF5]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">

        {/* LEFT COLUMN: Contact Details & Message Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-[#13B89A] text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#13B89A]" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Let&apos;s Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00]">
                Something Amazing
              </span> <br />
              Together
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Have a vision for a custom website, application, or enterprise platform? Reach out directly to our engineering team.
            </p>
          </div>

          {/* Quick Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
              <Mail className="w-4 h-4 text-[#087FF5] shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Email</p>
                <a href="mailto:contact@thefreelancingmind.com" className="text-xs font-bold text-white hover:text-[#087FF5] transition-colors truncate block">
                  contact@thefreelancingmind.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
              <Phone className="w-4 h-4 text-[#13B89A] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Phone</p>
                <a href="tel:+919876543210" className="text-xs font-bold text-white hover:text-[#13B89A] transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
              <Clock className="w-4 h-4 text-[#FF6A00] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Business Hours</p>
                <p className="text-xs font-bold text-white">Mon – Fri (9 AM - 6 PM)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
              <MapPin className="w-4 h-4 text-[#087FF5] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Location</p>
                <p className="text-xs font-bold text-white">Hyderabad / Remote</p>
              </div>
            </div>
          </div>

          {/* Direct Project Request Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleFormSubmit}
            aria-label="Contact AVM Smart Form"
            className="space-y-4 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative"
          >
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-[#13B89A]/20 border border-[#13B89A] text-[#13B89A] text-xs sm:text-sm text-center font-bold overflow-hidden"
                >
                  ✓ Request sent successfully! Our team will reply within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">Full Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name *"
                  className="w-full bg-[#0B1528] border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#087FF5] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email Address *"
                  className="w-full bg-[#0B1528] border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#087FF5] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone Number *"
                  className="w-full bg-[#0B1528] border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#087FF5] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="sr-only">Service Interested</label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#0B1528] border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#087FF5] transition-colors"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="IT Consulting">IT Consulting</option>
                  <option value="Custom Software">Custom Enterprise Solution</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">Project Brief (Optional)</label>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Project Brief / Details (optional)..."
                className="w-full bg-[#0B1528] border border-slate-800 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#087FF5] transition-colors resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] bg-[length:200%_auto] hover:bg-right text-white font-black py-4 rounded-xl transition-all shadow-xl text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>Send Request</span>
              <Send className="w-4 h-4 text-white" />
            </motion.button>
          </motion.form>
        </motion.div>

        {/* RIGHT COLUMN: Interactive Social Platforms Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative">

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-extrabold text-white">Social Channels</h3>
                <p className="text-xs text-slate-400">Select a channel to connect with our team directly.</p>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#13B89A] bg-[#13B89A]/10 px-3 py-1 rounded-full border border-[#13B89A]/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            {/* Social Platform Icon Selector */}
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
                        ? `bg-[#0B1528] border-2 border-[#087FF5] shadow-lg scale-105 -translate-y-1`
                        : "bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <PlatformIcon
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                        isActive ? "text-[#087FF5]" : "text-slate-400"
                      }`}
                    />

                    {isActive && (
                      <motion.span
                        layoutId="activeDotContact"
                        className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#087FF5] shadow-[0_0_8px_#087FF5]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Platform Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B1528] border border-slate-800 shadow-xl space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 text-[#087FF5] shadow-xl">
                      <ActiveIcon className="w-8 h-8 text-[#087FF5]" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                        {activePlatform.name}
                      </span>
                      <h4 className="text-xl font-extrabold text-white">
                        {activePlatform.subtitle}
                      </h4>
                    </div>
                  </div>

                  <div className="bg-[#0B1528] border border-slate-800 rounded-xl px-4 py-2.5">
                    <p className="text-[11px] text-slate-400 font-bold">{activePlatform.metricLabel}</p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#13B89A]">{activePlatform.metricValue}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">
                    Connects directly in a new secure browser window.
                  </p>

                  <a
                    href={activePlatform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#087FF5] to-[#13B89A] text-white font-black text-sm shadow-xl hover:scale-103 transition-all shrink-0"
                  >
                    <span>{activePlatform.actionText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}