import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables,
  ChartData,
  ChartOptions,
} from 'chart.js';
ChartJS.register(...registerables);

export default function PieChart({
  data,
  options,
}: {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
}) {
  return (
    <div className="relative">
      <Pie data={data} options={options} />
    </div>
  );
}
