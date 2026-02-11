-- Migration: Create Pejabat Table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS "Pejabat" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "nama" TEXT NOT NULL,
  "jabatan" TEXT NOT NULL,
  "fotoUrl" TEXT,
  "urutan" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS "Pejabat_urutan_idx" ON "Pejabat"("urutan" ASC);
