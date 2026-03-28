import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const body = await request.json();
        const item = await prisma.layananItem.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: 'Gagal mengupdate' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.layananItem.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Berhasil dihapus' });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal menghapus' }, { status: 500 });
    }
}
