import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-env';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

// Dummy admin user - ganti dengan database di production
const ADMIN_USER: AdminUser = {
  id: '1',
  username: 'admin',
  email: 'admin@lpka.com',
  password: '$2a$10$lKbFrlEcFDAaC8NvvugiZe8kFj2psVcf5fNfuu370QU0r.KecpdsK', // password: admin123
};

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function authenticateAdmin(username: string, password: string): Promise<{ token: string; user: Omit<AdminUser, 'password'> } | null> {
  // Cek username
  if (username !== ADMIN_USER.username) {
    console.log('Username tidak cocok:', username, 'expected:', ADMIN_USER.username);
    return null;
  }

  // Verify password
  console.log('Verifying password...');
  console.log('Input password:', password);
  console.log('Stored hash:', ADMIN_USER.password);
  
  const isValid = await verifyPassword(password, ADMIN_USER.password);
  console.log('Password valid:', isValid);
  
  if (!isValid) {
    console.log('Password verification failed');
    return null;
  }

  const token = generateToken(ADMIN_USER.id);
  const { password: _, ...userWithoutPassword } = ADMIN_USER;

  return {
    token,
    user: userWithoutPassword,
  };
}
