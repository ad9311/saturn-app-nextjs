import TopAuthNavbar from './TopAuthNavbar';

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
