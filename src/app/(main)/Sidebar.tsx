import { getServerSession } from 'next-auth';
import SignOutButton from '../auth/sign-out/SignOutButton';

export default async function Sidebar(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  const session = await getServerSession();

  if (!session?.user) return <div {...props} />;

  return (
    <div {...props}>
      <div className="mt-10 text-center">
        <p>{session.user.name}</p>
        <SignOutButton />
      </div>
    </div>
  );
}
