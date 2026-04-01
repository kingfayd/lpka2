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

              {/* GALERI ITEM */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/95 border border-gray-100/50 rounded-3xl shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col"
                    >
                      <div className="aspect-video bg-gray-100 overflow-hidden relative">
                        {item.imageUrl ? (
                           <img
                             src={item.imageUrl}
                             alt={item.title}
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-400">
                             No Image
                           </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        {item.deskripsi && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.deskripsi}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center border-2 border-dashed border-gray-200 rounded-2xl">
                    <p className="text-gray-500 text-lg">
                      Belum ada dokumentasi untuk kegiatan ini.
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
