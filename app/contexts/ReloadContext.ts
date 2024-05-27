import { createContext, Dispatch, SetStateAction } from "react";
import { Location } from "../hooks/useLocations";
import { House } from "../hooks/useHouses";
import { Message } from "../HomeComponents/Chat";

interface ReloadC
 {
  reload: number;
  setReload: Dispatch<SetStateAction<number>>;
}

export const ReloadCont = createContext<ReloadC
>(
  {} as ReloadC

);