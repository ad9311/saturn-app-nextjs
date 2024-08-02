export default function Amount({ value, isExpense }: { value: number; isExpense?: boolean }) {
  const formattedAmount = `$${value.toFixed(2)}`;

  if (value > 0 && !isExpense) {
    return <span className="text-green-700">{formattedAmount}</span>;
  }

  if (value < 0 || isExpense) {
    return <span className="text-red-700">{formattedAmount}</span>;
  }

  return <span className="subtitle">{formattedAmount}</span>;
}
