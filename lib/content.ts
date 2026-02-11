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
  sambutan1: string;
  sambutan2: string;
  sambutan3: string;
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
      // Create default content if none exists
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
  sambutan1:
    'Assalamu\'alaikum Warahmatullahi Wabarakatuh.',
  sambutan2:
    'Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa, atas rahmat dan karunia-Nya website resmi Lembaga Pembinaan Khusus Anak Kelas I Tangerang ini dapat hadir sebagai sarana informasi dan pelayanan kepada masyarakat.',
  sambutan3:
    'Kami berkomitmen untuk terus meningkatkan pembinaan, pengawasan, serta pelayanan terbaik dalam rangka membentuk pribadi anak binaan yang mandiri, berakhlak, dan siap kembali ke masyarakat.',
};

export async function getSambutanContent(): Promise<SambutanContent> {
  try {
    const contentList = await prisma.sambutanContent.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 1
    });

    let content = contentList[0];

    if (!content) {
      // Create default content if none exists
      content = await prisma.sambutanContent.create({
        data: DEFAULT_SAMBUTAN
      });
    }

    return {
      id: content.id,
      fotoUrl: content.fotoUrl,
      nama: content.nama,
      jabatan: content.jabatan,
      sambutan1: content.sambutan1,
      sambutan2: content.sambutan2,
      sambutan3: content.sambutan3,
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

    // Cleanup duplicates if any
    if (existing.length > 1) {
      console.warn(`[Content] Found ${existing.length} sambutan records. Cleaning up...`);
      const keepId = existing[0].id; // Keep the most recently updated one
      const deleteIds = existing.slice(1).map(r => r.id);

      await prisma.sambutanContent.deleteMany({
        where: { id: { in: deleteIds } }
      });
      console.log(`[Content] Deleted ${deleteIds.length} duplicate records.`);
    }

    const currentRecord = existing[0];

    if (currentRecord) {
      console.log(`[Content] Updating existing sambutan record: ${currentRecord.id}`);
      const updated = await prisma.sambutanContent.update({
        where: { id: currentRecord.id },
        data: content
      });

      console.log(`[Content] Updated sambutan successfully. New fotoUrl: ${updated.fotoUrl}`);

      return {
        id: updated.id,
        fotoUrl: updated.fotoUrl,
        nama: updated.nama,
        jabatan: updated.jabatan,
        sambutan1: updated.sambutan1,
        sambutan2: updated.sambutan2,
        sambutan3: updated.sambutan3,
        updatedAt: updated.updatedAt
      };
    } else {
      console.log('[Content] improved creating new sambutan record');
      const created = await prisma.sambutanContent.create({
        data: content as Omit<SambutanContent, 'id' | 'updatedAt'>
      });

      return {
        id: created.id,
        fotoUrl: created.fotoUrl,
        nama: created.nama,
        jabatan: created.jabatan,
        sambutan1: created.sambutan1,
        sambutan2: created.sambutan2,
        sambutan3: created.sambutan3,
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
