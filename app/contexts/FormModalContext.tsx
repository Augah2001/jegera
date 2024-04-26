import { createContext } from "react";


type FormModalContextType = {
    onOpen: () => void,
    onClose: () => void
    isOpen: boolean
  };
  
  export const FormModalContext = createContext<FormModalContextType>(
    {} as FormModalContextType
  );