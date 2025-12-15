"use client";

import React, { useState } from 'react';
import { ChartDataPoint } from '../types';

interface DataEditorProps {
  initialData: ChartDataPoint[];
  onDataChange: (newData: ChartDataPoint[]) => void;
  title: string;
}

export const DataEditor: React.FC<DataEditorProps> = ({ initialData, onDataChange, title }) => {
  const [data, setData] = useState<ChartDataPoint[]>(initialData);
  const [newItem, setNewItem] = useState<Omit<ChartDataPoint, 'id' | 'color'> & { color?: string }>({ 
    label: '', 
    value: 0,
    color: '#3B82F6' // Цвет по умолчанию из палитры ApexCharts
  });

  const handleInputChange = (index: number, field: keyof ChartDataPoint, value: string | number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
    onDataChange(newData);
  };

  const handleColorChange = (index: number, color: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], color };
    setData(newData);
    onDataChange(newData);
  };

  const handleAddItem = () => {
    if (newItem.label.trim() === '') return;
    
    const newItemWithId: ChartDataPoint = {
      ...newItem,
      id: `item-${Date.now()}`,
      value: Number(newItem.value) || 0,
      color: newItem.color || '#3B82F6'
    };
    
    const newData = [...data, newItemWithId];
    setData(newData);
    onDataChange(newData);
    
    setNewItem({ label: '', value: 0, color: '#3B82F6' });
  };

  const handleRemoveItem = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    onDataChange(newData);
  };

  // Предопределённая палитра цветов, совместимая с ApexCharts
  const colorPalette = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#8B5CF6',
    '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
  ];

  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '1px solid #bfdbfe'
    }}>
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
      
      <div style={{ 
        gap: '16px',
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '20px',
        paddingRight: '8px'
      }}>
        {data.map((item, index) => (
          <div 
            key={item.id} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}
          >
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
            
            {/* Выбор цвета - текстовое поле */}
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
            
            {/* Предопределённые цвета */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {colorPalette.slice(0, 4).map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorChange(index, color)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    backgroundColor: color,
                    border: item.color === color ? '2px solid #000000' : '1px solid #d1d5db',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
            
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
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
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
          
          {/* Выбор цвета для новой записи */}
          <input
            type="color"
            value={newItem.color || '#3B82F6'}
            onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '2px'
            }}
          />
          
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