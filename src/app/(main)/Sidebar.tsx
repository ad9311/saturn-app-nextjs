import NavLinks from './NavLinks';
import ProfilePicture from './ProfilePicture';

export default async function Sidebar() {
  return (
    <div className="hidden lg:block col-span-2 h-full bg-slate-100 border-2 border-slate-200">
      <div className="mt-10 text-center">
        <ProfilePicture />
        {/* <p className="title">{user.name}</p> */}
        <div className="mt-20 px-5">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
