import TopMainNavbar from '@/app/(main)/TopMainNavbar';
import SetUserOnReload from './SetUserOnReload';
import UserInfo from './UserInfo';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SetUserOnReload />
      <TopMainNavbar />
      <UserInfo />
      {children}
    </>
  );
}
