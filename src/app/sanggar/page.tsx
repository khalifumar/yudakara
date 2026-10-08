import React from 'react';
import { getStudios } from '@/lib/data/talentService';
import { Building2, MapPin, Phone, Users, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Direktori Sanggar Budaya & Komunitas Seni — Yudakara',
  description: 'Pusat direktori sanggar tari, padepokan kriya, dan paguyuban seni tradisional terverifikasi di seluruh nusantara.',
};

export default async function SanggarPage() {
  const studios = await getStudios();

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#E7ECDF] p-8 rounded-3xl border border-[#D5DDD0] shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-black tracking-widest text-[#0284C7] uppercase bg-white px-3 py-1 rounded-full border border-[#D5DFCC]">
            DIREKTORI RESMI SANGGAR
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-[#14213D] mt-3">
            Direktori Sanggar & Komunitas Budaya
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Menghubungkan pusat-pusat pelestarian kesenian daerah dengan institusi modern untuk penyelenggaraan workshop, delegasi pementasan massal, dan riset kebudayaan.
          </p>
        </div>
      </div>

      {/* Grid of Studios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studios.map((s) => (
          <div
            key={s.id}
            className="institutional-card rounded-3xl overflow-hidden bg-white border border-[#DCE4D5] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                  src={s.cover_url || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80'}
                  alt={s.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#14213D] text-[10px] font-black uppercase px-2.5 py-1 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sanggar Terverifikasi</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h2 className="text-xl font-bold text-[#14213D]">
                  {s.name}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{s.address || `${s.city}, ${s.province}`}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#FAFBF8] border-t border-[#EAEFE6] flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {s.city}
              </span>
              {s.whatsapp && (
                <a
                  href={`https://wa.me/${s.whatsapp}?text=Halo%20${encodeURIComponent(s.name)},%20saya%20mengetahui%20sanggar%20Anda%20dari%20Yudakara`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#14213D] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hubungi Sanggar</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
