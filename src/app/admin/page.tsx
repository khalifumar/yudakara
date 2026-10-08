'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  Star,
  Eye,
  AlertCircle,
  FileCheck,
  Sparkles,
} from 'lucide-react';

interface PendingTalent {
  id: string;
  name: string;
  category: string;
  city: string;
  headline: string;
  experience: number;
  status: 'pending' | 'verified' | 'rejected';
}

export default function AdminPage() {
  const [talents, setTalents] = useState<PendingTalent[]>([
    {
      id: 'p-1',
      name: 'Raden Mas Haryo Widagdo',
      category: 'Seni Wayang & Pedalangan',
      city: 'Bantul, D.I. Yogyakarta',
      headline: 'Pembuat Wayang Kulit Tatah Sungging Gagrak Ngayogyakarta',
      experience: 18,
      status: 'pending',
    },
    {
      id: 'p-2',
      name: 'Ni Luh Ayu Sukmawati',
      category: 'Penari & Koreografer',
      city: 'Gianyar, Bali',
      headline: 'Penari Klasik Legong Keraton & Pelatih Sanggar Seni Suara',
      experience: 12,
      status: 'pending',
    },
    {
      id: 'p-3',
      name: 'Ki Warsito & Sanggar Lasem Asri',
      category: 'Pembatik & Desainer Motif',
      city: 'Rembang, Jawa Tengah',
      headline: 'Empu Batik Tulis Motif Tiga Negeri & Pewarna Alami',
      experience: 22,
      status: 'verified',
    },
  ]);

  const updateStatus = (id: string, newStatus: 'verified' | 'rejected') => {
    setTalents(
      talents.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-[#14213D] text-white p-6 md:p-8 rounded-3xl shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider bg-[#E0452F] text-white px-2.5 py-0.5 rounded-full">
            PORTAL KURATOR RESMI
          </span>
          <span className="text-xs text-slate-300">
            Yudakara Internal • Key Activity #1 BMC
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black">
          Panel Kurasi & Verifikasi Keahlian Budaya
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Memastikan seluruh seniman dan pengrajin yang tampil di direktori publik telah diverifikasi keaslian karya, filosofi motif, dan kesesuaian standar rate card.
        </p>
      </div>

      {/* Verification Table */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#14213D]">
              Antrean Pendaftaran Talent Baru
            </h2>
            <p className="text-xs text-slate-500">
              Total <strong>{talents.filter((t) => t.status === 'pending').length}</strong> pengajuan menunggu tinjauan kurator.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-bold">Nama Talent & Keahlian</th>
                <th className="py-3 px-4 font-bold">Kategori</th>
                <th className="py-3 px-4 font-bold">Domisili</th>
                <th className="py-3 px-4 font-bold">Pengalaman</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-center">Tindakan Kurasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {talents.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <strong className="text-sm text-[#14213D] block">{t.name}</strong>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{t.headline}</span>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">
                    {t.category}
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {t.city}
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-semibold">
                    {t.experience} Tahun
                  </td>
                  <td className="py-4 px-4">
                    {t.status === 'pending' && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Menunggu Tinjauan
                      </span>
                    )}
                    {t.status === 'verified' && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                        <Check className="w-3 h-3" /> Terverifikasi
                      </span>
                    )}
                    {t.status === 'rejected' && (
                      <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                        Ditolak
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {t.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => updateStatus(t.id, 'verified')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Setujui</span>
                          </button>
                          <button
                            onClick={() => updateStatus(t.id, 'rejected')}
                            className="bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors border border-red-200"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Tolak</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Selesai diproses
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
