import User from "@/types/client/user";

export type SessionResponseData = {
  token: string | null;
  user: User | undefined;
}
