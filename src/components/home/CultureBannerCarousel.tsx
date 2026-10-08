'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function CultureBannerCarousel() {
  const cards = [
    {
      title: 'Kriya Batik Tulis Masterpiece',
      category: 'KRIYA & WASHTRA',
      desc: 'Kolaborasi desain motif orisinil dan kain canting halus dengan perlindungan kredit seniman.',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80',
      tag: 'Rate Card Terstandar',
      href: '/talent?kategori=kriya-batik',
    },
    {
      title: 'Pentas Tari & Koreografi Panggung',
      category: 'SENI PERTUNJUKAN',
      desc: 'Penari klasik keraton, tari daerah, dan koreografer gala event resmi skala korporat.',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
      tag: 'Kurasi Profesional',
      href: '/talent?kategori=seni-tari',
    },
    {
      title: 'Dalang & Pementasan Wayang',
      category: 'PEDALANGAN NUSANTARA',
      desc: 'Pakeliran wayang kulit purwa dan golek dengan kemasan edukasi maupun hiburan modern.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80',
      tag: 'Paket Komplit Gamelan',
      href: '/talent?kategori=seni-wayang',
    },
    {
      title: 'Konsultasi Budaya & Riset Brand',
      category: 'KURATORIAL & HKI',
      desc: 'Validasi makna filosofi motif adat untuk kampanye komersial, bebas risiko salah interpretasi.',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80',
      tag: 'Mitigasi Risiko',
      href: '/talent?kategori=konsultan-budaya',
    },
    {
      title: 'Direktori Sanggar & Komunitas Seni',
      category: 'EKOSISTEM SANGGAR',
      desc: 'Temukan sentra pelestarian budaya, padepokan kriya, dan studio seni di berbagai penjuru nusantara.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
      tag: 'Terhubung Langsung',
      href: '/sanggar',
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold text-[#E0452F] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Sorotan Keahlian Budaya
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#14213D] mt-1">
            Layanan Budaya Berkualitas & Terpercaya
          </h2>
        </div>
        <Link
          href="/talent"
          className="text-xs font-bold text-[#14213D] hover:text-[#E0452F] flex items-center gap-1 transition-colors self-start sm:self-auto"
        >
          <span>Lihat Semua Layanan</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Cultural Highlight Cards (Matching Dinas Kebudayaan Rounded Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group institutional-card rounded-2xl overflow-hidden flex flex-col justify-between border border-[#DFE6D8] shadow-sm hover:shadow-xl transition-all"
          >
            {/* Image Header with Badge */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Category Tag on top of image */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#14213D] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                {item.category}
              </div>

              {/* Tag pill at bottom of image */}
              <div className="absolute bottom-3 left-3 text-white text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E0452F]" />
                <span className="text-[11px] font-medium">{item.tag}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="font-bold text-[#14213D] text-sm group-hover:text-[#E0452F] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#14213D]">
                <span>Lihat Selengkapnya</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E0452F]" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
