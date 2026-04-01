export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getKegiatanContent, updateKegiatanContent, KategoriKegiatan } from '@/lib/content';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ kategori: string }> }
) {
  try {
    const resolvedParams = await params;
    const kategori = resolvedParams.kategori as KategoriKegiatan;
    const content = await getKegiatanContent(kategori);

    const response = NextResponse.json(content, { status: 200 });

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error fetching kegiatan content:', error);
    return NextResponse.json({ error: 'Gagal mengambil data konten kegiatan' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ kategori: string }> }
) {
  try {
    const resolvedParams = await params;
    const kategori = resolvedParams.kategori as KategoriKegiatan;
    const body = await request.json();
    const { title, deskripsi } = body;

    if (!title || !deskripsi) {
      return NextResponse.json({ error: 'Semua field diperlukan (title, deskripsi)' }, { status: 400 });
    }

    const updated = await updateKegiatanContent(kategori, { title, deskripsi });

    return NextResponse.json({ message: 'Konten kegiatan berhasil diupdate', data: updated }, { status: 200 });
  } catch (error) {
    console.error('Error updating kegiatan content:', error);
    return NextResponse.json({ error: 'Gagal mengupdate konten kegiatan' }, { status: 500 });
  }
}
