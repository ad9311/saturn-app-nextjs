import User from '@/types/client/user';

export type ResponseCreateSessionData = {
  authToken: string | null;
  user: User | undefined;
};

export type ResponseDeleteSessionData = {
  signedOutSuccessfully: boolean;
};
