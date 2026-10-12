'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  ArrowLeft,
  Users,
  UserCheck,
  Tag,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  Clock,
  Send,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function PartnerProfilePage({ params }: { params: Promise<{ partnerId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const partnerId = resolvedParams.partnerId;

  const [loading, setLoading] = useState(true);
  const [partnerData, setPartnerData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [togglingCoupon, setTogglingCoupon] = useState(false);
  const [retryingEmail, setRetryingEmail] = useState(false);
  const [actionAlert, setActionAlert] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem('avm_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(getApiUrl(`/api/admin/referrals/${partnerId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setPartnerData(data);
      } else {
        setError(data.error || 'Failed to load referral partner profile');
      }
    } catch {
      setError('Network error while fetching partner details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [partnerId]);

  const handleToggleCoupon = async () => {
    if (!partnerData?.partner) return;
    const token = localStorage.getItem('avm_admin_token');
    setTogglingCoupon(true);
    setActionAlert(null);

    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: 'toggle_coupon',
          id: partnerData.partner._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPartnerData((prev: any) => ({
          ...prev,
          partner: {
            ...prev.partner,
            couponActive: data.couponActive,
          },
        }));
        setActionAlert({
          type: 'success',
          text: `Coupon code ${data.couponActive ? 'activated' : 'deactivated'} successfully!`,
        });
      } else {
        setActionAlert({ type: 'error', text: data.error || 'Failed to update coupon status' });
      }
    } catch {
      setActionAlert({ type: 'error', text: 'Error toggling coupon status' });
    } finally {
      setTogglingCoupon(false);
    }
  };

  const handleResendWelcomeEmail = async () => {
    if (!partnerData?.partner) return;
    const token = localStorage.getItem('avm_admin_token');
    setRetryingEmail(true);
    setActionAlert(null);

    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: 'resend_email',
          id: partnerData.partner._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionAlert({ type: 'success', text: 'Welcome & coupon instructions email resent successfully!' });
        fetchProfile();
      } else {
        setActionAlert({ type: 'error', text: data.error || 'Failed to resend email' });
      }
    } catch {
      setActionAlert({ type: 'error', text: 'Network error resending email' });
    } finally {
      setRetryingEmail(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#087FF5] mx-auto" />
          <p className="text-xs text-slate-500 font-bold">Loading Referral Partner Profile...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error || !partnerData) {
    return (
      <AdminLayout>
        <div className="p-8 max-w-xl mx-auto text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-black text-slate-900">Partner Profile Not Found</h2>
          <p className="text-xs text-slate-500">{error || 'Could not locate the requested referral profile.'}</p>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B2A5B] text-white text-xs font-bold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Lead Submissions
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const { partner, analytics, leads = [], commissions = [] } = partnerData;
  const isInfluencer = partner.partnerType === 'influencer';

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#087FF5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Leads</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchProfile}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              href="/admin/influencers"
              className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              All Partners Table
            </Link>
          </div>
        </div>

        {/* Action Alert Banner */}
        {actionAlert && (
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
              actionAlert.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {actionAlert.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{actionAlert.text}</span>
            </div>
            <button
              onClick={() => setActionAlert(null)}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Profile Header Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isInfluencer
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-blue-100 text-[#087FF5] border border-blue-200'
                  }`}
                >
                  <UserCheck className="w-3 h-3" />
                  {isInfluencer ? 'Influencer Partner' : 'Individual Referral Partner'}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    partner.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : partner.status === 'deactivated'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {partner.status?.toUpperCase() || 'APPROVED'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {partner.fullName}
              </h1>

              {isInfluencer && partner.influencerName && (
                <p className="text-sm font-bold text-slate-500">
                  Channel / Display: <span className="text-slate-800">{partner.influencerName}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${partner.email}`} className="text-[#087FF5] font-semibold hover:underline">
                    {partner.email}
                  </a>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">+91 {partner.phone}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Joined {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </span>
              </div>
            </div>

            {/* Coupon Code Pill & Action */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 min-w-[260px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Assigned Coupon Code
                </span>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    partner.couponActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {partner.couponActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#0B2A5B]" />
                  <span className="font-mono text-xl font-black text-slate-900 tracking-wider">
                    {partner.couponCode}
                  </span>
                </div>
                <button
                  onClick={handleToggleCoupon}
                  disabled={togglingCoupon}
                  className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {togglingCoupon ? '...' : partner.couponActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>

              {/* Email Delivery Status */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  Email Status:{' '}
                  <span
                    className={`font-bold ${
                      partner.emailDeliveryStatus === 'sent'
                        ? 'text-emerald-700'
                        : partner.emailDeliveryStatus === 'failed'
                        ? 'text-rose-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {partner.emailDeliveryStatus?.toUpperCase() || 'SENT'}
                  </span>
                </span>
                <button
                  onClick={handleResendWelcomeEmail}
                  disabled={retryingEmail}
                  className="text-[#087FF5] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {retryingEmail ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                  <span>Resend</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Performance Analytics Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Referred Leads</span>
              <Users className="w-4 h-4 text-[#087FF5]" />
            </div>
            <div className="text-2xl font-black text-slate-900">{analytics?.totalReferred || 0}</div>
            <p className="text-[11px] text-slate-400 mt-1">Total inquiries using {partner.couponCode}</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Converted Clients</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">
              {(analytics?.convertedLeads || 0) + (analytics?.achievedLeads || 0)}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Conversion rate: <strong className="text-slate-700">{analytics?.conversionRate || 0}%</strong>
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Commission Earned</span>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-700">
              ₹{(analytics?.totalCommissionEarned || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">10% of qualifying converted projects</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Paid Payouts</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              ₹{(analytics?.commissionPaid || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {analytics?.successfulPayoutCount || 0} successful payouts
            </p>
          </div>
        </div>

        {/* Influencer Channels (If Applicable) & Payment Method Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Social Profiles */}
          {isInfluencer && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Influencer Channels & Profiles
              </h3>

              {partner.socialAccounts && partner.socialAccounts.length > 0 ? (
                <div className="space-y-2.5">
                  {partner.socialAccounts.map((acc: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    >
                      <span className="font-bold text-slate-800">{acc.platform}</span>
                      <a
                        href={acc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#087FF5] font-semibold hover:underline flex items-center gap-1 truncate max-w-[240px]"
                      >
                        <span className="truncate">{acc.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No external channels registered.</p>
              )}
            </div>
          )}

          {/* Secure Payment Details Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#087FF5]" />
                Payout & Payment Details
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                <ShieldCheck className="w-3 h-3" /> Secure & Masked
              </span>
            </div>

            {partner.paymentMethod === 'upi' ? (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="text-slate-500">
                  Preferred Method: <strong className="text-slate-800">UPI ID</strong>
                </div>
                <div className="text-slate-900 font-mono font-bold">{partner.upiId || 'Not provided'}</div>
              </div>
            ) : partner.paymentMethod === 'bank_transfer' ? (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="text-slate-500">
                  Preferred Method: <strong className="text-slate-800">Bank Transfer (NEFT/IMPS)</strong>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Bank Name:</span>
                    <strong className="text-slate-800">{partner.bankDetails?.bankName || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Account Number:</span>
                    <strong className="text-slate-800 font-mono">
                      {partner.bankDetails?.accountNumber || '••••••••'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Account Holder:</span>
                    <strong className="text-slate-800">
                      {partner.bankDetails?.accountHolderName || partner.fullName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">IFSC Code:</span>
                    <strong className="text-slate-800 font-mono">{partner.bankDetails?.ifscCode || 'N/A'}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
                Partner has not configured custom payout details. Payouts can be arranged manually via UPI linked to{' '}
                <strong className="text-slate-800">+91 {partner.phone}</strong>.
              </div>
            )}
          </div>
        </div>

        {/* Referred Leads Table */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200/80 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-sm">Leads Attributed to {partner.couponCode}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every lead inquiry that applied this partner's 6-character referral code
              </p>
            </div>
            <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-700">
              {leads.length} Total
            </span>
          </div>

          {leads.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              No inquiries have utilized this referral coupon code yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200/80">
                  <tr>
                    <th className="py-3 px-5">Client Name</th>
                    <th className="py-3 px-5">Email & Phone</th>
                    <th className="py-3 px-5">Requested Service</th>
                    <th className="py-3 px-5">Lead Status</th>
                    <th className="py-3 px-5">Final Project Amount</th>
                    <th className="py-3 px-5">10% Commission</th>
                    <th className="py-3 px-5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {leads.map((lead: any, idx: number) => {
                    const commissionAmount = lead.calculatedCommission || Math.round((lead.finalProjectAmount || 0) * 0.1);
                    return (
                      <tr key={lead._id || idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-slate-900">{lead.fullName}</td>
                        <td className="py-3.5 px-5 text-slate-600">
                          <div>{lead.email}</div>
                          <div className="text-[11px] text-slate-400">{lead.phone}</div>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-[#087FF5]">{lead.service}</td>
                        <td className="py-3.5 px-5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              lead.status === 'Converted' || lead.status === 'Achieved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : lead.status === 'Contacted'
                                ? 'bg-blue-100 text-blue-800'
                                : lead.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {lead.status || 'NEW'}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 font-bold text-slate-900">
                          {lead.finalProjectAmount ? (
                            <span>₹{lead.finalProjectAmount.toLocaleString('en-IN')}</span>
                          ) : (
                            <span className="text-slate-400 font-normal">Pending Conversion</span>
                          )}
                        </td>
                        <td className="py-3.5 px-5 font-bold text-emerald-700">
                          {lead.status === 'Converted' || lead.status === 'Achieved' ? (
                            <span>₹{commissionAmount.toLocaleString('en-IN')}</span>
                          ) : (
                            <span className="text-slate-400 font-normal">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-5 text-slate-400 text-[11px]">
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
