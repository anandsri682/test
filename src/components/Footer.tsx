'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_DETAILS, SERVICES } from '@/data/siteData';
import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-[#0B1528] text-white border-t border-slate-800">
      {/* Top Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Description (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="AVM Smart Solutions Logo"
                width={190}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Engineering high-performance websites, enterprise mobile apps, and data-driven digital solutions for modern scaling enterprises.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_DETAILS.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#087FF5] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_DETAILS.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#087FF5] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_DETAILS.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#087FF5] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_DETAILS.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#087FF5] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#087FF5] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#087FF5] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#087FF5] transition-colors">Our Team</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#087FF5] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-[#087FF5] transition-colors">Solutions</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#087FF5] transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#087FF5] transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#087FF5] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-300">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-[#087FF5] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Detailed Contact Info (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-5">Contact Info</h4>
            <ul className="space-y-4 text-xs text-slate-300">
              
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#087FF5] shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <p className="leading-relaxed font-medium">
                    Innovation and Incubation Center<br />
                    G Pulla Reddy Engineering College<br />
                    Near Pasupula Village, Kurnool - Nandyal Main Road,<br />
                    Kurnool, Andhra Pradesh 518007, India
                  </p>
                  <a
                    href={COMPANY_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#13B89A] hover:underline"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#13B89A] shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="font-bold text-white hover:text-[#13B89A] transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </li>

              {/* Phone Numbers */}
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-bold text-white">
                  {COMPANY_DETAILS.phones.map((p, idx) => (
                    <a
                      key={idx}
                      href={`tel:${p}`}
                      className="hover:text-[#FF6A00] transition-colors"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </li>

              {/* WhatsApp */}
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#13B89A] shrink-0" />
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#13B89A] hover:underline flex items-center gap-1"
                >
                  <span>WhatsApp: {COMPANY_DETAILS.whatsappNumber}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AVM Smart Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-200 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
