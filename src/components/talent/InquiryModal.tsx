'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Talent } from '@/types/database';

interface InquiryModalProps {
  talent: Talent;
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ talent, isOpen, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_company: '',
    service_requested: talent.talent_services?.[0]?.custom_title || '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          talent_id: talent.id,
          ...formData,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || 'Gagal mengirim pesan');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-[#14213D]">
              Brief Proyek Terkirim!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Permintaan Anda telah kami teruskan ke <strong>{talent.display_name}</strong> dan tim kurator Yudakara. Tim kami akan menghubungi Anda melalui email dalam 1x24 jam kerja.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-[#14213D] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#E0452F] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Formulir Kolaborasi Resmi
              </span>
              <h3 className="text-xl font-black text-[#14213D] mt-1">
                Ajukan Pertanyaan / Proyek
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Menghubungi seniman: <strong>{talent.display_name}</strong> ({talent.city})
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Anda / Penanggung Jawab *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Misal: Budi Pratama"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Kontak *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    placeholder="nama@perusahaan.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Instansi / Brand (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.client_company}
                    onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                    placeholder="PT / EO / Sanggar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Layanan yang Diminati
                </label>
                <select
                  value={formData.service_requested}
                  onChange={(e) => setFormData({ ...formData, service_requested: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D] bg-white cursor-pointer"
                >
                  <option value="">Pilih Kebutuhan Layanan</option>
                  {talent.talent_services?.map((svc, idx) => (
                    <option key={idx} value={svc.custom_title}>
                      {svc.custom_title} (Rp {svc.price.toLocaleString('id-ID')})
                    </option>
                  ))}
                  <option value="Konsultasi Kustom / Kolaborasi Baru">
                    Konsultasi Kustom / Kolaborasi Baru
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detail Rencana Proyek / Pertanyaan *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Jelaskan kebutuhan acara, jadwal, cakupan karya yang diinginkan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14213D]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E0452F] hover:bg-[#c53723] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Mengirim...' : 'Kirim Brief & Ajukan Penawaran'}</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  🔒 Data Anda terlindungi. Dilengkapi pendampingan kontrak digital baku Yudakara.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
