declare module 'react-chartkick' {
  import * as React from 'react';

  export interface ChartProps {
    data: any;
    id?: string;
    height?: string;
    width?: string;
    colors?: string[];
    donut?: boolean;
    library?: any;
    legend?: boolean | 'bottom' | 'top' | 'left' | 'right';
    messages?: { empty: string };
    download?: boolean;
    downloadText?: string;
    label?: string;
    min?: number;
    max?: number;
    precision?: number;
    refresh?: number;
    dataset?: (dataset: any) => any;
    options?: { [key: string]: any };
  }

  export class LineChart extends React.Component<ChartProps> {}
  export class PieChart extends React.Component<ChartProps> {}
  export class ColumnChart extends React.Component<ChartProps> {}
  export class BarChart extends React.Component<ChartProps> {}
  export class AreaChart extends React.Component<ChartProps> {}
  export class GeoChart extends React.Component<ChartProps> {}
  export class ScatterChart extends React.Component<ChartProps> {}
  export class Timeline extends React.Component<ChartProps> {}
}
