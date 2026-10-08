'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Globe,
  FileText,
  UserCheck,
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [newLeadsCount, setNewLeadsCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('avm_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch lead counts for dynamic badge
    fetch(getApiUrl('/api/contact'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.leads) {
          const unread = data.leads.filter((l: any) => l.status === 'New' || !l.status).length;
          setNewLeadsCount(unread);
        }
      })
      .catch(() => {});
  }, [router]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the Admin Console?')) {
      localStorage.removeItem('avm_admin_token');
      router.push('/admin');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/leads?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navItems = [
    {
      group: 'MAIN',
      items: [
        {
          name: 'Dashboard',
          href: '/admin/dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
      ],
    },
    {
      group: 'MANAGEMENT',
      items: [
        {
          name: 'Lead Submissions',
          href: '/admin/leads',
          icon: Users,
          badge: newLeadsCount > 0 ? `${newLeadsCount} New` : null,
          badgeColor: 'bg-amber-500 text-white',
        },
      ],
    },
    {
      group: 'MARKETING',
      items: [
        {
          name: 'Offer & Popup Manager',
          href: '/admin/offer',
          icon: Sparkles,
          badge: 'Live',
          badgeColor: 'bg-emerald-500 text-white',
        },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        {
          name: 'Website Branding & Settings',
          href: '/admin/settings',
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans antialiased">
      {/* Overlay Backdrop for Mobile Navigation */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="AVM Smart Logo" width={115} height={30} className="object-contain" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[#087FF5] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/50 shrink-0">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin User Profile Card */}
        <div className="p-4 mx-4 my-3 bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200/70 rounded-2xl flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-[#0B2A5B] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            A
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">A. Anand Raju</h4>
            <p className="text-[11px] text-slate-500 truncate">Founder & CEO</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          {navItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                {group.group}
              </div>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#087FF5] text-white shadow-md shadow-blue-500/20 font-bold'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* External Quick Link */}
          <div className="space-y-1 pt-2">
            <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">
              PUBLIC SITE
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-400" />
                <span>View Live Website</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors border border-rose-200/50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="Open Mobile Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo in Admin Top Navbar */}
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Image src="/logo.png" alt="AVM Smart Logo" width={110} height={28} className="object-contain" />
              <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-wider text-[#087FF5] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/50">
                Console
              </span>
            </Link>

            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 ml-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads (Name, Email, Phone)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-12 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087FF5]/40 focus:border-[#087FF5] transition-all"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded border border-slate-300/50">
                Ctrl K
              </span>
            </form>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/admin/leads"
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200/60"
              title="View Leads Notifications"
            >
              <Bell className="w-4 h-4" />
              {newLeadsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors border border-slate-200/80"
            >
              <Globe className="w-3.5 h-3.5 text-[#087FF5]" />
              <span>Website</span>
            </a>

            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0B2A5B] text-white flex items-center justify-center text-xs font-black shadow-xs">
                A
              </div>
              <span className="hidden md:inline-block text-xs font-bold text-slate-800">
                A. Anand Raju
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Header & Main Content */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {(title || subtitle) && (
            <div className="mb-2">
              {title && <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>}
              {subtitle && <p className="text-xs font-medium text-slate-500 mt-1">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
