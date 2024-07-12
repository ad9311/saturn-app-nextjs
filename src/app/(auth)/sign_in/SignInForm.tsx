'use client';

import { signInUser } from "@/server-actions/auth/sign-in-user";
import { SessionResponseData } from "@/server-actions/auth/types";
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';
import { setJWTCookie } from '@/services/client-auth';
import { useEffect } from "react";
import useUserStore from '@/stores/user';


const initialState: SessionResponseData = {
  token: null,
  user: undefined
}

export default function SignInForm() {
  const route = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const [formState, formAction] = useFormState(signInUser, initialState)

  useEffect(() => {
    if (formState.user && formState.token) {
      setJWTCookie('SATURN_APP_AUTH', formState.token);
      setUser(formState.user);
      route.push('/');
    }
  }, [formState])

  return (
    <form
      action={formAction}>
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
