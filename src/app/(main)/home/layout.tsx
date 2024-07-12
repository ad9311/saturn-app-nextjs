export default function HomeLayout({
  children,
  budgetperiods,
  lastbudgetperiod,
}: Readonly<{
  children: React.ReactNode;
  budgetperiods: React.ReactNode;
  lastbudgetperiod: React.ReactNode;
}>) {
  return (
    <div>
      <div>{lastbudgetperiod}</div>
      <div>{budgetperiods}</div>
      {children}
    </div>
  );
}
