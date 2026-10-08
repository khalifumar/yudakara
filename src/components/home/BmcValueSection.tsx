import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Scale, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BmcValueSection() {
  const pillars = [
    {
      icon: Scale,
      title: 'Standar Tarif Berkeadilan (Fair Pay)',
      description:
        'Mengakhiri era keahlian budaya yang dibayar semena-mena. Yudakara menyediakan acuan rate card transparan per kategori jasa yang melindungi martabat seniman.',
      badge: 'Solusi Masalah #1',
    },
    {
      icon: FileText,
      title: 'Kontrak Digital Baku & Jaminan Royalti',
      description:
        'Memastikan seniman mendapatkan hak cipta, kredit komersial, dan royalti berkelanjutan saat karyanya diadaptasi oleh brand mode maupun korporasi internasional.',
      badge: 'Solusi Masalah #3',
    },
    {
      icon: ShieldCheck,
      title: 'Kurasi & Profil Terverifikasi',
      description:
        'Memudahkan brand, event organizer, dan institusi menemukan talenta asli dengan portofolio autentik tanpa harus bergantung pada koneksi personal atau makelar.',
      badge: 'Solusi Masalah #2',
    },
    {
      icon: Sparkles,
      title: 'Regenerasi Generasi Muda',
      description:
        'Menjadikan profesi dalang, pembatik, penari, dan pengukir sebagai jalur karier masa depan yang layak secara ekonomi bagi anak muda Indonesia.',
      badge: 'Solusi Masalah #4',
    },
  ];

  return (
    <section className="bg-[#F2F5ED] py-16 px-4 md:px-8 border-y border-[#DEE5D6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black tracking-widest text-[#E0452F] uppercase bg-white px-3 py-1 rounded-full border border-[#D5DFCC]">
            MODEL BISNIS & NILAI UTAMA
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#14213D] mt-4">
            Mengapa Ekosistem Budaya Membutuhkan Yudakara?
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
            Menjawab kesenjangan antara pesatnya pertumbuhan ekonomi kreatif nasional dengan rapuhnya posisi ekonomi pelaku seni tradisional di tingkat akar rumput.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#D9E2D2] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E7ECDF] flex items-center justify-center text-[#14213D]">
                      <Icon className="w-6 h-6 text-[#E0452F]" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#14213D] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#14213D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Prinsip Belmpact 2026</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Banner Callout */}
        <div className="mt-12 bg-[#14213D] text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black">
              Apakah Anda Seniman Tradisional atau Pengelola Sanggar?
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Bergabunglah secara gratis dalam jaringan Yudakara. Dapatkan profil digital resmi, perlindungan rate card, serta akses langsung ke proyek komersial brand ternama.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/daftar"
              className="bg-[#E0452F] hover:bg-[#c53723] text-white text-xs font-bold px-6 py-3.5 rounded-full text-center transition-colors shadow-md"
            >
              Daftarkan Keahlian Anda
            </Link>
            <Link
              href="/rate-card"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-6 py-3.5 rounded-full text-center transition-colors border border-white/20"
            >
              Pelajari Panduan Tarif
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
