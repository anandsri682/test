'use client';

import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send, Tag, Check } from 'lucide-react';
import { SERVICES } from '@/data/siteData';
import { getApiUrl } from '@/lib/api';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function QuoteModal({ isOpen, onClose, defaultService }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: defaultService || 'Web Development',
    message: '',
    couponCode: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [couponValidating, setCouponValidating] = useState(false);
  const [couponFeedback, setCouponFeedback] = useState<{
    status: 'idle' | 'valid' | 'invalid';
    message: string;
    referrerDisplayName?: string;
  }>({ status: 'idle', message: '' });

  if (!isOpen) return null;

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
        });
      } else {
        setCouponFeedback({
          status: 'invalid',
          message: data.message || 'This coupon code is invalid.',
        });
      }
    } catch {
      setCouponFeedback({ status: 'invalid', message: 'Could not validate coupon.' });
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
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit request.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-[#0B1528] text-white">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">Connect with Our Team</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">Let&apos;s discuss how we can help your business grow online.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto bg-[#F8FAFC]">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-[#13B89A] mx-auto mb-4 animate-bounce" />
              <h4 className="text-2xl font-extrabold text-slate-900 mb-2">Enquiry Received Successfully!</h4>
              <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for contacting AVM Smart Solutions. Your enquiry has been received successfully. Our team will contact you soon.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-[#087FF5] to-[#13B89A] text-white font-bold text-sm rounded-xl hover:shadow-lg transition-all"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-xl flex items-center gap-2 font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                    placeholder="e.g. Anand Raju"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                    placeholder="e.g. anand@company.com"
                  />
                </div>
              </div>

              {/* Phone & Service Interested */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Interested *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Custom Software">Custom Enterprise Solution</option>
                  </select>
                </div>
              </div>

              {/* Optional Coupon Code */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
                    Referral Coupon Code <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </span>
                  {couponFeedback.status === 'valid' && (
                    <span className="text-emerald-700 font-black text-[11px] bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Check className="w-3 h-3" /> ₹1,000 Off Applied
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.couponCode}
                      onChange={(e) => {
                        setFormData({ ...formData, couponCode: e.target.value.toUpperCase() });
                        if (couponFeedback.status !== 'idle') setCouponFeedback({ status: 'idle', message: '' });
                      }}
                      placeholder="e.g. RAHUL10"
                      className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs uppercase tracking-wider font-semibold text-slate-900 focus:border-[#087FF5] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleValidateCoupon}
                    disabled={couponValidating || !formData.couponCode.trim()}
                    className="px-4 py-2 bg-slate-900 disabled:opacity-40 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {couponValidating ? 'Checking...' : 'Apply'}
                  </button>
                </div>
                {couponFeedback.status === 'valid' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1">
                    <div className="text-xs font-black text-emerald-900 tracking-wide uppercase">
                      ₹1,000 SAVED — COUPON APPLIED
                    </div>
                    {couponFeedback.referrerDisplayName && (
                      <div className="text-[11px] text-emerald-800 font-semibold">
                        Referred by: <span className="font-bold">{couponFeedback.referrerDisplayName}</span>
                      </div>
                    )}
                    <div className="text-[10px] text-slate-600 pt-1 border-t border-emerald-200/70 flex items-center gap-2">
                      <span>Regular: <span className="line-through">₹4,999</span></span>
                      <span className="font-bold text-emerald-700">Special Offer: ₹3,999</span>
                    </div>
                  </div>
                )}
                {couponFeedback.status === 'invalid' && (
                  <p className="text-[11px] text-rose-600 font-semibold">{couponFeedback.message}</p>
                )}
              </div>

              {/* Project Brief Details (Optional) */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Brief / Details <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all resize-none"
                  placeholder="Share any specific requirements or ideas (optional)..."
                />
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-7 py-3 bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] bg-[length:200%_auto] hover:bg-right text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-[#087FF5]/30 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
