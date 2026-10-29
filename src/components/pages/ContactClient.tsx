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
    <div className="w-full overflow-hidden bg-gradient-to-b from-[#F7FAFF] via-white to-[#F1FAF8]">
      <section className="relative isolate overflow-hidden border-b border-[#087FF5]/10 bg-gradient-to-br from-white via-[#F2F8FF] to-[#EAF9F5] py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#13B89A]/20 bg-white/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0C9B84] shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-[#13B89A]" />Let&apos;s start a conversation</p>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-[#0B2A5B] sm:text-5xl lg:text-6xl">Let&apos;s Build Something <span className="bg-gradient-to-r from-[#087FF5] to-[#13A88F] bg-clip-text text-transparent">Great</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Get in touch with the AVM Smart Solutions engineering team.
          </p>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            
            {/* Form Column */}
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_24px_70px_rgba(11,42,91,0.09)] sm:p-8 lg:col-span-7 lg:p-10">
              <div className="mb-7 border-b border-slate-100 pb-5"><p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#087FF5]">Contact form</p><h2 className="text-2xl font-extrabold tracking-tight text-[#0B2A5B] sm:text-3xl">Tell us about your project</h2>
              <p className="mt-2 mb-0 text-sm leading-6 text-slate-600">
                Fill out the details below and our team will get back to you.
              </p></div>

              {status === 'success' ? (
                <div className="space-y-3 rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 text-center sm:p-8">
                  <CheckCircle className="w-12 h-12 text-[#13B89A] mx-auto" />
                  <h3 className="text-xl font-bold text-emerald-900">Enquiry Received Successfully!</h3>
                  <p className="text-sm text-emerald-700">
                    Thank you for contacting AVM Smart Solutions. Your enquiry has been received successfully. Our team will contact you soon.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="rounded-xl bg-gradient-to-r from-[#087FF5] to-[#13B89A] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === 'error' && (
                    <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#087FF5] focus:ring-4 focus:ring-[#087FF5]/10"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#087FF5] focus:ring-4 focus:ring-[#087FF5]/10"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#087FF5] focus:ring-4 focus:ring-[#087FF5]/10"
                        placeholder="+91 89780 40537"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Service Required *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#087FF5] focus:ring-4 focus:ring-[#087FF5]/10"
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
                  <div className="space-y-3 rounded-2xl border border-[#087FF5]/15 bg-gradient-to-br from-[#F5FAFF] to-[#F2FBF8] p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-semibold text-slate-700">
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
                          className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold uppercase tracking-wider text-slate-900 shadow-sm outline-none transition duration-200 placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#087FF5] focus:ring-4 focus:ring-[#087FF5]/10"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleValidateCoupon}
                        disabled={couponValidating || !formData.couponCode.trim()}
                        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#0B2A5B] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#123C78] disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {couponValidating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply'}
                      </button>
                    </div>

                    {/* Feedback messages */}
                    {couponFeedback.status === 'valid' && (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-emerald-950 font-black text-xs tracking-tight">
                            Coupon applied successfully!
                          </span>
                        </div>
                        {couponFeedback.referrerDisplayName && (
                          <div className="text-xs font-semibold text-emerald-800 pl-6">
                            Referred by: <span className="font-bold">{couponFeedback.referrerDisplayName}</span>
                          </div>
                        )}
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
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Project Brief / Message <span className="text-slate-400 lowercase font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#087FF5] focus:ring-4 focus:ring-[#087FF5]/10 resize-y"
                      placeholder="How can AVM Smart Solutions assist your project? (optional)..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#087FF5] to-[#13B89A] py-4 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(8,127,245,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(8,127,245,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#087FF5]/20 disabled:cursor-not-allowed disabled:opacity-70"
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
            <div className="space-y-4 lg:col-span-5 lg:space-y-5">
              
              {/* Address Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(11,42,91,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087FF5]/25 hover:shadow-[0_14px_32px_rgba(11,42,91,0.08)] sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#087FF5]/10 bg-[#EAF4FF] text-[#087FF5]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-[#0B2A5B]">Official Registered Location</h4>
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
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(11,42,91,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087FF5]/25 hover:shadow-[0_14px_32px_rgba(11,42,91,0.08)] sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#13B89A]/15 bg-[#E8FBF6] text-[#0C9B84]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-bold text-[#0B2A5B]">Call Us Directly</h4>
                  <div className="flex flex-col gap-1.5">
                    {COMPANY_DETAILS.phones.map((p, i) => (
                      <a
                        key={i}
                        href={`tel:${p}`}
                        className="text-xs font-bold text-slate-700 hover:text-[#087FF5] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#13B89A]" />
                        <span>+91 {p}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(11,42,91,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087FF5]/25 hover:shadow-[0_14px_32px_rgba(11,42,91,0.08)] sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#13B89A]/15 bg-[#E8FBF6] text-[#0C9B84]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold text-[#0B2A5B]">Official Email</h4>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="text-xs font-bold text-[#087FF5] hover:underline"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(11,42,91,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087FF5]/25 hover:shadow-[0_14px_32px_rgba(11,42,91,0.08)] sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#13B89A]/15 bg-[#E8FBF6] text-[#0C9B84]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold text-[#0B2A5B]">WhatsApp Chat</h4>
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
              <div className="h-60 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-[0_12px_32px_rgba(11,42,91,0.08)]">
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
