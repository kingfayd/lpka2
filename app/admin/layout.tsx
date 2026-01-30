import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - LPKA',
  description: 'Admin Dashboard LPKA',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
