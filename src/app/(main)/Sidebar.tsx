import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { checkAuth } from '@/server-actions/helpers/auth';

import SignOutButton from '../auth/sign-out/SignOutButton';

export default async function Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  const { user } = await checkAuth();
  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div {...props}>
      <div className="mt-10 text-center">
        <Image
          src={user.image as string}
          alt="profile-picture"
          width={100}
          height={100}
          className="w-fit mx-auto mb-5"
        />
        <p>{user.name}</p>
        <SignOutButton />
        <br />
        <nav className="flex flex-col">
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
    </div>
  );
}
