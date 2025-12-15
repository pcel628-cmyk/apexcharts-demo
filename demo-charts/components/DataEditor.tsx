"use client";

// Импорт React и хука управления состоянием для создания интерактивного редактора
import React, { useState } from 'react';

// Импорт типов данных для обеспечения строгой типизации TypeScript
import { ChartDataPoint } from '../types';

/**
 * Интерфейс свойств компонента редактора данных
 * Определяет контракт для передачи данных и обработчиков в компонент
 */
interface DataEditorProps {
  /** Исходные данные для редактирования - массив точек данных диаграммы */
  initialData: ChartDataPoint[];
  
  /** Функция обратного вызова для обновления данных при изменениях */
  onDataChange: (newData: ChartDataPoint[]) => void;
  
  /** Заголовок редактора, отображаемый в интерфейсе */
  title: string;
}

/**
 * Компонент редактора данных для диаграмм
 * Позволяет пользователям в реальном времени добавлять, редактировать и удалять данные диаграмм
 * 
 * Особенности функциональности:
 * - Интерактивное редактирование существующих записей (название, значение, цвет)
 * - Добавление новых записей с возможностью выбора цвета
 * - Удаление ненужных записей
 * - Автоматическое обновление диаграмм при любом изменении данных
 * - Респонсивный дизайн с прокруткой для большого количества записей
 * 
 * Архитектурные особенности:
 * - Использует локальное состояние для управления формой редактирования
 * - Передает изменения родительскому компоненту через коллбэк
 * - Следует принципам иммутабельности при работе с данными
 */
export const DataEditor: React.FC<DataEditorProps> = ({ initialData, onDataChange, title }) => {
  // Локальное состояние для хранения текущих данных редактора
  // Инициализируется переданными изначальными данными
  const [data, setData] = useState<ChartDataPoint[]>(initialData);
  
  // Состояние для новой записи данных (без ID и цвета, так как они генерируются автоматически)
  const [newItem, setNewItem] = useState<Omit<ChartDataPoint, 'id' | 'color'>>({ 
    label: '', 
    value: 0
  });
  
  // Отдельное состояние для цвета новой записи для удобства выбора
  const [newItemColor, setNewItemColor] = useState('#3B82F6');

  /**
   * Обработчик изменения полей существующих записей
   * Создает новую копию массива данных с обновленным значением
   * 
   * @param index - индекс записи в массиве для изменения
   * @param field - поле записи, которое нужно изменить
   * @param value - новое значение для поля
   */
  const handleInputChange = (index: number, field: keyof ChartDataPoint, value: string | number) => {
    // Создаем копию массива данных для соблюдения принципов иммутабельности
    const newData = [...data];
    
    // Обновляем конкретное поле в выбранной записи
    newData[index] = { ...newData[index], [field]: value };
    
    // Сохраняем обновленные данные в локальном состоянии
    setData(newData);
    
    // Передаем обновленные данные родительскому компоненту
    onDataChange(newData);
  };

  /**
   * Обработчик добавления новой записи в список данных
   * Создает новую запись с уникальным ID и выбранным цветом
   * 
   * Проверяет валидность данных перед добавлением:
   * - Название не должно быть пустым
   */
  const handleAddItem = () => {
    // Проверяем, что название новой записи не пустое
    if (newItem.label.trim() === '') return;
    
    // Создаем новую запись с уникальным ID и выбранным цветом
    const newItemWithId: ChartDataPoint = {
      ...newItem,
      // Генерируем уникальный ID на основе текущего времени
      id: `item-${Date.now()}`,
      // Преобразуем значение в число, если оно не задано, используем 0
      value: Number(newItem.value) || 0,
      // Используем выбранный цвет из состояния
      color: newItemColor
    };
    
    // Создаем новый массив данных с добавленной записью
    const newData = [...data, newItemWithId];
    
    // Сохраняем обновленные данные в локальном состоянии
    setData(newData);
    
    // Передаем обновленные данные родительскому компоненту
    onDataChange(newData);
    
    // Сбрасываем форму новой записи к значениям по умолчанию
    setNewItem({ label: '', value: 0 });
    // Сбрасываем цвет новой записи к значению по умолчанию
    setNewItemColor('#3B82F6');
  };

  /**
   * Обработчик удаления записи из списка данных
   * Создает новый массив без указанной записи
   * 
   * @param index - индекс записи для удаления
   */
  const handleRemoveItem = (index: number) => {
    // Создаем новый массив, исключая запись с указанным индексом
    const newData = data.filter((_, i) => i !== index);
    
    // Сохраняем обновленные данные в локальном состоянии
    setData(newData);
    
    // Передаем обновленные данные родительскому компоненту
    onDataChange(newData);
  };

  // Основной JSX компонента - визуальное представление редактора данных
  return (
    // Основной контейнер редактора в стиле модального окна для визуальной согласованности
    <div style={{
      position: 'relative',
      backgroundColor: '#ffffff',      // Белый фон для контраста
      borderRadius: '12px',            // Скругленные углы
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',  // Тень для глубины
      padding: '24px',                 // Внутренние отступы
      border: '1px solid #bfdbfe'      // Граница для выделения
    }}>
      {/* Заголовок редактора с выравниванием по центру */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '20px' 
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#000000'  // Темный цвет текста для читаемости
        }}>
          {title}
        </h3>
      </div>
      
      {/* Список редактируемых записей с ограничением высоты и прокруткой */}
      <div style={{ 
        gap: '12px',           // Расстояние между элементами
        maxHeight: '300px',    // Максимальная высота для прокрутки
        overflowY: 'auto',     // Вертикальная прокрутка при необходимости
        marginBottom: '20px'   // Отступ снизу
      }}>
        {/* Отображаем каждую запись данных в виде редактируемой строки */}
        {data.map((item, index) => (
          // Контейнер одной записи данных с визуальным оформлением
          <div 
            key={item.id} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#f9fafb',    // Светло-серый фон
              borderRadius: '8px',
              border: '1px solid #e5e7eb'   // Тонкая граница
            }}
          >
            {/* Поле ввода названия записи */}
            <input
              type="text"
              value={item.label}
              // При изменении обновляем поле 'label' для этой записи
              onChange={(e) => handleInputChange(index, 'label', e.target.value)}
              style={{
                flex: '1',                    // Занимает всё доступное пространство
                padding: '8px 12px',
                border: '1px solid #d1d5db',  // Граница поля ввода
                borderRadius: '6px',
                backgroundColor: '#ffffff',    // Белый фон
                color: '#000000',             // Темный текст
                fontSize: '14px'
              }}
              placeholder="Название"
            />
            
            {/* Поле ввода числового значения записи */}
            <input
              type="number"
              value={item.value}
              // При изменении обновляем поле 'value' для этой записи
              onChange={(e) => handleInputChange(index, 'value', Number(e.target.value))}
              style={{
                width: '100px',               // Фиксированная ширина
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontSize: '14px'
              }}
              placeholder="Значение"
            />
            
            {/* Элемент выбора цвета для визуального оформления записи в диаграмме */}
            <input
              type="color"
              value={item.color || '#3B82F6'}  // Используем текущий цвет или синий по умолчанию
              // При изменении обновляем поле 'color' для этой записи
              onChange={(e) => handleInputChange(index, 'color', e.target.value)}
              style={{
                width: '40px',                // Квадратный элемент выбора цвета
                height: '40px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',            // Курсор указателя для интерактивности
                padding: '2px'                // Небольшой внутренний отступ
              }}
            />
            
            {/* Кнопка удаления записи с визуальным оформлением */}
            <button
              // При клике удаляем запись с этим индексом
              onClick={() => handleRemoveItem(index)}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',             // Серый цвет текста
                backgroundColor: 'transparent', // Прозрачный фон
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
              // Эффекты наведения для улучшения UX
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Секция добавления новой записи с разделительной линией сверху */}
      <div style={{ 
        paddingTop: '20px', 
        borderTop: '1px solid #e5e7eb' 
      }}>
        {/* Заголовок секции добавления */}
        <h4 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '12px',
          textTransform: 'uppercase',      // Верхний регистр для заголовков
          letterSpacing: '0.05em'          // Межбуквенный интервал
        }}>
          Добавить новую запись
        </h4>
        
        {/* Форма новой записи с полями ввода */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          {/* Поле ввода названия новой записи */}
          <input
            type="text"
            value={newItem.label}
            // При изменении обновляем состояние новой записи
            onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
            style={{
              flex: '1',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontSize: '14px'
            }}
            placeholder="Название"
          />
          
          {/* Поле ввода значения новой записи */}
          <input
            type="number"
            value={newItem.value || ''}
            // При изменении обновляем состояние новой записи
            onChange={(e) => setNewItem({ ...newItem, value: Number(e.target.value) || 0 })}
            style={{
              width: '100px',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontSize: '14px'
            }}
            placeholder="Значение"
          />
          
          {/* Элемент выбора цвета для новой записи */}
          <input
            type="color"
            value={newItemColor}
            // При изменении обновляем состояние цвета новой записи
            onChange={(e) => setNewItemColor(e.target.value)}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '2px'
            }}
          />
          
          {/* Кнопка добавления новой записи с визуальными эффектами */}
          <button
            // При клике добавляем новую запись
            onClick={handleAddItem}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: '#dbeafe',     // Светло-синий фон
              color: '#1e40af',              // Темно-синий текст
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'  // Плавный переход цвета
            }}
            // Эффекты наведения для улучшения UX
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#bfdbfe')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dbeafe')}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};