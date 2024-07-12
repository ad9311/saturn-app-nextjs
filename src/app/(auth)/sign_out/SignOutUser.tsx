'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/user';
import Cookie from 'js-cookie';
import { deleteSession } from '@/fetch/auth';

export default function SignOutUser() {
  const router = useRouter();
  const clearUser = useUserStore(state => state.clearUser);

  async function signOutHandle() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await deleteSession(
      `${process.env.NEXT_PUBLIC_API}/users/sign_out`,
      authToken as string
    );

    if (response.ok || response.status === 401) {
      Cookie.remove('SATURN_APP_AUTH');
      router.push('/sign_in');
      clearUser();
    } else {
      // TODO
    }
  }

  useEffect(() => {
    signOutHandle();
  }, []);

  return null;
}
