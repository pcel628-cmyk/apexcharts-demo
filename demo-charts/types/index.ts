// Ядро модуля: строгая типизация данных
export interface ChartDataPoint {
  id: string;
  label: string;
  value: number;
  color?: string;
  // Для линейных/столбчатых диаграмм можно добавить:
  // date?: Date;
  // category?: string;
}

export type ChartType = 'bar' | 'line' | 'pie';

export interface ChartProps {
  /** Данные для визуализации */
  data: ChartDataPoint[];
  /** Тип графика */
  type: ChartType;
  /** Заголовок графика */
  title?: string;
  /** Цветовая палитра (массив hex-цветов) */
  colors?: string[];
  /** Функция обратного вызова при клике на элемент */
  onDataPointClick?: (point: ChartDataPoint) => void;
  /** Настройка анимаций */
  animated?: boolean;
  /** Показывать значения на графике */
  showDataLabels?: boolean;
}

// Данные для примеров
export const monthlySalesData: ChartDataPoint[] = [
  { id: '1', label: 'Январь', value: 44000 },
  { id: '2', label: 'Февраль', value: 55000 },
  { id: '3', label: 'Март', value: 41000 },
  { id: '4', label: 'Апрель', value: 67000 },
  { id: '5', label: 'Май', value: 22000 },
  { id: '6', label: 'Июнь', value: 43000 }
];

export const budgetDistributionData: ChartDataPoint[] = [
  { id: '1', label: 'Маркетинг', value: 44000 },
  { id: '2', label: 'Разработка', value: 55000 },
  { id: '3', label: 'Поддержка', value: 41000 },
  { id: '4', label: 'Продажи', value: 17000 }
];

export const userGrowthData: ChartDataPoint[] = [
  { id: '1', label: 'Янв', value: 30 },
  { id: '2', label: 'Фев', value: 40 },
  { id: '3', label: 'Мар', value: 35 },
  { id: '4', label: 'Апр', value: 50 },
  { id: '5', label: 'Май', value: 49 },
  { id: '6', label: 'Июн', value: 60 },
  { id: '7', label: 'Июл', value: 70 },
  { id: '8', label: 'Авг', value: 91 }
];