import { ChartWrapper } from './ChartWrapper';
import type { ChartDataPoint } from '../types';

export interface LineChartProps {
  data: ChartDataPoint[];
  title?: string;
  colors?: string[];
  onDataPointClick?: (point: ChartDataPoint) => void;
  animated?: boolean;
  showDataLabels?: boolean;
}

export const LineChart = (props: LineChartProps) => (
  <ChartWrapper {...props} type="line" />
);