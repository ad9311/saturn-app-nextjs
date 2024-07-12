'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { destroySession } from '@/server-actions/auth';
import useUserStore from '@/stores/user';
import Cookie from 'js-cookie';

export default function SignOutForm() {
  const router = useRouter();
  const clearUser = useUserStore(state => state.clearUser);
  const [formState, formAction] = useFormState(destroySession, { signedOutSuccessfully: false })

  const authToken = Cookie.get('SATURN_APP_AUTH');

  useEffect(() => {
    if (formState.signedOutSuccessfully) {
      Cookie.remove('SATURN_APP_AUTH');
      router.push('/sign_in');
      clearUser();
    }
  }, [formState])

  return (
    <form
      action={formAction}>
      <input type="hidden" name="auth_token" value={authToken} readOnly />
      <button type="submit" name="submit">
        Sign out
      </button>
    </form>
  );
}
