import { NextResponse } from 'next/server';
import { getTalentBySlug } from '@/lib/data/talentService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const talent = await getTalentBySlug(slug);

    if (!talent) {
      return NextResponse.json(
        { data: null, error: { message: 'Talent tidak ditemukan' } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: talent,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: { message: 'Gagal mengambil data', details: String(error) } },
      { status: 500 }
    );
  }
}
