import { ChartDataPoint } from '../types';

/**
 * Преобразует массив ChartDataPoint в формат ApexCharts
 * Гарантирует синхронность series, labels, colors
 */
export function transformToApexFormat(
  data: ChartDataPoint[], 
  defaultColors: string[] = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
) {
  const series: number[] = [];
  const labels: string[] = [];
  const colors: string[] = [];

  data.forEach((item, index) => {
    series.push(item.value);
    labels.push(item.label);
    colors.push(item.color || defaultColors[index % defaultColors.length]);
  });

  return { series, labels, colors, sourceData: data };
}

/**
 * Генератор демо-данных для тестирования
 */
export function generateDemoData(count: number = 5): ChartDataPoint[] {
  const categories = ['Продукты', 'Транспорт', 'Развлечения', 'Образование', 'Здоровье'];
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    label: categories[i] || `Категория ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 100,
  }));
}

/**
 * Форматирует числа в читаемый вид (с разделителями)
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value);
}