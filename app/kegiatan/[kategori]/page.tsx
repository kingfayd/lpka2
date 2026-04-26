'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

import { useEffect, useState } from 'react';

interface KegiatanContent {
  kategori: string;
  title: string;
  deskripsi: string;
}

interface KegiatanItem {
  id: string;
  title: string;
  deskripsi?: string;
  imageUrl: string;
  imageUrls?: string[];
}

export default function KegiatanPage() {
  const params = useParams();
  const kategori = params?.kategori as string;

  const [content, setContent] = useState<KegiatanContent | null>(null);
  const [items, setItems] = useState<KegiatanItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kategori) return;

    const fetchData = async () => {
      try {
        const [contentRes, itemsRes] = await Promise.all([
          fetch(`/api/content/kegiatan/${kategori}`),
          fetch(`/api/kegiatan?kategori=${kategori}`),
        ]);

        if (contentRes.ok) {
          setContent(await contentRes.json());
        }
        if (itemsRes.ok) {
          setItems(await itemsRes.json());
        }
      } catch (error) {
        console.error('Error fetching kegiatan data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kategori]);

  const generateTitle = (kategori: string) => {
    const map: Record<string, string> = {
      perikanan: 'Perikanan',
      pertanian: 'Pertanian',
      pendidikan: 'Pendidikan',
      keagamaan: 'Keagamaan',
      kewirausahaan: 'Kewirausahaan',
    };
    return map[kategori?.toLowerCase()] || 'Kegiatan';
  };

  return (
    <main className="min-h-screen flex flex-col">
      
      <section className="w-full bg-white pt-32 pb-16 grow">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
             <div className="flex justify-center items-center h-40">
               <span className="text-gray-500">Loading...</span>
             </div>
          ) : !content ? (
             <div className="flex justify-center items-center h-40">
               <span className="text-gray-500">Kategori kegiatan tidak ditemukan.</span>
             </div>
          ) : (
            <>
              {/* HEADER CONTENT */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-sans capitalize">
                {content.title || `Kegiatan ${generateTitle(kategori)}`}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-16 text-lg max-w-4xl">
                {content.deskripsi}
              </p>

              {/* DAFTAR PROGRAM / KEGIATAN */}
              <div className="space-y-24">
                {items.length > 0 ? (
                  items.map((item, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <Link key={item.id} href={`/kegiatan/${kategori}/${item.id}`} className="group block">
                        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-8 p-6 md:p-8 bg-white border border-gray-200 rounded-4xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden lg:h-[28rem]`}>
                          <div className="w-full lg:w-1/2 h-80 lg:h-full rounded-4xl overflow-hidden shadow-xl bg-gray-100 flex-shrink-0">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                Tidak ada gambar
                              </div>
                            )}
                          </div>

                          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6 h-full">
                            <div>
                              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
                                {item.title}
                              </h2>
                              {item.deskripsi ? (
                                <p className="mt-6 text-lg text-gray-600 leading-relaxed text-justify line-clamp-6">
                                  {item.deskripsi}
                                </p>
                              ) : (
                                <p className="mt-6 text-lg text-gray-600 leading-relaxed text-justify">
                                  Deskripsi belum tersedia.
                                </p>
                              )}
                            </div>

                            <div className="mt-auto">
                              <span className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                                Baca Selengkapnya
                                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                    <p className="text-gray-500 text-lg">
                      Belum ada dokumentasi program untuk kegiatan ini.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
