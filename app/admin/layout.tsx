import type { Metadata } from 'next';
import { AdminProvider } from './AdminProvider';

export const metadata: Metadata = {
  title: 'Admin - LPKA',
  description: 'Admin Dashboard LPKA',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProvider>{children}</AdminProvider>;
}
