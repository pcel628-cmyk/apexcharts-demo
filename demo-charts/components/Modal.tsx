"use client";

import React from 'react';
import type { ChartDataPoint } from '../types';
import { getCategoryDescription } from '../data/categoryDescriptions';

type ModalProps = {
  data: ChartDataPoint;
  chartTitle?: string;
  chartType?: string;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ data, chartTitle, chartType, onClose }) => {
  const description = getCategoryDescription(data.label);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        width: '384px',
        padding: '32px',
        border: '1px solid #bfdbfe'
      }}>
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>{data.label}</h3>
            <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {chartType ? `Тип: ${chartType}` : 'Детали элемента'}
            </p>
          </div>
          <button
            aria-label="Закрыть"
            onClick={onClose}
            style={{
              color: '#4b5563',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
          >
            ✕
          </button>
        </header>

        <div style={{ 
          space: '20px',
          height: '320px',
          overflowY: 'auto'
        }}>
          <div style={{
            background: 'linear-gradient(to right, #f0f9ff, #ecfdf5)',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #bfdbfe',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Значение
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '30px', color: '#1d4ed8', marginTop: '8px' }}>
              {data.value.toLocaleString('ru-RU')}
            </div>
          </div>

          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #e5e7eb',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Описание
            </div>
            <div style={{ fontSize: '14px', color: '#000000', lineHeight: '1.5', fontWeight: '500' }}>
              {description}
            </div>
          </div>

          {data.id && (
            <div style={{
              fontSize: '12px',
              fontFamily: 'monospace',
              color: '#4b5563',
              backgroundColor: '#f3f4f6',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}>
              ID: {data.id}
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
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
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
