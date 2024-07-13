import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables,
  ChartData,
  ChartOptions,
} from 'chart.js';
ChartJS.register(...registerables);

type ChartProps = {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

type CanvasProps = React.HTMLAttributes<HTMLCanvasElement> & ChartProps;

export default function LineChart(props: CanvasProps) {
  return <Line {...props} />;
}
