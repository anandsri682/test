'use client';

import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function AdminLeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState(urlSearch);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const token = localStorage.getItem('avm_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

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
  }, [router]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const token = localStorage.getItem('avm_admin_token');
    setLeads((prev) =>
      prev.map((l) => (l._id === id || l.id === id ? { ...l, status: newStatus } : l))
    );

    try {
      await fetch(getApiUrl('/api/admin/leads'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (e) {}
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return;
    const token = localStorage.getItem('avm_admin_token');

    setLeads((prev) => prev.filter((l) => l._id !== id && l.id !== id));
    if (selectedLead && (selectedLead._id === id || selectedLead.id === id)) {
      setSelectedLead(null);
    }

    try {
      await fetch(getApiUrl(`/api/contact?id=${id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {}
  };

  // Generate customized WhatsApp Message based on requested service
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

  // Open Email Composition Modal
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

  // Send Email API Dispatch
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
        // Automatically mark status as Contacted
        handleStatusChange(emailModalLead._id || emailModalLead.id, 'Contacted');
      } else {
        setEmailAlert({
          type: 'error',
          text: data.error || 'Failed to send email. Check SMTP configuration in environment.',
        });
      }
    } catch (err) {
      setEmailAlert({ type: 'error', text: 'Network error sending client email.' });
    } finally {
      setSendingEmail(false);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Full Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Submitted At', 'Message'];
    const rows = leads.map((l) => [
      `"${l.fullName || l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.company || ''}"`,
      `"${l.service || ''}"`,
      `"${l.budget || ''}"`,
      `"${l.status || 'New'}"`,
      `"${l.createdAt ? new Date(l.createdAt).toLocaleString() : ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
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
      (l.service && l.service.toLowerCase().includes(search.toLowerCase()));

    const currentStatus = l.status || 'New';
    const matchesStatus = statusFilter === 'ALL' || currentStatus.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout
      title="Lead Submissions Management"
      subtitle="Filter, message via WhatsApp, send client emails, update statuses, and export leads"
    >
      <div className="space-y-6">
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
                placeholder="Search leads by name, email, phone, service..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40 focus:border-[#087FF5]"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-bold">
              {['ALL', 'NEW', 'CONTACTED', 'CONVERTED'].map((st) => (
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
                    <th className="py-3.5 px-5">Requested Service</th>
                    <th className="py-3.5 px-5">Budget Range</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Submitted Date</th>
                    <th className="py-3.5 px-5 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredLeads.map((lead, idx) => {
                    const leadId = lead._id || lead.id || idx;
                    const isNew = lead.status === 'New' || !lead.status;
                    return (
                      <tr key={leadId} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-5 font-bold text-slate-900">
                          {lead.fullName || lead.name || 'Client Contact'}
                          {lead.company && (
                            <div className="text-[11px] font-normal text-slate-400">{lead.company}</div>
                          )}
                        </td>
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
                        <td className="py-4 px-5">
                          <span className="inline-block bg-blue-50 text-[#087FF5] border border-blue-200/60 px-2.5 py-0.5 rounded-lg font-bold text-[11px]">
                            {lead.service || 'General Inquiry'}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-slate-600 font-semibold">
                          {lead.budget || 'Standard'}
                        </td>
                        <td className="py-4 px-5">
                          <select
                            value={lead.status || 'New'}
                            onChange={(e) => handleStatusChange(leadId, e.target.value)}
                            className={`text-[11px] font-black px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                              isNew
                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                : lead.status === 'Contacted'
                                ? 'bg-blue-50 text-blue-600 border-blue-200'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            }`}
                          >
                            <option value="New">NEW</option>
                            <option value="Contacted">CONTACTED</option>
                            <option value="Converted">CONVERTED</option>
                            <option value="Archived">ARCHIVED</option>
                          </select>
                        </td>
                        <td className="py-4 px-5 text-slate-500 text-[11px]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>
                              {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* WhatsApp Direct Action Button */}
                            {lead.phone && (
                              <button
                                onClick={() => handleOpenWhatsApp(lead)}
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-lg transition-colors border border-emerald-200 cursor-pointer"
                                title={`Send WhatsApp message regarding ${lead.service || 'inquiry'}`}
                              >
                                <MessageCircle className="w-4 h-4" />
                              </button>
                            )}

                            {/* Email Compose Action Button */}
                            {lead.email && (
                              <button
                                onClick={() => handleOpenEmailModal(lead)}
                                className="p-1.5 bg-blue-50 hover:bg-[#087FF5] text-[#087FF5] hover:text-white rounded-lg transition-colors border border-blue-200 cursor-pointer"
                                title="Compose Client Email"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                            )}

                            {/* Details Modal Trigger */}
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 bg-slate-100 hover:bg-slate-800 text-slate-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="View Full Brief"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteLead(leadId)}
                              className="p-1.5 bg-slate-100 hover:bg-rose-600 text-slate-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Delete Submission"
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

        {/* Email Composition & Preview Modal */}
        {emailModalLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#087FF5] flex items-center justify-center font-bold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Compose Client Email</h3>
                    <p className="text-[11px] text-slate-500">Send an official email to {emailModalLead.email}</p>
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
                  className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                    emailAlert.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-rose-50 border-rose-200 text-rose-700'
                  }`}
                >
                  {emailAlert.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  )}
                  <span>{emailAlert.text}</span>
                </div>
              )}

              <form onSubmit={handleSendEmailSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    To Recipient
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${emailModalLead.fullName || emailModalLead.name || 'Client'} <${emailModalLead.email}>`}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Email Subject
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
                    Message Body (Service-Tailored)
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
                      {sendingEmail ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>Send Client Email</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lead Details Modal */}
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
                  <span className="text-[10px] font-bold uppercase text-slate-400">Estimated Budget</span>
                  <p className="font-semibold text-slate-700">{selectedLead.budget || 'N/A'}</p>
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
