'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Users,
  Sparkles,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  Tag,
  DollarSign,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Eye,
  FileText,
  Filter,
  UserCheck,
  CreditCard,
  Send,
  Loader2,
  Trash2,
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function AdminInfluencersPage() {
  const router = useRouter();
  const [data, setData] = useState<any>({
    stats: {
      totalApplications: 0,
      individualPartners: 0,
      influencerPartners: 0,
      pendingApplications: 0,
      approvedInfluencers: 0,
      activeCoupons: 0,
      totalReferredLeads: 0,
      convertedCustomers: 0,
      confirmedRevenue: 0,
      pendingCommissions: 0,
      paidCommissions: 0,
    },
    influencers: [],
    referredLeads: [],
    commissions: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'influencers' | 'commissions' | 'leads'>('influencers');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);

  // Deactivate Partner Confirmation Modal State
  const [deactivatePartnerModal, setDeactivatePartnerModal] = useState<any | null>(null);

  // Disburse Payout Modal State
  const [payoutModalComm, setPayoutModalComm] = useState<any | null>(null);
  const [payoutMethod, setPayoutMethod] = useState<'upi' | 'mobile_upi' | 'bank_transfer' | 'manual'>('upi');
  const [payoutRef, setPayoutRef] = useState('');
  const [payoutNotes, setPayoutNotes] = useState('');

  const fetchData = async () => {
    const token = localStorage.getItem('avm_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await res.json();
      if (resData.success) {
        setData(resData);
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to load referral partner records.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleCoupon = async (id: string) => {
    const token = localStorage.getItem('avm_admin_token');
    setActionLoading(`toggle_${id}`);
    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'toggle_coupon', id }),
      });
      const resData = await res.json();
      if (resData.success) {
        setNotification({ type: 'success', message: 'Coupon active status updated successfully.' });
        fetchData();
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to toggle coupon status.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleConfirmDeactivatePartner = async () => {
    if (!deactivatePartnerModal) return;
    const token = localStorage.getItem('avm_admin_token');
    setActionLoading(`deactivate_${deactivatePartnerModal._id}`);
    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'deactivate_partner',
          id: deactivatePartnerModal._id,
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        setNotification({ type: 'success', message: 'Partner deactivated and coupon code disabled.' });
        setDeactivatePartnerModal(null);
        fetchData();
      } else {
        setNotification({ type: 'error', message: resData.error || 'Failed to deactivate partner.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Error deactivating partner.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleResendWelcomeEmail = async (id: string) => {
    const token = localStorage.getItem('avm_admin_token');
    setActionLoading(`email_${id}`);
    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'resend_email', id }),
      });
      const resData = await res.json();
      if (resData.success) {
        setNotification({ type: 'success', message: 'Welcome email resent successfully!' });
        fetchData();
      } else {
        setNotification({ type: 'error', message: resData.error || 'Failed to resend welcome email.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to dispatch email.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRetryCommissionEmail = async (commissionId: string) => {
    const token = localStorage.getItem('avm_admin_token');
    setActionLoading(`comm_email_${commissionId}`);
    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'retry_commission_email', commissionId }),
      });
      const resData = await res.json();
      if (resData.success) {
        setNotification({ type: 'success', message: 'Commission conversion email sent successfully!' });
        fetchData();
      } else {
        setNotification({ type: 'error', message: resData.error || 'Failed to dispatch commission email.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error resending commission email.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleConfirmPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutModalComm) return;
    if (!payoutRef.trim()) {
      alert('Please enter a transaction reference or UTR number.');
      return;
    }

    const token = localStorage.getItem('avm_admin_token');
    setActionLoading(`payout_${payoutModalComm._id}`);

    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'record_commission_payout',
          commissionId: payoutModalComm._id,
          paymentReference: payoutRef.trim(),
          payoutMethod,
          adminNotes: payoutNotes.trim(),
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        setNotification({ type: 'success', message: 'Commission payout recorded successfully!' });
        setPayoutModalComm(null);
        setPayoutRef('');
        setPayoutNotes('');
        fetchData();
      } else {
        setNotification({ type: 'error', message: resData.error || 'Failed to record payout.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Error processing payout.' });
    } finally {
      setActionLoading(null);
    }
  };

  const filteredInfluencers = useMemo(() => {
    return (data.influencers || []).filter((inf: any) => {
      const matchesSearch =
        (inf.fullName && inf.fullName.toLowerCase().includes(search.toLowerCase())) ||
        (inf.couponCode && inf.couponCode.toLowerCase().includes(search.toLowerCase())) ||
        (inf.email && inf.email.toLowerCase().includes(search.toLowerCase())) ||
        (inf.influencerName && inf.influencerName.toLowerCase().includes(search.toLowerCase()));

      let matchesFilter = true;
      if (statusFilter === 'INDIVIDUAL') matchesFilter = inf.partnerType === 'individual';
      if (statusFilter === 'INFLUENCER') matchesFilter = inf.partnerType === 'influencer';
      if (statusFilter === 'ACTIVE_COUPON') matchesFilter = inf.couponActive && inf.status !== 'deactivated';
      if (statusFilter === 'INACTIVE_COUPON') matchesFilter = !inf.couponActive || inf.status === 'deactivated';
      if (statusFilter === 'EMAIL_FAILED') matchesFilter = inf.emailDeliveryStatus === 'failed';

      return matchesSearch && matchesFilter;
    });
  }, [data.influencers, search, statusFilter]);

  return (
    <AdminLayout
      title="Referral Program & Commission Hub"
      subtitle="Manage individual partners, influencers, 6-character coupons, verified payouts, and tracking"
    >
      <div className="space-y-6">
        {/* Notification Toast */}
        {notification && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-semibold shadow-xs ${
              notification.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* Real Metrics Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Partners</span>
              <Users className="w-4 h-4 text-[#087FF5]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {data.stats.totalApplications || 0}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-1">
              <span className="text-[#087FF5]">{data.stats.individualPartners || 0} Individual</span>
              <span>•</span>
              <span className="text-purple-600">{data.stats.influencerPartners || 0} Influencer</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active 6-Char Coupons</span>
              <Tag className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">
              {data.stats.activeCoupons || 0}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Unique database-indexed codes</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Referred Enquiries</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {data.stats.totalReferredLeads || 0}
            </div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">
              {data.stats.convertedCustomers || 0} Converted Projects
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Paid Commissions</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">
              ₹{(data.stats.paidCommissions || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Pending: ₹{(data.stats.pendingCommissions || 0).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('influencers')}
              className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'influencers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All Partners ({data.influencers?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('commissions')}
              className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'commissions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Commissions Hub ({data.commissions?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'leads' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Referred Leads ({data.referredLeads?.length || 0})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search partner, coupon, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087FF5]"
              />
            </div>

            {activeTab === 'influencers' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
              >
                <option value="ALL">All Partner Types</option>
                <option value="INDIVIDUAL">Individual Partners</option>
                <option value="INFLUENCER">Influencers</option>
                <option value="ACTIVE_COUPON">Active Coupons</option>
                <option value="INACTIVE_COUPON">Deactivated</option>
              </select>
            )}

            <button
              onClick={fetchData}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              title="Refresh Records"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* TAB 1: Referral Partners Table */}
        {activeTab === 'influencers' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Partner Details</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Coupon Code</th>
                    <th className="py-3.5 px-4">Coupon Status</th>
                    <th className="py-3.5 px-4">Referred Leads</th>
                    <th className="py-3.5 px-4">Commission Earned</th>
                    <th className="py-3.5 px-4">Payout Method</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredInfluencers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        No referral partners found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInfluencers.map((inf: any) => {
                      const isInf = inf.partnerType === 'influencer';
                      return (
                        <tr key={inf._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <Link
                              href={`/admin/referrals/${inf._id}`}
                              className="font-bold text-slate-900 hover:text-[#087FF5] transition-colors"
                            >
                              {inf.fullName}
                            </Link>
                            {isInf && inf.influencerName && (
                              <div className="text-[10px] text-purple-700 font-bold">{inf.influencerName}</div>
                            )}
                            <p className="text-[11px] text-slate-500">{inf.email}</p>
                            <p className="text-[10px] text-slate-400 font-mono">+91 {inf.phone}</p>
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                isInf
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : 'bg-blue-100 text-[#087FF5] border border-blue-200'
                              }`}
                            >
                              {isInf ? 'Influencer' : 'Individual'}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <Link
                              href={`/admin/referrals/${inf._id}`}
                              className="inline-block font-mono font-black text-xs bg-[#FFD600] hover:bg-yellow-400 px-2.5 py-1 rounded-md text-slate-950 transition-colors"
                            >
                              {inf.couponCode}
                            </Link>
                          </td>

                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleCoupon(inf._id)}
                              disabled={actionLoading === `toggle_${inf._id}`}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black cursor-pointer transition-colors ${
                                inf.couponActive && inf.status !== 'deactivated'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-800'
                                  : 'bg-slate-200 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800'
                              }`}
                              title="Click to toggle active/inactive"
                            >
                              {inf.couponActive && inf.status !== 'deactivated' ? 'Active' : 'Deactivated'}
                            </button>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900">{inf.totalLeads || 0}</span> inquiries
                            <div className="text-[10px] text-emerald-600 font-semibold">
                              {inf.convertedSales || 0} converted
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <p className="font-bold text-slate-900">
                              ₹{(inf.commissionEarned || 0).toLocaleString('en-IN')}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Pending: ₹{(inf.commissionPending || 0).toLocaleString('en-IN')}
                            </p>
                          </td>

                          <td className="py-3 px-4">
                            <span className="text-[11px] font-semibold text-slate-700">
                              {inf.paymentMethod === 'upi'
                                ? 'UPI'
                                : inf.paymentMethod === 'bank_transfer'
                                ? 'Bank'
                                : 'Manual UPI'}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/admin/referrals/${inf._id}`}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold cursor-pointer"
                              >
                                Profile
                              </Link>

                              <button
                                onClick={() => handleResendWelcomeEmail(inf._id)}
                                disabled={actionLoading === `email_${inf._id}`}
                                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                title="Resend 6-Char Coupon Welcome Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setDeactivatePartnerModal(inf)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Deactivate Partner & Disable Coupon"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Commission Management Hub */}
        {activeTab === 'commissions' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900">10% Referral Commission Records</h3>
                <p className="text-xs text-slate-500">
                  Calculated from confirmed qualifying project amounts upon lead conversion
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500">{data.commissions?.length || 0} Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Client & Partner</th>
                    <th className="py-3.5 px-4">Final Project Amount</th>
                    <th className="py-3.5 px-4">10% Commission</th>
                    <th className="py-3.5 px-4">Status & Takeover</th>
                    <th className="py-3.5 px-4">Client Payment</th>
                    <th className="py-3.5 px-4">Email Alert</th>
                    <th className="py-3.5 px-4 text-right">Payout Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.commissions?.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No commissions generated yet. When an inquiry is marked Converted, 10% commission will appear here.
                      </td>
                    </tr>
                  ) : (
                    data.commissions.map((comm: any) => (
                      <tr key={comm._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{comm.customerName}</p>
                          <Link
                            href={`/admin/referrals/${comm.influencerId || comm.couponCode}`}
                            className="font-mono text-[10px] text-amber-900 bg-[#FFD600] px-1.5 py-0.5 rounded font-black hover:opacity-80"
                          >
                            {comm.couponCode}
                          </Link>
                        </td>

                        <td className="py-3 px-4 font-bold text-slate-900">
                          ₹{(comm.finalProjectAmount || comm.packagePrice || 3999).toLocaleString('en-IN')}
                        </td>

                        <td className="py-3 px-4 font-black text-emerald-700 text-sm">
                          ₹{(comm.commissionAmount || 0).toLocaleString('en-IN')}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              comm.status === 'paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : comm.status === 'eligible'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {comm.status}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          {comm.customerPaymentConfirmed || comm.paymentReceived ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                              <Check className="w-3.5 h-3.5" /> Cleared
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium text-[11px]">Pending</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          {comm.notificationStatus === 'sent' ? (
                            <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Dispatched
                            </span>
                          ) : comm.notificationStatus === 'failed' ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-rose-600 font-bold text-[10px]">Failed</span>
                              <button
                                onClick={() => handleRetryCommissionEmail(comm._id)}
                                disabled={actionLoading === `comm_email_${comm._id}`}
                                className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded text-[10px] font-bold hover:bg-rose-100 cursor-pointer"
                              >
                                Retry
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Pending</span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          {comm.status === 'paid' ? (
                            <div className="text-right">
                              <span className="text-emerald-700 font-bold text-xs block">Paid</span>
                              {comm.paymentReference && (
                                <span className="text-[10px] text-slate-400 block font-mono">
                                  Ref: {comm.paymentReference}
                                </span>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setPayoutModalComm(comm);
                                setPayoutRef('');
                                setPayoutNotes('');
                              }}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                            >
                              Disburse Payout
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Referred Leads Table */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Coupon Code</th>
                    <th className="py-3.5 px-4">Final / Package Amount</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Submission Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.referredLeads?.map((lead: any) => (
                    <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {lead.fullName}
                        <p className="text-[11px] text-slate-400 font-normal">{lead.email}</p>
                      </td>
                      <td className="py-3 px-4 text-[#087FF5] font-semibold">{lead.service}</td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/referrals/${lead.influencerId || lead.couponCode}`}
                          className="font-mono font-bold text-[10px] bg-[#FFD600] px-2 py-0.5 rounded text-slate-950"
                        >
                          {lead.couponCode}
                        </Link>
                      </td>
                      <td className="py-3 px-4 font-bold">
                        ₹{(lead.finalProjectAmount || lead.packagePrice || 3999).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL 1: RECORD COMMISSION PAYOUT */}
        {payoutModalComm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-black text-slate-900">Record Commission Payout</h3>
                </div>
                <button
                  onClick={() => setPayoutModalComm(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleConfirmPayout} className="space-y-4 text-xs">
                {/* Summary Card */}
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Client Project:</span>
                    <strong className="text-slate-900">{payoutModalComm.customerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Coupon Attributed:</span>
                    <strong className="font-mono text-purple-700">{payoutModalComm.couponCode}</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-emerald-200 text-sm">
                    <span className="font-black text-emerald-950">Payout Amount:</span>
                    <strong className="font-black text-emerald-700 text-base">
                      ₹{(payoutModalComm.commissionAmount || 0).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Partner Payment Destination Notice */}
                {(() => {
                  const partner = data.influencers?.find(
                    (inf: any) =>
                      inf._id === payoutModalComm.influencerId ||
                      inf.couponCode === payoutModalComm.couponCode
                  );
                  if (partner) {
                    return (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">Partner Payment Destination:</span>
                          <span className="font-bold text-[#087FF5] uppercase">
                            {partner.paymentMethod === 'bank_transfer'
                              ? 'Bank Transfer'
                              : partner.paymentMethod === 'mobile_upi'
                              ? 'Mobile UPI'
                              : 'UPI ID'}
                          </span>
                        </div>
                        {partner.paymentMethod === 'upi' && (
                          <div className="font-mono font-bold text-slate-900">{partner.upiId || 'Not provided'}</div>
                        )}
                        {partner.paymentMethod === 'mobile_upi' && (
                          <div className="font-mono font-bold text-slate-900">+91 {partner.upiMobile || partner.phone}</div>
                        )}
                        {partner.paymentMethod === 'bank_transfer' && partner.bankDetails && (
                          <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-600">
                            <div>Bank: <strong className="text-slate-900">{partner.bankDetails.bankName}</strong></div>
                            <div>A/C: <strong className="text-slate-900 font-mono">{partner.bankDetails.accountNumber}</strong></div>
                            <div>IFSC: <strong className="text-slate-900 font-mono">{partner.bankDetails.ifscCode}</strong></div>
                            <div>Holder: <strong className="text-slate-900">{partner.bankDetails.accountHolderName}</strong></div>
                          </div>
                        )}
                        <p className="text-[10px] text-slate-400">
                          Transfer ₹{(payoutModalComm.commissionAmount || 0).toLocaleString('en-IN')} using your banking/UPI app, then record the transaction UTR below.
                        </p>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Payout Method *
                  </label>
                  <select
                    value={payoutMethod}
                    onChange={(e: any) => setPayoutMethod(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#087FF5]"
                  >
                    <option value="upi">UPI Transfer (VPA / QR)</option>
                    <option value="mobile_upi">Mobile UPI Linked Number</option>
                    <option value="bank_transfer">Bank Transfer (NEFT / IMPS / RTGS)</option>
                    <option value="manual">Manual Cash / Cheque</option>
                  </select>
                </div>

                {/* UTR / Transaction Reference */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Transaction Reference / UTR Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={payoutRef}
                    onChange={(e) => setPayoutRef(e.target.value)}
                    placeholder="e.g. UPI/492019401 or UTR192039120"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono text-slate-900 outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Admin Notes */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Admin Payout Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={payoutNotes}
                    onChange={(e) => setPayoutNotes(e.target.value)}
                    placeholder="Disbursement details or confirmation notes..."
                    className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setPayoutModalComm(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === `payout_${payoutModalComm._id}`}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>Confirm & Mark as Paid</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: CONFIRM DEACTIVATE PARTNER */}
        {deactivatePartnerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 text-slate-800">
              <div className="flex items-center gap-2 text-rose-600 border-b border-slate-100 pb-3">
                <Trash2 className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-black text-slate-900">Deactivate Referral Partner?</h3>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  Are you sure you want to deactivate{' '}
                  <strong className="text-slate-900">{deactivatePartnerModal.fullName}</strong> (Coupon:{' '}
                  <span className="font-mono font-bold text-purple-700">{deactivatePartnerModal.couponCode}</span>)?
                </p>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] space-y-1">
                  <p className="font-bold">Consequences of Deactivation:</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>The 6-character coupon code will be disabled for future website inquiries.</li>
                    <li>All existing customer referrals and historical attribution remain safely intact.</li>
                    <li>Previously recorded commissions will NOT be deleted or altered.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeactivatePartnerModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeactivatePartner}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Deactivate Partner
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
