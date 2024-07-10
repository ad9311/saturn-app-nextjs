import Link from "next/link";

export default function TopMainNavbar() {
  return (
    <div>
      <ul className="flex items-center gap-2">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/profile">Profile</Link></li>
      </ul>
    </div>
  )
}
