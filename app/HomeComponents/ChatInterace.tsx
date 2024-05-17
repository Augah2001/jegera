import React from "react";
import Chats from "./Chats";
import Chat from "./Chat";

const ChatInterace = () => {
  return (
    <div className="flex mt-10 fixed z-50 bg-base-300 rounded-2xl shadow-lg ">
      <div className="w-[40%] min-h-[100%]"><Chats/></div>
      <div className="w-[2px] h-full z-50 bg-base-200"></div>
      <div className="w-[60%] rounded-lg">
        <Chat />
      </div>
    
    </div>
  );
};

export default ChatInterace;
