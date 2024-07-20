import { signOut } from '@/auth';

export default function SignOutButton() {
  async function handleSignOutFlow() {
    'use server';

    await signOut({ redirect: true, redirectTo: '/' });
  }

  return (
    <form action={handleSignOutFlow}>
      <button type="submit" className="text-red-700 hover:underline">Sign Out!</button>
    </form>
  );
}
