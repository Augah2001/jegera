import { createContext, Dispatch, SetStateAction } from "react";
import { Chat } from "../HomeComponents/Chats";
import { User } from "./UserContext";



interface ChatContextType {
  chatUser: User | undefined;
  setChatUser: Dispatch<SetStateAction<User | undefined>>;
}

export const ChatContext = createContext<ChatContextType>(
  {} as ChatContextType
);
