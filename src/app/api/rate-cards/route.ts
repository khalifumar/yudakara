import { NextResponse } from 'next/server';
import { getRateCards } from '@/lib/data/talentService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryIdStr = searchParams.get('categoryId');
    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : undefined;

    const rateCards = await getRateCards(categoryId);
    return NextResponse.json({
      data: rateCards,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: { message: 'Gagal memuat rate card', details: String(error) } },
      { status: 500 }
    );
  }
}
