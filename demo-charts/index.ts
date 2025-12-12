// ============================ ЭКСПОРТ КОМПОНЕНТОВ ============================

export { BarChart } from './components/BarChart';
export { LineChart } from './components/LineChart';
export { PieChart } from './components/PieChart';
export { ChartWrapper } from './components/ChartWrapper';

// ============================ ЭКСПОРТ КОНТЕКСТА ============================

export { SelectionProvider, useSelection } from './context/SelectionContext';

// ============================ ЭКСПОРТ ТИПОВ ============================

export type { 
  ChartDataPoint, 
  ChartType, 
  ChartProps 
} from './types';

export type { 
  BarChartProps 
} from './components/BarChart';

export type { 
  LineChartProps 
} from './components/LineChart';

export type { 
  PieChartProps 
} from './components/PieChart';

// ============================ ЭКСПОРТ УТИЛИТ ============================

export { 
  transformToApexFormat, 
  generateDemoData, 
  formatNumber 
} from './lib/transformData';

// ============================ ЭКСПОРТ КОНФИГУРАЦИЙ ============================

export { createChartOptions } from './config/chartOptions';

// ============================ ЭКСПОРТ ПРИМЕРОВ ДАННЫХ ============================

export { 
  monthlySalesData, 
  budgetDistributionData, 
  userGrowthData 
} from './types';

// ============================ ПРИМЕР ИСПОЛЬЗОВАНИЯ ============================

/*
// Пример 1: Импорт компонентов и данных
import { 
  BarChart, 
  LineChart, 
  PieChart,
  monthlySalesData,
  budgetDistributionData 
} from '@/demo-charts';

const Dashboard = () => {
  const handleClick = (point) => {
    console.log('Клик по:', point.label, point.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <BarChart
        data={monthlySalesData}
        title="Продажи по месяцам"
        onDataPointClick={handleClick}
        colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']}
        animated={true}
      />
      
      <PieChart
        data={budgetDistributionData}
        title="Распределение бюджета"
        onDataPointClick={handleClick}
        showDataLabels={false}
      />
    </div>
  );
};

// Пример 2: Использование утилит
import { generateDemoData, transformToApexFormat } from '@/demo-charts';

const testData = generateDemoData(4);
const { series, labels } = transformToApexFormat(testData);
console.log('Серии:', series); // [423, 587, 234, 891]
console.log('Подписи:', labels); // ['Продукты', 'Транспорт', ...]
*/