'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  Clock,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  ExternalLink,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'profil' | 'portofolio' | 'pesan'>('profil');

  // Local state for interactive editing in dashboard
  const [profile, setProfile] = useState({
    name: 'Ki Warsito & Sanggar Lasem Asri',
    headline: 'Empu Batik Tulis Motif Tiga Negeri & Pewarna Alami',
    city: 'Rembang',
    province: 'Jawa Tengah',
    whatsapp: '6281234567890',
    bio: 'Pewaris generasi ketiga tradisi batik pesisir Lasem. Mempertahankan teknik mori primissima dengan canting 0.3mm dan fermentasi tarum alami.',
    status: 'verified', // 'pending' | 'verified'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#14213D] text-white p-6 md:p-8 rounded-3xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              Ruang Kerja Seniman Budaya
            </span>
            {profile.status === 'verified' ? (
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi Kurator
              </span>
            ) : (
              <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Menunggu Kurasi
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black mt-2">
            Selamat Datang, {profile.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Kelola profil keahlian, sesuaikan standar rate card, dan respon penawaran kolaborasi klien.
          </p>
        </div>

        <Link
          href="/talent/nyoman-sukardi-batik-lasem"
          target="_blank"
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 flex items-center gap-1.5 transition-colors self-start md:self-auto"
        >
          <span>Lihat Profil Publik</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'profil', label: 'Profil & Bio', icon: User },
          { id: 'portofolio', label: 'Koleksi Portofolio', icon: ImageIcon },
          { id: 'pesan', label: 'Brief Proyek Masuk', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#14213D] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile & Bio Editor */}
      {activeTab === 'profil' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm max-w-3xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#14213D]">
              Pengaturan Profil Seniman
            </h2>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Perubahan Berhasil Disimpan!
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nama Panggung / Sanggar
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Headline Keahlian (Ditampilkan di Kartu)
              </label>
              <input
                type="text"
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kota Domisili</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp Resmi</label>
                <input
                  type="text"
                  value={profile.whatsapp}
                  onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Biografi, Tradisi, & Filosofi Karya
              </label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#E0452F] hover:bg-[#c53723] text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm"
            >
              Simpan Perubahan Profil
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Portfolio Gallery */}
      {activeTab === 'portofolio' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#14213D]">Karya Terunggah</h2>
              <p className="text-xs text-slate-500">Maksimal 6 karya unggulan untuk kurasi.</p>
            </div>
            <button className="bg-[#14213D] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
              <Plus className="w-3.5 h-3.5" />
              <span>Unggah Karya Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <img
                src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&q=80"
                alt="Karya 1"
                className="h-40 w-full object-cover"
              />
              <div className="p-3">
                <span className="font-bold text-xs text-[#14213D] block">Batik Sutra Tiga Negeri</span>
                <span className="text-[10px] text-slate-500">Tahun 2025</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <img
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80"
                alt="Karya 2"
                className="h-40 w-full object-cover"
              />
              <div className="p-3">
                <span className="font-bold text-xs text-[#14213D] block">Motif Sekar Jagad Kontemporer</span>
                <span className="text-[10px] text-slate-500">Tahun 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Incoming Inquiries */}
      {activeTab === 'pesan' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#14213D]">
            Daftar Brief & Penawaran Klien
          </h2>

          <div className="divide-y divide-slate-100">
            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#14213D]">
                  PT Kreatif Nusantara Mandiri (Jakarta)
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Baru Diterima
                </span>
              </div>
              <p className="text-xs text-slate-600">
                "Kami merencanakan koleksi kemeja etnik edisi kemerdekaan dan membutuhkan 2 motif batik orisinil dengan filosofi persatuan pesisir."
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>Kontak: budi@kreatifnusantara.co.id</span>
                <span>•</span>
                <span>Hari ini, 10:45 WIB</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
