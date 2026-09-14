import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-between bg-white text-slate-900">
      {/* Header Banner */}
      <section className="bg-navy-deep text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Error 404</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold">Page Not Found</h1>
          <p className="text-slate-300 text-sm mt-2">
            Home <span className="mx-2 text-slate-500">/</span> 404 Error
          </p>
        </div>
      </section>

      {/* Main 404 Illustration Content */}
      <div className="py-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          <span className="text-9xl font-extrabold text-blue-primary/10 tracking-tighter select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-primary flex items-center justify-center text-blue-primary font-black text-3xl shadow-lg">
              404
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900">404 - Page Not Found</h2>
        <p className="text-slate-600 text-base max-w-md mx-auto">
          Oops! The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-blue-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
