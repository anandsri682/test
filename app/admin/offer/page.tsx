'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Sparkles,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  Globe,
  ShieldCheck,
  Plus,
  Trash2,
  Check,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

interface OfferPackage {
  id: string;
  name: string;
  enabled: boolean;
  isPrimary: boolean;
  headline: string;
  price: string;
  bannerText: string;
  bannerCta: string;
  popupSupportingText: string;
  landingHeadline: string;
  landingSubtext: string;
  ctaLink: string;
  benefits: { title: string; desc: string; highlight: string }[];
}

export default function AdminOfferManagerPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [offersList, setOffersList] = useState<OfferPackage[]>([
    {
      id: 'offer-2499',
      name: '₹2,499 Website Setup Offer',
      enabled: true,
      isPrimary: true,
      headline: 'Launch Your Business Website for Just',
      price: '₹2,499',
      bannerText: 'Website + WhatsApp + 3-Month Maintenance',
      bannerCta: 'View Offer',
      popupSupportingText:
        'Take your business online with an affordable website package designed to help your business build a professional digital presence.',
      landingHeadline: 'Your Business Website Starts at Just',
      landingSubtext:
        'Everything you need to establish your business online, with WhatsApp integration, three months of maintenance, and a domain included for the first year.',
      ctaLink: '/offer/',
      benefits: [
        {
          title: 'Website Development',
          desc: 'Complete 5-page business website built on modern Next.js architecture.',
          highlight: '₹2,499 Setup',
        },
        {
          title: '3 Months Maintenance',
          desc: '3 months of dedicated technical support, updates, and monitoring.',
          highlight: '3 Months Included',
        },
        {
          title: 'WhatsApp Integration',
          desc: 'Direct click-to-chat WhatsApp lead capture button integrated on every page.',
          highlight: 'Integration Included',
        },
        {
          title: 'Free Domain (1 Year)',
          desc: 'Free .com or .in domain registration included for your first year.',
          highlight: '1st Year Included',
        },
      ],
    },
  ]);

  const [activeOfferId, setActiveOfferId] = useState<string>('offer-2499');

  const selectedOffer = offersList.find((o) => o.id === activeOfferId) || offersList[0];

  useEffect(() => {
    const token = localStorage.getItem('avm_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetch(getApiUrl('/api/admin/offer'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.offer) {
          setGlobalEnabled(data.offer.enabled ?? true);

          if (data.offer.offers && data.offer.offers.length > 0) {
            setOffersList(data.offer.offers);
            const primary = data.offer.offers.find((o: OfferPackage) => o.isPrimary);
            if (primary) setActiveOfferId(primary.id);
            else setActiveOfferId(data.offer.offers[0].id);
          } else {
            // Single fallback
            const singleOffer: OfferPackage = {
              id: 'offer-active',
              name: `${data.offer.price || '₹2,499'} Promotional Offer`,
              enabled: true,
              isPrimary: true,
              headline: data.offer.headline || 'Launch Your Business Website for Just',
              price: data.offer.price || '₹2,499',
              bannerText: data.offer.bannerText || 'Website + WhatsApp + 3-Month Maintenance',
              bannerCta: data.offer.bannerCta || 'View Offer',
              popupSupportingText:
                data.offer.popupSupportingText ||
                'Take your business online with an affordable website package designed to help your business build a professional digital presence.',
              landingHeadline: data.offer.landingHeadline || 'Your Business Website Starts at Just',
              landingSubtext:
                data.offer.landingSubtext ||
                'Everything you need to establish your business online, with WhatsApp integration, three months of maintenance, and a domain included for the first year.',
              ctaLink: data.offer.ctaLink || '/offer/',
              benefits: data.offer.benefits || [],
            };
            setOffersList([singleOffer]);
            setActiveOfferId('offer-active');
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load offer config:', err);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleUpdateSelectedOffer = (field: keyof OfferPackage, value: any) => {
    setOffersList((prev) =>
      prev.map((o) => (o.id === activeOfferId ? { ...o, [field]: value } : o))
    );
  };

  const handleBenefitChange = (index: number, field: string, value: string) => {
    if (!selectedOffer) return;
    const updatedBenefits = [...selectedOffer.benefits];
    updatedBenefits[index] = { ...updatedBenefits[index], [field]: value };
    handleUpdateSelectedOffer('benefits', updatedBenefits);
  };

  const handleAddNewOffer = () => {
    const newId = `offer-${Date.now()}`;
    const newPackage: OfferPackage = {
      id: newId,
      name: `New Promotional Package #${offersList.length + 1}`,
      enabled: true,
      isPrimary: false,
      headline: 'Special Business Offer — Save Big on Website & Marketing',
      price: '₹4,999',
      bannerText: 'Full Custom Website + Digital Marketing Campaign',
      bannerCta: 'Claim Offer',
      popupSupportingText:
        'Grow your business faster with our all-in-one promotional package designed for Indian startups & local businesses.',
      landingHeadline: 'Grow Your Business with Our Special Package',
      landingSubtext:
        'Everything included: Custom design, WhatsApp lead capture, Google SEO setup, and dedicated maintenance.',
      ctaLink: '/offer/',
      benefits: [
        {
          title: 'Custom Business Website',
          desc: 'High-converting responsive website with modern UI.',
          highlight: 'Included',
        },
        {
          title: 'WhatsApp Lead Integration',
          desc: '1-Click WhatsApp lead generation on all pages.',
          highlight: 'Included',
        },
        {
          title: '3 Months Support',
          desc: 'Technical updates, security patches & uptime monitoring.',
          highlight: '3 Months Free',
        },
        {
          title: 'Free 1-Year Domain',
          desc: '.com or .in domain registration included.',
          highlight: '1st Year Free',
        },
      ],
    };

    setOffersList((prev) => [...prev, newPackage]);
    setActiveOfferId(newId);
    setStatusMessage({ type: 'success', text: 'New offer package added! Edit details below and click Save.' });
  };

  const handleSetPrimary = (id: string) => {
    setOffersList((prev) =>
      prev.map((o) => ({
        ...o,
        isPrimary: o.id === id,
      }))
    );
    setActiveOfferId(id);
  };

  const handleDeleteOffer = (id: string) => {
    if (offersList.length <= 1) {
      alert('You must keep at least one offer in your library.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this offer package?')) return;

    const remaining = offersList.filter((o) => o.id !== id);
    setOffersList(remaining);
    setActiveOfferId(remaining[0].id);
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const token = localStorage.getItem('avm_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    const primaryOffer = offersList.find((o) => o.isPrimary) || selectedOffer;

    const payload = {
      enabled: globalEnabled,
      headline: primaryOffer.headline,
      price: primaryOffer.price,
      bannerText: primaryOffer.bannerText,
      bannerCta: primaryOffer.bannerCta,
      popupSupportingText: primaryOffer.popupSupportingText,
      landingHeadline: primaryOffer.landingHeadline,
      landingSubtext: primaryOffer.landingSubtext,
      ctaLink: primaryOffer.ctaLink,
      benefits: primaryOffer.benefits,
      offers: offersList,
    };

    try {
      const res = await fetch(getApiUrl('/api/admin/offer'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: 'success', text: 'All Offer Packages saved & primary offer published live!' });
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to save offer packages.' });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Network error saving offer packages.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Offer & Popup Manager" subtitle="Loading campaign configuration...">
        <div className="p-12 text-center text-xs text-slate-400 font-medium">
          <Loader2 className="w-6 h-6 animate-spin text-[#087FF5] mx-auto mb-2" />
          <span>Loading offer library...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Dynamic Offer & Popup Manager"
      subtitle="Create multiple offer packages, set active live campaigns, and edit popup banners"
    >
      <div className="space-y-6">
        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 border border-slate-200/80 rounded-2xl shadow-xs">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-black uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Offers Library ({offersList.length} Created)
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Add multiple promotional offers and select which offer is currently published live.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddNewOffer}
              className="px-4 py-2 bg-[#087FF5] hover:bg-[#066FD6] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Offer</span>
            </button>

            <Link
              href="/offer/"
              target="_blank"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#087FF5]" />
              <span>Preview Live Offer</span>
            </Link>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 border ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Multiple Offers Selection Library Cards */}
        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Offer Package to Edit or Publish Live
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {offersList.map((off) => {
              const isSelected = off.id === activeOfferId;
              return (
                <div
                  key={off.id}
                  onClick={() => setActiveOfferId(off.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-blue-50/70 border-[#087FF5] ring-2 ring-[#087FF5]/20 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 truncate">{off.name}</span>
                      {off.isPrimary && (
                        <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shrink-0">
                          LIVE ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-base font-black text-[#67D63B]">{off.price}</div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{off.headline}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    {!off.isPrimary ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetPrimary(off.id);
                        }}
                        className="text-[10px] font-bold text-[#087FF5] hover:underline flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Set as Live Campaign
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" /> Active Website Offer
                      </span>
                    )}

                    {offersList.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteOffer(off.id);
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded cursor-pointer"
                        title="Delete Offer Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Offer Form & Live Preview */}
        {selectedOffer && (
          <form onSubmit={handleSaveAll} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Campaign Status */}
              <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Website Offer System</h3>
                    <p className="text-xs text-slate-500">Enable or disable top offer banner and automatic popup website-wide</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={globalEnabled}
                      onChange={(e) => setGlobalEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>

              {/* Package Meta Name & Headline */}
              <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>Package Settings ({selectedOffer.name})</span>
                  {selectedOffer.isPrimary && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Currently Live
                    </span>
                  )}
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Internal Package Name
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedOffer.name}
                    onChange={(e) => handleUpdateSelectedOffer('name', e.target.value)}
                    className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40"
                    placeholder="e.g. ₹2,499 Starter Website Offer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Popup & Offer Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedOffer.headline}
                    onChange={(e) => handleUpdateSelectedOffer('headline', e.target.value)}
                    className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40"
                    placeholder="e.g. Launch Your Business Website for Just"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Main Display Price
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedOffer.price}
                      onChange={(e) => handleUpdateSelectedOffer('price', e.target.value)}
                      className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#67D63B] focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40"
                      placeholder="e.g. ₹2,499"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      CTA Destination Link
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedOffer.ctaLink}
                      onChange={(e) => handleUpdateSelectedOffer('ctaLink', e.target.value)}
                      className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40"
                      placeholder="/offer/"
                    />
                  </div>
                </div>
              </div>

              {/* Navbar Banner Config */}
              <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Top Navbar Compact Banner Text
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Banner Text Content
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedOffer.bannerText}
                    onChange={(e) => handleUpdateSelectedOffer('bannerText', e.target.value)}
                    className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40"
                    placeholder="e.g. Website + WhatsApp + 3-Month Maintenance"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Banner Button Text
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedOffer.bannerCta}
                    onChange={(e) => handleUpdateSelectedOffer('bannerCta', e.target.value)}
                    className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40"
                    placeholder="View Offer"
                  />
                </div>
              </div>

              {/* Popup Body */}
              <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Popup Supporting Description
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Popup Paragraph Body
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={selectedOffer.popupSupportingText}
                    onChange={(e) => handleUpdateSelectedOffer('popupSupportingText', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40 resize-none"
                    placeholder="Popup paragraph body..."
                  />
                </div>
              </div>

              {/* Benefits List */}
              <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Package Benefits Inclusions ({selectedOffer.benefits.length})
                </h3>

                {selectedOffer.benefits.map((benefit, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <span className="text-[10px] font-black text-[#087FF5] uppercase">Benefit #{idx + 1}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(idx, 'title', e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={benefit.highlight}
                        onChange={(e) => handleBenefitChange(idx, 'highlight', e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-emerald-600 font-bold"
                        placeholder="Highlight tag"
                      />
                    </div>
                    <input
                      type="text"
                      value={benefit.desc}
                      onChange={(e) => handleBenefitChange(idx, 'desc', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-600"
                      placeholder="Short description"
                    />
                  </div>
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 bg-[#087FF5] hover:bg-[#066FD6] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save All Offers & Publish Live Campaign</span>
              </button>

            </div>

            {/* Live Preview Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="sticky top-24 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#087FF5]" />
                  Previewing: {selectedOffer.name}
                </h3>

                {/* Banner Preview */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Top Banner Preview</span>
                  <div className="w-full bg-[#0B2A5B] border border-[#087FF5]/40 p-2.5 rounded-xl text-white text-xs flex items-center justify-between gap-2 shadow-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="bg-[#67D63B]/20 text-[#67D63B] text-[9px] font-black px-2 py-0.5 rounded-full shrink-0">
                        OFFER
                      </span>
                      <span className="font-bold truncate text-[11px]">{selectedOffer.bannerText}</span>
                      <span className="font-black text-[#67D63B] shrink-0">{selectedOffer.price}</span>
                    </div>
                    <span className="bg-[#087FF5] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
                      {selectedOffer.bannerCta} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Popup Preview */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Popup Modal Preview</span>
                  <div className="w-full bg-[#061838] border-2 border-[#67D63B]/40 p-5 rounded-2xl text-white space-y-4 shadow-xl">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#67D63B]/20 px-3 py-1 text-[10px] font-black text-[#67D63B]">
                      <Sparkles className="h-3 w-3" />
                      PROMOTIONAL OFFER
                    </div>

                    <h4 className="text-xl font-black text-white leading-tight">
                      {selectedOffer.headline}{' '}
                      <span className="text-[#67D63B]">{selectedOffer.price}!</span>
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedOffer.popupSupportingText}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-200">
                      <div className="p-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#087FF5]" />
                        <span>{selectedOffer.price} Setup</span>
                      </div>
                      <div className="p-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#FF6A00]" />
                        <span>3 Months Maintenance</span>
                      </div>
                    </div>

                    <button type="button" className="w-full py-2.5 bg-[#FF6A00] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5">
                      <span>Claim This Offer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
