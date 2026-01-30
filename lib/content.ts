import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'public', 'data');
const PROFIL_FILE = path.join(CONTENT_DIR, 'profil.json');
const SAMBUTAN_FILE = path.join(CONTENT_DIR, 'sambutan.json');

// Ensure data directory exists
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

export interface ProfilContent {
  title: string;
  deskripsi: string;
  visi: string;
  misi: string[];
  tugasFungsi: string;
  profileImage?: string;
}

export interface SambutanContent {
  fotoUrl: string;
  nama: string;
  jabatan: string;
  sambutan1: string;
  sambutan2: string;
  sambutan3: string;
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
    if (fs.existsSync(PROFIL_FILE)) {
      const data = fs.readFileSync(PROFIL_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading profil content:', error);
  }
  return DEFAULT_CONTENT;
}

export async function updateProfilContent(content: ProfilContent): Promise<ProfilContent> {
  try {
    fs.writeFileSync(PROFIL_FILE, JSON.stringify(content, null, 2));
    return content;
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
    if (fs.existsSync(SAMBUTAN_FILE)) {
      const data = fs.readFileSync(SAMBUTAN_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading sambutan content:', error);
  }
  return DEFAULT_SAMBUTAN;
}

export async function updateSambutanContent(content: SambutanContent): Promise<SambutanContent> {
  try {
    fs.writeFileSync(SAMBUTAN_FILE, JSON.stringify(content, null, 2));
    return content;
  } catch (error) {
    console.error('Error updating sambutan content:', error);
    throw error;
  }
}
