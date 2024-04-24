'use client'

import React, { useEffect, useState } from "react";




const Inbox = () => {

  const [chats, setChats] = useState([])


  useEffect(()=> {
   fetch('http://localhost:3000/api/chats').then((chats)=> {
    chats.json().then((data)=> {
      setChats(data)
    })
   })
  },[])


  return (
    <div
      className=" bg-base-100  border-solid border-red-200 flex shadow-2xl mt-10 flex-col justify-end max-w-[26%] "
      style={{ backgroundImage: "url('../assets/dheni.jpg)" }}
    >
      <header className="flex bg-base-100 items-center p-4 shadow-md">
        <h1 className="text-xl text-base-content ms-1 font-bold">Chats</h1>
      </header>
      <main
        style={{ backgroundImage: "url('@assets/dheni.jpg)" }}
        className="flex-grow h-[500px] overflow-y-auto mx-4 mt-5"
      >
        <ul>
          {chats.map((chat)=> <li key= {chat.ChatId}>{chat.ChatId}</li>)}
        </ul>
      </main>
    </div>
  );
};

export default Inbox;
