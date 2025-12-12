<<<<<<< HEAD
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
=======
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
>>>>>>> 2a40b860df38d6164c2a0dac2928d38cfe818c55
);