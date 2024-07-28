'use client';

import { useSession } from 'next-auth/react';

export default function UserFullName() {
  const { data, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  return <p className="title">{data?.user?.name}</p>;
}
