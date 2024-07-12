'use client';

import { getCurrentUser } from '@/fetch/auth';
import useUserStore from '@/stores/user';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SetUserOnReload() {
  const route = useRouter();
  const [user, setUser] = useUserStore(state => [state.user, state.setUser]);

  async function setUseronLoad() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getCurrentUser(
      `${process.env.NEXT_PUBLIC_API}/api/users/me`,
      authToken as string
    );

    if (response.status === 401) {
      route.push('/sign_out');
    }

    const json = await response.json();

    if (json.status === 'OK') {
      setUser(json.data.user);
    }
  }

  useEffect(() => {
    if (user === undefined) {
      setUseronLoad();
    }
  }, []);

  return null;
}
