'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import GearImage from '@/assets/img/gear.svg';
import { useSlidingMenuStore } from '@/stores/sliding-menu';

const links = [
  { body: 'Home', path: '/home' },
  { body: 'Budgets', path: '/budgets' },
  { body: 'Profile', path: '/profile' },
];

export default function SlidingMenu({ user }: { user: User }) {
  const { open, setToggle } = useSlidingMenuStore(state => ({
    open: state.open,
    setToggle: state.setToggle,
  }));

  function handleClickOutside(event: MouseEvent) {
    const slidingMenuContainer = document.getElementById('sliding-menu-container');
    const slidingMenu = document.getElementById('sliding-menu');
    const target = event.target as HTMLElement;

    if (slidingMenuContainer && slidingMenu) {
      const clickOutside = !slidingMenuContainer.contains(target);
      if (clickOutside && slidingMenu.classList.contains('left-0')) {
        setToggle();
        // slidingMenu.classList.toggle('-left-72')
        // slidingMenu.classList.toggle('left-0')
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });

  const mappedLinks = links.map(link => (
    <li key={link.path}>
      <Link href={link.path} className="nav-link" onClick={setToggle}>
        <span className="text-lg">{link.body}</span>
      </Link>
    </li>
  ));

  return (
    <div
      id="sliding-menu"
      className={`absolute card h-[90vh] w-72 transition-all ${open ? 'left-0' : '-left-72'}`}>
      <div className="mt-10 text-center">
        <div className="relative">
          <Image
            src={user.image}
            alt="profile-picture"
            width={100}
            height={100}
            className="w-fit mx-auto mb-5 rounded-full"
          />
          <Link href="/profile" className="absolute bottom-1 right-16" onClick={setToggle}>
            <Image src={GearImage} alt="gear" className="w-8" />
          </Link>
        </div>
        <p className="title">{user.name}</p>
        <ul className="mt-20 flex flex-col gap-5">{mappedLinks}</ul>
      </div>
    </div>
  );
}
