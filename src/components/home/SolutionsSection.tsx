import React from 'react';
import Link from 'next/link';
import { Target, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function SolutionsSection() {
  return (
    <section aria-labelledby="solutions-heading" className="py-20 bg-[#EFF6FF] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#13B89A]/10 text-[#13B89A] text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-[#13B89A]/20">
            Strategic Growth Partnership
          </span>
          <h2 id="solutions-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A5B] mb-4">
            Why Partner With AVM Smart
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            Founded & led by <Link href="/founder" className="font-bold text-[#087FF5] hover:underline">A. Anand Raju</Link> (Founder & CEO), we bring engineering precision, speed, and continuous support to ensure your business digital solutions scale effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-8 bg-white rounded-3xl border-2 border-[#087FF5]/30 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#087FF5] text-white flex items-center justify-center font-bold shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2A5B]">Client-Centered Strategy</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Custom engineering roadmaps tailored around your exact business goals and user expectations.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border-2 border-[#13B89A]/30 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#13B89A] text-white flex items-center justify-center font-bold shadow-xs">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2A5B]">Cutting-Edge Tech Stack</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Built on next-gen frameworks like Next.js 16, React 19, Spring Boot, AWS, and MongoDB architectures.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border-2 border-[#FF6A00]/30 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6A00] text-white flex items-center justify-center font-bold shadow-xs">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2A5B]">On-Time Milestones</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Agile sprint workflows ensuring on-schedule delivery, continuous testing, and zero-downtime launches.
            </p>
          </div>

          <div className="p-8 bg-[#0B1528] text-white rounded-3xl border border-slate-800 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#087FF5] text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">24/7 Dedicated Support</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Long-term application maintenance, security compliance updates, and continuous cloud scalability.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
