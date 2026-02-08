import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File harus berupa gambar' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file maksimal 5MB' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    // Sanitize filename
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const bucketName = 'uploads';

    // Convert file to buffer for upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase Upload Error:', uploadError);
      return NextResponse.json(
        { error: `Gagal upload ke Supabase: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filename);

    return NextResponse.json(
      {
        url: publicUrlData.publicUrl,
        filename,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Gagal upload file' },
      { status: 500 }
    );
  }
}
