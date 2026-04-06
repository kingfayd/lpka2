export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getProfilContent, updateProfilContent } from '@/lib/content'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const content = await getProfilContent()

    const response = NextResponse.json(content, { status: 200 })

    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response
  } catch (error) {
    console.error('Error fetching profil:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data profil' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {

    const body = await request.json()
    const { title, deskripsi, visi, misi, tugasFungsi } = body

    if (!title || !deskripsi || !visi || !misi || !tugasFungsi) {
      return NextResponse.json(
        { error: 'Semua field diperlukan' },
        { status: 400 }
      )
    }

    const updated = await updateProfilContent({
      title,
      deskripsi,
      visi,
      misi,
      tugasFungsi,
    })

    return NextResponse.json(
      { message: 'Profil berhasil diupdate', data: updated },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating profil:', error)
    return NextResponse.json(
      { error: 'Gagal mengupdate profil' },
      { status: 500 }
    )
  }
}