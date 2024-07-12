'use server'

import { postCreateSession } from "@/fetch/auth";
import { SessionResponseData } from "./types";

export async function createSession(prevState: SessionResponseData, formData: FormData): Promise<SessionResponseData> {
  const body = JSON.stringify({
    user: {
      email: formData.get('user[email]'),
      password: formData.get('user[password]'),
    },
  });

  const response = await postCreateSession(`${process.env.API_URL}/api/sign_in`, body);
  const json = await response.json();

  console.log(json);

  if (json.status === 'CREATED') {
    return {
      token: json.data.token,
      user: json.data.user
    }
  }

  return prevState;
}
