import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

function getTokenFromRequest(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }
    return request.cookies.get('adminToken')?.value || null;
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = getTokenFromRequest(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const body = await request.json();
        const item = await prisma.layananItem.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: 'Gagal mengupdate' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = getTokenFromRequest(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        await prisma.layananItem.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Berhasil dihapus' });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal menghapus' }, { status: 500 });
    }
}
