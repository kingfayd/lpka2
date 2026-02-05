-- CreateTable
CREATE TABLE "ProfilContent" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "deskripsi" TEXT,
    "visi" TEXT,
    "misi" TEXT[],
    "tugasFungsi" TEXT,
    "profileImage" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SambutanContent" (
    "id" TEXT NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "sambutan1" TEXT NOT NULL,
    "sambutan2" TEXT NOT NULL,
    "sambutan3" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SambutanContent_pkey" PRIMARY KEY ("id")
);
