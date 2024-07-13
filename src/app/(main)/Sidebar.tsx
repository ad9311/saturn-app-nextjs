import UserInfo from './UserInfo';

export default function Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <UserInfo />
    </div>
  );
}
