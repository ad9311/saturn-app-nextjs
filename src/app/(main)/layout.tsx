import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:grid grid-cols-12 h-full">
      <Navbar className="px-3 py-2 lg:hidden bg-slate-100 border-2 border-slate-200" />
      <Sidebar className="hidden lg:block col-span-2 h-full bg-neutral-200" />
      <main className="p-3 col-span-full lg:col-span-10">{children}</main>
    </div>
  );
}
