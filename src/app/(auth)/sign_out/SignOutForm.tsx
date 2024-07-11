'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import Cookie from 'js-cookie';
import useUserStore from '@/stores/user';
import { deleteSession } from '@/helpers/fetch';

export default function SignOutForm() {
  const router = useRouter();
  const clearUser = useUserStore(state => state.clearUser);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const token = Cookie.get('SATURN_APP_AUTH');
    const response = await deleteSession(form.action, token as string);

    if (response.ok) {
      Cookie.remove('SATURN_APP_AUTH');
      clearUser();
      router.push('/sign_in');
    }
  }

  return (
    <form
      action={`${process.env.NEXT_PUBLIC_API_URL}/api/sign_out`}
      method="POST"
      onSubmit={handleSubmit}>
      <button type="submit" name="submit">
        Sign out
      </button>
    </form>
  );
}
