"use client";

// Импорт необходимых хуков React для создания контекста и управления состоянием
import React, { createContext, useContext, useState } from 'react';

/**
 * Тип контекста выбора для синхронизации между диаграммами
 * Позволяет отслеживать выбранную и наведенную метку во всех диаграммах
 */
type SelectionContextType = {
  /** Метка выбранного элемента (при клике) */
  selectedLabel: string | null;
  
  /** Функция установки выбранной метки */
  setSelectedLabel: (label: string | null) => void;
  
  /** Метка элемента, на который наведена мышь */
  hoveredLabel: string | null;
  
  /** Функция установки метки наведения */
  setHoveredLabel: (label: string | null) => void;
};

/**
 * Создание контекста выбора с начальным значением undefined
 * Будет использоваться для синхронизации состояния между диаграммами
 */
const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

/**
 * Провайдер контекста выбора
 * Оборачивает компоненты, которым нужен доступ к состоянию выбора
 * 
 * @param children - Дочерние компоненты, которые будут иметь доступ к контексту
 */
export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Состояние для хранения выбранной метки (при клике по элементу диаграммы)
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  
  // Состояние для хранения метки наведения (при наведении мыши на элемент диаграммы)
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  // Предоставляем значения контекста всем дочерним компонентам
  return (
    <SelectionContext.Provider value={{ selectedLabel, setSelectedLabel, hoveredLabel, setHoveredLabel }}>
      {children}
    </SelectionContext.Provider>
  );
};

/**
 * Хук для использования контекста выбора
 * Позволяет компонентам получать доступ к состоянию выбора и функциям управления им
 * 
 * @returns Объект с состоянием выбора и функциями управления
 * @throws Error если хук используется вне SelectionProvider
 */
export const useSelection = () => {
  // Получаем контекст из ближайшего SelectionProvider
  const context = useContext(SelectionContext);
  
  // Проверяем, что хук используется внутри SelectionProvider
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  
  // Возвращаем значения контекста
  return context;
};

// Экспорт контекста по умолчанию для возможного использования в других модулях
export default SelectionContext;