'use client';

import { useEffect, useState } from 'react';

interface ProfilContent {
  title: string;
  deskripsi: string;
  visi: string;
  misi: string[];
  tugasFungsi: string;
}

interface Pejabat {
  id: string;
  nama: string;
  jabatan: string;
  fotoUrl?: string;
  urutan: number;
}

export default function ProfilSection() {
  const [content, setContent] = useState<ProfilContent | null>(null);
  const [pejabats, setPejabats] = useState<Pejabat[]>([]);
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

      // Fetch Pejabat
      const pejabatRes = await fetch('/api/pejabat');
      if (pejabatRes.ok) {
        setPejabats(await pejabatRes.json());
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
          <div id="visi-misi" className="bg-white/95 backdrop-blur-sm border border-gray-100/50 p-8 rounded-3xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Visi
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {content.visi}
            </p>
          </div>

          {/* MISI */}
          <div className="bg-white/95 backdrop-blur-sm border border-gray-100/50 p-8 rounded-3xl shadow-md">
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
        <div className="mt-12 bg-white/95 backdrop-blur-sm border border-gray-100/50 p-8 rounded-3xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tugas dan Fungsi
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {content.tugasFungsi}
          </p>
        </div>
        {/* PEJABAT SECTION */}
        {pejabats.length > 0 && (
          <div id="pejabat" className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
              Profil Pejabat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pejabats.map((pejabat) => (
                <div
                  key={pejabat.id}
                  className="bg-white/95 backdrop-blur-sm border border-gray-100/50 p-6 rounded-3xl shadow-md flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="w-32 h-44 bg-gray-100 rounded-2xl overflow-hidden mb-5">
                    {pejabat.fotoUrl ? (
                      <img
                        src={pejabat.fotoUrl}
                        alt={pejabat.nama}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Photo
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                    {pejabat.nama}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">
                    {pejabat.jabatan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
