import { createContext, Dispatch, SetStateAction } from "react";



interface SelectErrorContextType {
    error: string;
    setError: Dispatch<SetStateAction<string>>
}


export const SelectErrorContext = createContext<SelectErrorContextType>({} as SelectErrorContextType)