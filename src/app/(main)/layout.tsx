import MainNavbar from '@/app/(main)/MainNavbar';
import SetUserOnReload from './SetUserOnReload';
import UserInfo from './UserInfo';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SetUserOnReload />
      <MainNavbar />
      <UserInfo />
      <main>{children}</main>
    </>
  );
}
