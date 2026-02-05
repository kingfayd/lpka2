'use client';

import { useEffect, useState } from 'react';

interface ProfilContent {
  title: string;
  deskripsi: string;
  visi: string;
  misi: string[];
  tugasFungsi: string;
}

export default function ProfilSection() {
  const [content, setContent] = useState<ProfilContent | null>(null);
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
      const url = new URL('/api/content/profil', window.location.origin);
      url.searchParams.set('_t', Date.now().toString());
      
      const response = await fetch(url.toString(), {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <section className="w-full bg-white pt-32 pb-16"><div className="max-w-6xl mx-auto px-6">Loading...</div></section>;
  }

  if (!content) {
    return <section className="w-full bg-white pt-32 pb-16"><div className="max-w-6xl mx-auto px-6">Data tidak ditemukan</div></section>;
  }

  return (
    <section className="w-full bg-white pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* JUDUL */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          {content.title}
        </h1>

        {/* DESKRIPSI */}
        <p className="text-gray-600 leading-relaxed mb-10">
          {content.deskripsi}
        </p>

        {/* GRID VISI MISI */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* VISI */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Visi
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {content.visi}
            </p>
          </div>

          {/* MISI */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Misi
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {content.misi.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* TUGAS & FUNGSI */}
        <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tugas dan Fungsi
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {content.tugasFungsi}
          </p>
        </div>
      </div>
    </section>
  );
}
  