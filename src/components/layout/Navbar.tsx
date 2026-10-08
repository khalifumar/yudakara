'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck, User, Compass, BookOpen, Building2 } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Direktori Seniman', href: '/talent', icon: Compass },
    { label: 'Direktori Sanggar', href: '/sanggar', icon: Building2 },
    { label: 'Standar Rate Card', href: '/rate-card', icon: BookOpen },
    { label: 'Tentang Kami', href: '/tentang' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-3 z-40 px-4 md:px-8 py-2">
      <div className="max-w-7xl mx-auto">
        {/* Floating Glass Pill Container */}
        <div className="glass-pill rounded-full px-5 py-3 flex items-center justify-between shadow-lg">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#E0452F] flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              <span>Y</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-[#14213D] leading-none">
                yudakara
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E0452F]">
                Jasa Kreatif Budaya
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F4F6F1] px-3 py-1.5 rounded-full border border-[#E0E6DA]">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#14213D] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#14213D] hover:bg-white/80'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/masuk"
              className="text-xs font-bold text-[#14213D] px-4 py-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/daftar"
              className="flex items-center gap-1.5 bg-[#E0452F] hover:bg-[#c53723] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Daftar Talent</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#14213D] hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive(item.href)
                    ? 'bg-[#14213D] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <Link
                href="/masuk"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-[#14213D] bg-slate-100"
              >
                Masuk
              </Link>
              <Link
                href="/daftar"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-[#E0452F]"
              >
                Daftar Talent Budaya
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
