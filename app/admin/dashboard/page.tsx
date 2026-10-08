'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  FileText,
  Clock,
  Users,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Settings as SettingsIcon,
  TrendingUp,
  Eye,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const newLeadsCount = leads.filter((l) => l.status === 'New' || !l.status).length;
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;

  const recentLeads = leads.slice(0, 5);

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Welcome to AVM Smart lead management and website settings control"
    >
      <div className="space-y-6">
        {/* Able Pro Inspired Hero Announcement Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B2A5B] via-[#087FF5] to-[#0466C8] p-6 sm:p-8 text-white shadow-xl">
          {/* Subtle Ambient Glowing Orbs */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 right-1/3 h-56 w-56 rounded-full bg-[#67D63B]/20 blur-2xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#67D63B]" />
                AVM Smart Control Console
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                Welcome back, Anand! 👋
              </h2>

              <p className="text-slate-100 text-xs sm:text-sm max-w-xl font-medium leading-relaxed opacity-95">
                Monitor incoming lead inquiries, update promotional offer popups, and configure website settings in one clean, user-friendly control panel.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/admin/leads"
                  className="px-5 py-2.5 bg-white text-[#0B2A5B] hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>View Submissions ({leads.length})</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#087FF5]" />
                </Link>

                <Link
                  href="/admin/offer"
                  className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold text-xs rounded-xl transition-all flex items-center gap-2 backdrop-blur-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#67D63B]" />
                  <span>Offer & Popup Manager</span>
                </Link>
              </div>
            </div>

            {/* Graphic Accent Box */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="w-44 h-44 rounded-2xl bg-white/10 border border-white/20 p-4 flex flex-col justify-between backdrop-blur-md shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
                <div className="flex items-center justify-between text-xs text-slate-200 font-mono">
                  <span>LIVE SYSTEM</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-white">{newLeadsCount} New</div>
                  <div className="text-[11px] text-slate-200">Unread Leads</div>
                </div>
                <div className="text-[10px] text-slate-300 border-t border-white/15 pt-2 flex items-center justify-between">
                  <span>Status: Operational</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Able Pro Inspired Micro Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Inquiries */}
          <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#087FF5]">
                <FileText className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3" /> +100%
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{leads.length}</p>
              <p className="text-xs font-semibold text-slate-500">Total Lead Inquiries</p>
            </div>
            {/* Mini Sparkline Chart SVG */}
            <div className="pt-1">
              <svg className="w-full h-8 text-[#087FF5]" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M0 20 L20 15 L40 18 L60 8 L80 12 L100 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: New Leads */}
          <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                Needs Review
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-600">{newLeadsCount}</p>
              <p className="text-xs font-semibold text-slate-500">New Pending Leads</p>
            </div>
            {/* Mini Sparkline */}
            <div className="pt-1">
              <svg className="w-full h-8 text-amber-500" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M0 18 L25 20 L50 12 L75 16 L100 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: Contacted */}
          <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                In Progress
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600">{contactedCount}</p>
              <p className="text-xs font-semibold text-slate-500">Contacted Prospects</p>
            </div>
            {/* Mini Sparkline */}
            <div className="pt-1">
              <svg className="w-full h-8 text-blue-500" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M0 22 L20 16 L40 10 L60 14 L80 8 L100 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 4: Converted */}
          <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Closed
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600">{convertedCount}</p>
              <p className="text-xs font-semibold text-slate-500">Converted Customers</p>
            </div>
            {/* Mini Sparkline */}
            <div className="pt-1">
              <svg className="w-full h-8 text-emerald-500" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M0 20 L25 15 L50 18 L75 8 L100 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Dashboard Section: Recent Submissions Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Lead Submissions</h3>
              <p className="text-xs text-slate-500 mt-0.5">Latest contact inquiries submitted via website forms</p>
            </div>

            <Link
              href="/admin/leads"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>View All Submissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">Loading recent lead submissions...</div>
          ) : recentLeads.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-medium">
              No lead submissions recorded yet. Submissions will automatically appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200/70">
                  <tr>
                    <th className="py-3 px-5">Contact Name</th>
                    <th className="py-3 px-5">Service Interested</th>
                    <th className="py-3 px-5">Contact Email / Phone</th>
                    <th className="py-3 px-5">Date</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {recentLeads.map((lead) => {
                    const leadId = lead._id || lead.id;
                    const isNew = lead.status === 'New' || !lead.status;
                    return (
                      <tr key={leadId} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-slate-900">
                          {lead.name || 'Anonymous User'}
                        </td>
                        <td className="py-3.5 px-5 text-slate-600">
                          <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                            {lead.service || 'General Inquiry'}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-slate-600 space-y-0.5">
                          {lead.email && (
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate max-w-[180px]">{lead.email}</span>
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-5 text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>
                              {lead.createdAt
                                ? new Date(lead.createdAt).toLocaleDateString()
                                : 'Recent'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
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
                          </select>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <Link
                            href="/admin/leads"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#087FF5] hover:text-[#066FD6]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Shortcut Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/admin/leads"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs transition-all group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#087FF5] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-[#087FF5] transition-colors">
                Lead Management
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Filter by service, search contacts, update statuses, and export to CSV spreadsheet.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/offer"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs transition-all group space-y-3 border-amber-200/60"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Offer & Popup Manager
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Dynamically customize the ₹2,499 offer headline, top navbar banner, popup text, and inclusions.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs transition-all group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Dynamic Site Branding
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Update brand colors, phone number, contact email, and office address across the site.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
