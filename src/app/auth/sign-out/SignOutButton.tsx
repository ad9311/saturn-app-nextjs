'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  async function handleSignOutFlow() {
    await signOut();
  }

  return (
    <button type="button" onClick={handleSignOutFlow}>
      Click to sign out
    </button>
  );
}
