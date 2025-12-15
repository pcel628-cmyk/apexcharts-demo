"use client";

// Импорт React и хука useState для управления состоянием компонента
// React - основная библиотека React
// useState - хук React для управления состоянием компонента
import React, { useState } from 'react';

// Импорт типов TypeScript для обеспечения безопасности типов
// ChartDataPoint - интерфейс, определяющий структуру точки данных
// ChartType - объединенный тип для поддерживаемых типов диаграмм
import { ChartDataPoint, ChartType } from '../types';

// Импорт утилиты для форматирования чисел
// formatNumber - форматирует числа с разделителями по локали
import { formatNumber } from '../lib/transformData';

/**
 * Интерфейс, определяющий свойства компонента Modal
 * Это обеспечивает безопасность типов для входных данных компонента
 */
interface ModalProps {
  /** Точка данных для отображения в модальном окне */
  data: ChartDataPoint;
  /** Заголовок диаграммы, которая вызвала модальное окно */
  chartTitle: string;
  /** Тип диаграммы, которая вызвала модальное окно */
  chartType: ChartType;
  /** Функция обратного вызова для закрытия модального окна */
  onClose: () => void;
}

/**
 * Компонент Modal - Подробное отображение информации о точках данных
 * 
 * Этот компонент отображает подробную информацию о выбранной
 * точке данных в модальном окне. Он предоставляет контекстную информацию
 * о точке данных в рамках диаграммы, из которой она была выбрана.
 * 
 * Основные функции:
 * - Фоновое перекрытие, которое закрывает модальное окно при клике
 * - Подробное отображение информации о точке данных
 * - Контекстная информация о диаграмме
 * - Респонсивный дизайн с поддержкой мобильных устройств
 * - Доступность с клавиатуры (ESC для закрытия)
 * - Плавные анимации появления
 * 
 * Техническая реализация:
 * - Использует хуки состояния React для локального управления состоянием
 * - Реализует делегирование событий для эффективной обработки
 * - Обеспечивает функции доступности для программ чтения с экрана
 * - Использует классы CSS для согласованного стиля
 * - Реализует надлежащую очистку с помощью useEffect (не показано здесь)
 * 
 * @param data - Выбранная точка данных для отображения
 * @param chartTitle - Заголовок исходной диаграммы
 * @param chartType - Тип исходной диаграммы
 * @param onClose - Обратный вызов для закрытия модального окна
 */
const Modal: React.FC<ModalProps> = ({ data, chartTitle, chartType, onClose }) => {
  // Состояние для управления анимацией видимости модального окна
  // isVisible - флаг, указывающий, полностью ли видно модальное окно
  // setIsVisible - функция для обновления состояния видимости
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Обработчик кликов по перекрытию модального окна
   * 
   * Эта функция закрывает модальное окно, когда пользователь кликает вне
   * области содержимого (по полупрозрачному перекрытию).
   * 
   * @param e - Объект события клика
   */
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Проверяем, произошел ли клик по перекрытию (а не по содержимому)
    if (e.target === e.currentTarget) {
      // Вызываем обратный вызов закрытия
      onClose();
    }
  };

  /**
   * Обработчик событий клавиатуры для взаимодействия с модальным окном
   * 
   * Эта функция включает навигацию с клавиатуры, закрывая
   * модальное окно при нажатии клавиши Escape.
   * 
   * @param e - Объект события клавиатуры
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Проверяем, была ли нажата клавиша Escape
    if (e.key === 'Escape') {
      // Вызываем обратный вызов закрытия
      onClose();
    }
  };

  /**
   * Получение описательного текста для типа диаграммы
   * 
   * Эта функция возвращает человекочитаемое описание
   * типа диаграммы для лучшего понимания пользователем.
   * 
   * @param type - Тип диаграммы для описания
   * @returns Человекочитаемое описание типа диаграммы
   */
  const getChartTypeDescription = (type: ChartType): string => {
    // Сопоставление типов диаграмм с описательным текстом
    switch (type) {
      case 'bar': return 'столбчатой диаграммы';
      case 'line': return 'линейной диаграммы';
      case 'pie': return 'круговой диаграммы';
      default: return 'диаграммы';
    }
  };

  // Запуск анимации появления после монтирования компонента
  React.useEffect(() => {
    // Устанавливаем видимость в true после небольшой задержки
    const timer = setTimeout(() => setIsVisible(true), 10);
    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  // Рендеринг компонента модального окна
  return (
    // Контейнер перекрытия с полупрозрачным фоном
    <div 
      // Обработчик кликов для взаимодействия с перекрытием
      onClick={handleOverlayClick}
      // Обработчик событий клавиатуры для клавиши ESC
      onKeyDown={handleKeyDown}
      // Включение обработки событий клавиатуры
      tabIndex={-1}
      // Классы CSS для стилизации перекрытия и переходов
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
        // Условный класс для перехода прозрачности
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Контейнер содержимого модального окна со стилем карточки */}
      <div 
        // Классы CSS для стилизации содержимого и переходов
        className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          // Условные классы для анимации появления
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Заголовок модального окна с заголовком и кнопкой закрытия */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          {/* Заголовок с описательным текстом */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {/* Динамический заголовок с контекстом диаграммы */}
            Детали {getChartTypeDescription(chartType)}
          </h3>
          {/* Кнопка закрытия с круглым стилем */}
          <button
            // Обработчик кликов для кнопки закрытия
            onClick={onClose}
            // Классы CSS для стилизации кнопки
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1 transition-colors duration-200"
            // Атрибуты доступности
            aria-label="Закрыть"
          >
            {/* Иконка закрытия с использованием SVG */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Тело модального окна с деталями точки данных */}
        <div className="p-6">
          {/* Метка точки данных с акцентом */}
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Категория</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">{data.label}</p>
          
          {/* Значение точки данных с форматированием */}
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Значение</p>
          <div className="flex items-baseline">
            {/* Форматированное значение с крупным текстом */}
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatNumber(data.value)}
            </span>
            {/* Индикатор единиц измерения */}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">единиц</span>
          </div>
        </div>
        
        {/* Нижняя часть модального окна с информацией об источнике */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          {/* Информация об исходной диаграмме */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {/* Динамический текст источника с заголовком диаграммы */}
            Источник: <span className="font-medium">{chartTitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Экспорт компонента Modal как стандартного
export default Modal;