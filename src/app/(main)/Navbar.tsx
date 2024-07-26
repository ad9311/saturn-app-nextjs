import Image from 'next/image';
import Link from 'next/link';
import SquareGrid from '@/assets/img/square-grid.svg';

export default function Navbar(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Image src={SquareGrid} alt="menu" className="w-7" />
      {/* <Link href="/home">Home</Link>
      <Link href="/profile">Profile</Link> */}
    </div>
  );
}
