import { createContext, Dispatch, SetStateAction } from "react";

type ShowMapContextType = {
  showMap: boolean;
  setShowMap: Dispatch<SetStateAction<boolean>>;
};

export const ShowMapContext = createContext<ShowMapContextType>(
  {} as ShowMapContextType
);
