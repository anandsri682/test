'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(getApiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        // Store auth state in localStorage for client panel
        localStorage.setItem('avm_admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network authentication error.');
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-block bg-white/90 p-2 rounded-lg">
            <Image
              src="/logo.png"
              alt="AVM Smart Logo"
              width={160}
              height={40}
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-white">Management Control Center</h2>
          <p className="text-xs text-slate-400">Authorized personnel authentication required</p>
        </div>

        {status === 'error' && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-slate-200">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-blue-primary focus:outline-hidden text-white"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-blue-primary focus:outline-hidden text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-blue-primary hover:bg-blue-600 text-white font-bold rounded-xl text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
