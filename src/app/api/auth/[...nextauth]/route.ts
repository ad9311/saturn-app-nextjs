import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import {
  CallbackData,
  restrictUsersCallback,
  signInCallback,
} from './callbacks';

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
      const restrict = await restrictUsersCallback(data as CallbackData);
      if (restrict) {
        return false;
      }

      return await signInCallback(data as CallbackData);
    },
  },
});

export { handler as GET, handler as POST };
