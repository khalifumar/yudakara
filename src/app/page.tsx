import React from 'react';
import Link from 'next/link';
import JcdSearchHero from '@/components/home/JcdSearchHero';
import CultureBannerCarousel from '@/components/home/CultureBannerCarousel';
import BmcValueSection from '@/components/home/BmcValueSection';
import TalentCard from '@/components/talent/TalentCard';
import { getTalents } from '@/lib/data/talentService';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2, TrendingUp, Users, Award } from 'lucide-react';

export default async function HomePage() {
  const talents = await getTalents();
  const featuredTalents = talents.filter((t) => t.is_featured).slice(0, 3);

  return (
    <main className="space-y-12">
      {/* 1. Main Search Hero (Gaya Jakarta Cultural Directory) */}
      <JcdSearchHero />

      {/* 2. Institutional Cultural Banner & Stats (Gaya Dinas Kebudayaan Hero) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#14213D] text-white shadow-xl">
          {/* Background cultural image overlay */}
          <div className="absolute inset-0 opacity-25 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&q=80"
              alt="Gedung Kesenian & Budaya Nusantara"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Big Statement & Countdown/Stats */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Gerakan Perlindungan & Valuasi Ekonomi Keahlian Budaya</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Menghargai Keahlian Tradisi Sebagai <span className="text-[#E0452F]">Jasa Profesional</span>
              </h2>

              <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
                Yudakara menggeser paradigma dari "produk budaya dijual murah sebagai komoditas turis" menjadi "keahlian adiluhung dihargai setara profesional modern" dengan kontrak baku dan standar rate card transparan.
              </p>

              {/* Stat Counters Strip (Inspired by Dinas Kebudayaan Event Countdown) */}
              <div className="pt-2 flex flex-wrap gap-4 sm:gap-6">
                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                  <div className="text-2xl md:text-3xl font-black text-amber-300">Rp 1.611 T</div>
                  <div className="text-[11px] text-slate-300">PDB Ekonomi Kreatif RI</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                  <div className="text-2xl md:text-3xl font-black text-emerald-300">27,4 Juta</div>
                  <div className="text-[11px] text-slate-300">Tenaga Kerja Terserap</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                  <div className="text-2xl md:text-3xl font-black text-[#E0452F]">100% Fair</div>
                  <div className="text-[11px] text-slate-300">Anti-Eksploitasi Budaya</div>
                </div>
              </div>
            </div>

            {/* Right Column: Spotlight Action Box */}
            <div className="lg:col-span-4 bg-[#E0452F] rounded-2xl p-6 text-white shadow-lg space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-2.5 py-1 rounded">
                KOLABORASI INDUSTRI & BRAND
              </span>
              <h3 className="text-xl font-bold leading-snug">
                Butuh Kurasi Seniman untuk Acara atau Kampanye Produk Anda?
              </h3>
              <p className="text-xs text-white/90 leading-relaxed">
                Konsultasikan kebutuhan seni pertunjukan, motif batik custom, hingga kajian etnomusikologi bersama kurator resmi Yudakara.
              </p>
              <Link
                href="/talent"
                className="inline-flex items-center justify-center w-full bg-white text-[#14213D] hover:bg-slate-100 font-extrabold text-xs py-3 px-4 rounded-xl transition-all shadow-md gap-1.5"
              >
                <span>Telusuri Daftar Talent Budaya</span>
                <ArrowRight className="w-4 h-4 text-[#E0452F]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cultural Highlight Cards (Rounded horizontal cards with cultural photography) */}
      <CultureBannerCarousel />

      {/* 4. Featured Verified Talents Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#E0452F] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Talenta Terpilih
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#14213D] mt-1">
              Seniman & Pengrajin Unggulan Terverifikasi
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Telah melewati kurasi kredibilitas, etika karya, dan portofolio orisinil.
            </p>
          </div>
          <Link
            href="/talent"
            className="text-xs font-bold text-[#14213D] hover:text-[#E0452F] flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Buka Direktori Lengkap ({talents.length} Seniman)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTalents.map((t) => (
            <TalentCard key={t.id} talent={t} />
          ))}
        </div>
      </section>

      {/* 5. Alur Kerja Kolaborasi (4 Tahap Transparan) */}
      <section className="bg-white py-16 px-4 md:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#E0452F] uppercase tracking-wider">
              ALUR KERJA MUDAH
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#14213D] mt-2">
              Bagaimana Kolaborasi di Yudakara Berjalan?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Temukan Keahlian',
                desc: 'Cari berdasarkan disiplin (Kriya, Tari, Pedalangan, Kuratorial) dan kota domisili.',
              },
              {
                step: '02',
                title: 'Rujuk Standar Tarif',
                desc: 'Gunakan panduan Rate Card Yudakara untuk memastikan penawaran adil bagi kedua belah pihak.',
              },
              {
                step: '03',
                title: 'Kirim Brief & Kontrak',
                desc: 'Ajukan kebutuhan proyek. Didampingi draf kontrak digital yang menjamin hak royalti & kredit nama.',
              },
              {
                step: '04',
                title: 'Eksekusi & Apresiasi',
                desc: 'Karya diselesaikan dengan jaminan mutu kultural tinggi dan pelestarian tradisi nusantara.',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-[#FAFBF8] p-6 rounded-2xl border border-slate-200 relative overflow-hidden"
              >
                <span className="text-4xl font-black text-[#14213D]/10 absolute top-4 right-4 font-mono">
                  {s.step}
                </span>
                <span className="inline-block w-8 h-8 rounded-full bg-[#14213D] text-white text-xs font-bold flex items-center justify-center mb-4">
                  {s.step}
                </span>
                <h3 className="font-bold text-base text-[#14213D] mb-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BMC Value Proposition Section */}
      <BmcValueSection />
    </main>
  );
}
