import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';

import SignOutButton from '../auth/sign-out/SignOutButton';

export default async function Sidebar(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  const session = await auth();

  if (!session || !session.user) return <div {...props} />;

  return (
    <div {...props}>
      <div className="mt-10 text-center">
        <Image
          src={session.user.image as string}
          alt="profile-picture"
          width={100}
          height={100}
          className="w-fit mx-auto mb-5"
        />
        <p>{session.user.name}</p>
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
