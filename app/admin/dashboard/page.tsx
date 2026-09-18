'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Users, FileText, Settings as SettingsIcon, LogOut, CheckCircle, Clock } from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<any[]>([]);

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

  const handleLogout = () => {
    localStorage.removeItem('avm_admin_token');
    router.push('/admin');
  };

  const newLeadsCount = leads.filter((l) => l.status === 'New' || !l.status).length;
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/95 p-1.5 rounded-md">
            <Image src="/logo.png" alt="AVM Smart Logo" width={130} height={32} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            Admin Console
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400">Welcome to AVM Smart lead management and settings control</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Inquiries</span>
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{leads.length}</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase">New Leads</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold text-amber-400">{newLeadsCount}</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-blue-400 uppercase">Contacted</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-extrabold text-blue-400">{contactedCount}</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase">Converted</span>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-400">{convertedCount}</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Link
            href="/admin/leads"
            className="p-8 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl shadow-lg transition-all group flex items-start justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-primary transition-colors">
                Lead Submissions Management
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                View, filter, update statuses, and export incoming contact form submissions to CSV.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="p-8 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl shadow-lg transition-all group flex items-start justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Website Dynamic Branding & Settings
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Update dynamic CSS color variables, contact phone, email, and office location across the website.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
