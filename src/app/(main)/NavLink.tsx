'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useSlidingMenuStore } from '@/stores/sliding-menu';

type NavLinkProp = {
  path: string;
  body: React.ReactNode;
  icon: string;
  activeIcon: string;
  alt: string;
};

export default function NavLink(props: NavLinkProp) {
  const pathname = usePathname();
  const { setToggle } = useSlidingMenuStore(state => ({
    setToggle: state.setToggle,
  }));

  const isActive = pathname.startsWith(props.path);

  const className = 'block px-3 py-2 rounded-md';
  const selectedClassName = 'bg-primary-500 text-white';
  const availableClassName = 'bg-slate-100 hover:bg-slate-200 transition-all';

  return (
    <Link
      href={props.path}
      className={`${className} ${isActive ? selectedClassName : availableClassName}`}
      onClick={setToggle}>
      <div className="flex items-center gap-2">
        <Image src={isActive ? props.activeIcon : props.icon} alt={props.alt} className="w-6" />
        <span className="text-lg font-bold">{props.body}</span>
      </div>
    </Link>
  );
}
