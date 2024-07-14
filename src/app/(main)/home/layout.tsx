export default function HomeLayout({
  children,
  lastBudgets,
  currentBudget,
  lists,
}: Readonly<{
  children: React.ReactNode;
  lastBudgets: React.ReactNode;
  currentBudget: React.ReactNode;
  lists: React.ReactNode;
}>) {
  return (
    <div className="grid grid-flow-row gap-10">
      <section className="grid grid-flow-row lg:grid-flow-col gap-3">
        <div className="lg:col-span-4 overflow-auto">{currentBudget}</div>
        <div className="lg:col-span-8 overflow-auto">{lastBudgets}</div>
      </section>
      <section className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-12 gap-3">
        <div className="lg:col-span-6">{lists}</div>
      </section>
      {children}
    </div>
  );
}
