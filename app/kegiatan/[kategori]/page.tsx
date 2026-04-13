'use client';

import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
    };
    return map[kategori?.toLowerCase()] || 'Kegiatan';
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <section className="w-full bg-white pt-32 pb-16 flex-grow">
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
                      <div key={item.id} className="flex flex-col gap-8">
                        {/* Main Layout Zig-Zag */}
                        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
                          {/* Main Image */}
                          <div className="w-full lg:w-1/2">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                  No Image
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="w-full lg:w-1/2 space-y-6">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                              {item.title}
                            </h2>
                            {item.deskripsi && (
                              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                                {item.deskripsi}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Extra Gallery / Gallery Tambahan */}
                        {item.imageUrls && item.imageUrls.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Galeri Dokumentasi Program</h4>
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                              {item.imageUrls.map((url, idx) => (
                                <div key={idx} className="snap-start shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-md group">
                                  <img
                                    src={url}
                                    alt={`${item.title} foto ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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
      
      <Footer />
    </main>
  );
}
