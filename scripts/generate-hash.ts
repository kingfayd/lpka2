import { hashPassword } from './auth';

/**
 * Script untuk generate hashed password
 * Jalankan: npx ts-node scripts/generate-hash.ts
 */

async function generateHash() {
  const password = 'admin123';
  const hash = await hashPassword(password);
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nGunakan hash ini di lib/auth.ts untuk ADMIN_USER.password');
}

generateHash().catch(console.error);
