"use client";

import { useState } from 'react';
import { ChartWrapper, SelectionProvider } from '../demo-charts';
import { generateDemoData } from '../demo-charts';
import { DataEditor } from '../demo-charts/components/DataEditor';
import { ChartDataPoint } from '../demo-charts/types';

export default function Home() {
  // Используем состояние для общих данных для всех диаграмм
  const [sharedData, setSharedData] = useState<ChartDataPoint[]>(generateDemoData(5));

  return (
    <SelectionProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <header className="border-b border-[var(--border)] bg-white bg-opacity-50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-semibold tracking-tight">ApexCharts Demo</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Интерактивная демонстрация библиотеки диаграмм</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Панель редактирования данных */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">Редактирование данных</h2>
            <div className="max-w-3xl mx-auto">
              <DataEditor 
                initialData={sharedData} 
                onDataChange={setSharedData} 
                title="Общие данные для всех диаграмм" 
              />
            </div>
          </div>

          {/* Диаграммы */}
          <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">Диаграммы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <figure>
              <ChartWrapper data={sharedData} type="bar" title="Продажи по категориям" />
              <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">Столбчатая диаграмма — показывает абсолютные продажи по категориям</figcaption>
            </figure>

            <figure>
              <ChartWrapper data={sharedData} type="line" title="Динамика продаж" />
              <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">Линейная диаграмма — показывает изменение значений по порядку (например, по времени)</figcaption>
            </figure>

            <figure>
              <ChartWrapper data={sharedData} type="pie" title="Доля по категориям" showDataLabels={false} />
              <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">Круговая диаграмма — показывает вклад каждой категории в общий объём (в процентах)</figcaption>
            </figure>
          </div>
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