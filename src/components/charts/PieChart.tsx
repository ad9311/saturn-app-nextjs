import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  registerables,
  ChartData,
  ChartOptions,
} from 'chart.js';
ChartJS.register(...registerables);

type ChartProps = {
  data: ChartData<'pie'>;
  options: ChartOptions<'pie'>;
}

type CanvasProps = React.HTMLAttributes<HTMLCanvasElement> & ChartProps;

export default function PieChart(props: CanvasProps) {
  return <Pie {...props} />;
}
