'use client';

import { setJWTCookie } from '@/services/client-auth';
import useUserStore from '@/stores/user';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SignInForm() {
  const route = useRouter();
  const setUser = useUserStore(state => state.setUser);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const user = {
      email: formData.get('user[email]'),
      password: formData.get('user[password]'),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/sign_in`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ user }),
      }
    );

    const json = await response.json();

    setJWTCookie(json.data.token);
    setUser(json.data.user);

    route.push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <input type="submit" value="Sign In" />
    </form>
  );
}
