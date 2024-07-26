'use client';

import Link from 'next/link';

import { useSlidingMenuStore } from '@/stores/sliding-menu';

const links = [
  { body: 'Home', path: '/home' },
  { body: 'Budgets', path: '/budgets' },
  { body: 'Profile', path: '/profile' },
];

export default function NavLinks() {
  const { setToggle } = useSlidingMenuStore(state => ({
    setToggle: state.setToggle,
  }));

  const mappedLinks = links.map(link => (
    <li key={link.path}>
      <Link href={link.path} className="nav-link" onClick={setToggle}>
        <span className="text-lg">{link.body}</span>
      </Link>
    </li>
  ));

  return <ul className="flex flex-col gap-5">{mappedLinks}</ul>;
}
