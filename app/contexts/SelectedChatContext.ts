import { createContext, Dispatch, SetStateAction } from "react";
import { Chat } from "../HomeComponents/Chats";



interface ChatContextType {
  chat: Chat | undefined;
  setChat: Dispatch<SetStateAction<Chat | undefined>>;
}

export const ChatContext = createContext<ChatContextType>(
  {} as ChatContextType
);
