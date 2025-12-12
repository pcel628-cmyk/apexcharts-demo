<<<<<<< HEAD
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
=======
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
>>>>>>> 2a40b860df38d6164c2a0dac2928d38cfe818c55
);