
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data artikel' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, imageUrl } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title dan Content wajib diisi' },
                { status: 400 }
            );
        }

        const article = await prisma.article.create({
            data: {
                title,
                content,
                imageUrl,
            },
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { error: 'Gagal membuat artikel' },
            { status: 500 }
        );
    }
}
