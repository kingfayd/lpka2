'use client';

import { useEffect, useState } from 'react';

interface LayananContent {
  title: string;
  deskripsi: string;
}

interface LayananItem {
  id: string;
  title: string;
  deskripsi?: string;
  fotoUrl: string;
  type: string;
  urutan: number;
}

export default function LayananInformasiPublik() {
  const [content, setContent] = useState<LayananContent | null>(null);
  const [items, setItems] = useState<LayananItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, itemsRes] = await Promise.all([
        fetch('/api/content/layanan'),
        fetch('/api/layanan'),
      ]);

      if (contentRes.ok) setContent(await contentRes.json());
      if (itemsRes.ok) setItems(await itemsRes.json());
    } catch (error) {
      console.error('Error fetching layanan data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">Loading...</div>
      </section>
    );
  }

  if (!content) {
    return (
      <section className="w-full bg-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">Data tidak ditemukan</div>
      </section>
    );
  }

  const integrasiItems = items.filter((item) => item.type === 'integrasi');
  const kunjunganItems = items.filter((item) => item.type === 'kunjungan');

  return (
    <section className="w-full bg-white pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-sans">
          {content.title}
        </h1>
        <p className="text-gray-600 leading-relaxed mb-16 text-lg max-w-4xl">
          {content.deskripsi}
        </p>

        {/* LAYANAN INTEGRASI */}
        <div id="integrasi" className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Layanan Integrasi
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrasiItems.length > 0 ? (
              integrasiItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/95 backdrop-blur-sm border border-gray-100/50 p-6 rounded-3xl shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-5">
                    <img
                      src={item.fotoUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center">
                    {item.title}
                  </h3>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Belum ada informasi layanan integrasi.</p>
            )}
          </div>
        </div>

        {/* ALUR KUNJUNGAN */}
        <div id="kunjungan">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-8 w-1.5 bg-green-600 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Alur Kunjungan
            </h2>
          </div>
          <div className="bg-white/95 backdrop-blur-sm border border-gray-100/50 p-8 rounded-3xl shadow-md">
            {kunjunganItems.length > 0 ? (
              <ul className="space-y-4">
                {kunjunganItems.map((item, index) => (
                  <li key={item.id} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 text-lg leading-relaxed pt-0.5">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Belum ada informasi alur kunjungan.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
