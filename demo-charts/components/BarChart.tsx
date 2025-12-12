import { ChartWrapper } from './ChartWrapper';
import type { ChartDataPoint } from '../types';

export interface BarChartProps {
  data: ChartDataPoint[];
  title?: string;
  colors?: string[];
  onDataPointClick?: (point: ChartDataPoint) => void;
  animated?: boolean;
  showDataLabels?: boolean;
}

export const BarChart = (props: BarChartProps) => (
  <ChartWrapper {...props} type="bar" />
);