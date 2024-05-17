import React, { useContext, useEffect } from "react";
import Chats from "./Chats";
import Chat from "./Chat";
import { ChatContext } from "../contexts/SelectedChatContext";

const ChatInterace = () => {

  const {chatUser, setChatUser} =useContext(ChatContext)
  useEffect(()=> {

    return 
  })

  
  return (
    <div className="flex mt-10 fixed z-50 min-h-[600px] bg-base-300 rounded-2xl shadow-lg ">
      <div className={`${chatUser? 'w-[45%]': "w-[100%]"}  min-h-[100%]`}><Chats/></div>
      <div className="w-[2px] h-full z-50 bg-base-200"></div>
       <div className="w-[55%] rounded-lg">
        <Chat />
      </div>
    
    </div>
  );
};

export default ChatInterace;
