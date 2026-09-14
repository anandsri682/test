'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '@/data/siteData';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    'Hello AVM Smart team! I would like to inquire about your digital solutions.'
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 group"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline text-sm font-semibold">Chat with Us</span>
    </a>
  );
}
