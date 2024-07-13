export default function HomeLayout({
  children,
  lastbudgetperiods,
  currentbudgetperiod,
  lists,
}: Readonly<{
  children: React.ReactNode;
  lastbudgetperiods: React.ReactNode;
  currentbudgetperiod: React.ReactNode;
  lists: React.ReactNode;
}>) {
  return (
    <div className="grid grid-flow-row gap-10">
      <section className="grid grid-flow-row lg:grid-flow-col gap-3">
        <div className="lg:col-span-4">{currentbudgetperiod}</div>
        <div className="lg:col-span-8">{lastbudgetperiods}</div>
      </section>
      <section className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-12 gap-3">
        <div className="lg:col-span-6">{lists}</div>
      </section>
      {children}
    </div>
  );
}
