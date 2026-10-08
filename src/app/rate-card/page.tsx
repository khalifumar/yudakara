import React from 'react';
import { getRateCards, getCategories } from '@/lib/data/talentService';
import { Scale, CheckCircle2, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Standar Rate Card & Panduan Fair Pay Budaya — Yudakara',
  description: 'Acuan resmi tarif jasa kreatif berbasis keahlian budaya tradisional Indonesia. Melindungi martabat seniman dan memberikan kepastian anggaran bagi industri kreatif.',
};

export default async function RateCardPage() {
  const rateCards = await getRateCards();
  const categories = await getCategories();

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-[#14213D] text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-[#E0452F] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <Scale className="w-3.5 h-3.5" /> Standar Industri Berkeadilan (Fair Pay)
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Acuan Standar Tarif Jasa Budaya Tradisional
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Menjawab ketiadaan standar harga yang selama ini menjebak seniman dalam ekonomi informal. Rate card ini disusun berdasarkan survei lapangan jam kerja, kompleksitas teknik, nilai sakralitas, serta hak lisensi penggunaan komersial.
          </p>
        </div>
      </div>

      {/* 3 Keuntungan Transparansi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="font-extrabold text-sm text-[#14213D] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bagi Pelaku Industri & Brand
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kepastian estimasi anggaran yang transparan tanpa kekhawatiran melanggar kode etik hak cipta atau mengeksploitasi kearifan lokal.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="font-extrabold text-sm text-[#14213D] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bagi Seniman & Pengrajin
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            Posisi tawar yang terlindungi hukum. Menolak bayaran sukarela atau sekadar "uang lelah" yang jauh di bawah Upah Minimum Regional.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="font-extrabold text-sm text-[#14213D] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bagi Regenerasi Bangsa
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            Meyakinkan generasi muda bahwa menjadi dalang, penari, maupun pembatik adalah profesi masa depan yang menjanjikan kemakmuran finansial.
          </p>
        </div>
      </div>

      {/* Tabel Rate Card per Kategori */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-black text-[#14213D]">
            Daftar Acuan Tarif Jasa Budaya Resmi
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            *Rentang harga merupakan acuan dasar. Nilai akhir disepakati melalui kontrak digital resmi sesuai cakupan brief proyek.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-bold">Kategori & Layanan</th>
                <th className="py-3 px-4 font-bold">Satuan Ukur</th>
                <th className="py-3 px-4 font-bold">Rentang Tarif Acuan</th>
                <th className="py-3 px-4 font-bold">Cakupan & Hak Penggunaan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rateCards.map((rc) => {
                const cat = categories.find((c) => c.id === rc.category_id);
                return (
                  <tr key={rc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E0452F] block">
                        {cat?.name || 'Budaya Nusantara'}
                      </span>
                      <strong className="text-sm text-[#14213D] block mt-0.5">
                        {rc.service_name}
                      </strong>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-600">
                      {rc.unit}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-sm text-[#14213D] block">
                        Rp {rc.min_price.toLocaleString('id-ID')} – Rp {rc.max_price.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 leading-relaxed max-w-xs">
                      {rc.notes || 'Termasuk klausul kredit nama & royalti.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
