'use client';

import { useRouter } from 'next/navigation';

export function useSignOut() {
  const router = useRouter();

  const signOut = () => {
    router.push('/sign-out?session=expired');
  };

  return { signOut };
}
