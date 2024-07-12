import User from "@/types/client/user";

export type SessionResponseData = {
  authToken: string | null;
  user: User | undefined;
}
