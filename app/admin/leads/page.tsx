'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Search, Eye, X, Trash2 } from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

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
      .catch(() => {});
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

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Full Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Submitted At', 'Message'];
    const rows = leads.map((l) => [
      `"${l.fullName || ''}"`,
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

  const filteredLeads = leads.filter(
    (l) =>
      (l.fullName && l.fullName.toLowerCase().includes(search.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(search.toLowerCase())) ||
      (l.service && l.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Lead Inquiries Management</h1>
            <p className="text-xs text-slate-400">View and update client lead statuses</p>
          </div>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-blue-primary hover:bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="max-w-7xl mx-auto flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads by name, email, or service..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-hidden"
        />
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email & Phone</th>
                <th className="p-4">Service Required</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                    No contact form leads found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, idx) => (
                  <tr key={lead._id || lead.id || idx} className="hover:bg-slate-850 transition-colors">
                    <td className="p-4 font-bold text-white">{lead.fullName}</td>
                    <td className="p-4">
                      <div>{lead.email}</div>
                      <div className="text-slate-400 text-[11px]">{lead.phone || 'N/A'}</div>
                    </td>
                    <td className="p-4 font-medium text-blue-400">{lead.service}</td>
                    <td className="p-4">{lead.budget || 'N/A'}</td>
                    <td className="p-4">
                      <select
                        value={lead.status || 'New'}
                        onChange={(e) => handleStatusChange(lead._id || lead.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2 py-1 outline-hidden"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-400">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 bg-slate-800 hover:bg-blue-primary text-slate-300 hover:text-white rounded-lg transition-colors"
                          title="View Full Brief"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id || lead.id)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                          title="Delete Contact Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold">Lead Details & Message Brief</h3>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <p><strong className="text-slate-400">Full Name:</strong> {selectedLead.fullName}</p>
              <p><strong className="text-slate-400">Email:</strong> {selectedLead.email}</p>
              <p><strong className="text-slate-400">Phone:</strong> {selectedLead.phone || 'N/A'}</p>
              <p><strong className="text-slate-400">Company:</strong> {selectedLead.company || 'N/A'}</p>
              <p><strong className="text-slate-400">Service:</strong> {selectedLead.service}</p>
              <p><strong className="text-slate-400">Budget:</strong> {selectedLead.budget || 'N/A'}</p>
              <p><strong className="text-slate-400">Timeline:</strong> {selectedLead.timeline || 'N/A'}</p>
              <div>
                <strong className="text-slate-400 block mb-1">Message Brief:</strong>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-800 text-slate-200 font-semibold rounded-lg text-xs hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
