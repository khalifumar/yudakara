import { NextResponse } from 'next/server';
import { getStudios } from '@/lib/data/talentService';

export async function GET() {
  try {
    const studios = await getStudios();
    return NextResponse.json({
      data: studios,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: { message: 'Gagal memuat direktori sanggar', details: String(error) } },
      { status: 500 }
    );
  }
}
