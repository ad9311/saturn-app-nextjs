import Link from 'next/link';
import UserInfo from './UserInfo';

export default function Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <UserInfo />
      <Link href="/sign_out">Sign out</Link>
      <br />
      <Link href="/home">Home</Link>
    </div>
  );
}
