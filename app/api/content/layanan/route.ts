import { NextRequest, NextResponse } from 'next/server';
import { getLayananContent, updateLayananContent } from '@/lib/content';
import { verifyToken } from '@/lib/auth';

function getTokenFromRequest(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }
    return request.cookies.get('adminToken')?.value || null;
}

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
        const token = getTokenFromRequest(request);
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const body = await request.json();
        const updated = await updateLayananContent(body);
        return NextResponse.json({ message: 'Berhasil diupdate', data: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal mengupdate' }, { status: 500 });
    }
}
