'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_DETAILS, SERVICES } from '@/data/siteData';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-white text-[#071A33] border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="inline-block min-h-[44px]"
              aria-label="AVM Smart Solutions Home"
            >
              <Image
                src="/logo.png"
                alt="AVM Smart Solutions Logo"
                width={190}
                height={150}
                className="object-contain"
              />
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Engineering high-performance websites, enterprise mobile apps,
              and data-driven digital solutions for modern scaling enterprises.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_DETAILS.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-slate-100 hover:bg-[#087FF5] flex items-center justify-center text-[#0B2A5B] hover:text-white transition-colors duration-200"
                aria-label="Visit AVM Smart LinkedIn profile"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

              <a
                href={COMPANY_DETAILS.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-slate-100 hover:bg-[#087FF5] flex items-center justify-center text-[#0B2A5B] hover:text-white transition-colors duration-200"
                aria-label="Visit AVM Smart Twitter profile"
              >
                <FaTwitter className="w-4 h-4" />
              </a>

              <a
                href={COMPANY_DETAILS.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-slate-100 hover:bg-[#087FF5] flex items-center justify-center text-[#0B2A5B] hover:text-white transition-colors duration-200"
                aria-label="Visit AVM Smart Facebook profile"
              >
                <FaFacebook className="w-4 h-4" />
              </a>

              <a
                href={COMPANY_DETAILS.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-slate-100 hover:bg-[#087FF5] flex items-center justify-center text-[#0B2A5B] hover:text-white transition-colors duration-200"
                aria-label="Visit AVM Smart Instagram profile"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-[#071A33] uppercase tracking-wider mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-xs font-semibold text-slate-600">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/founder"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Founder Profile
                </Link>
              </li>

              <li>
                <Link
                  href="/team"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Our Team
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/solutions"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Solutions
                </Link>
              </li>

              <li>
                <Link
                  href="/demos"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Live Demos
                </Link>
              </li>

              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-[#071A33] uppercase tracking-wider mb-5">
              Services
            </h3>

            <ul className="space-y-3 text-xs font-semibold text-slate-600">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-[#087FF5] transition-colors py-1 inline-block"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold text-[#071A33] uppercase tracking-wider mb-5">
              Contact Info
            </h3>

            <ul className="space-y-4 text-xs text-slate-600">

              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#087FF5] shrink-0 mt-0.5" />

                <div className="space-y-1.5">
                  <p className="leading-relaxed font-medium text-slate-700">
                    AVM Smart Solutions
                    <br />
                    Kurnool, Andhra Pradesh 518002, India
                  </p>

                  <a
                    href={COMPANY_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#087FF5] hover:text-[#0B2A5B] hover:underline transition-colors"
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
                  className="font-bold text-[#0B2A5B] hover:text-[#13B89A] transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-bold text-[#0B2A5B]">
                  {COMPANY_DETAILS.phones.map((p, idx) => (
                    <a
                      key={idx}
                      href={`tel:${p}`}
                      className="hover:text-[#FF6A00] transition-colors min-h-[44px] inline-flex items-center"
                    >
                      +91 {p}
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
                  className="font-bold text-[#13B89A] hover:text-[#0B2A5B] transition-colors flex items-center gap-1"
                >
                  <span>
                    WhatsApp: +91 {COMPANY_DETAILS.whatsappNumber}
                  </span>

                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-300 bg-slate-50/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">

          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} AVM Smart Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-[#087FF5] transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="hover:text-[#087FF5] transition-colors"
            >
              Terms & Conditions
            </Link>

            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#087FF5] transition-colors"
            >
              AI Information
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}