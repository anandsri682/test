'use client';

import React, { useState } from 'react';
import { COMPANY_DETAILS, SERVICES } from '@/data/siteData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2, ExternalLink, MessageCircle } from 'lucide-react';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          service: 'Web Development',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit message.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full bg-[#F4F7FA]">
      <section className="bg-[#0B1528] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-[#13B89A]">Let&apos;s start a conversation</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Contact Us</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Get in touch with the AVM Smart Solutions engineering team.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Get In Touch</h2>
              <p className="text-slate-600 text-sm mb-6">
                Fill out the form and our team will respond within 24 hours.
              </p>

              {status === 'success' ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-[#13B89A] mx-auto" />
                  <h3 className="text-xl font-bold text-emerald-900">Message Sent Successfully!</h3>
                  <p className="text-sm text-emerald-700">
                    Thank you for reaching out to AVM Smart Solutions. An engineering lead will contact you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-[#13B89A] text-white font-bold text-xs rounded-xl hover:bg-emerald-600 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2 font-medium">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                        placeholder="+91 89780 40537"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Service Required *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                      Project Brief / Message <span className="text-slate-400 lowercase font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all resize-none"
                      placeholder="How can AVM Smart Solutions assist your project? (optional)..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] bg-[length:200%_auto] hover:bg-right text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Address Card */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#087FF5]/10 text-[#087FF5] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-slate-900 text-sm">Official Registered Location</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    AVM Smart Solutions<br />
                    Kurnool, Andhra Pradesh 518002, India
                  </p>
                  <a
                    href={COMPANY_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#13B89A]/10 text-[#13B89A] text-xs font-black hover:bg-[#13B89A]/20 transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Phone Numbers Card */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm mb-2">Call Us Directly</h4>
                  <div className="flex flex-col gap-1.5">
                    {COMPANY_DETAILS.phones.map((p, i) => (
                      <a
                        key={i}
                        href={`tel:${p}`}
                        className="text-xs font-bold text-slate-700 hover:text-[#087FF5] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                        <span>+91 {p}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#13B89A]/10 text-[#13B89A] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm mb-1">Official Email</h4>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="text-xs font-bold text-[#087FF5] hover:underline"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#13B89A]/10 text-[#13B89A] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm mb-1">WhatsApp Chat</h4>
                  <a
                    href={COMPANY_DETAILS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#13B89A] hover:underline flex items-center gap-1"
                  >
                    <span>+91 {COMPANY_DETAILS.whatsappNumber}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Embedded Location Map */}
              <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 h-60 w-full">
                <iframe
                  title="AVM Smart Location Map"
                  src={COMPANY_DETAILS.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
