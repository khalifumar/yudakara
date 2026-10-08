import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#E7ECDF] text-[#192024] border-t border-[#D5DDD0] pt-14 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Social Media Rounded Pills Bar (Matching Dinas Kebudayaan Screenshot) */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Yudakara"
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-[#D0D9C8] flex items-center justify-center text-[#14213D] hover:bg-[#14213D] hover:text-white hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X Yudakara"
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-[#D0D9C8] flex items-center justify-center text-[#14213D] hover:bg-[#14213D] hover:text-white hover:scale-105 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Yudakara"
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-[#D0D9C8] flex items-center justify-center text-[#14213D] hover:bg-[#14213D] hover:text-white hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube Yudakara"
            className="w-11 h-11 rounded-full bg-white shadow-sm border border-[#D0D9C8] flex items-center justify-center text-[#14213D] hover:bg-[#14213D] hover:text-white hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* 3 Main Institutional Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#D5DDD0]">
          {/* Kolom 1: Tentang Kami */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E0452F] flex items-center justify-center text-white font-extrabold text-base">
                Y
              </div>
              <span className="font-bold text-xl tracking-tight text-[#14213D]">
                yudakara
              </span>
            </div>
            <h3 className="text-base font-bold text-[#14213D]">Tentang Yudakara</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Yudakara adalah platform marketplace jasa kreatif terkurasi yang menghubungkan seniman dan pengrajin budaya tradisional Indonesia dengan brand, event organizer, dan pelaku industri kreatif modern melalui standar tarif berkeadilan (<em>fair pay</em>) serta kontrak digital yang menjamin hak cipta.
            </p>
            <div className="pt-2">
              <span className="inline-block bg-white border border-[#CDD7C4] text-[#14213D] px-3 py-1 rounded-md text-xs font-semibold">
                Kategori Budaya & Industri Kreatif Nusantara
              </span>
            </div>
          </div>

          {/* Kolom 2: Direktori & Tautan Cepat */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-base font-bold text-[#14213D]">Direktori & Layanan</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/talent" className="hover:text-[#E0452F] transition-colors">
                  Direktori Seniman Terverifikasi
                </Link>
              </li>
              <li>
                <Link href="/sanggar" className="hover:text-[#E0452F] transition-colors">
                  Direktori Sanggar & Komunitas
                </Link>
              </li>
              <li>
                <Link href="/rate-card" className="hover:text-[#E0452F] transition-colors">
                  Acuan Tarif Standar (Fair Pay)
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-[#E0452F] transition-colors">
                  Visi & Latar Belakang Kami
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#E0452F] transition-colors">
                  Portal Kurator & Tim Verifikasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Alamat & Peta Lokasi */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-base font-bold text-[#14213D]">Sekretariat & Hub Ekosistem</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sentra Kreatif Budaya Nusantara, Lt. 3<br />
              Jl. Kebudayaan No. 18, Jakarta Selatan, DKI Jakarta 12950
            </p>

            {/* Google Maps Visual Box (Matching Dinas Kebudayaan Footer Screenshot) */}
            <div className="bg-white p-3 rounded-xl border border-[#D0D9C8] shadow-sm">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E0452F]" /> Lokasi Hub Kemitraan
                </span>
                <span className="text-[11px] text-blue-600 flex items-center gap-0.5 hover:underline cursor-pointer">
                  Buka di Maps <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <div className="w-full h-24 rounded-lg bg-[#E2E8F0] relative overflow-hidden flex items-center justify-center text-xs text-slate-500 border border-slate-200">
                <div className="text-center p-2">
                  <span className="font-semibold text-slate-700">Hub Kurasi Budaya Yudakara</span>
                  <p className="text-[10px] text-slate-400">Jakarta Cultural Hub • Navigasi GPS Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Copyright © 2026 <strong>Yudakara Indonesia</strong>. All Rights Reserved.
          </p>
          <p className="text-[11px] text-slate-400">
            Terinspirasi nilai keluhuran budaya nusantara & standar keterbukaan informasi publik.
          </p>
        </div>
      </div>
    </footer>
  );
}
