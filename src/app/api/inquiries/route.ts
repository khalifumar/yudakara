import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const inquirySchema = z.object({
  talent_id: z.string().min(1, 'ID seniman wajib diisi'),
  client_name: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  client_email: z.string().email('Format email tidak valid'),
  client_company: z.string().optional(),
  service_requested: z.string().optional(),
  message: z.string().min(10, 'Pesan detail proyek minimal 10 karakter').max(2000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => null);
    const parsed = inquirySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: 'Validasi form gagal',
            details: parsed.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.from('inquiries').insert({
        talent_id: parsed.data.talent_id,
        client_name: parsed.data.client_name,
        client_email: parsed.data.client_email,
        client_company: parsed.data.client_company || null,
        service_requested: parsed.data.service_requested || null,
        message: parsed.data.message,
      });

      if (error) {
        return NextResponse.json(
          { data: null, error: { message: 'Gagal menyimpan ke database', details: error.message } },
          { status: 500 }
        );
      }
    }

    // Berhasil disimpan (atau simulasi sukses pada mode mock)
    return NextResponse.json(
      {
        data: {
          success: true,
          message: 'Pertanyaan & penawaran proyek Anda berhasil dikirim ke seniman!',
          submittedAt: new Date().toISOString(),
        },
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, error: { message: 'Terjadi kesalahan server internal', details: String(error) } },
      { status: 500 }
    );
  }
}
