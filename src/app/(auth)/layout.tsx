import TopAuthNavbar from '@/_layouts/components/TopAuthNavbar';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopAuthNavbar />
      {children}
    </>
  );
}
