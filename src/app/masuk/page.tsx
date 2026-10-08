'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, Sparkles, UserCheck, KeyRound, Info } from 'lucide-react';

export default function MasukPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    setIsSupabaseConnected(!!supabase);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const supabase = createClient();
    if (!supabase) {
      // Supabase credentials not set yet -> login directly to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        setErrorMsg('Email belum dikonfirmasi. Silakan cek kotak masuk email Anda, atau nonaktifkan pengaturan "Confirm email" di Dashboard Supabase (Authentication -> Providers -> Email).');
      } else if (error.message.includes('Invalid login credentials')) {
        setErrorMsg('Email atau kata sandi salah. Jika belum pernah mendaftar, silakan buat akun di halaman Daftar terlebih dahulu, atau gunakan opsi Akun Demo di bawah.');
      } else {
        setErrorMsg(error.message);
      }
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const handleQuickDemoLogin = (role: 'talent' | 'admin') => {
    setLoading(true);
    setTimeout(() => {
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }, 400);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#14213D] text-white rounded-2xl flex items-center justify-center mx-auto text-xl font-black shadow-md">
            Y
          </div>
          <h1 className="text-2xl font-black text-[#14213D]">Masuk ke Yudakara</h1>
          <p className="text-xs text-slate-500">
            Kelola profil keahlian budaya, portofolio, dan brief proyek.
          </p>
        </div>

        {/* Info banner about Supabase connection state */}
        {!isSupabaseConnected ? (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Mode Demo Lokal Aktif</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Database Supabase belum dihubungkan ke <code>.env.local</code>. Anda bisa langsung mencoba fitur dengan tombol <strong>Akses Cepat Demo</strong> di bawah!
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Terhubung ke Supabase Cloud Database.</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* 1-Click Fast Demo Login Buttons */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
            — PILIHAN AKSES CEPAT (DEMO & TESTING) —
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('talent')}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#14213D] text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#E0452F]" />
              <span>Akun Seniman</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#14213D] text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200"
            >
              <KeyRound className="w-3.5 h-3.5 text-blue-600" />
              <span>Akun Kurator</span>
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[11px] font-medium text-slate-400">atau login dengan email</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seniman@email.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#14213D] hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-xs disabled:opacity-50"
          >
            <span>{loading ? 'Memproses...' : 'Masuk ke Akun'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
          Belum memiliki profil seniman?{' '}
          <Link href="/daftar" className="font-bold text-[#E0452F] hover:underline">
            Daftar di sini
          </Link>
        </div>
      </div>
    </main>
  );
}
