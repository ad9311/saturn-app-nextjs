'use client';

import { signIn } from "next-auth/react"

export default function SignInButton() {
  async function handleSignInFlow() {
    await signIn('github', { callbackUrl: '/home', redirect: false })
  }

  return (
    <button type="button" onClick={handleSignInFlow}>Click to sign in</button>
  )
}
