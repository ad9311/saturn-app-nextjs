'use client';

import CoinIWhitecon from '@/assets/img/coin-white.svg';
import CoinIcon from '@/assets/img/coin.svg';
import HouseWhiteIcon from '@/assets/img/house-white.svg';
import HouseIcon from '@/assets/img/house.svg';

import NavLink from './NavLink';

const navLinks = [
  { body: 'Home', path: '/home', icon: HouseIcon, activeIcon: HouseWhiteIcon, alt: 'home' },
  { body: 'Budgets', path: '/budgets', icon: CoinIcon, activeIcon: CoinIWhitecon, alt: 'budgets' },
];

export default function NavLinks() {
  const mappedLinks = navLinks.map(navLink => {
    return (
      <li key={navLink.path}>
        <NavLink {...navLink} />
      </li>
    );
  });

  return <ul className="flex flex-col gap-5">{mappedLinks}</ul>;
}
