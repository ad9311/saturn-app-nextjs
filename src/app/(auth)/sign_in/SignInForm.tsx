'use client';

import { setJWTCookie } from '@/client-services/auth';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SignInForm() {
  const route = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const user = {
      email: formData.get('user[email]'),
      password: formData.get('user[password]'),
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/sign_in`, {
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ user }),
    });

    const jsonResponse = await response.json();
    setJWTCookie(jsonResponse.data.token);
    route.push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        <input type="email" name="user[email]" id="email" placeholder="Email" />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="user[password]"
          id="password"
          placeholder="Password"
        />
      </label>
      <input type="submit" value="Sign In" />
    </form>
  );
}
