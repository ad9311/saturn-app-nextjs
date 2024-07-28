import { redirect } from 'next/navigation';

import { checkAuth } from '@/server-actions/helpers/auth';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = await checkAuth();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="lg:grid grid-cols-12 h-full">
      <Navbar />
      <Sidebar />
      <main className="p-3 col-span-full lg:col-span-10">{children}</main>
    </div>
  );
}
