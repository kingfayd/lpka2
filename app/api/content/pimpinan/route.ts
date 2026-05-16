import { NextRequest, NextResponse } from 'next/server';
import { getSambutanContent, updateSambutanContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const content = await getSambutanContent();
    
    const response = NextResponse.json(content, { status: 200 });
    
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error getting sambutan:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data sambutan' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {

    const body = await request.json();
    
    const { fotoUrl, nama, jabatan, sambutan } = body;

    if (!fotoUrl || !nama || !jabatan || !sambutan) {
      return NextResponse.json(
        { error: 'Semua field diperlukan' },
        { status: 400 }
      );
    }

    const updated = await updateSambutanContent({
      fotoUrl,
      nama,
      jabatan,
      sambutan,
    });

    return NextResponse.json(
      { message: 'Sambutan berhasil diupdate', data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating sambutan:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate sambutan' },
      { status: 500 }
    );
  }
}
