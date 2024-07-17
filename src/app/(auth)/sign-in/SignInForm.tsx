'use client';

import { createSession } from '@/server-actions/auth';
import { ResponseCreateSessionData } from '@/types/client/user';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { setJWTCookie } from '@/services/client-auth';
import { useEffect } from 'react';
import useUserStore from '@/stores/user';

const initialState: ResponseCreateSessionData = {
  authToken: null,
  user: undefined,
};

export default function SignInForm() {
  const route = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const [formState, formAction] = useFormState(createSession, initialState);

  useEffect(() => {
    if (formState.user && formState.authToken) {
      setJWTCookie('SATURN_APP_AUTH', formState.authToken);
      setUser(formState.user);
      route.push('/home');
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <label htmlFor="email">
        <input
          type="email"
          name="user[email]"
          id="email"
          placeholder="Email"
          autoComplete="email"
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="user[password]"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
        />
      </label>
      <button type="submit" name="submit">
        Sign In
      </button>
    </form>
  );
}
