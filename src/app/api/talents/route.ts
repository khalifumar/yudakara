import { NextResponse } from 'next/server';
import { getTalents } from '@/lib/data/talentService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get('kategori') || undefined;
    const kota = searchParams.get('kota') || undefined;
    const q = searchParams.get('q') || undefined;

    const talents = await getTalents({ kategori, kota, q });
    return NextResponse.json({
      data: talents,
      total: talents.length,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: { message: 'Gagal memuat data talent', details: String(error) } },
      { status: 500 }
    );
  }
}
