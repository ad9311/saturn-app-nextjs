import { getServerSession, NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import {
  CallbackData,
  restrictUsersCallback,
  signInCallback,
} from './callbacks';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

export const authOptions = {
  debug: true,
  session: {
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
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
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
