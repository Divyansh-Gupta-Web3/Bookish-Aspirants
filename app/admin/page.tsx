import type { Metadata } from 'next';
import { AdminArea } from '@/components/admin/admin-area';

export const metadata: Metadata = {
  title: 'Content manager',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-28 pt-16 md:px-10 md:pt-24">
      <AdminArea />
    </main>
  );
}
