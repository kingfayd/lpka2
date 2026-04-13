import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get('kategori');

    if (!kategori) {
      return NextResponse.json({ error: 'Kategori diperlukan' }, { status: 400 });
    }

    const items = await prisma.kegiatanItem.findMany({
      where: { kategori },
      orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching kegiatan items:', error);
    return NextResponse.json({ error: 'Gagal mengambil item kegiatan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kategori, title, deskripsi, imageUrl, imageUrls, urutan } = body;

    if (!kategori || !title || !imageUrl) {
      return NextResponse.json({ error: 'Kategori, title, dan imageUrl wajib diisi' }, { status: 400 });
    }

    const item = await prisma.kegiatanItem.create({
      data: {
        kategori,
        title,
        deskripsi,
        imageUrl,
        imageUrls: imageUrls || [],
        urutan: urutan ? parseInt(urutan) : 0,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating kegiatan item:', error);
    return NextResponse.json({ error: 'Gagal membuat item kegiatan' }, { status: 500 });
  }
}
