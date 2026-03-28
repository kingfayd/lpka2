import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    try {
        const items = await prisma.layananItem.findMany({
            where: type ? { type } : undefined,
            orderBy: { urutan: 'asc' },
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { title, deskripsi, fotoUrl, type, urutan } = body;

        const item = await prisma.layananItem.create({
            data: { title, deskripsi, fotoUrl, type, urutan: urutan || 0 },
        });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal membuat data' }, { status: 500 });
    }
}
