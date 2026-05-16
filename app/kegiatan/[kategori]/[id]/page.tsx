'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface KegiatanItem {
  id: string;
  title: string;
  deskripsi?: string;
  imageUrl: string;
  imageUrls?: string[];
  kategori: string;
}

const categoryNames: Record<string, string> = {
  perikanan: 'Perikanan',
  pertanian: 'Pertanian',
  pendidikan: 'Pendidikan',
  keagamaan: 'Keagamaan',
};

export default function KegiatanDetailPage() {
  const params = useParams();
  const kategori = params?.kategori as string;
  const id = params?.id as string;

  const [item, setItem] = useState<KegiatanItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/kegiatan/${id}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data?.error || 'Gagal memuat item kegiatan');
        }
        setItem(await res.json());
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        setError((fetchError as Error).message || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const categoryLabel = categoryNames[kategori?.toLowerCase()] || 'Kegiatan';

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-sm text-gray-600 space-x-2">
          <Link href="/kegiatan" className="underline hover:text-gray-900">
            Kegiatan
          </Link>
          <span>/</span>
          <Link href={`/kegiatan/${kategori}`} className="underline hover:text-gray-900">
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">Detail Program</span>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-12 text-center text-gray-500">
            Memuat detail kegiatan...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white border border-red-200 shadow-sm p-12 text-center text-red-600">
            {error}
          </div>
        ) : !item ? (
          <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-12 text-center text-gray-500">
            Program kegiatan tidak ditemukan.
          </div>
        ) : (
          <div className="space-y-10">
            <div className="rounded-4xl bg-white border border-gray-200 shadow-xl p-8">
              <div className="flex flex-col gap-6 md:gap-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-blue-600">{categoryLabel}</p>
                  <h1 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h1>
                </div>

                <div>
                  <Link href={`/kegiatan/${kategori}`} className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors">
                    Kembali ke {categoryLabel}
                  </Link>
                </div>
              </div>
            </div>

            <section className="max-w-4xl mx-auto w-full">
              <div className="space-y-8">
                <div className="rounded-4xl overflow-hidden bg-white border border-gray-200 shadow-xl">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-120 object-cover"
                    />
                  ) : (
                    <div className="min-h-80 flex items-center justify-center bg-gray-100 text-gray-500">
                      Tidak ada gambar utama
                    </div>
                  )}
                </div>

                <div className="rounded-4xl bg-white border border-gray-200 shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Deskripsi Lengkap</h2>
                  <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                    {item.deskripsi || 'Deskripsi program belum tersedia.'}
                  </p>
                </div>

                {item.imageUrls && item.imageUrls.length > 0 && (
                  <div className="rounded-4xl bg-white border border-gray-200 shadow-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-slate-900">Galeri Foto</h2>
                      <span className="text-sm text-gray-500">{item.imageUrls.length} foto</span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {item.imageUrls.map((url, index) => (
                        <div key={index} className="overflow-hidden rounded-3xl bg-slate-100 shadow-sm">
                          <img src={url} alt={`${item.title} foto ${index + 1}`} className="w-full h-64 object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
