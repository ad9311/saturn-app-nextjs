import MenuButton from './MenuButton';
import SlidingMenu from './SlidingMenu';

export default async function Navbar() {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 lg:hidden">
      <div id="sliding-menu-container">
        <div className="px-3 py-2 bg-slate-100 border-2 border-slate-200">
          <MenuButton />
        </div>
        <div className="relative">
          <SlidingMenu />
        </div>
      </div>
    </div>
  );
}
