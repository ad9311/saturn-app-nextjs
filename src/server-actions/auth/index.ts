'use server';

import {
  postCreateSession,
  deleteSession as deleteSession,
} from '@/fetch/auth';
import { ResponseCreateSessionData, ResponseDeleteSessionData } from '@/types/client/user';

export async function createSession(
  prevState: ResponseCreateSessionData,
  formData: FormData
): Promise<ResponseCreateSessionData> {
  const body = JSON.stringify({
    user: {
      email: formData.get('user[email]'),
      password: formData.get('user[password]'),
    },
  });

  const response = await postCreateSession(
    `${process.env.API}/users/sign_in`,
    body
  );
  const json = await response.json();

  if (json.status === 'SUCCESS') {
    return {
      authToken: json.data.authToken,
      user: json.data.user,
    };
  }

  return prevState;
}

export async function destroySession(
  prevState: ResponseDeleteSessionData,
  formData: FormData
): Promise<ResponseDeleteSessionData> {
  const authToken = formData.get('auth_token');
  const response = await deleteSession(
    `${process.env.API}/api/sign_out`,
    authToken as string
  );

  if (!response.ok) {
    return { signedOutSuccessfully: true };
  }

  return prevState;
}
