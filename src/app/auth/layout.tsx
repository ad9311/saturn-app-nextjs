export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="p-3 container mx-auto">{children}</main>;
}
