<<<<<<< HEAD
import { ApexOptions } from 'apexcharts';
import type { FormatterContext, ApexChartConfig } from '../types/apexcharts';

/**
 * Создаёт базовые настройки для всех типов графиков
 */
export function createChartOptions(
  type: 'bar' | 'line' | 'pie',
  title: string = '',
  colors: string[],
  labels?: string[],
  onDataPointClick?: (seriesIndex: number, dataPointIndex: number) => void,
  animated: boolean = true,
  showDataLabels: boolean = true
): ApexOptions {
  const commonOptions: ApexOptions = {
    chart: {
      type,
      animations: {
        enabled: animated,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 }
      },
      events: {
        dataPointSelection: onDataPointClick 
          ? (event, chartContext, config: ApexChartConfig) => {
              const seriesIndex = config.seriesIndex ?? 0;
              const dataPointIndex = config.dataPointIndex;
              onDataPointClick(seriesIndex, dataPointIndex ?? 0);
            }
          : undefined,
      },
      toolbar: { show: true },
      zoom: { enabled: false }
    },
    colors,
    title: {
      text: title,
      align: 'center',
      style: { fontSize: '16px', fontWeight: 'bold' }
    },
    dataLabels: {
      enabled: showDataLabels,
      style: { fontSize: '12px' }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    responsive: [{
      breakpoint: 768,
      options: {
        legend: { position: 'bottom', offsetY: 0 },
        chart: { height: 350 }
      }
    }]
  };

  // Вспомогательная функция для безопасного форматирования
  const safeFormatter = (val: unknown): string => {
    if (typeof val === 'number') {
      return val.toLocaleString('ru');
    }
    if (typeof val === 'string') {
      return val;
    }
    return String(val ?? 0);
  };

  // Специфичные настройки для каждого типа
  switch (type) {
    case 'bar':
      return {
        ...commonOptions,
        plotOptions: {
          bar: { horizontal: false, borderRadius: 4, columnWidth: '70%', distributed: true }
        },
        xaxis: { type: 'category', title: { text: 'Категория' } },
        yaxis: { title: { text: 'Значение' }, labels: { formatter: safeFormatter } },
        tooltip: {
          enabled: true,
          x: { show: false },
          y: {
            formatter: (val: unknown, opts?: FormatterContext) => {
              const dataPointIndex = opts?.dataPointIndex ?? 0;
              const label = (labels && labels[dataPointIndex]) || `#${dataPointIndex}`;
              const value = safeFormatter(val);
              return `${label}: ${value}`;
            }
          }
        }
      };
      
    case 'line':
      return {
        ...commonOptions,
        stroke: { curve: 'smooth', width: 3 },
        markers: { size: 5, colors },
        xaxis: { type: 'category', title: { text: 'Период' } },
        yaxis: { title: { text: 'Значение' }, labels: { formatter: safeFormatter } },
        tooltip: {
          enabled: true,
          x: { show: false },
          y: {
            formatter: (val: unknown, opts?: FormatterContext) => {
              const dataPointIndex = opts?.dataPointIndex ?? 0;
              const label = (labels && labels[dataPointIndex]) || `#${dataPointIndex}`;
              const value = safeFormatter(val);
              return `${label}: ${value}`;
            }
          }
        }
      };
      
    case 'pie':
      return {
        ...commonOptions,
        labels: labels ?? commonOptions?.labels,
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: { size: '0%' },
            dataLabels: { offset: 0 }
          }
        },
        tooltip: {
          y: {
            formatter: (val: unknown, context?: FormatterContext) => {
              try {
                const valNum = Number(val ?? 0);
                const seriesArr = context?.w?.config?.series ?? [];
                const total = Array.isArray(seriesArr)
                  ? seriesArr.reduce((acc: number, item: unknown) => {
                      if (typeof item === 'number') return acc + item;
                      if (item && typeof item === 'object' && 'data' in item) {
                        const data = (item as { data?: number[] }).data;
                        if (Array.isArray(data)) return acc + data.reduce((a: number, b: number) => a + b, 0);
                      }
                      return acc;
                    }, 0)
                  : Number(seriesArr) || 0;

                if (!total) return safeFormatter(valNum);
                const percent = ((valNum / total) * 100).toFixed(1);
                return `${safeFormatter(valNum)} (${percent}%)`;
              } catch {
                return safeFormatter(val);
              }
            }
          }
        }
      };
      
    default:
      return commonOptions;
  }
=======
import { ApexOptions } from 'apexcharts';
import type { FormatterContext, ApexChartConfig } from '../types/apexcharts';

/**
 * Создаёт базовые настройки для всех типов графиков
 */
export function createChartOptions(
  type: 'bar' | 'line' | 'pie',
  title: string = '',
  colors: string[],
  labels?: string[],
  onDataPointClick?: (seriesIndex: number, dataPointIndex: number) => void,
  animated: boolean = true,
  showDataLabels: boolean = true
): ApexOptions {
  const commonOptions: ApexOptions = {
    chart: {
      type,
      animations: {
        enabled: animated,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 }
      },
      events: {
        dataPointSelection: onDataPointClick 
          ? (event, chartContext, config: ApexChartConfig) => {
              const seriesIndex = config.seriesIndex ?? 0;
              const dataPointIndex = config.dataPointIndex;
              onDataPointClick(seriesIndex, dataPointIndex ?? 0);
            }
          : undefined,
      },
      toolbar: { show: true },
      zoom: { enabled: false }
    },
    colors,
    title: {
      text: title,
      align: 'center',
      style: { fontSize: '16px', fontWeight: 'bold' }
    },
    dataLabels: {
      enabled: showDataLabels,
      style: { fontSize: '12px' }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    responsive: [{
      breakpoint: 768,
      options: {
        legend: { position: 'bottom', offsetY: 0 },
        chart: { height: 350 }
      }
    }]
  };

  // Вспомогательная функция для безопасного форматирования
  const safeFormatter = (val: unknown): string => {
    if (typeof val === 'number') {
      return val.toLocaleString('ru');
    }
    if (typeof val === 'string') {
      return val;
    }
    return String(val ?? 0);
  };

  // Специфичные настройки для каждого типа
  switch (type) {
    case 'bar':
      return {
        ...commonOptions,
        plotOptions: {
          bar: { horizontal: false, borderRadius: 4, columnWidth: '70%', distributed: true }
        },
        xaxis: { type: 'category', title: { text: 'Категория' } },
        yaxis: { title: { text: 'Значение' }, labels: { formatter: safeFormatter } },
        tooltip: {
          enabled: true,
          x: { show: false },
          y: {
            formatter: (val: unknown, opts?: FormatterContext) => {
              const dataPointIndex = opts?.dataPointIndex ?? 0;
              const label = (labels && labels[dataPointIndex]) || `#${dataPointIndex}`;
              const value = safeFormatter(val);
              return `${label}: ${value}`;
            }
          }
        }
      };
      
    case 'line':
      return {
        ...commonOptions,
        stroke: { curve: 'smooth', width: 3 },
        markers: { size: 5, colors },
        xaxis: { type: 'category', title: { text: 'Период' } },
        yaxis: { title: { text: 'Значение' }, labels: { formatter: safeFormatter } },
        tooltip: {
          enabled: true,
          x: { show: false },
          y: {
            formatter: (val: unknown, opts?: FormatterContext) => {
              const dataPointIndex = opts?.dataPointIndex ?? 0;
              const label = (labels && labels[dataPointIndex]) || `#${dataPointIndex}`;
              const value = safeFormatter(val);
              return `${label}: ${value}`;
            }
          }
        }
      };
      
    case 'pie':
      return {
        ...commonOptions,
        labels: labels ?? commonOptions?.labels,
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: { size: '0%' },
            dataLabels: { offset: 0 }
          }
        },
        tooltip: {
          y: {
            formatter: (val: unknown, context?: FormatterContext) => {
              try {
                const valNum = Number(val ?? 0);
                const seriesArr = context?.w?.config?.series ?? [];
                const total = Array.isArray(seriesArr)
                  ? seriesArr.reduce((acc: number, item: unknown) => {
                      if (typeof item === 'number') return acc + item;
                      if (item && typeof item === 'object' && 'data' in item) {
                        const data = (item as { data?: number[] }).data;
                        if (Array.isArray(data)) return acc + data.reduce((a: number, b: number) => a + b, 0);
                      }
                      return acc;
                    }, 0)
                  : Number(seriesArr) || 0;

                if (!total) return safeFormatter(valNum);
                const percent = ((valNum / total) * 100).toFixed(1);
                return `${safeFormatter(valNum)} (${percent}%)`;
              } catch {
                return safeFormatter(val);
              }
            }
          }
        }
      };
      
    default:
      return commonOptions;
  }
>>>>>>> 2a40b860df38d6164c2a0dac2928d38cfe818c55
}