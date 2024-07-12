'use client';

import useUserStore from "@/stores/user";

export default function UserInfo() {
  const user = useUserStore(state => state.user);

  if (user) {
    return <span>{user.firstName} {user.lastName}</span>
  }

  return <span>Loading</span>
}
