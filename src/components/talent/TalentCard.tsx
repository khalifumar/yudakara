import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Star, Award, ArrowUpRight } from 'lucide-react';
import { Talent } from '@/types/database';

interface TalentCardProps {
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  // Format price helper
  const startingService = talent.talent_services && talent.talent_services.length > 0
    ? talent.talent_services[0]
    : null;

  const formattedPrice = startingService
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(startingService.price)
    : null;

  return (
    <div className="institutional-card rounded-2xl overflow-hidden bg-white border border-[#DCE4D5] shadow-sm flex flex-col justify-between group">
      {/* Card Header & Avatar */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
            <img
              src={talent.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'}
              alt={talent.display_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            {talent.verification_status === 'verified' && (
              <div
                className="absolute bottom-0 right-0 bg-[#E0452F] text-white p-0.5 rounded-tl-md shadow"
                title="Terverifikasi Kurator Yudakara"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E0452F] bg-[#FDEAE6] px-2 py-0.5 rounded">
                {talent.category?.name || 'Kriya & Tradisi'}
              </span>
              {talent.is_featured && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Unggulan
                </span>
              )}
            </div>

            <Link href={`/talent/${talent.slug}`}>
              <h3 className="font-extrabold text-base text-[#14213D] mt-1 group-hover:text-[#E0452F] transition-colors truncate">
                {talent.display_name}
              </h3>
            </Link>

            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{talent.city}, {talent.province}</span>
            </div>
          </div>
        </div>

        {/* Headline & Bio */}
        <p className="text-xs font-medium text-slate-700 mt-3.5 line-clamp-2">
          {talent.headline || 'Pelaku seni budaya tradisional nusantara berpengalaman.'}
        </p>

        {/* Portfolio Mini Preview Thumbnails */}
        {talent.portfolio_items && talent.portfolio_items.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Karya:</span>
            <div className="flex items-center gap-1.5 overflow-hidden">
              {talent.portfolio_items.slice(0, 3).map((item, idx) => (
                <div key={idx} className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              ))}
              {talent.portfolio_items.length > 3 && (
                <span className="text-[10px] text-slate-500 font-semibold ml-1">
                  +{talent.portfolio_items.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Starting Price & Link */}
      <div className="px-5 py-3.5 bg-[#FAFBF8] border-t border-[#EAEFE6] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-slate-500 block uppercase">
            Mulai Dari:
          </span>
          <span className="text-xs font-extrabold text-[#14213D]">
            {formattedPrice ? `${formattedPrice}` : 'Konsultasi Penawaran'}
          </span>
        </div>

        <Link
          href={`/talent/${talent.slug}`}
          className="flex items-center gap-1 text-xs font-bold text-[#E0452F] hover:text-[#14213D] transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xl"
        >
          <span>Profil Detail</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
