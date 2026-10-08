import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Sparkles } from 'lucide-react';

export default function TopNoticeBar() {
  return (
    <div className="bg-[#14213D] text-white text-xs py-2 px-4 border-b border-[#23355b]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#E0452F] text-white px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" /> MVP Fase 1
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Yudakara — Marketplace Jasa Kreatif Berbasis Keahlian Budaya Nusantara
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <a
            href="mailto:kemitraan@yudakara.id"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#E0452F]" />
            <span className="hidden md:inline">kemitraan@yudakara.id</span>
          </a>
          <span className="text-slate-600 hidden md:inline">|</span>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E0452F]" />
            <span>Pusat Informasi</span>
          </a>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 bg-[#1e2f52] px-2 py-0.5 rounded text-[11px] font-medium text-slate-200">
            <span>🇮🇩 Indonesia</span>
          </div>
        </div>
      </div>
    </div>
  );
}
