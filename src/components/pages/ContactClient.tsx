'use client';

import React, { useState } from 'react';
import { COMPANY_DETAILS, SERVICES } from '@/data/siteData';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Loader2, ExternalLink, MessageCircle, Tag, Check } from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: '',
    couponCode: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Coupon Validation State
  const [couponValidating, setCouponValidating] = useState(false);
  const [couponFeedback, setCouponFeedback] = useState<{
    status: 'idle' | 'valid' | 'invalid';
    message: string;
    referrerDisplayName?: string;
    details?: { regularPrice: number; discountedPrice: number; discountAmount: number };
  }>({ status: 'idle', message: '' });

  const handleValidateCoupon = async () => {
    if (!formData.couponCode.trim()) {
      setCouponFeedback({ status: 'idle', message: '' });
      return;
    }

    setCouponValidating(true);
    try {
      const res = await fetch(getApiUrl(`/api/coupon/validate?code=${encodeURIComponent(formData.couponCode.trim())}`));
      const data = await res.json();

      if (data.valid) {
        setCouponFeedback({
          status: 'valid',
          message: data.message || '₹1,000 SAVED — COUPON APPLIED',
          referrerDisplayName: data.referrerDisplayName || data.referrerName,
          details: data.pricing,
        });
      } else {
        setCouponFeedback({
          status: 'invalid',
          message: data.message || 'This coupon code is invalid. Please check the code and try again.',
        });
      }
    } catch {
      setCouponFeedback({
        status: 'invalid',
        message: 'Could not validate coupon. Please try again.',
      });
    } finally {
      setCouponValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(getApiUrl('/api/contact'), {
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
          couponCode: '',
        });
        setCouponFeedback({ status: 'idle', message: '' });
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
                  <h3 className="text-xl font-bold text-emerald-900">Enquiry Received Successfully!</h3>
                  <p className="text-sm text-emerald-700">
                    Thank you for contacting AVM Smart Solutions. Your enquiry has been received successfully. Our team will contact you soon.
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

                  {/* Optional Influencer Coupon Code Field */}
                  <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                        Influencer Coupon Code <span className="text-slate-400 font-normal lowercase">(optional)</span>
                      </label>
                      {couponFeedback.status === 'valid' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                          <Check className="w-3 h-3" /> ₹1,000 Off Applied
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={formData.couponCode}
                          onChange={(e) => {
                            setFormData({ ...formData, couponCode: e.target.value.toUpperCase() });
                            if (couponFeedback.status !== 'idle') {
                              setCouponFeedback({ status: 'idle', message: '' });
                            }
                          }}
                          placeholder="Enter coupon code (e.g. RAHUL10)"
                          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleValidateCoupon}
                        disabled={couponValidating || !formData.couponCode.trim()}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        {couponValidating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply'}
                      </button>
                    </div>

                    {/* Feedback messages */}
                    {couponFeedback.status === 'valid' && (
                      <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span className="text-emerald-950 font-black text-sm tracking-tight uppercase">
                            ₹1,000 SAVED — COUPON APPLIED
                          </span>
                        </div>
                        {couponFeedback.referrerDisplayName && (
                          <div className="text-xs font-semibold text-emerald-800 pl-7">
                            Referred by: <span className="font-bold">{couponFeedback.referrerDisplayName}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-slate-700 pt-1.5 border-t border-emerald-200/80 pl-7 text-[11px]">
                          <span>Regular Price: <span className="line-through text-slate-400">₹4,999</span></span>
                          <span className="font-extrabold text-emerald-700 text-xs">Offer Price: ₹3,999</span>
                        </div>
                      </div>
                    )}

                    {couponFeedback.status === 'invalid' && (
                      <p className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{couponFeedback.message}</span>
                      </p>
                    )}
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
