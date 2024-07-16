import Link from 'next/link';

export default function MainNavbar(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ul className="flex items-center gap-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/sign-out">Sign out</Link>
        </li>
      </ul>
    </div>
  );
}
