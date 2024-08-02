'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import GearImage from '@/assets/img/gear.svg';
import { useSlidingMenuStore } from '@/stores/sliding-menu';
import Spinner from '@/components/Spinner';

export default function ProfilePicture() {
  const { data, status } = useSession();
  const { setToggle } = useSlidingMenuStore(state => ({
    setToggle: state.setToggle,
  }));

  if (status === 'loading') {
    return (
      <div className="pt-10 w-fit mx-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative w-fit mx-auto">
      <Image
        src={data?.user?.image as string}
        alt="profile-picture"
        width={100}
        height={100}
        className="w-fit mx-auto mb-5 rounded-full"
      />
      <Link href="/settings" className="absolute bottom-1 right-0" onClick={setToggle}>
        <Image src={GearImage} alt="gear" className="w-8" />
      </Link>
    </div>
  );
}
