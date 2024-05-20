import { createContext, Dispatch, SetStateAction } from "react"
import { Location } from "../hooks/useLocations"
import { House } from "../hooks/useHouses"
import { Message } from "../HomeComponents/Chat"


interface MessagesContextType {

    messages: Message[] ,
    setMessages: Dispatch<SetStateAction<Message[]>>
}



export const MessagesContext = createContext<MessagesContextType>({} as MessagesContextType)