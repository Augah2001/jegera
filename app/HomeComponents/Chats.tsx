"use client";
import { background, Input } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { ShowChatsContext } from "../contexts/ShowChatsContext";
import apiClient from "../configs/apiClient";
import { User, UserContext } from "../contexts/UserContext";
import { CldImage } from "next-cloudinary";
import { ChatContext } from "../contexts/SelectedChatContext";

export interface Chat {
  id: string;
  users: User[];
  name: string;
  backgroundImage: string;
}

const Chats = () => {
  const { user } = useContext(UserContext);

  const { isDark } = useContext(ThemeContext);
  const [chats, setChats] = useState<Chat[]>();
  const {setChatUser} =useContext(ChatContext)
  const [chatee, setChatee] = useState<User>()

  useEffect(()=> {
    apiClient
    .get<Chat[]>("/chats/1")
    .then((res) => {
      const newChats: Chat[] = [] as Chat[];
      const users = res.data[0].users
      const newChatUser = users.find(u => u.id !== user?.id)
      if (newChatUser) {
        setChatUser(newChatUser)
      }
      res.data.forEach((chat) => {
        const chatee = chat.users.find((u) => u.id !== user?.id);
        if (chatee) {
          setChatee(chatee)
          const newChat = {
            ...chat,
            name: chatee.firstName,
            backgroundImage: chatee.backgroundImage,
          };
          newChats.push(newChat);
        }
      });
      setChats(newChats);

    })
    .catch((err) => console.log(err));
  }, [ user?.id])

  return (
    <>
      <div
        className={`message-area  bg-base-100 min-w-[40%]

    ${isDark ? "dark-scroll-cont" : "light-scroll-cont"}
     shadow-2xl overflow-y-auto h-[100%] 
    
    `}
      >
        <header
          className={`flex justify-between  items-center p-4 ${
            isDark && "border-b-[1px] "
          }  bg-base-100 ${isDark && " border-b-purple-700"}`}
        >
          <h1 className="text-3xl text-pink-600 ms-3 font-bold">Chats</h1>
          
        </header>
        <main className="mt-4  ">
          <div className="flex">
            <Input
              focusBorderColor="purple.500"
              borderRadius="100px"
              width={"80%"}
              marginX="auto"
              variant="outline"
              borderStyle={"none"}
              bg={`${isDark ? "#3f3c72" : "#ECECEC"}`}
              placeholder="search"
            />
          </div>
          <section className="mt-5">
            <div
              className={` mx-3    bg-base-100 flex ${
                isDark ? " border-b-purple-700" : " border-b-base-300"
              }
               `}
            />
            <ul>
              {chats?.map((chat, index) => (
                <div
                  key={index}
                  className={` ps-2 mt-4 h-20 
              ${
                isDark ? "hover:bg-[#3f3c72]" : "hover:bg-[#ECECEC]"
              } hover:rounded-md hover:border-b-0

               bg-base-100 flex ${
                 isDark ? " border-b-purple-700" : " border-b-base-300"
               }`}
                >
                  
                  <li className=" ms-3 my-auto text-base-content flex items-center " onClick={()=> {
                    setChatUser(chatee)
                  }}>
                  <div className="h-[50px] w-[50px] flex me-3  rounded-[50px]">
                    <CldImage
                      src={chat?.backgroundImage}
                      alt="user_Image"
                      width={50}
                      height={50}
                      className="object-cover rounded-full object-center"
                    />
                  </div >
                    <h1>{chat?.name}</h1>
                    {/* <small>{entity.message}</small> */}
                  </li>
                </div>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

export default Chats;
