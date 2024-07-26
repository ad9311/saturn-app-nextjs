import { redirect } from 'next/navigation';

import { checkAuth } from '@/server-actions/helpers/auth';

import NavLinks from './NavLinks';
import ProfilePicture from './ProfilePicture';

export default async function Sidebar() {
  const { user } = await checkAuth();
  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="hidden lg:block col-span-2 h-full bg-slate-100 border-2 border-slate-200">
      <div className="mt-10 text-center">
        <ProfilePicture user={user} />
        <p className="title">{user.name}</p>
        <div className="mt-20 px-5">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
