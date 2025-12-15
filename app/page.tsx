"use client";

/**
 * Хуки React для управления состоянием компонента
 * useState - для управления локальным состоянием данных диаграмм
 */
import { useState } from 'react';

/**
 * Импорт компонентов диаграмм и контекста выбора из модуля demo-charts
 * ChartWrapper - универсальная обертка для всех типов диаграмм
 * SelectionProvider - провайдер контекста для синхронизации между диаграммами
 */
import { ChartWrapper, SelectionProvider } from '../demo-charts';

/**
 * Импорт утилиты для генерации демонстрационных данных
 * generateDemoData - функция для создания случайных тестовых данных
 */
import { generateDemoData } from '../demo-charts';

/**
 * Импорт компонента редактора данных
 * DataEditor - компонент для интерактивного редактирования данных диаграмм
 */
import { DataEditor } from '../demo-charts/components/DataEditor';

/**
 * Импорт типов данных для TypeScript
 * ChartDataPoint - интерфейс для описания структуры точек данных диаграмм
 */
import { ChartDataPoint } from '../demo-charts/types';

/**
 * Главная страница приложения - демонстрация интерактивных диаграмм
 * 
 * Архитектура страницы:
 * 1. Верхняя секция: редактор данных для управления содержимым диаграмм
 * 2. Основная секция: три различных типа диаграмм (столбчатая, линейная, круговая)
 * 3. Система синхронизации: контекст для координации взаимодействия между диаграммами
 * 
 * Основные функции:
 * 1. Отображение трех типов диаграмм с общими данными
 * 2. Интерактивное редактирование данных в реальном времени
 * 3. Синхронизация выбора и наведения между всеми диаграммами
 * 4. Модальные окна с деталями при клике на элементы диаграмм
 */
export default function Home() {
  /**
   * Состояние для общих данных, используемых всеми диаграммами
   * Изначально генерируются 5 случайных записей данных для демонстрации
   * При изменении через редактор данные автоматически обновляют все диаграммы
   */
  const [sharedData, setSharedData] = useState<ChartDataPoint[]>(generateDemoData(5));

  // Основная структура страницы с использованием семантической разметки
  return (
    /**
     * Провайдер контекста для синхронизации выбора между диаграммами
     * Оборачивает всё содержимое страницы для доступа к контексту из всех компонентов
     */
    <SelectionProvider>
      {/* Основной контейнер страницы с адаптивной высотой и цветовой схемой */}
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {/* Шапка приложения с фиксированным позиционированием и эффектом стекла */}
        <header className="border-b border-[var(--border)] bg-white bg-opacity-50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Основной заголовок страницы */}
            <h1 className="text-2xl font-semibold tracking-tight">ApexCharts Demo</h1>
            
            {/* Подзаголовок с описанием функциональности */}
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Интерактивная демонстрация библиотеки диаграмм
            </p>
          </div>
        </header>

        {/* Основное содержимое страницы с адаптивными отступами */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Панель редактирования данных с нижним отступом */}
          <div className="mb-12">
            {/* Заголовок секции редактирования */}
            <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">
              Редактирование данных
            </h2>
            
            {/* Контейнер редактора данных с ограничением ширины по центру */}
            <div className="max-w-3xl mx-auto">
              {/**
               * Компонент редактора данных с общими данными для всех диаграмм
               * Позволяет в реальном времени изменять данные, отображаемые на диаграммах
               * 
               * Props:
               * - initialData: текущие данные диаграмм
               * - onDataChange: функция обновления данных
               * - title: заголовок редактора
               */}
              <DataEditor 
                initialData={sharedData} 
                onDataChange={setSharedData} 
                title="Общие данные для всех диаграмм" 
              />
            </div>
          </div>

          {/* Секция с диаграммами */}
          <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">
            Диаграммы
          </h2>
          
          {/* Сетка из трех колонок для адаптивного размещения диаграмм */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Столбчатая диаграмма */}
            <figure>
              {/**
               * Обертка диаграммы для столбчатого графика
               * 
               * Props:
               * - data: общие данные для всех диаграмм
               * - type: тип диаграммы ('bar')
               * - title: заголовок диаграммы
               */}
              <ChartWrapper data={sharedData} type="bar" title="Продажи по категориям" />
              
              {/* Подпись к диаграмме с пояснением ее назначения */}
              <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">
                Столбчатая диаграмма — показывает абсолютные продажи по категориям
              </figcaption>
            </figure>

            {/* Линейная диаграмма */}
            <figure>
              {/**
               * Обертка диаграммы для линейного графика
               * 
               * Props:
               * - data: общие данные для всех диаграмм
               * - type: тип диаграммы ('line')
               * - title: заголовок диаграммы
               */}
              <ChartWrapper data={sharedData} type="line" title="Динамика продаж" />
              
              {/* Подпись к диаграмме с пояснением ее назначения */}
              <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">
                Линейная диаграмма — показывает изменение значений по порядку (например, по времени)
              </figcaption>
            </figure>

            {/* Круговая диаграмма */}
            <figure>
              {/**
               * Обертка диаграммы для кругового графика
               * 
               * Props:
               * - data: общие данные для всех диаграмм
               * - type: тип диаграммы ('pie')
               * - title: заголовок диаграммы
               * - showDataLabels: флаг для скрытия подписей данных
               */}
              <ChartWrapper data={sharedData} type="pie" title="Доля по категориям" showDataLabels={false} />
              
              {/* Подпись к диаграмме с пояснением ее назначения */}
              <figcaption className="mt-2 text-sm text-[var(--text-secondary)]">
                Круговая диаграмма — показывает вклад каждой категории в общий объём (в процентах)
              </figcaption>
            </figure>
          </div>
        </main>

        {/* Подвал приложения с информацией о данных */}
        <footer className="border-t border-[var(--border)] bg-white bg-opacity-30 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-8 text-xs text-[var(--text-secondary)]">
            Демо-приложение ApexCharts • Данные сгенерированы случайно
          </div>
        </footer>
      </div>
    </SelectionProvider>
  );
}