import { createContext, Dispatch, SetStateAction } from "react";

interface InputErrorType {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

export const HouseErrorInputContext = createContext<InputErrorType>(
  {} as InputErrorType
);
