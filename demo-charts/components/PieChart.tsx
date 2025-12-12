import { ChartWrapper } from './ChartWrapper';
import type { ChartDataPoint } from '../types';

export interface PieChartProps {
  data: ChartDataPoint[];
  title?: string;
  colors?: string[];
  onDataPointClick?: (point: ChartDataPoint) => void;
  animated?: boolean;
  showDataLabels?: boolean;
}

export const PieChart = (props: PieChartProps) => (
  <ChartWrapper {...props} type="pie" />
);