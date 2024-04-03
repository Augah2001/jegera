// 'use client'

import { createContext, ReactNode } from "react";



interface ThemeContextType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
//   currentTheme: string;
//   setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
}




export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);


