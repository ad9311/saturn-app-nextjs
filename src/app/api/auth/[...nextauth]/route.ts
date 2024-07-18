import { createUser, getUserByAccountId } from '@/db/users';
import { User } from '@/types/user';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { signInCallback } from './callbacks';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async signIn(data) {
      return await signInCallback(data);
    },
  },
});

export { handler as GET, handler as POST };
