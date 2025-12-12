"use client";

import React, { createContext, useContext, useState } from 'react';

type SelectionContextType = {
  selectedLabel: string | null;
  setSelectedLabel: (label: string | null) => void;
  hoveredLabel: string | null;
  setHoveredLabel: (label: string | null) => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  return (
    <SelectionContext.Provider value={{ selectedLabel, setSelectedLabel, hoveredLabel, setHoveredLabel }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  return context;
};

export default SelectionContext;
