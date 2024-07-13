import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables,
  ChartData,
  ChartOptions,
} from 'chart.js';
ChartJS.register(...registerables);

export default function LineChart({
  data,
  options,
}: {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}) {
  return <Line data={data} options={options} />;
}
