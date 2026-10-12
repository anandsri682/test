'use client';

import React, { useEffect, useState, useMemo } from 'react';
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
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function AdminInfluencersPage() {
  const router = useRouter();
  const [data, setData] = useState<any>({
    stats: {
      totalApplications: 0,
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
  const [activeTab, setActiveTab] = useState<'influencers' | 'leads' | 'commissions'>('influencers');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);

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
      setNotification({ type: 'error', message: 'Failed to load influencer records.' });
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
        setNotification({ type: 'success', message: 'Coupon status updated successfully.' });
        fetchData();
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to toggle coupon.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleResendEmail = async (id: string) => {
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
        setNotification({ type: 'success', message: 'Coupon information email dispatched via Resend!' });
        fetchData();
      } else {
        setNotification({ type: 'error', message: resData.error || 'Failed to dispatch email.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error retrying email.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateProjectStatus = async (leadId: string, projectStatus: string) => {
    const token = localStorage.getItem('avm_admin_token');
    setActionLoading(`proj_${leadId}`);
    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'update_project_takeover', leadId, projectStatus }),
      });
      const resData = await res.json();
      if (resData.success) {
        setNotification({ type: 'success', message: `Project status set to: ${projectStatus}` });
        fetchData();
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to update project status.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdatePaymentStatus = async (leadId: string, paymentStatus: string) => {
    const token = localStorage.getItem('avm_admin_token');
    setActionLoading(`pay_${leadId}`);
    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'update_payment_status', leadId, paymentStatus }),
      });
      const resData = await res.json();
      if (resData.success) {
        setNotification({ type: 'success', message: `Payment status set to: ${paymentStatus}` });
        fetchData();
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to update payment status.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRecordPayout = async (commissionId: string) => {
    const ref = prompt('Enter payment transaction reference (e.g. UPI/NEFT Ref #):');
    if (!ref) return;

    const token = localStorage.getItem('avm_admin_token');
    setActionLoading(`payout_${commissionId}`);
    try {
      const res = await fetch(getApiUrl('/api/admin/influencers'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'record_commission_payout',
          commissionId,
          paymentReference: ref,
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        setNotification({ type: 'success', message: 'Commission payout successfully recorded!' });
        fetchData();
      } else {
        alert(resData.error || 'Failed to record payout');
      }
    } catch {
      setNotification({ type: 'error', message: 'Error recording payout.' });
    } finally {
      setActionLoading(null);
    }
  };

  // Filter influencers
  const filteredInfluencers = useMemo(() => {
    return (data.influencers || []).filter((inf: any) => {
      const matchesSearch =
        search === '' ||
        inf.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        inf.email?.toLowerCase().includes(search.toLowerCase()) ||
        inf.couponCode?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE_COUPON' && inf.couponActive) ||
        (statusFilter === 'INACTIVE_COUPON' && !inf.couponActive) ||
        (statusFilter === 'EMAIL_FAILED' && inf.emailDeliveryStatus === 'failed');

      return matchesSearch && matchesStatus;
    });
  }, [data.influencers, search, statusFilter]);

  return (
    <AdminLayout
      title="Influencer Referral & Coupon Management"
      subtitle="Track partners, automated unique coupons, customer attribution, project takeover, and commissions"
    >
      <div className="space-y-6">
        
        {/* Notification Alert */}
        {notification && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold ${
              notification.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Calculated Database Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Partners</p>
            <p className="text-2xl font-black text-slate-900">{data.stats.totalApplications || 0}</p>
            <p className="text-[11px] text-slate-500 font-medium">All Registered</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Individual Partners</p>
            <p className="text-2xl font-black text-blue-600">{data.stats.individualPartners || 0}</p>
            <p className="text-[11px] text-slate-400 font-medium">Basic Contact Reg.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Influencers</p>
            <p className="text-2xl font-black text-purple-600">{data.stats.influencerPartners || 0}</p>
            <p className="text-[11px] text-purple-600 font-medium">Creators with Channels</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Active Coupons</p>
            <p className="text-2xl font-black text-amber-600">{data.stats.activeCoupons || 0}</p>
            <p className="text-[11px] text-slate-500 font-medium">6-Char Codes Live</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Referred Enquiries</p>
            <p className="text-2xl font-black text-[#087FF5]">{data.stats.totalReferredLeads || 0}</p>
            <p className="text-[11px] text-emerald-600 font-bold">{data.stats.convertedCustomers || 0} Converted</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Confirmed Revenue</p>
            <p className="text-2xl font-black text-emerald-600">₹{(data.stats.confirmedRevenue || 0).toLocaleString('en-IN')}</p>
            <p className="text-[11px] text-slate-500 font-medium">Paid Projects</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Pending Comm.</p>
            <p className="text-2xl font-black text-amber-500">₹{(data.stats.pendingCommissions || 0).toLocaleString('en-IN')}</p>
            <p className="text-[11px] text-slate-500 font-medium">Pending Takeover</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Paid Comm.</p>
            <p className="text-2xl font-black text-emerald-700">₹{(data.stats.paidCommissions || 0).toLocaleString('en-IN')}</p>
            <p className="text-[11px] text-slate-500 font-medium">Disbursed</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Email Delivery</p>
            <p className={`text-2xl font-black ${data.stats.failedEmails > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {data.stats.failedEmails > 0 ? `${data.stats.failedEmails} Failed` : '100% OK'}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">Via Resend</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Offer Package</p>
            <p className="text-2xl font-black text-slate-900">₹3,999</p>
            <p className="text-[11px] text-emerald-600 font-medium">₹1,000 Saved</p>
          </div>
        </div>

        {/* Tab Navigation & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('influencers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'influencers'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Influencers & Coupons ({data.influencers.length})
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Referred Enquiries ({data.referredLeads.length})
            </button>
            <button
              onClick={() => setActiveTab('commissions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'commissions'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Commission Tracking ({data.commissions.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, code, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#087FF5]"
              />
            </div>

            {activeTab === 'influencers' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE_COUPON">Active Coupon</option>
                <option value="INACTIVE_COUPON">Inactive Coupon</option>
                <option value="EMAIL_FAILED">Email Failed</option>
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

        {/* TAB 1: Influencers Table */}
        {activeTab === 'influencers' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Influencer</th>
                    <th className="py-3.5 px-4">Platform & Profile</th>
                    <th className="py-3.5 px-4">Coupon Code</th>
                    <th className="py-3.5 px-4">Coupon Status</th>
                    <th className="py-3.5 px-4">Referred Leads</th>
                    <th className="py-3.5 px-4">Email Status</th>
                    <th className="py-3.5 px-4">Commission</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredInfluencers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        No influencers found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInfluencers.map((inf: any) => (
                      <tr key={inf._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{inf.fullName}</p>
                          <p className="text-[11px] text-slate-500">{inf.email}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{inf.phone}</p>
                        </td>

                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                            {inf.platform}
                          </span>
                          <a
                            href={inf.socialProfileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#087FF5] hover:underline text-[11px] flex items-center gap-1 mt-1 truncate max-w-[140px]"
                          >
                            <span>Profile Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono font-black text-xs bg-[#FFD600] px-2.5 py-1 rounded-md text-slate-950">
                            {inf.couponCode}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleCoupon(inf._id)}
                            disabled={actionLoading === `toggle_${inf._id}`}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black cursor-pointer transition-colors ${
                              inf.couponActive
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-800'
                                : 'bg-slate-200 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800'
                            }`}
                            title="Click to toggle active/inactive"
                          >
                            {inf.couponActive ? 'Active' : 'Deactivated'}
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900">{inf.totalLeads || 0}</span> enquiries
                          <div className="text-[10px] text-emerald-600 font-semibold">{inf.convertedSales || 0} converted</div>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              inf.emailDeliveryStatus === 'sent'
                                ? 'bg-emerald-50 text-emerald-700'
                                : inf.emailDeliveryStatus === 'failed'
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {inf.emailDeliveryStatus}
                          </span>
                          {inf.emailDeliveryStatus === 'failed' && (
                            <button
                              onClick={() => handleResendEmail(inf._id)}
                              disabled={actionLoading === `email_${inf._id}`}
                              className="block text-[10px] text-blue-600 hover:underline font-bold mt-1 cursor-pointer"
                            >
                              Retry Send
                            </button>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">₹{inf.commissionEarned || 0}</p>
                          <p className="text-[10px] text-slate-400">Pending: ₹{inf.commissionPending || 0}</p>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedInfluencer(inf)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleResendEmail(inf._id)}
                              disabled={actionLoading === `email_${inf._id}`}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Resend Coupon Code Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Referred Leads Table */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Coupon Used</th>
                    <th className="py-3.5 px-4">Quoted Offer</th>
                    <th className="py-3.5 px-4">Project Takeover Status</th>
                    <th className="py-3.5 px-4">Payment Status</th>
                    <th className="py-3.5 px-4">Submission Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.referredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No coupon-referred enquiries recorded yet.
                      </td>
                    </tr>
                  ) : (
                    data.referredLeads.map((lead: any) => (
                      <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{lead.fullName}</p>
                          <p className="text-[11px] text-slate-500">{lead.email}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{lead.phone}</p>
                        </td>

                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {lead.service || 'Web Development'}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                            {lead.couponCode}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-bold text-emerald-700">
                          ₹{lead.packagePrice || 3999}
                          <span className="block text-[10px] text-slate-400 font-normal">Discount: ₹{lead.discountAmount || 1000}</span>
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={lead.projectStatus || 'Enquiry'}
                            onChange={(e) => handleUpdateProjectStatus(lead._id, e.target.value)}
                            disabled={actionLoading === `proj_${lead._id}`}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
                          >
                            <option value="Enquiry">Enquiry Only</option>
                            <option value="Project_Accepted">Project Accepted</option>
                            <option value="In_Progress">In Progress (Taken Over)</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={lead.paymentStatus || 'Unpaid'}
                            onChange={(e) => handleUpdatePaymentStatus(lead._id, e.target.value)}
                            disabled={actionLoading === `pay_${lead._id}`}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
                          >
                            <option value="Unpaid">Unpaid</option>
                            <option value="Partial">Partial Payment</option>
                            <option value="Paid">Paid in Full</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Commission Tracking */}
        {activeTab === 'commissions' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Customer & Coupon</th>
                    <th className="py-3.5 px-4">Package Price</th>
                    <th className="py-3.5 px-4">Commission Amount</th>
                    <th className="py-3.5 px-4">Takeover Status</th>
                    <th className="py-3.5 px-4">Payment Cleared</th>
                    <th className="py-3.5 px-4">Eligibility</th>
                    <th className="py-3.5 px-4 text-right">Payout Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.commissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No commission entries yet.
                      </td>
                    </tr>
                  ) : (
                    data.commissions.map((comm: any) => (
                      <tr key={comm._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{comm.customerName}</p>
                          <span className="font-mono text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-bold">
                            {comm.couponCode}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-semibold">
                          ₹{comm.packagePrice || 3999}
                        </td>

                        <td className="py-3 px-4 font-black text-slate-900">
                          ₹{comm.commissionAmount || 500}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              comm.projectTakeoverStatus === 'in_progress' || comm.projectTakeoverStatus === 'completed'
                                ? 'bg-emerald-50 text-emerald-800'
                                : comm.projectTakeoverStatus === 'accepted'
                                ? 'bg-blue-50 text-blue-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {comm.projectTakeoverStatus}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          {comm.paymentReceived ? (
                            <span className="text-emerald-600 font-bold flex items-center gap-1">
                              <Check className="w-3 h-3" /> Cleared
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium">Pending</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              comm.status === 'paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : comm.status === 'eligible'
                                ? 'bg-amber-100 text-amber-800 animate-pulse'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {comm.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          {comm.status === 'paid' ? (
                            <span className="text-emerald-700 font-bold text-[11px]">
                              Paid ({comm.paymentReference || 'Cleared'})
                            </span>
                          ) : comm.status === 'eligible' ? (
                            <button
                              onClick={() => handleRecordPayout(comm._id)}
                              disabled={actionLoading === `payout_${comm._id}`}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-xs cursor-pointer"
                            >
                              Disburse Payout
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400">
                              Requires Takeover & Payment
                            </span>
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

        {/* Modal: View Influencer Application Details */}
        {selectedInfluencer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              <div className="px-6 py-4 bg-[#0B0B0B] text-white flex items-center justify-between border-b-2 border-[#FFD600]">
                <h3 className="font-extrabold text-base">Influencer Application Details</h3>
                <button onClick={() => setSelectedInfluencer(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Name</span>
                    <span className="font-bold text-slate-900">{selectedInfluencer.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Coupon Code</span>
                    <span className="font-mono font-black text-amber-700">{selectedInfluencer.couponCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Email</span>
                    <span>{selectedInfluencer.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Phone</span>
                    <span>{selectedInfluencer.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Platform</span>
                    <span>{selectedInfluencer.platform}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Audience Size</span>
                    <span>{selectedInfluencer.followerCount || 'N/A'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Profile URL</span>
                  <a
                    href={selectedInfluencer.socialProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#087FF5] hover:underline break-all"
                  >
                    {selectedInfluencer.socialProfileUrl}
                  </a>
                </div>

                {selectedInfluencer.message && (
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Application Message</span>
                    <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
                      {selectedInfluencer.message}
                    </p>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedInfluencer(null)}
                    className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
