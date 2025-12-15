"use client";

// Импорт React и хука управления состоянием
import React, { useState } from 'react';

// Импорт типов данных для TypeScript
import { ChartDataPoint } from '../types';

/**
 * Интерфейс свойств компонента редактора данных
 */
interface DataEditorProps {
  /** Исходные данные для редактирования */
  initialData: ChartDataPoint[];
  /** Функция обратного вызова для обновления данных */
  onDataChange: (newData: ChartDataPoint[]) => void;
  /** Заголовок редактора */
  title: string;
}

/**
 * Компонент редактора данных для диаграмм
 * Позволяет добавлять, редактировать и удалять данные в реальном времени
 * 
 * Особенности:
 * - Редактирование существующих записей (название, значение, цвет)
 * - Добавление новых записей с выбором цвета
 * - Удаление записей
 * - Автоматическое обновление диаграмм при изменении данных
 */
export const DataEditor: React.FC<DataEditorProps> = ({ initialData, onDataChange, title }) => {
  // Состояние для хранения текущих данных
  const [data, setData] = useState<ChartDataPoint[]>(initialData);
  
  // Состояние для новой записи данных (без ID и цвета)
  const [newItem, setNewItem] = useState<Omit<ChartDataPoint, 'id' | 'color'>>({ 
    label: '', 
    value: 0
  });
  
  // Состояние для цвета новой записи
  const [newItemColor, setNewItemColor] = useState('#3B82F6');

  /**
   * Обработчик изменения полей существующих записей
   * @param index - индекс записи в массиве
   * @param field - поле для изменения
   * @param value - новое значение
   */
  const handleInputChange = (index: number, field: keyof ChartDataPoint, value: string | number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
    onDataChange(newData);
  };

  /**
   * Обработчик добавления новой записи
   * Создает новую запись с уникальным ID и выбранным цветом
   */
  const handleAddItem = () => {
    // Проверяем, что название не пустое
    if (newItem.label.trim() === '') return;
    
    // Создаем новую запись с уникальным ID и выбранным цветом
    const newItemWithId: ChartDataPoint = {
      ...newItem,
      id: `item-${Date.now()}`,
      value: Number(newItem.value) || 0,
      color: newItemColor
    };
    
    // Добавляем новую запись в массив данных
    const newData = [...data, newItemWithId];
    setData(newData);
    onDataChange(newData);
    
    // Сбрасываем форму новой записи
    setNewItem({ label: '', value: 0 });
    setNewItemColor('#3B82F6');
  };

  /**
   * Обработчик удаления записи
   * @param index - индекс записи для удаления
   */
  const handleRemoveItem = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    onDataChange(newData);
  };

  return (
    // Основной контейнер редактора в стиле модального окна
    <div style={{
      position: 'relative',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '1px solid #bfdbfe'
    }}>
      {/* Заголовок редактора */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '20px' 
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#000000' 
        }}>
          {title}
        </h3>
      </div>
      
      {/* Список редактируемых записей с прокруткой */}
      <div style={{ 
        gap: '12px',
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '20px'
      }}>
        {data.map((item, index) => (
          // Контейнер одной записи данных
          <div 
            key={item.id} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}
          >
            {/* Поле ввода названия */}
            <input
              type="text"
              value={item.label}
              onChange={(e) => handleInputChange(index, 'label', e.target.value)}
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
            
            {/* Поле ввода значения */}
            <input
              type="number"
              value={item.value}
              onChange={(e) => handleInputChange(index, 'value', Number(e.target.value))}
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
            
            {/* Элемент выбора цвета */}
            <input
              type="color"
              value={item.color || '#3B82F6'}
              onChange={(e) => handleInputChange(index, 'color', e.target.value)}
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
                padding: '2px'
              }}
            />
            
            {/* Кнопка удаления записи */}
            <button
              onClick={() => handleRemoveItem(index)}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                backgroundColor: 'transparent',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Секция добавления новой записи */}
      <div style={{ 
        paddingTop: '20px', 
        borderTop: '1px solid #e5e7eb' 
      }}>
        <h4 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Добавить новую запись
        </h4>
        
        {/* Форма новой записи */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          {/* Поле ввода названия новой записи */}
          <input
            type="text"
            value={newItem.label}
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
          
          {/* Кнопка добавления новой записи */}
          <button
            onClick={handleAddItem}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
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