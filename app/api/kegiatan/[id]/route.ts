import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const item = await prisma.kegiatanItem.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching kegiatan item:', error);
    return NextResponse.json({ error: 'Gagal mengambil item kegiatan' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { title, deskripsi, imageUrl, imageUrls, urutan } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title wajib diisi' }, { status: 400 });
    }

    const item = await prisma.kegiatanItem.update({
      where: { id: resolvedParams.id },
      data: {
        title,
        deskripsi,
        imageUrl,
        imageUrls: imageUrls || [],
        urutan: urutan ? parseInt(urutan) : 0,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating kegiatan item:', error);
    return NextResponse.json({ error: 'Gagal mengupdate item kegiatan' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await prisma.kegiatanItem.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json({ message: 'Item kegiatan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting kegiatan item:', error);
    return NextResponse.json({ error: 'Gagal menghapus item kegiatan' }, { status: 500 });
  }
}
