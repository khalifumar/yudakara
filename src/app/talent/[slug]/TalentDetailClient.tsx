'use client';

import React, { useState } from 'react';
import { Talent } from '@/types/database';
import InquiryModal from '@/components/talent/InquiryModal';
import {
  MapPin,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Award,
  Phone,
  FileCheck2,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';

export default function TalentDetailClient({ talent }: { talent: Talent }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/talent"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#14213D] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Direktori Seniman</span>
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#DCE4D5] shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar with Verified Badge */}
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-slate-200 shadow-sm">
            <img
              src={talent.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'}
              alt={talent.display_name}
              className="w-full h-full object-cover"
            />
            {talent.verification_status === 'verified' && (
              <div
                className="absolute bottom-0 right-0 bg-[#E0452F] text-white p-1 rounded-tl-lg shadow"
                title="Terverifikasi Resmi"
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E0452F] bg-[#FDEAE6] px-2.5 py-0.5 rounded-md">
                {talent.category?.name || 'Kriya Tradisional'}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5" /> Standar Kontrak Yudakara
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-[#14213D]">
              {talent.display_name}
            </h1>

            <p className="text-sm font-semibold text-slate-700">
              {talent.headline}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{talent.city}, {talent.province}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-slate-400" />
                <span>{talent.experience_years || 10}+ Tahun Pengalaman</span>
              </div>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#E0452F] hover:bg-[#c53723] text-white text-xs font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ajukan Pertanyaan / Brief</span>
            </button>

            {talent.whatsapp && (
              <a
                href={`https://wa.me/${talent.whatsapp}?text=Halo%20${encodeURIComponent(talent.display_name)},%20saya%20melihat%20profil%20Anda%20di%20Yudakara`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#14213D] hover:bg-slate-800 text-white text-xs font-bold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Bio & Portfolio (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Bio Section */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-[#14213D]">
              Tentang Seniman & Filosofi Karya
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {talent.bio}
            </p>
          </div>

          {/* Portfolio Section */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#14213D]">
              Dokumentasi & Portofolio Karya
            </h2>

            {talent.portfolio_items && talent.portfolio_items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {talent.portfolio_items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl overflow-hidden border border-slate-200 group bg-slate-50"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.year && (
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          Tahun {item.year}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-[#14213D]">{item.title}</h3>
                      {item.description && (
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Belum ada portofolio yang diunggah.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Rate Card & Services (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAFBF8] rounded-3xl p-6 border border-[#DCE4D5] shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E0452F]">
                TRANSPARANSI TARIF
              </span>
              <h2 className="text-lg font-black text-[#14213D] mt-0.5">
                Layanan & Standar Rate Card
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Mengikuti acuan resmi perlindungan hak komersial Yudakara.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {talent.talent_services && talent.talent_services.length > 0 ? (
                talent.talent_services.map((svc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5"
                  >
                    <h3 className="font-bold text-xs text-[#14213D]">
                      {svc.custom_title || 'Layanan Budaya'}
                    </h3>
                    <div className="text-base font-extrabold text-[#E0452F]">
                      Rp {svc.price.toLocaleString('id-ID')}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Termasuk hak atribusi nama & lisensi penggunaan resmi.
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500">
                  Tarif fleksibel berdasarkan skala proyek. Silakan ajukan brief.
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-[#14213D] hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-sm"
              >
                Ajukan Penawaran Proyek Ini
              </button>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
            <span className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Jaminan Kemitraan Adil
            </span>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Seluruh transaksi disertai draf kontrak digital untuk menjamin kompensasi dan royalti karya tetap mengalir kepada kreator aslinya.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        talent={talent}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
