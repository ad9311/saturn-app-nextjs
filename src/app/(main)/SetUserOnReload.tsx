'use client';

import { getCurrentUser } from '@/helpers/fetch';
import useUserStore from '@/stores/user';
import Cookie from 'js-cookie';
import { useEffect } from 'react';

export default function SetUserOnReload() {
  const [user, setUser] = useUserStore(state => [state.user, state.setUser]);

  async function setUseronLoad() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getCurrentUser(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
      authToken as string
    );
    const json = await response.json();

    if (json.status === 'OK') {
      setUser(json.data.user);
    }
  }

  useEffect(() => {
    if (user === undefined) {
      setUseronLoad();
    }
  });

  return null;
}
