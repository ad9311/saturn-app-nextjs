export default function HomeLayout({
  children,
  lastbudgetperiods,
  currentbudgetperiod,
}: Readonly<{
  children: React.ReactNode;
  lastbudgetperiods: React.ReactNode;
  currentbudgetperiod: React.ReactNode;
}>) {
  return (
    <div>
      <section className="grid grid-flow-row lg:grid-flow-col gap-2">
        <div className="lg:col-span-4">{currentbudgetperiod}</div>
        <div className="lg:col-span-8">{lastbudgetperiods}</div>
      </section>
      {children}
    </div>
  );
}
