import { createContext } from "react";


export type  UserType = {
  email: string;
  lastName: string;
  firstName: string;
  accountType: "tenant" | "landlord";
  gender: string;
  isOnline : boolean          
  sentTransactions: any[]
  receivedTransactions: any[]
  sentMessages: any[]
  receivedMessages: any[]
  Chats: any[]
  isAuthorizer: boolean
  logins: any[]         
  
}




export const UserContext = createContext<UserType | null>(null)