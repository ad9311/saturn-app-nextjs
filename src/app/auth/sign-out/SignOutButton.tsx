'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  async function handleSignOutFlow() {
    await signOut();
  }

  return (
    <button
      type="button"
      onClick={handleSignOutFlow}
      className="text-red-800 text-sm hover:underline">
      Sign out
    </button>
  );
}
