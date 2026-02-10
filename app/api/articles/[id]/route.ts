
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const article = await prisma.article.findUnique({
            where: { id },
        });

        if (!article) {
            return NextResponse.json(
                { error: 'Artikel tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil artikel' },
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
        const { title, content, imageUrl } = body;

        const article = await prisma.article.update({
            where: { id },
            data: {
                title,
                content,
                imageUrl,
            },
        });

        return NextResponse.json(article);
    } catch (error) {
        console.error('Error updating article:', error);
        return NextResponse.json(
            { error: 'Gagal mengupdate artikel' },
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

        await prisma.article.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Artikel berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json(
            { error: 'Gagal menghapus artikel' },
            { status: 500 }
        );
    }
}
