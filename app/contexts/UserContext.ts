import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


export type  User = {
  id: number,
  email: string;
  lastName: string;
  firstName: string;
  accountType: "tenant" | "landlord" | "authorizer";
  gender: string;
  isOnline : boolean          
  sentTransactions: any[]
  receivedTransactions: any[]
  sentMessages: any[]
  receivedMessages: any[]
  Chats: any[]
  isAuthorizer: boolean
  logins: any[] 
  backgroundImage: string        
  


}


export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
}



export const UserContext = createContext<UserContextType>({} as UserContextType)



