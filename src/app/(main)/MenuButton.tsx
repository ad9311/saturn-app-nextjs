'use client';

import Image from 'next/image';

import SquareGrid from '@/assets/img/square-grid.svg';
import { useSlidingMenuStore } from '@/stores/sliding-menu';

export default function MenuButton() {
  const { setToggle } = useSlidingMenuStore(state => ({ setToggle: state.setToggle }));
  return (
    <button id="sliding-menu-button" type="button" onClick={() => setToggle()}>
      <Image src={SquareGrid} alt="menu" className="w-7" />
    </button>
  );
}
