'use client';

import React, { useState } from 'react';
import { Accessibility, ZoomIn, ZoomOut, Contrast, X } from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState(1);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.documentElement.classList.add('contrast-125');
    } else {
      document.documentElement.classList.remove('contrast-125');
    }
  };

  const changeFontSize = (delta: number) => {
    const newScale = Math.min(Math.max(fontSizeScale + delta, 0.9), 1.25);
    setFontSizeScale(newScale);
    document.documentElement.style.fontSize = `${newScale * 100}%`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="mb-3 p-4 bg-white rounded-2xl shadow-2xl border border-slate-200 w-64 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-blue-600" /> Aksesibilitas
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Ukuran Teks</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeFontSize(-0.05)}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200"
                  title="Kecilkan Teks"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1 text-[11px] font-mono">{Math.round(fontSizeScale * 100)}%</span>
                <button
                  onClick={() => changeFontSize(0.05)}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200"
                  title="Perbesar Teks"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-600">Kontras Tinggi</span>
              <button
                onClick={toggleHighContrast}
                className={`p-1.5 rounded flex items-center gap-1 text-[11px] font-semibold ${
                  highContrast
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Contrast className="w-3.5 h-3.5" />
                <span>{highContrast ? 'Aktif' : 'Normal'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blue round floating accessibility button like Dinas Kebudayaan */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Menu Aksesibilitas"
        title="Menu Aksesibilitas Situs"
      >
        <Accessibility className="w-6 h-6" />
      </button>
    </div>
  );
}
