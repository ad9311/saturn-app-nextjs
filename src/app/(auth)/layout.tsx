import AuthNavbar from './AuthNavbar';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AuthNavbar />
      {children}
    </>
  );
}
