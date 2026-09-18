'use client';

import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { SERVICES } from '@/data/siteData';

import { getApiUrl } from '@/lib/api';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function ProjectModal({ isOpen, onClose, defaultService }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: defaultService || 'Web Development',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

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
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-[#0B1528] text-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">Connect with Our Team</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">Let&apos;s discuss how we can help your business grow online.</p>
          </div>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
            aria-label="Close modal dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto bg-[#F8FAFC]">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-[#13B89A] mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-extrabold text-[#0B2A5B] mb-2">Request Sent Successfully!</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for reaching out to AVM Smart Solutions. Our engineering team will review your project details and get back to you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="min-h-[44px] px-8 py-3 bg-[#087FF5] text-white font-bold text-sm rounded-xl hover:bg-blue-600 transition-all"
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
                  <label htmlFor="modal-fullname" className="block text-xs font-bold text-[#0B2A5B] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="modal-fullname"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                    placeholder="e.g. Anand Raju"
                  />
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-xs font-bold text-[#0B2A5B] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="modal-email"
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
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-[#0B2A5B] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all"
                    placeholder="+91 89780 40537"
                  />
                </div>

                <div>
                  <label htmlFor="modal-service" className="block text-xs font-bold text-[#0B2A5B] uppercase tracking-wider mb-1.5">
                    Service Interested *
                  </label>
                  <select
                    id="modal-service"
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

              {/* Project Brief Details (Optional) */}
              <div>
                <label htmlFor="modal-message" className="block text-xs font-bold text-[#0B2A5B] uppercase tracking-wider mb-1.5">
                  Project Brief / Details <span className="text-slate-500 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] focus:ring-2 focus:ring-[#087FF5]/20 outline-none transition-all resize-none"
                  placeholder="Share any specific requirements or ideas (optional)..."
                />
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="min-h-[44px] px-7 py-3 bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] bg-[length:200%_auto] hover:bg-right text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-[#087FF5]/30 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
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
