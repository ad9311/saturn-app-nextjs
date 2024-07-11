import TopMainNavbar from '@/_layouts/components/TopMainNavbar';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopMainNavbar />
      {children}
    </>
  );
}
