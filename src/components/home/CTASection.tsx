'use client';

import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import ProjectModal from '../forms/ProjectModal';

export default function CTASection() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <>
      <section aria-labelledby="cta-heading" className="bg-gradient-to-r from-[#0B1528] via-[#1E293B] to-[#0B1528] text-white py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 id="cta-heading" className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Take the Next Step?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Let&apos;s discuss how AVM Smart Solutions can help your business build custom websites, applications, and scalable digital products.
          </p>
          <div>
            <button
              onClick={() => setProjectModalOpen(true)}
              className="min-h-[48px] px-9 py-4 bg-gradient-to-r from-[#087FF5] via-[#13B89A] to-[#FF6A00] bg-[length:200%_auto] hover:bg-right text-white font-black text-sm rounded-xl shadow-xl hover:shadow-[#087FF5]/40 transition-all duration-500 transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>Start a Project</span>
              <Rocket className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <ProjectModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </>
  );
}
