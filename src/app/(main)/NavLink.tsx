'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useSlidingMenuStore } from '@/stores/sliding-menu';

type NavLinkProp = {
  path: string;
  body: React.ReactNode;
  icon: string;
  activeIcon: string;
  alt: string;
};

export default function NavLink(props: NavLinkProp) {
  const [isActive, setIsActive] = useState(false);
  const { open, setToggle } = useSlidingMenuStore(state => ({
    open: state.open,
    setToggle: state.setToggle,
  }));

  const className = 'block px-3 py-2 rounded-md';
  const selectedClassName = 'bg-primary-500 text-white';
  const availableClassName = 'bg-slate-100 hover:bg-slate-200';

  useEffect(() => {
    if (open) {
      const active = props.path.startsWith(document.location.pathname);
      setIsActive(active);
    }
  }, [open]);

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
