import Image from 'next/image';

import GitHubIcon from '@/assets/img/github.svg';
import { signIn } from '@/auth';

export default function SignInButton() {
  async function handleSignInFlow() {
    'use server';

    await signIn('github', { redirect: true, redirectTo: '/' });
  }

  return (
    <form action={handleSignInFlow} className="flex justify-end">
      <label htmlFor="github-sign-in">
        <button
          type="submit"
          id="github-sign-in"
          name="github-sign-in"
          className="btn github-button flex items-center gap-3">
          <Image src={GitHubIcon} alt="github" width={30} height={30} className="py-1" priority />
          <span>Continue with GitHub</span>
        </button>
      </label>
    </form>
  );
}
