import { createContext, Dispatch, SetStateAction } from "react";
import { Chat } from "../HomeComponents/Chats";

interface ChatsContextType {
  chats: Chat[] | undefined ;
  setChats: Dispatch<SetStateAction<Chat[] | undefined>>;
}

export const ChatsContext = createContext<ChatsContextType>(
  {} as ChatsContextType
);
