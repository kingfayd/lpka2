
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const pejabat = await prisma.pejabat.findUnique({
            where: { id },
        });

        if (!pejabat) {
            return NextResponse.json(
                { error: 'Pejabat tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json(pejabat);
    } catch (error) {
        console.error('Error fetching pejabat:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data pejabat' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { nama, jabatan, fotoUrl, urutan } = body;

        const pejabat = await prisma.pejabat.update({
            where: { id },
            data: {
                nama,
                jabatan,
                fotoUrl,
                urutan: urutan !== undefined ? urutan : undefined,
            },
        });

        return NextResponse.json(pejabat);
    } catch (error) {
        console.error('Error updating pejabat:', error);
        return NextResponse.json(
            { error: 'Gagal mengupdate data pejabat' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.pejabat.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Data pejabat berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting pejabat:', error);
        return NextResponse.json(
            { error: 'Gagal menghapus data pejabat' },
            { status: 500 }
        );
    }
}
