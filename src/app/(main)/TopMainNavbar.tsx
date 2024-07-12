import Link from 'next/link';
import SignOutForm from '@/app/(auth)/sign_out/SignOutForm';

export default function TopMainNavbar() {
  return (
    <div>
      <ul className="flex items-center gap-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
      <SignOutForm />
    </div>
  );
}
