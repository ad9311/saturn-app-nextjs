'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { useSlidingMenuStore } from '@/stores/sliding-menu';

const links = [
  { body: 'Home', path: '/home' },
  { body: 'Budgets', path: '/budgets' },
  { body: 'Profile', path: '/profile' },
];

export default function SlidingMenu({ user }: { user: User }) {
  const { open } = useSlidingMenuStore(state => ({ open: state.open }));

  const mappedLinks = links.map(link => (
    <li key={link.path}>
      <Link href={link.path} className="nav-link">
        <span className="text-lg">{link.body}</span>
      </Link>
    </li>
  ));

  return (
    <div className={`absolute card h-[90vh] w-72 transition-all ${open ? 'left-0' : '-left-72'}`}>
      <div className="mt-10 text-center">
        <Image
          src={user.image}
          alt="profile-picture"
          width={100}
          height={100}
          className="w-fit mx-auto mb-5 rounded-full"
        />
        <p className="title">{user.name}</p>
        <ul className="mt-20 flex flex-col gap-5">{mappedLinks}</ul>
      </div>
    </div>
  );
}
