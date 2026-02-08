"use client";

import { useEffect, useState } from 'react';

interface SambutanContent {
  fotoUrl: string;
  nama: string;
  jabatan: string;
  sambutan1: string;
  sambutan2: string;
  sambutan3: string;
}

export default function SambutanSection() {
  const [content, setContent] = useState<SambutanContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();

    // Refresh data setiap 2 detik untuk real-time updates
    const interval = setInterval(() => {
      fetchContent();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchContent = async () => {
    try {
      // Force no-cache dengan timestamp dan cache-busting
      const url = new URL('/api/content/sambutan', window.location.origin);
      url.searchParams.set('_t', Date.now().toString());

      const response = await fetch(url.toString(), {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[SambutanSection] Fetched data:', data);
        setContent(prevContent => {
          console.log('[SambutanSection] Previous:', prevContent, 'New:', data);
          return data;
        });
      }
    } catch (error) {
      console.error('Error fetching sambutan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !content) {
    return <section className="relative w-full bg-white py-20 px-6"><div className="max-w-6xl mx-auto">Loading...</div></section>;
  }

  return (
    <section
      id="inovasi"
      className="relative w-full bg-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* FOTO KETUA */}
        <div className="flex justify-center md:justify-start">
          <img
            src={content.fotoUrl}
            alt={content.nama}
            className="w-64 md:w-80 rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* KATA SAMBUTAN */}
        <div className="text-slate-800">
          <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
            Kata Sambutan
          </h3>

          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900">
            {content.jabatan}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            {content.sambutan1}
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            {content.sambutan2}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {content.sambutan3}
          </p>

          <div className="mt-6">
            <p className="font-semibold text-slate-900">
              {content.nama}
            </p>
            <p className="text-sm text-gray-500">
              {content.jabatan}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
