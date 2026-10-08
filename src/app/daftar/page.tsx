'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ShieldCheck, User, Mail, Lock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DaftarPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    discipline: 'kriya-batik',
    city: '',
    experienceYears: '5',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const supabase = createClient();
    if (!supabase) {
      // Demo mode fallback
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 600);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          city: formData.city,
          discipline: formData.discipline,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-[#14213D]">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Akun talent Anda telah dibuat dengan status <strong>Pending (Menunggu Kurasi)</strong>. Tim kurator budaya Yudakara akan meninjau kelayakan profil Anda sesuai Key Activity #1 BMC.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-block bg-[#14213D] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors"
              >
                Lanjut ke Dashboard Talent
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center space-y-2 mb-6">
              <span className="text-[11px] font-bold text-[#E0452F] uppercase tracking-wider bg-[#FDEAE6] px-3 py-1 rounded-full">
                ONBOARDING TALENT BUDAYA
              </span>
              <h1 className="text-2xl font-black text-[#14213D]">
                Daftar sebagai Seniman / Pengrajin
              </h1>
              <p className="text-xs text-slate-500">
                Langkah pertama menuju pengakuan keahlian dengan standar tarif layak.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap / Nama Panggung *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Misal: Ki Anom Suroto / Siti Rahayu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Aktif *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seniman@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kata Sandi (min. 8 huruf) *</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Disiplin Budaya Utama</label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D] bg-white cursor-pointer"
                  >
                    <option value="kriya-batik">Kriya & Batik Tulis</option>
                    <option value="seni-tari">Penari & Koreografer</option>
                    <option value="seni-wayang">Dalang & Wayang</option>
                    <option value="konsultan-budaya">Konsultan Budaya</option>
                    <option value="kriya-ukir">Pengukir Kayu / Logam</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kota Domisili</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Misal: Solo, Rembang, Yogyakarta"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E0452F] hover:bg-[#c53723] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{loading ? 'Mendaftarkan...' : 'Kirim Pendaftaran Talent'}</span>
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
              Sudah punya akun?{' '}
              <Link href="/masuk" className="font-bold text-[#14213D] hover:underline">
                Masuk di sini
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
