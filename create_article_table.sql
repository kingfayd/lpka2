-- Migration: Create Article Table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS "Article" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "imageUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS "Article_createdAt_idx" ON "Article"("createdAt" DESC);
