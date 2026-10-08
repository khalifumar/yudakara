'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';

export default function JcdSearchHero() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'talent' | 'studio'>('talent');
  const [keyword, setKeyword] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [disiplin, setDisiplin] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType === 'studio') {
      router.push(`/sanggar?q=${encodeURIComponent(keyword)}&kota=${encodeURIComponent(lokasi)}`);
    } else {
      router.push(`/talent?q=${encodeURIComponent(keyword)}&kategori=${encodeURIComponent(disiplin)}&kota=${encodeURIComponent(lokasi)}`);
    }
  };

  return (
    <section className="bg-[#DDE2D4] text-[#192024] pt-14 pb-16 px-4 md:px-8 border-b border-[#CCD4C1]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle Cultural Identity Badge */}
        <div className="inline-flex items-center gap-2 mb-4 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#CBD5C0] text-xs font-semibold text-[#14213D]">
          <span className="w-2 h-2 rounded-full bg-[#E0452F] animate-pulse"></span>
          <span>Direktori Budaya & Keahlian Tradisional Nusantara</span>
        </div>

        {/* Hero Title (Jakarta Cultural Directory Style) */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#14213D] mb-8 leading-tight">
          Jelajahi Ekosistem Seni dan Budaya Indonesia
        </h1>

        {/* Search Box Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Main Input + Cari Button */}
          <div className="flex flex-col sm:flex-row items-stretch shadow-md rounded-lg overflow-hidden bg-white border border-[#CBD5C0]">
            <div className="flex items-center px-4 py-3 flex-1">
              <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari seniman, pengrajin wayang, penari, sanggar, motif batik..."
                className="w-full text-slate-800 placeholder-slate-400 text-sm md:text-base focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-[#14213D] text-white font-extrabold text-xs md:text-sm px-8 py-3.5 tracking-wider transition-colors uppercase flex items-center justify-center gap-2"
            >
              <span>CARI</span>
            </button>
          </div>

          {/* Sub Filters Row (Pilih Kategori & Filter Pencarian) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 text-xs">
            {/* PILIH KATEGORI (Radio Buttons / Pills) */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-700 tracking-wider uppercase text-[11px]">
                PILIH KATEGORI:
              </span>
              <button
                type="button"
                onClick={() => setSelectedType('talent')}
                className={`px-3 py-1.5 rounded bg-white border flex items-center gap-1.5 font-bold transition-all shadow-sm ${
                  selectedType === 'talent'
                    ? 'border-[#E0452F] ring-1 ring-[#E0452F] text-slate-900'
                    : 'border-slate-300 text-slate-600 hover:border-slate-400'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#E0452F]"></span>
                <span>SENIMAN & PENGRAJIN</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType('studio')}
                className={`px-3 py-1.5 rounded bg-white border flex items-center gap-1.5 font-bold transition-all shadow-sm ${
                  selectedType === 'studio'
                    ? 'border-[#0284C7] ring-1 ring-[#0284C7] text-slate-900'
                    : 'border-slate-300 text-slate-600 hover:border-slate-400'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                <span>KOMUNITAS / SANGGAR</span>
              </button>
            </div>

            {/* FILTER PENCARIAN (Lokasi & Disiplin Dropdowns) */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="font-bold text-slate-700 tracking-wider uppercase text-[11px] hidden sm:inline">
                FILTER:
              </span>

              {/* Lokasi Dropdown */}
              <div className="relative flex-1 md:flex-initial">
                <select
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  className="w-full md:w-36 appearance-none bg-white border border-slate-300 rounded px-3 py-1.5 pr-7 font-bold text-slate-800 text-xs shadow-sm focus:outline-none focus:border-slate-500 cursor-pointer"
                >
                  <option value="">LOKASI</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Surakarta">Surakarta (Solo)</option>
                  <option value="Yogyakarta">Yogyakarta</option>
                  <option value="Rembang">Rembang / Lasem</option>
                  <option value="Bali">Bali</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
              </div>

              {/* Disiplin Dropdown */}
              <div className="relative flex-1 md:flex-initial">
                <select
                  value={disiplin}
                  onChange={(e) => setDisiplin(e.target.value)}
                  className="w-full md:w-36 appearance-none bg-white border border-slate-300 rounded px-3 py-1.5 pr-7 font-bold text-slate-800 text-xs shadow-sm focus:outline-none focus:border-slate-500 cursor-pointer"
                >
                  <option value="">DISIPLIN</option>
                  <option value="kriya-batik">Kriya & Batik</option>
                  <option value="seni-tari">Seni Tari</option>
                  <option value="seni-wayang">Dalang & Wayang</option>
                  <option value="konsultan-budaya">Konsultan Budaya</option>
                  <option value="kriya-ukir">Kriya Ukir & Logam</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </form>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-slate-600">
          <span>GULIR KE BAWAH</span>
          <span>▼</span>
        </div>
      </div>
    </section>
  );
}
