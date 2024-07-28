import MenuButton from './MenuButton';
import SlidingMenu from './SlidingMenu';

export default function Navbar() {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 lg:hidden">
      <div id="sliding-menu-container">
        <div className="px-3 flex items-center bg-slate-200 border- border-slate-300">
          <MenuButton />
        </div>
        <div className="relative">
          <SlidingMenu />
        </div>
      </div>
    </div>
  );
}
