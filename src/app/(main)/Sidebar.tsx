import NavLinks from './NavLinks';
import ProfilePicture from './ProfilePicture';
import UserFullName from './UserFullName';

export default function Sidebar() {
  return (
    <div className="hidden lg:block col-span-2 h-full bg-slate-50 border border-slate-200">
      <div className="mt-10 text-center">
        <ProfilePicture />
        <UserFullName />
        <div className="mt-20 px-5">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
