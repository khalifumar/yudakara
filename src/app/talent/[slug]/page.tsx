import React from 'react';
import { notFound } from 'next/navigation';
import { getTalentBySlug } from '@/lib/data/talentService';
import TalentDetailClient from './TalentDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const talent = await getTalentBySlug(slug);

  if (!talent) {
    return { title: 'Talent Tidak Ditemukan — Yudakara' };
  }

  return {
    title: `${talent.display_name} — Profil Seniman Yudakara`,
    description: talent.headline || `Profil dan portofolio resmi ${talent.display_name} di platform Yudakara.`,
  };
}

export default async function TalentDetailPage({ params }: Props) {
  const { slug } = await params;
  const talent = await getTalentBySlug(slug);

  if (!talent) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <TalentDetailClient talent={talent} />
    </main>
  );
}
