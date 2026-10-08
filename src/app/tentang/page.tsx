import React from 'react';
import Link from 'next/link';
import { Target, HeartHandshake, Compass, Users2, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami — Yudakara Jasa Kreatif Budaya',
  description: 'Mengenal visi, misi, dan latar belakang berdirinya Yudakara untuk memartabatkan keahlian budaya tradisional Indonesia.',
};

export default function TentangPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Hero Tentang */}
      <div className="bg-[#E7ECDF] p-8 md:p-14 rounded-3xl border border-[#D5DDD0] shadow-sm">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-black tracking-widest text-[#E0452F] uppercase bg-white px-3 py-1 rounded-full border border-[#D5DFCC]">
            TENTANG YUDAKARA
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#14213D] leading-tight">
            Menghubungkan Warisan Leluhur dengan Industri Kreatif Masa Depan
          </h1>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            Yudakara lahir dari kesadaran bahwa budaya bukan artefak mati yang hanya dipajang di museum, melainkan keahlian hidup bernilai ekonomi tinggi yang patut dihargai secara bermartabat.
          </p>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#14213D]">Visi Kami</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Menjadikan keahlian budaya tradisional nusantara sebagai profesi terhormat, berdaya saing global, dan berkeadilan secara ekonomi, sehingga memicu gelombang regenerasi baru bagi para empu dan praktisi muda di seluruh Indonesia.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#14213D]">Misi Kami</h2>
          <ul className="space-y-2 text-sm text-slate-600 leading-relaxed list-disc list-inside">
            <li>Menyusun standar tarif (<em>rate card</em>) baku per kategori keahlian budaya.</li>
            <li>Memfasilitasi kontrak digital yang menjamin hak royalti, kredit nama, dan kepemilikan motif.</li>
            <li>Mendigitalisasi kurasi portofolio agar seniman dapat diakses klien tanpa perantara ekstraktif.</li>
            <li>Mengembangkan kemitraan strategis dengan institusi kebudayaan daerah dan brand global.</li>
          </ul>
        </div>
      </div>

      {/* 3 Tahap Roadmap dari Proposal */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-black uppercase text-[#E0452F] tracking-wider">
            PETA JALAN PENGEMBANGAN
          </span>
          <h2 className="text-2xl font-black text-[#14213D] mt-1">
            Tahapan Pembangunan Ekosistem Yudakara
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-black text-[#E0452F] uppercase">Fase 1 (Saat Ini / MVP)</span>
            <h3 className="font-bold text-base text-[#14213D]">Profil Freelance & Direktori Sanggar</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fokus kurasi 20–30 talent di 3–4 kategori inti (kriya batik, tari, wayang, konsultan budaya), verifikasi profil, dan acuan rate card standar.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-black text-slate-500 uppercase">Fase 2 (Tahun 2)</span>
            <h3 className="font-bold text-base text-[#14213D]">Tender B2B Korporat & Kontrak Digital</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sistem job posting skala besar untuk festival, event kenegaraan, otomatisasi matching brief, dan draf kontrak berlisensi HKI resmi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-black text-slate-500 uppercase">Fase 3 (Tahun 3+)</span>
            <h3 className="font-bold text-base text-[#14213D]">Expo Matching & Kelas Workshop B2C</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Perluasan segmen individu untuk booking kelas seni/workshop di sanggar-sanggar mitra untuk pekerja kantoran dan generasi muda.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
