import Link from 'next/link';

export default function Navbar(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Link href="/home">Home</Link>
      <Link href="/profile">Profile</Link>
    </div>
  );
}
