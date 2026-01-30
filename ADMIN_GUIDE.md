# Admin System Documentation

## Fitur Admin

Sistem admin ini memungkinkan admin untuk mengelola konten situs termasuk:
- **Profil LPKA**: Edit judul, deskripsi, visi, misi, dan tugas & fungsi

## Setup Awal

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Buat file `.env.local` di root project:
```env
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

### 3. Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ PENTING: Ubah password default setelah deployment!

## Cara Menggunakan

### Login ke Admin Panel
1. Buka: `http://localhost:3000/admin/login`
2. Masukkan username: `admin`
3. Masukkan password: `admin123`
4. Klik Login

### Manage Profil
1. Dari dashboard, klik "Profil"
2. Edit konten yang diinginkan:
   - **Judul Profil**: Nama halaman profil
   - **Deskripsi**: Penjelasan tentang LPKA
   - **Visi**: Visi organisasi
   - **Misi**: List misi (bisa ditambah/dihapus)
   - **Tugas dan Fungsi**: Tugas dan fungsi LPKA
3. Klik "Simpan Perubahan"
4. Klik "Preview" untuk melihat hasil di halaman publik

## Struktur Teknologi

### Backend
- **Next.js 16+**: Framework React
- **JWT**: Autentikasi admin
- **bcryptjs**: Hashing password
- **File System**: Penyimpanan konten JSON

### Frontend
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

## File Structure
```
app/
├── admin/
│   ├── login/page.tsx          # Login page
│   ├── dashboard/page.tsx      # Admin dashboard
│   └── AdminProvider.tsx       # Auth provider
├── api/
│   ├── auth/
│   │   ├── login/route.ts      # Login endpoint
│   │   └── logout/route.ts     # Logout endpoint
│   └── content/
│       └── profil/route.ts     # Profil content endpoint
├── components/
│   └── ProfilSection.tsx       # Updated to use dynamic content
└── ...
lib/
├── auth.ts                     # Auth functions
└── content.ts                  # Content management functions
public/
└── data/
    └── profil.json             # Stored profil content
```

## API Endpoints

### Authentication

#### POST `/api/auth/login`
Login admin dan dapatkan token
```json
{
  "username": "admin",
  "password": "admin123"
}
```
Response:
```json
{
  "message": "Login berhasil",
  "token": "jwt-token",
  "user": {
    "id": "1",
    "username": "admin",
    "email": "admin@lpka.com"
  }
}
```

#### POST `/api/auth/logout`
Logout dan clear token
Response:
```json
{
  "message": "Logout berhasil"
}
```

### Content Management

#### GET `/api/content/profil`
Ambil konten profil (public)
Response:
```json
{
  "title": "Profil LPKA",
  "deskripsi": "...",
  "visi": "...",
  "misi": ["...", "..."],
  "tugasFungsi": "..."
}
```

#### PUT `/api/content/profil`
Update konten profil (admin only, require token)
```json
{
  "title": "Profil LPKA",
  "deskripsi": "...",
  "visi": "...",
  "misi": ["...", "..."],
  "tugasFungsi": "..."
}
```

## Security Notes

1. **Token Storage**: Token disimpan di localStorage (untuk production bisa gunakan httpOnly cookie)
2. **Password Hashing**: Password di-hash menggunakan bcryptjs
3. **JWT Secret**: Ganti dengan secret yang kuat di production
4. **HTTPS**: Gunakan HTTPS untuk production
5. **Authorization**: Semua endpoint PUT require valid JWT token

## Future Improvements

- [ ] Change password functionality
- [ ] Multiple admin accounts
- [ ] Image upload for profile
- [ ] Content versioning/history
- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] More content sections (Layanan, Berita, dll)
- [ ] Admin user management
- [ ] Role-based access control
