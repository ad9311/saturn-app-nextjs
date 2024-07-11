'use client';

import { getSession } from '@/helpers/fetch';
import { setJWTCookie } from '@/services/client-auth';
import useUserStore from '@/stores/user';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SignInForm() {
  const route = useRouter();
  const setUser = useUserStore(state => state.setUser);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const body = JSON.stringify({
      user: {
        email: formData.get('user[email]'),
        password: formData.get('user[password]'),
      }
    });

    const response = await getSession(form.action, body);
    const json = await response.json();

    if (json.status === 'CREATED') {
      setJWTCookie(json.data.token);
      setUser(json.data.user);
      route.push('/');
    }

  }

  return (
    <form onSubmit={handleSubmit} action={`${process.env.NEXT_PUBLIC_API_URL}/api/sign_in`}>
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
      <button type="submit" name="submit">Sign In</button>
    </form>
  );
}
