import { prisma } from './prisma';

export interface ProfilContent {
  id?: string;
  title: string;
  deskripsi: string;
  visi: string;
  misi: string[];
  tugasFungsi: string;
  profileImage?: string;
  updatedAt?: Date;
}

export interface SambutanContent {
  id?: string;
  fotoUrl: string;
  nama: string;
  jabatan: string;
  sambutan: string;
  updatedAt?: Date;
}

const DEFAULT_CONTENT: ProfilContent = {
  title: 'Profil LPKA',
  deskripsi:
    'Lembaga Pembinaan Khusus Anak (LPKA) Kelas I Tangerang merupakan institusi yang bertugas menyelenggarakan pembinaan, pendidikan, serta pembimbingan bagi Anak Didik Pemasyarakatan (Andikpas) sebagai upaya mempersiapkan mereka agar mampu berkembang secara optimal dan siap kembali ke masyarakat. Proses pembinaan tersebut tidak hanya berfokus pada aspek akademik dan keterampilan, tetapi juga mencakup pembinaan mental, spiritual, dan sosial guna membentuk karakter yang berakhlak mulia.',
  visi: 'Terwujudnya pembinaan anak yang berorientasi pada pemulihan, pendidikan, dan reintegrasi sosial.',
  misi: [
    'Menyelenggarakan pembinaan kepribadian dan kemandirian',
    'Meningkatkan kualitas pendidikan dan keterampilan anak',
    'Mewujudkan layanan pemasyarakatan yang humanis',
    'Mendorong reintegrasi sosial yang berkelanjutan',
  ],
  tugasFungsi:
    'LPKA bertugas melaksanakan pembinaan, perawatan, dan pendidikan terhadap anak binaan, serta memastikan pemenuhan hak-hak anak sesuai dengan ketentuan peraturan perundang-undangan.',
};

export async function getProfilContent(): Promise<ProfilContent> {
  try {
    let content = await prisma.profilContent.findFirst();

    if (!content) {
      content = await prisma.profilContent.create({
        data: DEFAULT_CONTENT
      });
    }

    return {
      id: content.id,
      title: content.title || '',
      deskripsi: content.deskripsi || '',
      visi: content.visi || '',
      misi: content.misi || [],
      tugasFungsi: content.tugasFungsi || '',
      profileImage: content.profileImage || undefined,
      updatedAt: content.updatedAt
    };
  } catch (error) {
    console.error('Error reading profil content:', error);
    return DEFAULT_CONTENT;
  }
}

export async function updateProfilContent(content: Partial<ProfilContent>): Promise<ProfilContent> {
  try {
    const existing = await prisma.profilContent.findFirst();

    if (existing) {
      const updated = await prisma.profilContent.update({
        where: { id: existing.id },
        data: content
      });

      return {
        id: updated.id,
        title: updated.title || '',
        deskripsi: updated.deskripsi || '',
        visi: updated.visi || '',
        misi: updated.misi || [],
        tugasFungsi: updated.tugasFungsi || '',
        profileImage: updated.profileImage || undefined,
        updatedAt: updated.updatedAt
      };
    } else {
      const created = await prisma.profilContent.create({
        data: content as Omit<ProfilContent, 'id' | 'updatedAt'>
      });

      return {
        id: created.id,
        title: created.title || '',
        deskripsi: created.deskripsi || '',
        visi: created.visi || '',
        misi: created.misi || [],
        tugasFungsi: created.tugasFungsi || '',
        profileImage: created.profileImage || undefined,
        updatedAt: created.updatedAt
      };
    }
  } catch (error) {
    console.error('Error updating profil content:', error);
    throw error;
  }
}

const DEFAULT_SAMBUTAN: SambutanContent = {
  fotoUrl: '/images/ketua-lpka.jpg',
  nama: 'Aldikan Nasution, A.md.IP., S.H., M.Si.',
  jabatan: 'Kepala LPKA Kelas I Tangerang',
  sambutan:
    'Assalamu\'alaikum Warahmatullahi Wabarakatuh.\n\nPuji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa, atas rahmat dan karunia-Nya website resmi Lembaga Pembinaan Khusus Anak Kelas I Tangerang ini dapat hadir sebagai sarana informasi dan pelayanan kepada masyarakat.\n\nKami berkomitmen untuk terus meningkatkan pembinaan, pengawasan, serta pelayanan terbaik dalam rangka membentuk pribadi anak binaan yang mandiri, berakhlak, dan siap kembali ke masyarakat.',
};

export async function getSambutanContent(): Promise<SambutanContent> {
  try {
    const contentList = await prisma.sambutanContent.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 1
    });

    let content = contentList[0];

    if (!content) {
      content = await prisma.sambutanContent.create({
        data: DEFAULT_SAMBUTAN
      });
    }

    return {
      id: content.id,
      fotoUrl: content.fotoUrl,
      nama: content.nama,
      jabatan: content.jabatan,
      sambutan: content.sambutan,
      updatedAt: content.updatedAt
    };
  } catch (error) {
    console.error('Error reading sambutan content:', error);
    return DEFAULT_SAMBUTAN;
  }
}

export async function updateSambutanContent(content: Partial<SambutanContent>): Promise<SambutanContent> {
  try {
    const existing = await prisma.sambutanContent.findMany({
      orderBy: { updatedAt: 'desc' }
    });

    if (existing.length > 1) {
      const keepId = existing[0].id;
      const deleteIds = existing.slice(1).map(r => r.id);

      await prisma.sambutanContent.deleteMany({
        where: { id: { in: deleteIds } }
      });
    }

    const currentRecord = existing[0];

    if (currentRecord) {
      const updated = await prisma.sambutanContent.update({
        where: { id: currentRecord.id },
        data: content
      });

      return {
        id: updated.id,
        fotoUrl: updated.fotoUrl,
        nama: updated.nama,
        jabatan: updated.jabatan,
        sambutan: updated.sambutan,
        updatedAt: updated.updatedAt
      };
    } else {
      const created = await prisma.sambutanContent.create({
        data: content as Omit<SambutanContent, 'id' | 'updatedAt'>
      });

      return {
        id: created.id,
        fotoUrl: created.fotoUrl,
        nama: created.nama,
        jabatan: created.jabatan,
        sambutan: created.sambutan,
        updatedAt: created.updatedAt
      };
    }
  } catch (error) {
    console.error('Error updating sambutan content:', error);
    throw error;
  }
}

export interface LayananContent {
  id?: string;
  title: string;
  deskripsi: string;
  updatedAt?: Date;
}

const DEFAULT_LAYANAN: LayananContent = {
  title: 'Informasi Publik',
  deskripsi: 'Berdasarkan UU 14 Tahun 2008 bahwa Informasi Publik adalah informasi yang dihasilkan, disimpan, dikelola, dikirim, dan/atau diterima oleh suatu badan publik yang berkaitan dengan penyelenggara dan penyelenggaraan negara dan/atau penyelenggara dan penyelenggaraan badan publik lainnya yang sesuai dengan Undang-Undang ini serta informasi lain yang berkaitan dengan kepentingan publik.',
};

export async function getLayananContent(): Promise<LayananContent> {
  try {
    let content = await prisma.layananContent.findFirst();

    if (!content) {
      content = await prisma.layananContent.create({
        data: DEFAULT_LAYANAN
      });
    }

    return {
      id: content.id,
      title: content.title,
      deskripsi: content.deskripsi,
      updatedAt: content.updatedAt
    };
  } catch (error) {
    console.error('Error reading layanan content:', error);
    return DEFAULT_LAYANAN;
  }
}

export async function updateLayananContent(content: Partial<LayananContent>): Promise<LayananContent> {
  try {
    const existing = await prisma.layananContent.findFirst();

    if (existing) {
      const updated = await prisma.layananContent.update({
        where: { id: existing.id },
        data: content
      });

      return {
        id: updated.id,
        title: updated.title,
        deskripsi: updated.deskripsi,
        updatedAt: updated.updatedAt
      };
    } else {
      const created = await prisma.layananContent.create({
        data: content as Omit<LayananContent, 'id' | 'updatedAt'>
      });

      return {
        id: created.id,
        title: created.title,
        deskripsi: created.deskripsi,
        updatedAt: created.updatedAt
      };
    }
  } catch (error) {
    console.error('Error updating layanan content:', error);
    throw error;
  }
}


export type KategoriKegiatan = 'perikanan' | 'pertanian' | 'pendidikan' | 'keagamaan' | 'kewirausahaan';

export interface KegiatanContent {
  id?: string;
  kategori: KategoriKegiatan;
  title: string;
  deskripsi: string;
  updatedAt?: Date;
}

export interface KegiatanItem {
  id?: string;
  kategori: KategoriKegiatan;
  title: string;
  deskripsi?: string;
  imageUrl: string;
  urutan: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const DEFAULT_KEGIATAN: Record<KategoriKegiatan, Omit<KegiatanContent, 'id' | 'updatedAt'>> = {
  perikanan: {
    kategori: 'perikanan',
    title: 'Kegiatan Perikanan',
    deskripsi:
      'Program perikanan di LPKA Kelas I Tangerang memberikan bekal keterampilan budidaya ikan kepada anak binaan sebagai bekal kemandirian setelah bebas.',
  },
  pertanian: {
    kategori: 'pertanian',
    title: 'Kegiatan Pertanian',
    deskripsi:
      'Program pertanian di LPKA Kelas I Tangerang melatih anak binaan dalam bercocok tanam dan berkebun sebagai salah satu bentuk pembinaan kemandirian.',
  },
  pendidikan: {
    kategori: 'pendidikan',
    title: 'Kegiatan Pendidikan',
    deskripsi:
      'Program pendidikan di LPKA Kelas I Tangerang memastikan setiap anak binaan tetap mendapatkan hak pendidikannya secara formal maupun non-formal.',
  },
  keagamaan: {
    kategori: 'keagamaan',
    title: 'Kegiatan Keagamaan',
    deskripsi:
      'Program keagamaan di LPKA Kelas I Tangerang membina mental dan spiritual anak melalui pengajian, ibadah bersama, dan kegiatan rohani lainnya.',
  },
  kewirausahaan: {
    kategori: 'kewirausahaan',
    title: 'Kegiatan Kewirausahaan',
    deskripsi:
      'Program kewirausahaan di LPKA Kelas I Tangerang memberikan pelatihan kewirausahaan dan bisnis kepada anak binaan sebagai bekal kemandirian.',
  },
};

export async function getKegiatanContent(kategori: KategoriKegiatan): Promise<KegiatanContent> {
  try {
    let content = await prisma.kegiatanContent.findUnique({ where: { kategori } });

    if (!content) {
      content = await prisma.kegiatanContent.create({ data: DEFAULT_KEGIATAN[kategori] });
    }

    return {
      id: content.id,
      kategori: content.kategori as KategoriKegiatan,
      title: content.title,
      deskripsi: content.deskripsi,
      updatedAt: content.updatedAt,
    };
  } catch (error) {
    console.error(`Error reading kegiatan content (${kategori}):`, error);
    return DEFAULT_KEGIATAN[kategori];
  }
}

export async function updateKegiatanContent(
  kategori: KategoriKegiatan,
  data: Partial<KegiatanContent>
): Promise<KegiatanContent> {
  try {
    const updated = await prisma.kegiatanContent.upsert({
      where: { kategori },
      update: { title: data.title, deskripsi: data.deskripsi },
      create: { kategori, title: data.title ?? DEFAULT_KEGIATAN[kategori].title, deskripsi: data.deskripsi ?? DEFAULT_KEGIATAN[kategori].deskripsi },
    });

    return {
      id: updated.id,
      kategori: updated.kategori as KategoriKegiatan,
      title: updated.title,
      deskripsi: updated.deskripsi,
      updatedAt: updated.updatedAt,
    };
  } catch (error) {
    console.error(`Error updating kegiatan content (${kategori}):`, error);
    throw error;
  }
}

export async function getKegiatanItems(kategori: KategoriKegiatan): Promise<KegiatanItem[]> {
  try {
    const items = await prisma.kegiatanItem.findMany({
      where: { kategori },
      orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
    });
    return items.map((item) => ({
      id: item.id,
      kategori: item.kategori as KategoriKegiatan,
      title: item.title,
      deskripsi: item.deskripsi ?? undefined,
      imageUrl: item.imageUrl,
      urutan: item.urutan,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  } catch (error) {
    console.error(`Error fetching kegiatan items (${kategori}):`, error);
    return [];
  }
}

