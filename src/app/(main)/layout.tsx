import MainNavbar from './MainNavbar';
import SetUserOnReload from './SetUserOnReload';
import Sidebar from './Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SetUserOnReload />
      <div className="lg:grid grid-cols-12 h-full">
        <MainNavbar className="lg:hidden bg-neutral-200" />
        <Sidebar className="hidden lg:block col-span-2 h-full bg-neutral-200" />
        <main className="p-3 col-span-full lg:col-span-10">{children}</main>
      </div>
    </>
  );
}
