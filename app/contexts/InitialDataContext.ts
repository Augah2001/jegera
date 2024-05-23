import { createContext, Dispatch, SetStateAction } from "react";
import { Location } from "../hooks/useLocations";
import { House } from "../hooks/useHouses";

interface HousesContextType {
  initialHouses: House[] | undefined;
  setInitialHouses: Dispatch<SetStateAction<House[] | undefined>>;
}

export const InitialHousesContext = createContext<HousesContextType>(
  {} as HousesContextType
);
