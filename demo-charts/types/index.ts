// Core module: Strict TypeScript typing for data structures
// This file defines the fundamental data structures and types
// used throughout the charting application for type safety

/**
 * ChartDataPoint Interface - Defines the structure of a single data point
 * 
 * This interface represents a single data point in a chart, containing
 * all necessary information for visualization and interaction.
 * 
 * Properties:
 * - id: Unique identifier for the data point
 * - label: Display name or category for the data point
 * - value: Numeric value for chart plotting
 * - color: Optional color for visual customization
 * 
 * Extensibility:
 * - Additional properties can be added for specific chart types
 * - Comments indicate potential future enhancements
 */
export interface ChartDataPoint {
  /** Unique identifier for the data point */
  id: string;
  /** Display name or category for the data point */
  label: string;
  /** Numeric value for chart plotting */
  value: number;
  /** Optional color for visual customization */
  color?: string;
  // For linear/bar charts additional properties can be added:
  // date?: Date;
  // category?: string;
}

/**
 * ChartType Type - Union type defining supported chart types
 * 
 * This type enumerates all supported chart visualization types
 * that can be rendered by the application.
 * 
 * Supported types:
 * - bar: Vertical bar chart
 * - line: Line chart with connected data points
 * - pie: Circular chart divided into sectors
 */
export type ChartType = 'bar' | 'line' | 'pie';

/**
 * ChartProps Interface - Defines props for chart components
 * 
 * This interface specifies the properties that can be passed
 * to chart components for configuration and customization.
 * 
 * Properties:
 * - data: Array of data points to visualize
 * - type: Chart visualization type
 * - title: Optional chart title
 * - colors: Optional custom color palette
 * - onDataPointClick: Optional click handler callback
 * - animated: Flag to enable/disable animations
 * - showDataLabels: Flag to show/hide data labels
 */
export interface ChartProps {
  /** Data points to visualize */
  data: ChartDataPoint[];
  /** Chart visualization type */
  type: ChartType;
  /** Optional chart title */
  title?: string;
  /** Optional custom color palette */
  colors?: string[];
  /** Optional click handler callback */
  onDataPointClick?: (point: ChartDataPoint) => void;
  /** Flag to enable/disable animations */
  animated?: boolean;
  /** Flag to show/hide data labels */
  showDataLabels?: boolean;
}

// Sample data for demonstration purposes
// These datasets provide example data for different chart scenarios

/**
 * Monthly Sales Data - Sample dataset for time-series bar charts
 * 
 * This dataset represents sales data across six months,
 * suitable for demonstrating bar chart functionality.
 * 
 * Data characteristics:
 * - Six data points representing monthly periods
 * - Varying numeric values for visual interest
 * - Descriptive labels for business context
 */
export const monthlySalesData: ChartDataPoint[] = [
  { id: '1', label: 'Январь', value: 44000 },
  { id: '2', label: 'Февраль', value: 55000 },
  { id: '3', label: 'Март', value: 41000 },
  { id: '4', label: 'Апрель', value: 67000 },
  { id: '5', label: 'Май', value: 22000 },
  { id: '6', label: 'Июнь', value: 43000 }
];

/**
 * Budget Distribution Data - Sample dataset for pie charts
 * 
 * This dataset represents budget allocation across four departments,
 * suitable for demonstrating pie chart functionality.
 * 
 * Data characteristics:
 * - Four data points representing departments
 * - Proportional values showing budget distribution
 * - Business-relevant category labels
 */
export const budgetDistributionData: ChartDataPoint[] = [
  { id: '1', label: 'Маркетинг', value: 44000 },
  { id: '2', label: 'Разработка', value: 55000 },
  { id: '3', label: 'Поддержка', value: 41000 },
  { id: '4', label: 'Продажи', value: 17000 }
];

/**
 * User Growth Data - Sample dataset for line charts
 * 
 * This dataset represents user growth over eight months,
 * suitable for demonstrating line chart functionality.
 * 
 * Data characteristics:
 * - Eight data points showing growth trend
 * - Sequential values demonstrating progression
 * - Abbreviated month labels for compact display
 */
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