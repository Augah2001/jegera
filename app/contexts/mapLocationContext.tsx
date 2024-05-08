import { createContext, ReactNode } from "react";



interface MapLocationContextType {
  mapLocation: any;
  setMapLocation: React.Dispatch<React.SetStateAction<any>>;
//   currentTheme: string;
//   setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
}




export const mapLocationContext = createContext<MapLocationContextType>(
  {} as MapLocationContextType
);