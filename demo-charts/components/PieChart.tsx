<<<<<<< HEAD
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
=======
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
>>>>>>> 2a40b860df38d6164c2a0dac2928d38cfe818c55
);