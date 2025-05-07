import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ColorContextType {
  colors: string[];
  randomizeColors: () => void;
  resetColors: () => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState(Array(9).fill('#FF0000'));

  const randomizeColors = () => {
    setColors(colors.map(() => generateRandomColor()));
  };

  const resetColors = () => {
    setColors(Array(9).fill('#FF0000'));
  };

  return (
    <ColorContext.Provider value={{ colors, randomizeColors, resetColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorContext harus digunakan di dalam ColorProvider');
  }
  return context;
};