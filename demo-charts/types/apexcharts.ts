/**
 * Типы для ApexCharts, которые не включены в официальную библиотеку
 */

export interface ApexChartConfig {
  seriesIndex?: number;
  dataPointIndex?: number;
  [key: string]: unknown;
}

export interface FormatterContext {
  seriesIndex?: number;
  dataPointIndex?: number;
  w?: ApexChartWrapper;
}

export interface ApexChartWrapper {
  config?: {
    series?: number[] | SeriesData[];
    labels?: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface SeriesData {
  data?: number[];
  name?: string;
}

export type FormatterFunction = (
  val: unknown,
  context?: FormatterContext
) => string;
