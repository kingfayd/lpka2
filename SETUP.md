# LPKA Website - Admin System Setup

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Copy .env.example ke .env.local
cp .env.example .env.local
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Akses di: `http://localhost:3000`

## 📋 Admin Panel

### Login Admin
- **URL**: http://localhost:3000/admin/login
- **Username**: `admin`
- **Password**: `admin123`

### Dashboard
- **URL**: http://localhost:3000/admin/dashboard
- Manage profil LPKA dari sini

## 📚 Dokumentasi

Lihat [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) untuk dokumentasi lengkap.

## 🔐 Security

⚠️ **PENTING**: Untuk production:
1. Ubah password admin default
2. Ubah `JWT_SECRET` di `.env.local`
3. Gunakan HTTPS
4. Setup database yang proper
5. Implementasi proper authentication flow

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Auth**: JWT + bcryptjs
- **Storage**: File system (JSON) - Bisa upgrade ke database

## 📁 Project Structure

```
app/
├── admin/                   # Admin routes
│   ├── login/              # Login page
│   ├── dashboard/          # Admin dashboard
│   └── layout.tsx
├── api/
│   ├── auth/              # Authentication API
│   └── content/           # Content management API
├── components/            # Reusable components
├── profil/               # Public profil page
├── layananpublik/        # Public layanan page
└── ...
lib/
├── auth.ts               # Auth utilities
└── content.ts            # Content utilities
public/
└── data/                 # Content JSON files
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎯 Features

✅ Admin login with JWT authentication
✅ Manage profil content (title, description, vision, mission)
✅ Dynamic content rendering on public pages
✅ Admin logout
✅ Protected admin routes

## 🔜 Future Enhancements

- [ ] Change password functionality
- [ ] Multiple admin users
- [ ] Image upload
- [ ] Content versioning
- [ ] Database integration
- [ ] More content sections
- [ ] Role-based access control

## 💬 Support

Untuk pertanyaan atau masalah, silakan cek ADMIN_GUIDE.md atau hubungi tim development.
