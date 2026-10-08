import React from 'react';
import TalentCard from '@/components/talent/TalentCard';
import { getTalents, getCategories } from '@/lib/data/talentService';
import { Search, Filter, Compass, MapPin } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface TalentPageProps {
  searchParams: Promise<{
    kategori?: string;
    kota?: string;
    q?: string;
  }>;
}

export default async function TalentPage({ searchParams }: TalentPageProps) {
  const params = await searchParams;
  const categories = await getCategories();
  const talents = await getTalents({
    kategori: params.kategori,
    kota: params.kota,
    q: params.q,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-[#E7ECDF] p-8 rounded-3xl border border-[#D5DDD0] shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-black tracking-widest text-[#E0452F] uppercase bg-white px-3 py-1 rounded-full border border-[#D5DFCC]">
            DIREKTORI RESMI SENIMAN
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-[#14213D] mt-3">
            Direktori Seniman & Pengrajin Budaya
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Temukan para empu, koreografer, dalang, dan praktisi budaya dengan profil terverifikasi, riwayat karya autentik, dan standar rate card yang transparan.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 pt-6 border-t border-[#D5DDD0]/80">
          <form method="GET" action="/talent" className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <input
                type="text"
                name="q"
                defaultValue={params.q || ''}
                placeholder="Cari nama seniman atau keahlian..."
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3">
              <select
                name="kategori"
                defaultValue={params.kategori || ''}
                className="w-full px-3 py-2.5 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#14213D] cursor-pointer"
              >
                <option value="">Semua Kategori Jasa</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Select */}
            <div className="md:col-span-2">
              <select
                name="kota"
                defaultValue={params.kota || ''}
                className="w-full px-3 py-2.5 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#14213D] cursor-pointer"
              >
                <option value="">Semua Kota</option>
                <option value="Jakarta">DKI Jakarta</option>
                <option value="Surakarta">Solo / Surakarta</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Rembang">Rembang / Lasem</option>
                <option value="Bali">Bali</option>
              </select>
            </div>

            {/* Filter Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#14213D] hover:bg-[#1f3158] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Terapkan Filter</span>
              </button>
            </div>
          </form>

          {/* Quick Category Chips */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Kategori Cepat:</span>
            <Link
              href="/talent"
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                !params.kategori
                  ? 'bg-[#14213D] text-white border-[#14213D]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Semua
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/talent?kategori=${c.slug}`}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  params.kategori === c.slug
                    ? 'bg-[#E0452F] text-white border-[#E0452F]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Talent Grid View */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold text-slate-500">
            Menampilkan <strong>{talents.length}</strong> seniman terverifikasi
          </p>
        </div>

        {talents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">Tidak ada seniman ditemukan</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba sesuaikan kata kunci atau bersihkan pilihan filter lokasi dan kategori Anda.
            </p>
            <Link
              href="/talent"
              className="inline-block bg-[#14213D] text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Filter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {talents.map((t) => (
              <TalentCard key={t.id} talent={t} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
