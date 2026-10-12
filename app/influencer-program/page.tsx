'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Gift,
  Users,
  TrendingUp,
  Share2,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  User,
  Radio,
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

interface SocialAccountField {
  platform: string;
  url: string;
}

export default function InfluencerProgramPage() {
  const [partnerType, setPartnerType] = useState<'individual' | 'influencer'>('individual');
  
  // Common fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Influencer-only fields
  const [influencerName, setInfluencerName] = useState('');
  const [socialAccounts, setSocialAccounts] = useState<SocialAccountField[]>([
    { platform: 'Instagram', url: '' },
  ]);
  const [followerCount, setFollowerCount] = useState('');
  const [category, setCategory] = useState('Tech & Business');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedPartner, setGeneratedPartner] = useState<{
    fullName: string;
    partnerType: string;
    influencerName?: string;
    couponCode: string;
    emailDeliveryStatus: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Dynamic social accounts management for Influencers
  const handleAddSocialAccount = () => {
    setSocialAccounts((prev) => [...prev, { platform: 'YouTube', url: '' }]);
  };

  const handleRemoveSocialAccount = (index: number) => {
    if (socialAccounts.length <= 1) return;
    setSocialAccounts((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateSocialAccount = (index: number, field: 'platform' | 'url', value: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc, idx) => (idx === index ? { ...acc, [field]: value } : acc))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setStatus('error');
      setErrorMessage('You must review and agree to the Referral Program Terms & Privacy Policy to proceed.');
      return;
    }

    if (partnerType === 'influencer') {
      if (!influencerName.trim()) {
        setStatus('error');
        setErrorMessage('Influencer account/display name is required.');
        return;
      }

      const hasValidAccount = socialAccounts.some((acc) => acc.url.trim().length > 0);
      if (!hasValidAccount) {
        setStatus('error');
        setErrorMessage('At least one valid social media profile link is required for influencers.');
        return;
      }
    }

    setStatus('loading');
    setErrorMessage('');

    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      partnerType,
      termsAccepted: true,
      ...(partnerType === 'influencer' && {
        influencerName: influencerName.trim(),
        socialAccounts: socialAccounts.filter((acc) => acc.url.trim().length > 0),
        followerCount: followerCount.trim(),
        category: category.trim(),
        message: message.trim(),
      }),
    };

    try {
      const res = await fetch(getApiUrl('/api/influencer/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setGeneratedPartner(data.partner);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit referral partner registration.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred while submitting. Please try again.');
    }
  };

  const handleCopyCode = () => {
    if (generatedPartner?.couponCode) {
      navigator.clipboard.writeText(generatedPartner.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="w-full bg-[#F4F7FA] text-slate-900 min-h-screen">
      {/* Hero Section — Black & Yellow Signature Brand Styling */}
      <section className="bg-[#0B0B0B] text-white py-20 sm:py-28 relative overflow-hidden border-b-4 border-[#FFD600]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FFD600]/10 blur-[150px] rounded-full pointer-events-none -z-0" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD600]/15 border border-[#FFD600]/40 text-[#FFD600] text-xs font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AVM Smart Solutions Partner Program</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Earn with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] via-amber-300 to-[#FFD600]">
              AVM Smart Referral Program
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Open to everyone — whether you are an individual wanting to refer friends and businesses or a creator with an active audience. Get your unique 6-character coupon code, give ₹1,000 savings, and earn verified commissions.
          </p>

          {/* Value proposition badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-slate-200">
              <Gift className="w-4 h-4 text-[#FFD600]" />
              <span>₹1,000 Flat Savings for Customers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-slate-200">
              <TrendingUp className="w-4 h-4 text-[#FFD600]" />
              <span>Commissions on Qualifying Project Takeovers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#FFD600]" />
              <span>Instant 6-Character Unique Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* Program How It Works Workflow Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How the Referral Program Works</h2>
          <p className="text-slate-600 text-sm">Simple, transparent, and rewarding for both individuals and creators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative">
            <span className="w-9 h-9 rounded-2xl bg-[#0B0B0B] text-[#FFD600] font-black text-sm flex items-center justify-center">
              01
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">Select Your Role</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Register as an Individual Partner with just basic contact details, or as an Influencer with your social channels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative">
            <span className="w-9 h-9 rounded-2xl bg-[#0B0B0B] text-[#FFD600] font-black text-sm flex items-center justify-center">
              02
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">Get 6-Char Coupon</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive your personalized 6-character coupon code derived from your name immediately on screen and via email.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative">
            <span className="w-9 h-9 rounded-2xl bg-[#0B0B0B] text-[#FFD600] font-black text-sm flex items-center justify-center">
              03
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">Share ₹1,000 Savings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clients use your code in our contact form to get the ₹4,999 Website Package for only ₹3,999.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative">
            <span className="w-9 h-9 rounded-2xl bg-[#0B0B0B] text-[#FFD600] font-black text-sm flex items-center justify-center">
              04
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">Earn Commission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When AVM Smart officially takes over the confirmed project and payment is cleared, your commission is credited.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-12 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Card Top Header */}
          <div className="bg-[#0B0B0B] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#FFD600]">
            <div>
              <h2 className="text-2xl font-black text-white">Join AVM Smart Referral Program</h2>
              <p className="text-xs text-slate-300 mt-1">
                Choose your registration type and get your unique 6-character coupon code immediately.
              </p>
            </div>
            <Link
              href="/influencer-terms"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD600] hover:underline"
            >
              <span>View Referral Terms</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Form Body or Success State */}
          <div className="p-6 sm:p-10">
            {status === 'success' && generatedPartner ? (
              <div className="p-8 sm:p-10 bg-[#FFFDF0] border-2 border-[#FFD600] rounded-3xl text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#FFD600] text-slate-950 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Registration Complete! 🎉
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Welcome aboard, <strong>{generatedPartner.fullName}</strong>
                    {generatedPartner.partnerType === 'influencer' && generatedPartner.influencerName
                      ? ` (${generatedPartner.influencerName})`
                      : ''}
                    ! Your unique 6-character referral coupon code is active.
                  </p>
                </div>

                {/* 6-Character Code Box */}
                <div className="p-6 bg-white rounded-2xl border border-amber-200 shadow-sm inline-block w-full max-w-md space-y-3">
                  <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                    Your 6-Character Coupon Code
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-mono text-3xl font-black tracking-widest text-[#0B0B0B] bg-[#FFD600] px-6 py-2 rounded-xl">
                      {generatedPartner.couponCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-xs cursor-pointer"
                      title="Copy Coupon Code"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs font-bold text-emerald-600">✓ 6-Character code copied to clipboard!</p>
                  )}
                  <p className="text-[11px] text-slate-500">
                    When applied, customers see: <strong className="text-emerald-700">₹1,000 SAVED — COUPON APPLIED</strong>
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 max-w-md mx-auto font-medium">
                  📧 An email containing your 6-character code, referral instructions, and terms has been sent to your email address.
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[#0B0B0B] text-[#FFD600] font-black text-xs rounded-xl shadow-md hover:bg-slate-900 transition-colors"
                  >
                    Test Code on Contact Form
                  </Link>
                  <Link
                    href="/influencer-terms"
                    className="px-6 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Read Program Terms
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-xl flex items-center gap-2.5 font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Segmented Control / Radio Selection for Partner Role */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Select Your Registration Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setPartnerType('individual')}
                      className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                        partnerType === 'individual'
                          ? 'bg-[#0B0B0B] text-[#FFD600] shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>I am an Individual Referral Partner</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPartnerType('influencer')}
                      className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                        partnerType === 'influencer'
                          ? 'bg-[#0B0B0B] text-[#FFD600] shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>I am an Influencer / Creator</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {partnerType === 'individual'
                      ? '✓ Individual partners only need Full Name, Email, and Mobile Number.'
                      : '✓ Influencers can link multiple social profiles and display their channel identity.'}
                  </p>
                </div>

                {/* 1. Common Contact Details */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Basic Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Kumar"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Influencer-Specific Fields */}
                {partnerType === 'influencer' && (
                  <div className="space-y-5 pt-4 border-t border-slate-200">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Influencer Channels & Profiles
                    </h3>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Influencer Account / Display Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={influencerName}
                        onChange={(e) => setInfluencerName(e.target.value)}
                        placeholder="e.g. Tech With Rahul"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all"
                      />
                    </div>

                    {/* Dynamic Social Media Accounts List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                          Social Media Accounts *
                        </label>
                        <button
                          type="button"
                          onClick={handleAddSocialAccount}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#087FF5] hover:text-[#066FD6] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Another Account</span>
                        </button>
                      </div>

                      {socialAccounts.map((account, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <select
                            value={account.platform}
                            onChange={(e) => handleUpdateSocialAccount(idx, 'platform', e.target.value)}
                            className="w-36 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#087FF5]"
                          >
                            <option value="Instagram">Instagram</option>
                            <option value="YouTube">YouTube</option>
                            <option value="Facebook">Facebook</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Twitter">Twitter / X</option>
                            <option value="Other">Other</option>
                          </select>

                          <input
                            type="url"
                            required={idx === 0}
                            value={account.url}
                            onChange={(e) => handleUpdateSocialAccount(idx, 'url', e.target.value)}
                            placeholder="https://..."
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all"
                          />

                          {socialAccounts.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveSocialAccount(idx)}
                              className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                              title="Remove account entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                          Audience / Follower Count (Optional)
                        </label>
                        <input
                          type="text"
                          value={followerCount}
                          onChange={(e) => setFollowerCount(e.target.value)}
                          placeholder="e.g. 25K"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                          Content Category (Optional)
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all"
                        >
                          <option value="Tech & Business">Tech, Software & Business</option>
                          <option value="Education & Jobs">Education & Career Growth</option>
                          <option value="Finance & Startups">Finance, Trading & Startups</option>
                          <option value="Lifestyle & Vlog">Lifestyle, Travel & Vlog</option>
                          <option value="Local Business & News">Local Business & Digital News</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                        Audience Details / Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share any specific plans for promoting AVM Smart solutions..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Terms Acceptance Checkbox */}
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3">
                  <input
                    id="termsAccepted"
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="termsAccepted" className="text-xs text-slate-700 leading-relaxed cursor-pointer font-medium">
                    I have read and agree to the{' '}
                    <Link
                      href="/influencer-terms"
                      target="_blank"
                      className="font-bold text-[#0B2A5B] underline hover:text-[#087FF5]"
                    >
                      AVM Smart Referral Program Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="font-bold text-[#0B2A5B] underline hover:text-[#087FF5]"
                    >
                      Privacy Policy
                    </Link>
                    . I understand commissions are payable strictly upon client payment completion and official project takeover by AVM Smart Solutions.
                  </label>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[#0B0B0B] hover:bg-slate-900 text-[#FFD600] font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#FFD600]" />
                      <span>Generating Exactly 6-Character Code...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {partnerType === 'individual'
                          ? 'Join as Individual Partner & Get 6-Char Code'
                          : 'Join as Influencer & Get 6-Char Code'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#FFD600]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
