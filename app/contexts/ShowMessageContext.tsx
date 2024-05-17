import { createContext, Dispatch, SetStateAction } from "react"



interface ShowMessageContextType {

    showMessage: boolean,
    setShowMessage: Dispatch<SetStateAction<boolean>>
}



export const ShowMessageContext = createContext<ShowMessageContextType>({} as ShowMessageContextType)