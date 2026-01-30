'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProfilContent {
  title: string;
  deskripsi: string;
  visi: string;
  misi: string[];
  tugasFungsi: string;
}

interface SambutanContent {
  fotoUrl: string;
  nama: string;
  jabatan: string;
  sambutan1: string;
  sambutan2: string;
  sambutan3: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'profil' | 'sambutan'>('profil');
  const [profilContent, setProfilContent] = useState<ProfilContent | null>(null);
  const [sambutanContent, setSambutanContent] = useState<SambutanContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [misiInput, setMisiInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [profilRes, sambutanRes] = await Promise.all([
        fetch('/api/content/profil'),
        fetch('/api/content/sambutan'),
      ]);

      if (profilRes.ok) {
        setProfilContent(await profilRes.json());
      }

      if (sambutanRes.ok) {
        setSambutanContent(await sambutanRes.json());
      }
    } catch (err) {
      setError('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !sambutanContent) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload gagal');
      }

      const data = await response.json();
      setSambutanContent({
        ...sambutanContent,
        fotoUrl: data.url,
      });
      setSuccess('Foto berhasil diupload!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfil = async () => {
    if (!profilContent) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/content/profil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profilContent),
      });

      if (!response.ok) throw new Error('Gagal menyimpan');

      setSuccess('Profil berhasil diupdate!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSambutan = async () => {
    if (!sambutanContent) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/content/sambutan', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sambutanContent),
      });

      if (!response.ok) throw new Error('Gagal menyimpan');

      setSuccess('Sambutan berhasil diupdate!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  const handleAddMisi = () => {
    if (misiInput.trim() && profilContent) {
      setProfilContent({
        ...profilContent,
        misi: [...profilContent.misi, misiInput],
      });
      setMisiInput('');
    }
  };

  const handleRemoveMisi = (index: number) => {
    if (profilContent) {
      setProfilContent({
        ...profilContent,
        misi: profilContent.misi.filter((_, i) => i !== index),
      });
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 flex gap-6">
          <button
            onClick={() => setActiveTab('profil')}
            className={`py-3 px-4 font-medium border-b-2 transition ${
              activeTab === 'profil'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab('sambutan')}
            className={`py-3 px-4 font-medium border-b-2 transition ${
              activeTab === 'sambutan'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Sambutan & Foto Ketua
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* PROFIL TAB */}
        {activeTab === 'profil' && profilContent && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Judul Profil
              </label>
              <input
                type="text"
                value={profilContent.title}
                onChange={(e) =>
                  setProfilContent({ ...profilContent, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                value={profilContent.deskripsi}
                onChange={(e) =>
                  setProfilContent({ ...profilContent, deskripsi: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Visi
              </label>
              <textarea
                value={profilContent.visi}
                onChange={(e) =>
                  setProfilContent({ ...profilContent, visi: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Misi
              </label>
              <div className="space-y-2 mb-4">
                {profilContent.misi.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newMisi = [...profilContent.misi];
                        newMisi[index] = e.target.value;
                        setProfilContent({ ...profilContent, misi: newMisi });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleRemoveMisi(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={misiInput}
                  onChange={(e) => setMisiInput(e.target.value)}
                  placeholder="Tambah misi baru"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddMisi()}
                />
                <button
                  onClick={handleAddMisi}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Tambah
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tugas dan Fungsi
              </label>
              <textarea
                value={profilContent.tugasFungsi}
                onChange={(e) =>
                  setProfilContent({ ...profilContent, tugasFungsi: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveProfil}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
              <Link
                href="/profil"
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium"
              >
                Preview
              </Link>
            </div>
          </div>
        )}

        {/* SAMBUTAN TAB */}
        {activeTab === 'sambutan' && sambutanContent && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Foto Kepala LPKA
              </label>
              <div className="space-y-4">
                {sambutanContent.fotoUrl && (
                  <div className="relative w-48 h-64">
                    <img
                      src={sambutanContent.fotoUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maksimal 5MB. Format: JPG, PNG, WebP
                  </p>
                </div>
                {uploading && <p className="text-blue-600">Uploading...</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={sambutanContent.nama}
                onChange={(e) =>
                  setSambutanContent({ ...sambutanContent, nama: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jabatan
              </label>
              <input
                type="text"
                value={sambutanContent.jabatan}
                onChange={(e) =>
                  setSambutanContent({ ...sambutanContent, jabatan: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Paragraf 1
              </label>
              <textarea
                value={sambutanContent.sambutan1}
                onChange={(e) =>
                  setSambutanContent({ ...sambutanContent, sambutan1: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Paragraf 2
              </label>
              <textarea
                value={sambutanContent.sambutan2}
                onChange={(e) =>
                  setSambutanContent({ ...sambutanContent, sambutan2: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Paragraf 3
              </label>
              <textarea
                value={sambutanContent.sambutan3}
                onChange={(e) =>
                  setSambutanContent({ ...sambutanContent, sambutan3: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveSambutan}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
              <Link
                href="/"
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium"
              >
                Preview
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
