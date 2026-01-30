# 🎥 Admin System - Quick Reference Guide

## 5-Menit Quick Start

### Step 1: Setup (1 menit)
```bash
cd lpka1-main
npm install
cp .env.example .env.local
npm run dev
```

### Step 2: Login (1 menit)
```
URL: http://localhost:3000/admin/login
Username: admin
Password: admin123
```

### Step 3: Edit Content (3 menit)
1. Klik "Admin" di header
2. Edit Profil LPKA
3. Klik "Simpan Perubahan"
4. Lihat perubahan di http://localhost:3000/profil

---

## Common Tasks

### Ganti Judul Profil
1. Login ke /admin/login
2. Di field "Judul Profil", ubah text
3. Klik "Simpan Perubahan"
4. ✅ Selesai!

### Ganti Deskripsi LPKA
1. Login ke /admin/login
2. Di area "Deskripsi", edit text
3. Klik "Simpan Perubahan"
4. ✅ Selesai!

### Tambah Misi Baru
1. Login ke /admin/login
2. Scroll ke section "Misi"
3. Tulis misi baru di input box
4. Klik button "Tambah"
5. Klik "Simpan Perubahan"
6. ✅ Selesai!

### Hapus Misi
1. Login ke /admin/login
2. Scroll ke section "Misi"
3. Klik button "Hapus" di misi yang ingin dihapus
4. Klik "Simpan Perubahan"
5. ✅ Selesai!

### Preview Perubahan
1. Setelah edit & simpan
2. Klik "Preview" button
3. Akan membuka halaman publik di tab baru
4. ✅ Lihat perubahan Anda!

### Logout
1. Klik "Logout" button di top-right
2. Akan redirect ke login page
3. ✅ Selesai!

---

## API Reference

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Get Profil (Public)
```bash
curl http://localhost:3000/api/content/profil
```

### Update Profil (Authenticated)
```bash
curl -X PUT http://localhost:3000/api/content/profil \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Profil LPKA",
    "deskripsi": "...",
    "visi": "...",
    "misi": ["...", "..."],
    "tugasFungsi": "..."
  }'
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Submit form (when editing) |
| `Escape` | Close dialogs |
| `Tab` | Move to next field |
| `Shift + Tab` | Move to previous field |

---

## FAQ

### Q: Lupa password admin?
**A:** 
1. Edit file `lib/auth.ts`
2. Generate hash baru: `npx ts-node scripts/generate-hash.ts`
3. Update ADMIN_USER.password dengan hash baru

### Q: Bagaimana cara backup data?
**A:** 
- Backup file: `public/data/profil.json`
- Atau jika sudah pakai database, backup database

### Q: Bisa edit lebih dari 1 orang?
**A:** 
- Saat ini: No (single admin account)
- Di masa depan: Yes (akan ditambahkan multi-admin support)

### Q: Dimana file data disimpan?
**A:** 
- File: `public/data/profil.json`
- Format: JSON
- Bisa diview/edit langsung jika diperlukan

### Q: Apa itu JWT Token?
**A:** 
- Secure identifier untuk login
- Expire dalam 24 jam
- Digunakan untuk verify authorization di API

### Q: Bagaimana cara deploy ke production?
**A:** 
- Baca: `DEPLOYMENT_CHECKLIST.md`
- Recommended: Vercel, Railway, atau DigitalOcean

### Q: Bisa upload gambar?
**A:** 
- Saat ini: No (text only)
- Di masa depan: Yes (akan ditambahkan image upload)

### Q: Bagaimana keamanannya?
**A:** 
- Password di-hash dengan bcryptjs
- Token menggunakan JWT
- HTTPS recommended untuk production
- Protected routes untuk admin area

---

## Troubleshooting

### Login tidak bisa?
1. Cek username & password (case-sensitive)
2. Clear browser cache & cookies
3. Restart dev server: `npm run dev`
4. Cek `.env.local` ada JWT_SECRET

### Perubahan tidak tersimpan?
1. Cek error message di form
2. Cek browser console (F12 > Console)
3. Cek server logs di terminal
4. Cek permissions folder `public/data/`

### Performance lambat?
1. Restart dev server
2. Clear node_modules: `rm -rf node_modules` & `npm install`
3. Check system resources (RAM, disk)
4. Disable browser extensions

### 404 Page not found?
1. Cek spelling URL
2. Dev server running? (try `npm run dev`)
3. Cek routing di `app/` folder
4. Restart dev server

---

## File Locations

| File | Purpose | Location |
|------|---------|----------|
| Login Page | Admin login | `app/admin/login/page.tsx` |
| Dashboard | Main admin page | `app/admin/dashboard/page.tsx` |
| API Login | Login endpoint | `app/api/auth/login/route.ts` |
| API Content | Content endpoint | `app/api/content/profil/route.ts` |
| Auth Logic | Authentication | `lib/auth.ts` |
| Content Logic | Content management | `lib/content.ts` |
| Profil JSON | Data storage | `public/data/profil.json` |
| Public Profil | Public page | `app/profil/page.tsx` |

---

## Performance Tips

1. **Caching**: Browser otomatis cache GET requests
2. **Images**: Optimize images sebelum upload
3. **Database**: Pastikan indexes ada jika pakai DB
4. **CDN**: Setup CDN untuk static assets
5. **Compression**: Enable gzip compression di server

---

## Best Practices

✅ **DO:**
- Backup data regularly
- Use strong passwords
- Monitor access logs
- Update dependencies
- Test changes di development dulu
- Use HTTPS di production
- Implement rate limiting

❌ **DON'T:**
- Share admin credentials
- Commit `.env.local` ke git
- Use default password di production
- Edit database directly (use admin panel)
- Run as root/admin user (production)
- Disable security features

---

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [JWT.io](https://jwt.io)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

## Support Contact

- **Documentation**: Check ADMIN_GUIDE.md
- **Issues**: Check browser console & server logs
- **Features**: See EXTEND_ADMIN_SYSTEM.md
- **Deployment**: See DEPLOYMENT_CHECKLIST.md

---

## Version Info

- **Framework**: Next.js 16.1.2
- **Runtime**: Node.js 18+
- **Package Manager**: npm 9+
- **System**: Windows/Mac/Linux

---

Happy managing! 🎉
