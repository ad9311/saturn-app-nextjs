'use client';

import Image from 'next/image';

import MenuLinesIcon from '@/assets/img/menu-lines.svg';
import { useSlidingMenuStore } from '@/stores/sliding-menu';

export default function MenuButton() {
  const { setToggle } = useSlidingMenuStore(state => ({ setToggle: state.setToggle }));
  return (
    <button id="sliding-menu-button" type="button" onClick={() => setToggle()}>
      <Image src={MenuLinesIcon} alt="menu" className="w-10" />
    </button>
  );
}
