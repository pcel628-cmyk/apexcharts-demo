<<<<<<< HEAD
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
=======
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
>>>>>>> 2a40b860df38d6164c2a0dac2928d38cfe818c55
}