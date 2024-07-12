export default function HomeLayout({
  children,
  budgetperiods,
}: Readonly<{ children: React.ReactNode; budgetperiods: React.ReactNode }>) {
  return (
    <div>
      <div>{budgetperiods}</div>
      {children}
    </div>
  );
}
