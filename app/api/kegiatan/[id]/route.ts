import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { title, deskripsi, imageUrl, urutan } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title wajib diisi' }, { status: 400 });
    }

    const item = await prisma.kegiatanItem.update({
      where: { id: resolvedParams.id },
      data: {
        title,
        deskripsi,
        imageUrl,
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
