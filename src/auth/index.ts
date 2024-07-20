import { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import {
  CallbackData,
  restrictUsersCallback,
  signInCallback,
} from './callbacks';
import NextAuth from 'next-auth';

export const authOptions = {
  debug: true,
  session: {
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async signIn(data) {
      const restrict = await restrictUsersCallback(data as CallbackData);
      if (restrict) {
        return false;
      }

      return await signInCallback(data as CallbackData);
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
