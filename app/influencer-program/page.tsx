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
  CreditCard,
  Building,
  Smartphone,
  QrCode,
  Lock,
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

interface SocialAccountField {
  platform: string;
  url: string;
}

export default function InfluencerProgramPage() {
  const [partnerType, setPartnerType] = useState<'individual' | 'influencer'>('individual');

  // Common contact fields
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

  // Payment Details fields
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'mobile_upi' | 'bank_transfer'>('upi');
  
  // UPI fields
  const [upiId, setUpiId] = useState('');
  const [upiAccountHolderName, setUpiAccountHolderName] = useState('');

  // Mobile UPI fields
  const [upiMobile, setUpiMobile] = useState('');
  const [mobileRecipientName, setMobileRecipientName] = useState('');

  // Bank Transfer fields
  const [bankAccountHolderName, setBankAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [confirmBankAccountNumber, setConfirmBankAccountNumber] = useState('');
  const [bankIfscCode, setBankIfscCode] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedPartner, setGeneratedPartner] = useState<{
    fullName: string;
    partnerType: string;
    influencerName?: string;
    couponCode: string;
    paymentMethod?: string;
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
    setErrorMessage('');

    if (!termsAccepted) {
      setStatus('error');
      setErrorMessage('You must review and agree to the Referral Program Terms & Privacy Policy to proceed.');
      return;
    }

    // Influencer validation
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

    // Payment validation based on selected method
    let paymentPayload: any = {
      paymentMethod,
    };

    if (paymentMethod === 'upi') {
      if (!upiId.trim()) {
        setStatus('error');
        setErrorMessage('Please enter your UPI ID.');
        return;
      }
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (!upiRegex.test(upiId.trim())) {
        setStatus('error');
        setErrorMessage('Invalid UPI ID format (e.g. rahul@okaxis, yourname@upi).');
        return;
      }
      const recipient = upiAccountHolderName.trim() || fullName.trim();
      if (!recipient) {
        setStatus('error');
        setErrorMessage('UPI account holder name is required.');
        return;
      }
      paymentPayload.upiId = upiId.trim();
      paymentPayload.paymentRecipientName = recipient;
    } else if (paymentMethod === 'mobile_upi') {
      const cleanMobile = upiMobile.replace(/\D/g, '');
      if (cleanMobile.length < 10) {
        setStatus('error');
        setErrorMessage('Please enter a valid 10-digit mobile number linked to UPI.');
        return;
      }
      const recipient = mobileRecipientName.trim() || fullName.trim();
      if (!recipient) {
        setStatus('error');
        setErrorMessage('Recipient/account holder name linked to mobile UPI is required.');
        return;
      }
      paymentPayload.upiMobile = cleanMobile.slice(-10);
      paymentPayload.paymentRecipientName = recipient;
    } else if (paymentMethod === 'bank_transfer') {
      const holder = bankAccountHolderName.trim() || fullName.trim();
      if (!holder) {
        setStatus('error');
        setErrorMessage('Bank account holder name is required.');
        return;
      }
      if (!bankName.trim()) {
        setStatus('error');
        setErrorMessage('Bank name is required.');
        return;
      }
      const cleanAcc = bankAccountNumber.trim();
      if (!cleanAcc || cleanAcc.length < 9 || cleanAcc.length > 20) {
        setStatus('error');
        setErrorMessage('Please enter a valid bank account number (9 to 20 digits).');
        return;
      }
      if (cleanAcc !== confirmBankAccountNumber.trim()) {
        setStatus('error');
        setErrorMessage('Bank account number and confirmation account number do not match.');
        return;
      }
      const cleanIfsc = bankIfscCode.trim().toUpperCase();
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(cleanIfsc)) {
        setStatus('error');
        setErrorMessage('Invalid IFSC code format (e.g. SBIN0001234, HDFC0000045).');
        return;
      }

      paymentPayload.paymentRecipientName = holder;
      paymentPayload.bankDetails = {
        accountHolderName: holder,
        bankName: bankName.trim(),
        accountNumber: cleanAcc,
        confirmAccountNumber: confirmBankAccountNumber.trim(),
        ifscCode: cleanIfsc,
      };
    }

    setStatus('loading');

    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      partnerType,
      termsAccepted: true,
      ...paymentPayload,
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD600]/15 border border-[#FFD600]/40 text-[#FFD600] text-xs font-black uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#FFD600]" />
            <span>Open to Everyone & Creators</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            Earn <span className="text-[#FFD600]">10% Commission</span> on Every <br className="hidden sm:inline" />
            Successful Website Referral
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Join the AVM Smart Solutions Referral Program. Receive your unique 6-character coupon code, share it with your network or audience, and receive prompt 10% payouts directly to your verified UPI or bank account.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Per Conversion</p>
              <p className="text-xl font-black text-[#FFD600]">10% Commission</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Calculated on qualifying project amount</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Customer Discount</p>
              <p className="text-xl font-black text-white">₹1,000 Off</p>
              <p className="text-[11px] text-slate-300 mt-0.5">₹3,999 on standard website package</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Coupon Code</p>
              <p className="text-xl font-black text-[#FFD600]">6 Characters</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Derived from your name / channel</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fast Payouts</p>
              <p className="text-xl font-black text-white">UPI / Bank</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Direct to your preferred payment method</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Registration Form Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#FFD600]">
            <div>
              <span className="text-[10px] font-black uppercase text-[#FFD600] tracking-widest">
                Partner Onboarding
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Referral Partner & Payment Registration
              </h2>
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
                    ! Your unique 6-character referral coupon code is active and payment details are securely saved.
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
                    When applied, your referred clients receive verified discount attribution.
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
              <form onSubmit={handleSubmit} className="space-y-8">
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
                      ? '✓ Individual partners only need Basic Contact details and Payout info.'
                      : '✓ Influencers can link social profiles and display their channel identity.'}
                  </p>
                </div>

                {/* 1. Common Contact Details */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                    1. Basic Contact Information
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
                  <div className="space-y-5 pt-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                      2. Influencer Channels & Profiles
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
                          className="text-xs font-extrabold text-[#087FF5] hover:text-[#066FD6] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Another Account</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {socialAccounts.map((account, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <select
                              value={account.platform}
                              onChange={(e) => handleUpdateSocialAccount(idx, 'platform', e.target.value)}
                              className="w-36 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 outline-none focus:border-[#087FF5]"
                            >
                              <option value="Instagram">Instagram</option>
                              <option value="YouTube">YouTube</option>
                              <option value="Facebook">Facebook</option>
                              <option value="LinkedIn">LinkedIn</option>
                              <option value="Twitter / X">Twitter / X</option>
                              <option value="Other">Other</option>
                            </select>

                            <input
                              type="url"
                              value={account.url}
                              onChange={(e) => handleUpdateSocialAccount(idx, 'url', e.target.value)}
                              placeholder={`https://${account.platform.toLowerCase()}.com/yourhandle`}
                              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#087FF5] outline-none transition-all"
                            />

                            {socialAccounts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSocialAccount(idx)}
                                className="p-3 text-slate-400 hover:text-rose-500 rounded-xl transition-colors cursor-pointer"
                                title="Remove Profile"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                          Audience / Follower Size (Optional)
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
                  </div>
                )}

                {/* 3. MANDATORY PAYMENT DETAILS SECTION */}
                <div className="space-y-5 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#087FF5]" />
                      <span>{partnerType === 'influencer' ? '3. Payment Details' : '2. Payment Details'}</span>
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" /> Encrypted & Secure
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Select how you would like to receive your 10% referral payouts. Your payment information is encrypted at rest and will only be used for commission transfers.
                  </p>

                  {/* Payment Method Selector Tabs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        paymentMethod === 'upi'
                          ? 'border-amber-400 bg-amber-50/60 ring-2 ring-amber-400/30'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <QrCode className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'upi' ? 'text-amber-600' : 'text-slate-400'}`} />
                      <div>
                        <span className="block text-xs font-black text-slate-900">UPI ID</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">Google Pay, PhonePe, Paytm VPA</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mobile_upi')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        paymentMethod === 'mobile_upi'
                          ? 'border-amber-400 bg-amber-50/60 ring-2 ring-amber-400/30'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Smartphone className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'mobile_upi' ? 'text-amber-600' : 'text-slate-400'}`} />
                      <div>
                        <span className="block text-xs font-black text-slate-900">Mobile UPI Number</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">UPI-linked phone number</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-amber-400 bg-amber-50/60 ring-2 ring-amber-400/30'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Building className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'bank_transfer' ? 'text-amber-600' : 'text-slate-400'}`} />
                      <div>
                        <span className="block text-xs font-black text-slate-900">Bank Transfer</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">NEFT / IMPS via IFSC</span>
                      </div>
                    </button>
                  </div>

                  {/* Dynamic Form: UPI ID */}
                  {paymentMethod === 'upi' && (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                            UPI ID *
                          </label>
                          <input
                            type="text"
                            required
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. rahul@okaxis or 9876543210@paytm"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:border-[#087FF5] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                            UPI Account Holder Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={upiAccountHolderName}
                            onChange={(e) => setUpiAccountHolderName(e.target.value)}
                            placeholder="Account name registered with UPI"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] outline-none"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Supports BHIM, Google Pay, PhonePe, Paytm, Amazon Pay, or any bank UPI handle.
                      </p>
                    </div>
                  )}

                  {/* Dynamic Form: Mobile UPI Number */}
                  {paymentMethod === 'mobile_upi' && (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                            Mobile Number Linked to UPI *
                          </label>
                          <input
                            type="tel"
                            required
                            value={upiMobile}
                            onChange={(e) => setUpiMobile(e.target.value)}
                            placeholder="10-digit mobile number"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:border-[#087FF5] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                            Recipient / Account Holder Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={mobileRecipientName}
                            onChange={(e) => setMobileRecipientName(e.target.value)}
                            placeholder="Name on mobile UPI account"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] outline-none"
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed font-medium">
                        <strong>Important:</strong> Please ensure this mobile number is actively linked to a supported payment application (Google Pay, PhonePe, Paytm, or BHIM) to receive direct commission transfers.
                      </div>
                    </div>
                  )}

                  {/* Dynamic Form: Bank Transfer */}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                            Account Holder Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={bankAccountHolderName}
                            onChange={(e) => setBankAccountHolderName(e.target.value)}
                            placeholder="Name as per bank passbook"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                            Bank Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            placeholder="e.g. State Bank of India, HDFC Bank"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-[#087FF5] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                            Bank Account Number *
                          </label>
                          <input
                            type="password"
                            required
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            placeholder="Enter 9 to 18-digit account number"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:border-[#087FF5] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                            Confirm Bank Account Number *
                          </label>
                          <input
                            type="text"
                            required
                            value={confirmBankAccountNumber}
                            onChange={(e) => setConfirmBankAccountNumber(e.target.value)}
                            placeholder="Re-enter bank account number"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:border-[#087FF5] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                          IFSC Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={bankIfscCode}
                          onChange={(e) => setBankIfscCode(e.target.value.toUpperCase())}
                          placeholder="e.g. SBIN0001234 or HDFC0000045"
                          className="w-full sm:w-1/2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-mono uppercase text-slate-900 focus:border-[#087FF5] outline-none"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Account numbers are encrypted with AES-256-GCM. We never share or reveal account numbers publicly.
                      </p>
                    </div>
                  )}
                </div>

                {/* 4. Terms Acceptance Checkbox */}
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
                    . I understand commissions are 10% of qualifying converted projects, payable strictly upon client payment completion and official project takeover.
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[#0B0B0B] hover:bg-slate-900 disabled:bg-slate-400 text-[#FFD600] font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#FFD600]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#FFD600]" />
                      <span>Generating 6-Character Coupon...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration & Get Coupon Code</span>
                      <ArrowRight className="w-4 h-4" />
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
