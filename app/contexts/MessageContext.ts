import { createContext, Dispatch, SetStateAction } from "react";
import { Location } from "../hooks/useLocations";
import { House } from "../hooks/useHouses";
import { Message } from "../HomeComponents/Chat";

interface MessageContextType {
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
}

export const MessageContext = createContext<MessageContextType>(
  {} as MessageContextType
);
