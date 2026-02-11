
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const pejabat = await prisma.pejabat.findMany({
            orderBy: {
                urutan: 'asc',
            },
        });
        return NextResponse.json(pejabat);
    } catch (error) {
        console.error('Error fetching pejabat:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data pejabat' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { nama, jabatan, fotoUrl, urutan } = body;

        if (!nama || !jabatan) {
            return NextResponse.json(
                { error: 'Nama dan Jabatan wajib diisi' },
                { status: 400 }
            );
        }

        const pejabat = await prisma.pejabat.create({
            data: {
                nama,
                jabatan,
                fotoUrl,
                urutan: urutan || 0,
            },
        });

        return NextResponse.json(pejabat, { status: 201 });
    } catch (error) {
        console.error('Error creating pejabat:', error);
        return NextResponse.json(
            { error: 'Gagal menambahkan pejabat' },
            { status: 500 }
        );
    }
}
