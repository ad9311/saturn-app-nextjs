'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import GearImage from '@/assets/img/gear.svg';
import { useSlidingMenuStore } from '@/stores/sliding-menu';

export default function ProfilePicture({ user }: { user: User }) {
  const { setToggle } = useSlidingMenuStore(state => ({
    setToggle: state.setToggle,
  }));
  return (
    <div className="relative w-fit mx-auto">
      <Image
        src={user.image}
        alt="profile-picture"
        width={100}
        height={100}
        className="w-fit mx-auto mb-5 rounded-full"
      />
      <Link href="/profile" className="absolute bottom-1 right-0" onClick={setToggle}>
        <Image src={GearImage} alt="gear" className="w-8" />
      </Link>
    </div>
  );
}
