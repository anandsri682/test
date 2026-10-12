'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Download,
  Search,
  Eye,
  X,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Users,
  Tag,
  DollarSign,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

function AdminLeadsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState(urlSearch);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Status Action Feedback Alert
  const [statusAlert, setStatusAlert] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Status Change Confirmation Modal State
  const [statusChangeModal, setStatusChangeModal] = useState<{ lead: any; newStatus: string } | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Conversion & 10% Commission Confirmation Modal State
  const [conversionModalLead, setConversionModalLead] = useState<any | null>(null);
  const [finalProjectAmountInput, setFinalProjectAmountInput] = useState<string>('3999');
  const [customerPaymentConfirmed, setCustomerPaymentConfirmed] = useState<boolean>(true);
  const [projectTakeoverConfirmed, setProjectTakeoverConfirmed] = useState<boolean>(true);
  const [conversionNotes, setConversionNotes] = useState<string>('');

  // Delete Lead Confirmation Modal State
  const [deleteModalLead, setDeleteModalLead] = useState<any | null>(null);
  const [deletingLead, setDeletingLead] = useState(false);

  // Email Modal State
  const [emailModalLead, setEmailModalLead] = useState<any | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailAlert, setEmailAlert] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (urlSearch) {
      setSearch(urlSearch);
    }
  }, [urlSearch]);

  const fetchLeads = () => {
    const token = localStorage.getItem('avm_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    setLoading(true);
    fetch(getApiUrl('/api/contact'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.leads) {
          setLeads(data.leads);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeads();
  }, [router]);

  // Handle Dropdown Change — opens respective confirmation modal
  const handleDropdownSelect = (lead: any, newStatus: string) => {
    const currentStatus = lead.status || 'New';
    if (currentStatus === newStatus) return;

    if (newStatus === 'Converted') {
      setConversionModalLead(lead);
      const defaultAmount = lead.finalProjectAmount || lead.packagePrice || 3999;
      setFinalProjectAmountInput(String(defaultAmount));
      setCustomerPaymentConfirmed(true);
      setProjectTakeoverConfirmed(true);
      setConversionNotes('');
    } else {
      setStatusChangeModal({ lead, newStatus });
    }
  };

  // Confirm Regular Status Transition
  const handleConfirmStatusChange = async () => {
    if (!statusChangeModal) return;
    const { lead, newStatus } = statusChangeModal;
    const leadId = lead._id || lead.id;
    const token = localStorage.getItem('avm_admin_token');

    setUpdatingStatus(true);
    setStatusAlert(null);

    try {
      const res = await fetch(getApiUrl('/api/admin/leads'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: leadId,
          status: newStatus,
          expectedCurrentStatus: lead.status || 'New',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId || l.id === leadId ? { ...l, status: newStatus } : l))
        );
        setStatusAlert({
          type: 'success',
          text: `Status for ${lead.fullName} updated to ${newStatus} successfully!`,
        });
        setStatusChangeModal(null);
      } else {
        setStatusAlert({
          type: 'error',
          text: data.error || 'Failed to update status',
        });
        if (res.status === 409) {
          fetchLeads();
        }
      }
    } catch {
      setStatusAlert({ type: 'error', text: 'Network error updating lead status.' });
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Confirm Conversion with Final Project Amount and 10% Commission Calculation
  const handleConfirmConversion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conversionModalLead) return;

    const leadId = conversionModalLead._id || conversionModalLead.id;
    const numericAmount = Number(finalProjectAmountInput);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid positive project amount in INR.');
      return;
    }

    const token = localStorage.getItem('avm_admin_token');
    setUpdatingStatus(true);
    setStatusAlert(null);

    try {
      const res = await fetch(getApiUrl('/api/admin/leads'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: leadId,
          status: 'Converted',
          expectedCurrentStatus: conversionModalLead.status || 'New',
          finalProjectAmount: numericAmount,
          customerPaymentConfirmed,
          projectTakeoverConfirmed,
          conversionNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) =>
            l._id === leadId || l.id === leadId
              ? {
                  ...l,
                  status: 'Converted',
                  finalProjectAmount: numericAmount,
                  calculatedCommission: Math.round(numericAmount * 0.1),
                }
              : l
          )
        );
        setStatusAlert({
          type: 'success',
          text: `Conversion confirmed for ${conversionModalLead.fullName}! ₹${numericAmount.toLocaleString('en-IN')} recorded with 10% commission.`,
        });
        setConversionModalLead(null);
      } else {
        setStatusAlert({
          type: 'error',
          text: data.error || 'Failed to confirm conversion.',
        });
        if (res.status === 409) {
          fetchLeads();
        }
      }
    } catch {
      setStatusAlert({ type: 'error', text: 'Network error confirming conversion.' });
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Confirm Lead Deletion (Soft-Delete)
  const handleConfirmDelete = async () => {
    if (!deleteModalLead) return;
    const id = deleteModalLead._id || deleteModalLead.id;
    const token = localStorage.getItem('avm_admin_token');

    setDeletingLead(true);
    try {
      const res = await fetch(getApiUrl(`/api/contact?id=${id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id && l.id !== id));
        if (selectedLead && (selectedLead._id === id || selectedLead.id === id)) {
          setSelectedLead(null);
        }
        setStatusAlert({ type: 'success', text: 'Lead archived and removed from active view.' });
        setDeleteModalLead(null);
      } else {
        setStatusAlert({ type: 'error', text: data.error || 'Failed to delete lead.' });
      }
    } catch {
      setStatusAlert({ type: 'error', text: 'Network error deleting lead.' });
    } finally {
      setDeletingLead(false);
    }
  };

  // Generate customized WhatsApp Message
  const getWhatsAppMessage = (lead: any) => {
    const name = lead.fullName || lead.name || 'there';
    const service = (lead.service || 'our services').toLowerCase();

    if (service.includes('web') || service.includes('website')) {
      return `Hello ${name}! 👋 Thank you for reaching out to AVM Smart Solutions regarding Website Development. We received your inquiry for a custom website design package. When would be a convenient time for a brief discussion?`;
    } else if (service.includes('digital') || service.includes('marketing') || service.includes('seo')) {
      return `Hello ${name}! 👋 Thank you for contacting AVM Smart Solutions regarding Digital Marketing & SEO Services. We'd love to assist you in growing your brand's online reach and leads. Are you free for a quick chat?`;
    } else if (service.includes('app') || service.includes('mobile')) {
      return `Hello ${name}! 👋 Thank you for inquiring about Mobile App Development with AVM Smart Solutions. We're excited to help bring your app project to life. Let us know when you'd like to talk!`;
    } else if (service.includes('logo') || service.includes('branding') || service.includes('design')) {
      return `Hello ${name}! 👋 Thank you for contacting AVM Smart Solutions for Brand Design & Logo Services. We have great creative options for your brand identity. Let us know a good time to connect!`;
    }

    return `Hello ${name}! 👋 Thank you for contacting AVM Smart Solutions regarding ${lead.service || 'our services'}. We received your message and are ready to assist you. How can we help you today?`;
  };

  const handleOpenWhatsApp = (lead: any) => {
    const rawPhone = lead.phone || '';
    const cleanPhone = rawPhone.replace(/\D/g, '');
    let formattedPhone = cleanPhone;

    if (cleanPhone.length === 10) {
      formattedPhone = `91${cleanPhone}`;
    }

    if (!formattedPhone) {
      alert('No valid phone number found for this lead.');
      return;
    }

    const message = getWhatsAppMessage(lead);
    const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleOpenEmailModal = (lead: any) => {
    const name = lead.fullName || lead.name || 'Valued Client';
    const service = lead.service || 'Digital Solutions';

    setEmailModalLead(lead);
    setEmailAlert(null);
    setEmailSubject(`AVM Smart Solutions — Information regarding your ${service} inquiry`);
    setEmailBody(
      `Hello ${name},\n\nThank you for reaching out to AVM Smart Solutions regarding ${service}.\n\nWe have reviewed your request and would love to schedule a brief consultation to discuss your project requirements in detail and provide you with a tailored quote.\n\nPlease let us know your preferred time for a quick call, or reply directly to this email with any details.\n\nLooking forward to working with you!`
    );
  };

  const handleSendEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailModalLead || !emailModalLead.email) return;

    setSendingEmail(true);
    setEmailAlert(null);

    const token = localStorage.getItem('avm_admin_token');

    try {
      const res = await fetch(getApiUrl('/api/admin/send-email'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipientEmail: emailModalLead.email,
          recipientName: emailModalLead.fullName || emailModalLead.name || 'Valued Client',
          subject: emailSubject,
          body: emailBody,
          service: emailModalLead.service,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEmailAlert({ type: 'success', text: 'Email delivered successfully to client!' });
      } else {
        setEmailAlert({
          type: 'error',
          text: data.error || 'Failed to send email. Check SMTP configuration in environment.',
        });
      }
    } catch {
      setEmailAlert({ type: 'error', text: 'Network error sending client email.' });
    } finally {
      setSendingEmail(false);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'Company',
      'Service',
      'Coupon Code',
      'Referral Owner',
      'Status',
      'Final Project Amount',
      '10% Commission',
      'Submitted At',
      'Message',
    ];
    const rows = leads.map((l) => [
      `"${l.fullName || l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.company || ''}"`,
      `"${l.service || ''}"`,
      `"${l.couponCode || ''}"`,
      `"${l.referrerDisplayName || ''}"`,
      `"${l.status || 'New'}"`,
      `"${l.finalProjectAmount || l.packagePrice || ''}"`,
      `"${l.calculatedCommission || ''}"`,
      `"${l.createdAt ? new Date(l.createdAt).toLocaleString() : ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AVM_Smart_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      (l.fullName && l.fullName.toLowerCase().includes(search.toLowerCase())) ||
      (l.name && l.name.toLowerCase().includes(search.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(search.toLowerCase())) ||
      (l.phone && l.phone.toLowerCase().includes(search.toLowerCase())) ||
      (l.service && l.service.toLowerCase().includes(search.toLowerCase())) ||
      (l.couponCode && l.couponCode.toLowerCase().includes(search.toLowerCase()));

    const currentStatus = l.status || 'New';
    const matchesStatus =
      statusFilter === 'ALL' || currentStatus.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const calculatedCommissionPreview = Math.round((Number(finalProjectAmountInput) || 0) * 0.1);

  return (
    <AdminLayout
      title="Lead Submissions & Referral Attributions"
      subtitle="Track inquiries, manage verified conversions, calculate 10% partner commissions, and message clients"
    >
      <div className="space-y-6">
        {/* Status Alert Banner */}
        {statusAlert && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-semibold shadow-xs ${
              statusAlert.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {statusAlert.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{statusAlert.text}</span>
            </div>
            <button
              onClick={() => setStatusAlert(null)}
              className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* Top Control Action Bar */}
        <div className="bg-white p-4 sm:p-5 border border-slate-200/80 rounded-2xl shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by client name, email, phone, coupon code..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40 focus:border-[#087FF5]"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-bold">
              {['ALL', 'NEW', 'CONTACTED', 'CONVERTED', 'ACHIEVED', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-[#0B2A5B] hover:bg-[#087FF5] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#67D63B]" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Lead Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400 font-medium">Loading lead database...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Users className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No Lead Submissions Found</p>
              <p className="text-xs text-slate-400">Try adjusting your search query or status filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200/80">
                  <tr>
                    <th className="py-3.5 px-5">Contact Name</th>
                    <th className="py-3.5 px-5">Email & Phone</th>
                    <th className="py-3.5 px-5">Service & Referral</th>
                    <th className="py-3.5 px-5">Final / Package Amount</th>
                    <th className="py-3.5 px-5">Lead Status</th>
                    <th className="py-3.5 px-5">Submitted Date</th>
                    <th className="py-3.5 px-5 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredLeads.map((lead, idx) => {
                    const leadId = lead._id || lead.id || idx;
                    const status = lead.status || 'New';
                    const isConverted = status === 'Converted';
                    const isAchieved = status === 'Achieved';

                    return (
                      <tr key={leadId} className="hover:bg-slate-50/80 transition-colors">
                        {/* Name */}
                        <td className="py-4 px-5 font-bold text-slate-900">
                          {lead.fullName || lead.name || 'Client Contact'}
                          {lead.company && (
                            <div className="text-[11px] font-normal text-slate-400">{lead.company}</div>
                          )}
                        </td>

                        {/* Email & Phone */}
                        <td className="py-4 px-5 text-slate-600 space-y-1">
                          {lead.email && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="text-slate-800">{lead.email}</span>
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </td>

                        {/* Service & Clickable Coupon Code */}
                        <td className="py-4 px-5">
                          <span className="inline-block bg-blue-50 text-[#087FF5] border border-blue-200/60 px-2.5 py-0.5 rounded-lg font-bold text-[11px]">
                            {lead.service || 'General Inquiry'}
                          </span>

                          {lead.couponCode && (
                            <div className="mt-1 flex items-center gap-1.5">
                              <Link
                                href={`/admin/referrals/${lead.influencerId || lead.couponCode}`}
                                className="inline-flex items-center gap-1 font-mono font-bold text-[10px] bg-[#FFD600] hover:bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                                title={`View referral partner profile for ${lead.couponCode}`}
                              >
                                <Tag className="w-2.5 h-2.5" />
                                <span>{lead.couponCode}</span>
                              </Link>
                              {lead.referrerDisplayName && (
                                <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                                  {lead.referrerDisplayName}
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Financial Amounts */}
                        <td className="py-4 px-5 text-slate-700 font-semibold">
                          {lead.finalProjectAmount ? (
                            <div>
                              <span className="text-slate-900 font-extrabold">
                                ₹{lead.finalProjectAmount.toLocaleString('en-IN')}
                              </span>
                              <span className="block text-[10px] text-emerald-700 font-bold">
                                10% Comm: ₹{Math.round(lead.finalProjectAmount * 0.1).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ) : lead.packagePrice ? (
                            <div>
                              <span className="text-slate-700 font-bold">₹{lead.packagePrice}</span>
                              <span className="block text-[10px] text-slate-400">Regular Enquiry</span>
                            </div>
                          ) : (
                            <span className="text-slate-400">{lead.budget || 'Standard'}</span>
                          )}
                        </td>

                        {/* Status Select with Irreversible Protection */}
                        <td className="py-4 px-5">
                          <select
                            value={status}
                            onChange={(e) => handleDropdownSelect(lead, e.target.value)}
                            className={`text-[11px] font-black px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                              status === 'New'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : status === 'Contacted'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : status === 'Converted'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : status === 'Achieved'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : status === 'Cancelled'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="New" disabled={isConverted || isAchieved}>
                              NEW {isConverted || isAchieved ? '(Locked)' : ''}
                            </option>
                            <option value="Contacted" disabled={isConverted || isAchieved}>
                              CONTACTED {isConverted || isAchieved ? '(Locked)' : ''}
                            </option>
                            <option value="Converted" disabled={isAchieved}>
                              CONVERTED {isAchieved ? '(Locked)' : ''}
                            </option>
                            <option value="Achieved">ACHIEVED</option>
                            <option value="Cancelled" disabled={isAchieved}>
                              CANCELLED
                            </option>
                            <option value="Archived">ARCHIVED</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-5 text-slate-500 text-[11px]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>
                              {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {lead.phone && (
                              <button
                                onClick={() => handleOpenWhatsApp(lead)}
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-lg transition-colors border border-emerald-200 cursor-pointer"
                                title="Send WhatsApp Message"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </button>
                            )}

                            {lead.email && (
                              <button
                                onClick={() => handleOpenEmailModal(lead)}
                                className="p-1.5 bg-blue-50 hover:bg-[#087FF5] text-[#087FF5] hover:text-white rounded-lg transition-colors border border-blue-200 cursor-pointer"
                                title="Compose Email"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 bg-slate-100 hover:bg-slate-800 text-slate-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="View Brief"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setDeleteModalLead(lead)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-600 text-rose-500 hover:text-white rounded-lg transition-colors border border-rose-200 cursor-pointer"
                              title="Delete / Archive Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 1. DEDICATED CONVERSION & 10% COMMISSION CONFIRMATION MODAL */}
        {conversionModalLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Confirm Project Conversion</h3>
                    <p className="text-[11px] text-slate-500">Record final project amount & calculate 10% commission</p>
                  </div>
                </div>
                <button
                  onClick={() => setConversionModalLead(null)}
                  disabled={updatingStatus}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleConfirmConversion} className="space-y-4">
                {/* Lead & Partner Meta Info */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Client Name:</span>
                    <strong className="text-slate-900">{conversionModalLead.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Requested Service:</span>
                    <strong className="text-[#087FF5]">{conversionModalLead.service}</strong>
                  </div>
                  {conversionModalLead.couponCode && (
                    <div className="flex justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-500">Referral Partner:</span>
                      <strong className="text-purple-700">
                        {conversionModalLead.referrerDisplayName || conversionModalLead.couponCode} ({conversionModalLead.couponCode})
                      </strong>
                    </div>
                  )}
                </div>

                {/* Final Project Amount Input */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                    Final Qualifying Project Amount (₹ INR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      required
                      min="1"
                      step="1"
                      value={finalProjectAmountInput}
                      onChange={(e) => setFinalProjectAmountInput(e.target.value)}
                      placeholder="e.g. 10000"
                      className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter the actual qualifying contract amount agreed upon with the client.
                  </p>
                </div>

                {/* Real-time Calculation Preview Card */}
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-800 font-semibold">Final Project Amount:</span>
                    <strong className="text-slate-900 text-sm">
                      ₹{(Number(finalProjectAmountInput) || 0).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-800 font-semibold">Agreed Commission Rate:</span>
                    <strong className="text-emerald-800 font-black">10%</strong>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-emerald-200 text-sm">
                    <span className="text-emerald-950 font-black">Calculated Partner Commission:</span>
                    <strong className="text-emerald-700 font-black text-base">
                      ₹{calculatedCommissionPreview.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Milestone Verification Checkboxes */}
                <div className="space-y-2 text-xs pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerPaymentConfirmed}
                      onChange={(e) => setCustomerPaymentConfirmed(e.target.checked)}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-slate-700 font-medium">
                      Agreed customer payment / advance verified by billing team
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectTakeoverConfirmed}
                      onChange={(e) => setProjectTakeoverConfirmed(e.target.checked)}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-slate-700 font-medium">
                      Official project takeover / kickoff confirmed by engineering team
                    </span>
                  </label>
                </div>

                {/* Internal Notes */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Internal Conversion Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={conversionNotes}
                    onChange={(e) => setConversionNotes(e.target.value)}
                    placeholder="Milestone notes or scope details..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#087FF5]"
                  />
                </div>

                {/* Irreversible Notice */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed">
                  <strong>Important Notice:</strong> Once confirmed as <strong>Converted</strong>, this lead cannot be reverted to New or Contacted. An auditable 10% commission record will be saved and an email alert dispatched to the partner.
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setConversionModalLead(null)}
                    disabled={updatingStatus}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updatingStatus}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {updatingStatus ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    <span>Confirm Project Conversion</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 2. STANDARD STATUS CHANGE CONFIRMATION DIALOG */}
        {statusChangeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900">Confirm Status Change</h3>
                <button
                  onClick={() => setStatusChangeModal(null)}
                  disabled={updatingStatus}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  Are you sure you want to update the status for lead{' '}
                  <strong className="text-slate-900">{statusChangeModal.lead.fullName}</strong>?
                </p>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Status:</span>
                    <strong className="text-slate-700">{statusChangeModal.lead.status || 'New'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">New Status:</span>
                    <strong className="text-[#087FF5]">{statusChangeModal.newStatus}</strong>
                  </div>
                </div>

                {statusChangeModal.newStatus === 'Achieved' && (
                  <p className="text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-[11px]">
                    <strong>Note:</strong> Marking as Achieved represents project delivery and cannot be reverted to earlier stages.
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setStatusChangeModal(null)}
                  disabled={updatingStatus}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmStatusChange}
                  disabled={updatingStatus}
                  className="px-5 py-2 bg-[#0B2A5B] hover:bg-[#087FF5] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {updatingStatus ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Confirm Change</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. DELETE LEAD CONFIRMATION DIALOG */}
        {deleteModalLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 text-slate-800">
              <div className="flex items-center gap-2.5 text-rose-600 border-b border-slate-100 pb-3">
                <Trash2 className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-black text-slate-900">Delete this lead?</h3>
              </div>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p>
                  Are you sure you want to delete the lead submission for{' '}
                  <strong className="text-slate-900">{deleteModalLead.fullName}</strong>?
                </p>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-[11px]">
                  This action will archive the contact and remove it from active view. All associated commission records and historical referral attribution will remain safely preserved.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteModalLead(null)}
                  disabled={deletingLead}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deletingLead}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {deletingLead ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Delete Lead</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. EMAIL CLIENT MODAL */}
        {emailModalLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#087FF5] flex items-center justify-center font-bold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Direct Email to Client</h3>
                    <p className="text-[11px] text-slate-500">Send an official follow-up to this inquiry</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailModalLead(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {emailAlert && (
                <div
                  className={`p-3 rounded-xl border text-xs font-semibold ${
                    emailAlert.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  {emailAlert.text}
                </div>
              )}

              <form onSubmit={handleSendEmailSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Client Email Recipient
                  </label>
                  <input
                    type="email"
                    disabled
                    value={emailModalLead.email}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-semibold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Message Body
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${emailModalLead.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors border border-slate-200"
                  >
                    Open Mail App
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEmailModalLead(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={sendingEmail}
                      className="px-5 py-2 bg-[#087FF5] hover:bg-[#066FD6] text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {sendingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span>Send Client Email</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 5. LEAD DETAILS MODAL */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#087FF5] flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Lead Submission Brief</h3>
                    <p className="text-[11px] text-slate-500">Detailed contact form inquiry details</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Full Name</span>
                  <p className="font-bold text-slate-900">{selectedLead.fullName || selectedLead.name || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Company</span>
                  <p className="font-semibold text-slate-700">{selectedLead.company || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Email Address</span>
                  <p className="font-semibold text-[#087FF5]">{selectedLead.email || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Phone Number</span>
                  <p className="font-semibold text-slate-800">{selectedLead.phone || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Requested Service</span>
                  <p className="font-bold text-[#087FF5]">{selectedLead.service || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Referral Attribution</span>
                  {selectedLead.couponCode ? (
                    <Link
                      href={`/admin/referrals/${selectedLead.influencerId || selectedLead.couponCode}`}
                      className="font-bold text-purple-700 hover:underline block"
                    >
                      {selectedLead.couponCode}
                    </Link>
                  ) : (
                    <p className="text-slate-400">None</p>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Inquiry Message</span>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs leading-relaxed text-slate-700">
                  {selectedLead.message || 'No additional text message specified.'}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {selectedLead.phone && (
                    <button
                      onClick={() => handleOpenWhatsApp(selectedLead)}
                      className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white font-bold text-xs rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                  )}
                  {selectedLead.email && (
                    <button
                      onClick={() => {
                        setSelectedLead(null);
                        handleOpenEmailModal(selectedLead);
                      }}
                      className="px-3.5 py-2 bg-blue-50 hover:bg-[#087FF5] text-[#087FF5] hover:text-white font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Client</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Close Brief
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function AdminLeadsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400 font-medium">Loading Lead Management...</div>}>
      <AdminLeadsContent />
    </Suspense>
  );
}
