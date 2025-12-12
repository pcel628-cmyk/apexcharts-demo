import { ChartWrapper, SelectionProvider } from '../demo-charts';
import { generateDemoData } from '../demo-charts';

export default function Home() {
  // Используем единый набор данных для всех диаграмм, чтобы сравнение было корректным
  const baseData = generateDemoData(5);
  const barData = baseData;
  const lineData = baseData;
  const pieData = baseData;

  return (
    <SelectionProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <header className="border-b border-[var(--border)] bg-white bg-opacity-50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-semibold tracking-tight">ApexCharts Demo</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Интерактивная демонстрация библиотеки диаграмм</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <figure>
            <ChartWrapper data={barData} type="bar" title="Продажи по категориям" />
            <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">Столбчатая диаграмма — показывает абсолютные продажи по категориям</figcaption>
          </figure>

          <figure>
            <ChartWrapper data={lineData} type="line" title="Динамика продаж" />
            <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">Линейная диаграмма — показывает изменение значений по порядку (например, по времени)</figcaption>
          </figure>

          <figure>
            <ChartWrapper data={pieData} type="pie" title="Доля по категориям" showDataLabels={false} />
            <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">Круговая диаграмма — показывает вклад каждой категории в общий объём (в процентах)</figcaption>
          </figure>
        </main>

        <footer className="border-t border-[var(--border)] bg-white bg-opacity-30 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-8 text-xs text-[var(--text-secondary)]">
            Демо-приложение ApexCharts • Данные сгенерированы случайно
          </div>
        </footer>
      </div>
    </SelectionProvider>
  );
}
