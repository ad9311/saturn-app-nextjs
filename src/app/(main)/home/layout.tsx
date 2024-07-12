export default function HomeLayout(
  {
    children,
    chart
  }:
  Readonly<{ children: React.ReactNode, chart: React.ReactNode }>) {
  return (
    <div>
      <div>
        {chart}
      </div>
      {children}
    </div>
  );
}
