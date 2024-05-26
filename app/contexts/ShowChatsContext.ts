import { createContext, Dispatch, SetStateAction } from "react"



interface ShowChatsContextType {

    showChats: boolean,
    setShowChats: Dispatch<SetStateAction<boolean>>
}



export const ShowChatsContext = createContext<ShowChatsContextType>({} as ShowChatsContextType)