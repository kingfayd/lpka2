import { NextRequest, NextResponse } from 'next/server';
import { getSambutanContent, updateSambutanContent } from '@/lib/content';
import { verifyToken } from '@/lib/auth';

function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  const cookieToken = request.cookies.get('adminToken')?.value;
  return cookieToken || null;
}

// GET sambutan content
export async function GET(request: NextRequest) {
  try {
    const content = await getSambutanContent();
    console.log('[API] Returning sambutan content:', content);
    
    const response = NextResponse.json(content, { status: 200 });
    
    // Disable caching completely
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('[API] Error getting sambutan:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data sambutan' },
      { status: 500 }
    );
  }
}

// PUT update sambutan content (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Verify admin token
    const token = getTokenFromRequest(request);
    console.log('[API] PUT request - Token:', token ? 'present' : 'missing');
    
    if (!token || !verifyToken(token)) {
      console.log('[API] PUT request - Auth failed');
      return NextResponse.json(
        { error: 'Tidak terautentikasi' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('[API] PUT request - Body:', body);
    
    const { fotoUrl, nama, jabatan, sambutan1, sambutan2, sambutan3 } = body;

    if (!fotoUrl || !nama || !jabatan || !sambutan1 || !sambutan2 || !sambutan3) {
      console.log('[API] PUT request - Missing fields');
      return NextResponse.json(
        { error: 'Semua field diperlukan' },
        { status: 400 }
      );
    }

    const updated = await updateSambutanContent({
      fotoUrl,
      nama,
      jabatan,
      sambutan1,
      sambutan2,
      sambutan3,
    });

    console.log('[API] PUT request - Updated successfully:', updated);

    return NextResponse.json(
      { message: 'Sambutan berhasil diupdate', data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] PUT request - Error:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate sambutan' },
      { status: 500 }
    );
  }
}
