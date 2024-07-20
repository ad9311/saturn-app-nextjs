import { signIn } from '@/auth';

export default function SignInButton() {
  async function handleSignInFlow() {
    'use server';

    await signIn('github', { redirect: true, redirectTo: '/' });
  }

  return (
    <form action={handleSignInFlow}>
      <button type="submit" className="text-blue-700 hover:underline">
        Sign In!
      </button>
    </form>
  );
}
