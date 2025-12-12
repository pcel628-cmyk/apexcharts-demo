"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChartProps, ChartDataPoint } from '../types';
import { transformToApexFormat } from '../lib/transformData';
import { createChartOptions } from '../config/chartOptions';
import { useSelection } from '../context/SelectionContext';
import Modal from './Modal';

// Динамический импорт ApexCharts (оптимизация загрузки)
const ApexChart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => (
    <div className="p-8 text-center text-gray-500 animate-pulse">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      <p className="mt-2">Загрузка графика...</p>
    </div>
  )
});

export const ChartWrapper: React.FC<ChartProps> = ({
  data,
  type,
  title = 'Диаграмма',
  colors,
  onDataPointClick,
  animated = true,
  showDataLabels = true
}) => {
  // Состояние для интерактивности — храним объект выбранной точки
  const [selectedDataPoint, setSelectedDataPoint] = useState<ChartDataPoint | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Контекст для синхронизации выделения между графиками
  const { selectedLabel, setSelectedLabel, hoveredLabel, setHoveredLabel } = useSelection();

  // Преобразование данных (синхронизация индексов)
  const { series, labels, colors: chartColors, sourceData } = useMemo(
    () => transformToApexFormat(data, colors),
    [data, colors]
  );

  // Обработчик наведения мыши на элемент диаграммы
  const handleMouseEnter = useCallback((seriesIndex: number, dataPointIndex: number) => {
    const hoveredPoint = sourceData[dataPointIndex];
    if (!hoveredPoint) return;
    setHoveredLabel(hoveredPoint.label);
  }, [sourceData, setHoveredLabel]);

  const handleMouseLeave = useCallback(() => {
    setHoveredLabel(null);
  }, [setHoveredLabel]);

  // Обработчик клика с доступом ко всем данным точки
  // Принимает seriesIndex и dataPointIndex (apex возвращает оба)
  const handleDataPointClick = useCallback((seriesIndex: number, dataPointIndex: number) => {
    const clickedPoint = sourceData[dataPointIndex];
    if (!clickedPoint) return;

    setSelectedDataPoint(clickedPoint);
    setSelectedLabel(clickedPoint.label); // Синхронизируем выделение через контекст

    if (onDataPointClick) {
      // вызываем внешний колбэк с полным объектом
      onDataPointClick(clickedPoint);
    }

    console.log('Выбрано:', clickedPoint, { seriesIndex, dataPointIndex });
  }, [sourceData, onDataPointClick, setSelectedLabel]);

  // Добавляем обработчики мыши к элементам диаграммы через DOM
  useEffect(() => {
    if (!chartRef.current) return;

    const chartElements = chartRef.current.querySelectorAll('[data-pointIndex]');
    
    const handleMouseOver = (e: Event) => {
      const pointIndex = (e.currentTarget as HTMLElement).getAttribute('data-pointIndex');
      if (pointIndex !== null) {
        handleMouseEnter(0, parseInt(pointIndex));
      }
    };

    const handleMouseOut = (e: Event) => {
      handleMouseLeave();
    };

    chartElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      chartElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, [handleMouseEnter, handleMouseLeave]);

  // Генерация конфигурации (без mouseEnter/mouseLeave)
  const options = useMemo(
    () => createChartOptions(type, title, chartColors, labels, handleDataPointClick, animated, showDataLabels),
    [type, title, chartColors, labels, animated, showDataLabels, handleDataPointClick]
  );

  // Проверка данных
  if (!data || data.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500 bg-gray-50">
        <div className="text-4xl mb-2">📊</div>
        <p className="text-lg font-medium">Нет данных для отображения</p>
        <p className="text-sm mt-1">Добавьте данные в компонент</p>
      </div>
    );
  }

  return (
    <div className="relative border border-[var(--border)] rounded-lg p-6 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Визуальный индикатор выбора */}
      {selectedDataPoint && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md text-sm flex items-center justify-between">
          <div>
            <span className="text-[var(--foreground)] font-medium">Выбрано: </span>
            <strong className="text-blue-600 dark:text-blue-400">{selectedDataPoint.label}</strong>
            <span className="ml-2 text-[var(--text-secondary)]">({selectedDataPoint.value} единиц)</span>
          </div>
          <button
            onClick={() => {
              setSelectedDataPoint(null);
              setSelectedLabel(null); // Очищаем контекст синхронизации
            }}
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--foreground)]"
          >
            ✕ Сбросить
          </button>
        </div>
      )}

      {/* Контейнер графика с визуальной индикацией синхронизации */}
      <div 
        ref={chartRef}
        className={`relative transition-all duration-200 ${
        (selectedLabel || hoveredLabel) && 
        selectedLabel !== selectedDataPoint?.label && 
        hoveredLabel !== selectedDataPoint?.label
          ? 'opacity-60 scale-95' 
          : hoveredLabel && hoveredLabel !== selectedDataPoint?.label
          ? 'opacity-75'
          : ''
      }`}
      >
        <div className={type === 'pie' ? 'max-w-md mx-auto' : ''}>
          <ApexChart
            options={options}
            series={type === 'pie' ? series : [{ name: title, data: series }]}
            type={type}
            height={type === 'pie' ? 400 : 350}
            width="100%"
          />
        </div>
        
        {/* Индикатор синхронизации из другого графика - при клике */}
        {selectedLabel && selectedLabel !== selectedDataPoint?.label && !hoveredLabel && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-lg bg-black/5">
            <div className="text-center bg-white dark:bg-gray-900 px-4 py-2 rounded shadow-lg">
              <p className="text-xs text-[var(--text-secondary)]">Выбрано в другом графике:</p>
              <p className="font-medium text-[var(--foreground)]">{selectedLabel}</p>
            </div>
          </div>
        )}

        {/* Индикатор синхронизации из другого графика - при наведении */}
        {hoveredLabel && hoveredLabel !== selectedDataPoint?.label && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-lg bg-blue-500/10">
            <div className="text-center bg-blue-50 dark:bg-blue-950 px-4 py-2 rounded shadow-lg border border-blue-300 dark:border-blue-800">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Наведение: {hoveredLabel}</p>
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно с информацией о выбранной точке */}
      {selectedDataPoint && (
        <Modal data={selectedDataPoint} chartTitle={title} chartType={type} onClose={() => setSelectedDataPoint(null)} />
      )}
    </div>
  );
};