import { NextRequest, NextResponse } from 'next/server';
import { getLayananContent, updateLayananContent } from '@/lib/content';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        const content = await getLayananContent();
        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {

        const body = await request.json();
        const updated = await updateLayananContent(body);
        return NextResponse.json({ message: 'Berhasil diupdate', data: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal mengupdate' }, { status: 500 });
    }
}
