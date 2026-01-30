# 🔧 Extend Admin System - Panduan Menambah Fitur Baru

## Scenario 1: Tambah Section Baru (Berita/News)

### 1. Update lib/content.ts
```typescript
// lib/content.ts - Tambah interface dan functions baru

export interface BeritaContent {
  id: string;
  title: string;
  content: string;
  image?: string;
  date: string;
  author: string;
}

const BERITA_FILE = path.join(CONTENT_DIR, 'berita.json');

export async function getBeritaContent(): Promise<BeritaContent[]> {
  try {
    if (fs.existsSync(BERITA_FILE)) {
      const data = fs.readFileSync(BERITA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading berita:', error);
  }
  return [];
}

export async function addBerita(berita: BeritaContent): Promise<void> {
  try {
    const existing = await getBeritaContent();
    existing.push(berita);
    fs.writeFileSync(BERITA_FILE, JSON.stringify(existing, null, 2));
  } catch (error) {
    console.error('Error adding berita:', error);
    throw error;
  }
}

export async function updateBerita(id: string, berita: BeritaContent): Promise<void> {
  try {
    const existing = await getBeritaContent();
    const index = existing.findIndex(b => b.id === id);
    if (index >= 0) {
      existing[index] = berita;
      fs.writeFileSync(BERITA_FILE, JSON.stringify(existing, null, 2));
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteBerita(id: string): Promise<void> {
  try {
    const existing = await getBeritaContent();
    const filtered = existing.filter(b => b.id !== id);
    fs.writeFileSync(BERITA_FILE, JSON.stringify(filtered, null, 2));
  } catch (error) {
    throw error;
  }
}
```

### 2. Create API Endpoint - app/api/content/berita/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getBeritaContent, addBerita, updateBerita, deleteBerita } from '@/lib/content';
import { verifyToken } from '@/lib/auth';

function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return request.cookies.get('adminToken')?.value || null;
}

// GET all berita
export async function GET() {
  try {
    const content = await getBeritaContent();
    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch berita' },
      { status: 500 }
    );
  }
}

// POST create berita (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const berita = {
      id: Date.now().toString(),
      ...body,
      date: new Date().toISOString(),
    };

    await addBerita(berita);
    return NextResponse.json(berita, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create berita' },
      { status: 500 }
    );
  }
}
```

### 3. Create Admin Page - app/admin/berita/page.tsx
```typescript
'use client';

import { useState, useEffect } from 'react';

interface Berita {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export default function AdminBeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    const response = await fetch('/api/content/berita');
    if (response.ok) {
      const data = await response.json();
      setBeritaList(data);
    }
  };

  const handleAddBerita = async () => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('/api/content/berita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, author }),
    });

    if (response.ok) {
      setTitle('');
      setContent('');
      setAuthor('');
      fetchBerita();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Berita</h1>

      {/* Form Tambah Berita */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 space-y-4">
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          placeholder="Konten"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={handleAddBerita}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tambah Berita
        </button>
      </div>

      {/* List Berita */}
      <div className="space-y-4">
        {beritaList.map((berita) => (
          <div key={berita.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{berita.title}</h3>
            <p className="text-gray-600">{berita.content}</p>
            <p className="text-sm text-gray-400">By {berita.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Scenario 2: Tambah Image Upload

### 1. Install Dependencies
```bash
npm install next-cloudinary
# atau gunakan multer untuk local file upload
npm install multer
```

### 2. Create Upload API
```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);

    await writeFile(filepath, Buffer.from(bytes));

    return NextResponse.json({
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

## Scenario 3: Tambah Database Integration

### Setup Prisma
```bash
npm install @prisma/client
npm install -D prisma

npx prisma init
```

### prisma/schema.prisma
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Profil {
  id         String   @id @default(cuid())
  title      String
  deskripsi  String
  visi       String
  misi       String[]
  tugasFungsi String
  updatedAt  DateTime @updatedAt
}

model Berita {
  id        String   @id @default(cuid())
  title     String
  content   String
  author    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AdminUser {
  id       String @id @default(cuid())
  username String @unique
  email    String @unique
  password String
}
```

### Update lib/content.ts untuk Prisma
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProfilContent() {
  return prisma.profil.findFirst();
}

export async function updateProfilContent(content) {
  const existing = await prisma.profil.findFirst();
  if (existing) {
    return prisma.profil.update({
      where: { id: existing.id },
      data: content,
    });
  }
  return prisma.profil.create({ data: content });
}
```

## Scenario 4: Tambah Authentication dengan NextAuth

```bash
npm install next-auth
```

### app/api/auth/[...nextauth]/route.ts
```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateAdmin } from '@/lib/auth';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const result = await authenticateAdmin(
          credentials.username,
          credentials.password
        );

        if (result) {
          return {
            id: result.user.id,
            name: result.user.username,
            email: result.user.email,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
};

export const handler = NextAuth(authOptions);
```

## Tips untuk Extension

1. **Modularity**: Pisahkan logic ke files yang berbeda
2. **Error Handling**: Always validate input dan handle errors properly
3. **Testing**: Write tests untuk critical functions
4. **Logging**: Add logging untuk debugging
5. **Caching**: Consider using React Query atau SWR untuk client-side caching
6. **Rate Limiting**: Add rate limiting untuk API endpoints
7. **Validation**: Use Zod atau Yup untuk schema validation

## Struktur Folder yang Recommended

```
app/
├── admin/
│   ├── dashboard/
│   ├── berita/
│   ├── galeri/
│   └── users/
├── api/
│   ├── auth/
│   ├── content/
│   └── upload/
└── components/
    ├── admin/
    │   └── ...
    └── public/
        └── ...

lib/
├── auth.ts
├── content.ts
├── db.ts
└── validators.ts

prisma/
└── schema.prisma
```

---

Happy extending! 🚀
