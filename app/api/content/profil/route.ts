import { NextRequest, NextResponse } from 'next/server';
import { getProfilContent, updateProfilContent } from '@/lib/content';
import { verifyToken } from '@/lib/auth';

function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  const cookieToken = request.cookies.get('adminToken')?.value;
  return cookieToken || null;
}

// GET profil content
export async function GET(request: NextRequest) {
  try {
    const content = await getProfilContent();
    const response = NextResponse.json(content, { status: 200 });
    
    // Disable caching completely
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data profil' },
      { status: 500 }
    );
  }
}

// PUT update profil content (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Verify admin token
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Tidak terautentikasi' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, deskripsi, visi, misi, tugasFungsi } = body;

    if (!title || !deskripsi || !visi || !misi || !tugasFungsi) {
      return NextResponse.json(
        { error: 'Semua field diperlukan' },
        { status: 400 }
      );
    }

    const updated = await updateProfilContent({
      title,
      deskripsi,
      visi,
      misi,
      tugasFungsi,
    });

    return NextResponse.json(
      { message: 'Profil berhasil diupdate', data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profil:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate profil' },
      { status: 500 }
    );
  }
}
