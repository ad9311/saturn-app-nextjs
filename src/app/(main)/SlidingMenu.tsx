'use client';

import { useEffect } from 'react';

import { useSlidingMenuStore } from '@/stores/sliding-menu';

import NavLinks from './NavLinks';
import ProfilePicture from './ProfilePicture';
import UserFullName from './UserFullName';

export default function SlidingMenu() {
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
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div
      id="sliding-menu"
      className={`absolute card h-[90vh] w-72 transition-all ${open ? 'left-0' : '-left-72'}`}>
      <div className="mt-10 text-center">
        <ProfilePicture />
        <UserFullName />
        <div className="mt-20">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
