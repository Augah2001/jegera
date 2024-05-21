"use client";
import { background, Input } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { ShowChatsContext } from "../contexts/ShowChatsContext";
import apiClient from "../configs/apiClient";
import { User, UserContext } from "../contexts/UserContext";
import { CldImage } from "next-cloudinary";
import { ChatContext } from "../contexts/SelectedChatContext";
import { Message } from "./Chat";
import { MessagesContext } from "../contexts/MessagesContext";
import { ChatsContext } from "../contexts/ChatsContext";
import { MessageContext } from "../contexts/MessageContext";
import { BiPlusCircle } from "react-icons/bi";

export interface Chat {
  id: string;
  users: User[];
  name: string;
  backgroundImage: string;
  messages: Message[];
  hasUnread: boolean;
}

const Chats = () => {
  const { user } = useContext(UserContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const { isDark } = useContext(ThemeContext);
  const { chats, setChats } = useContext(ChatsContext);

  const { setChatUser, chatUser } = useContext(ChatContext);
  const [chatee, setChatee] = useState<User>();
  const { message, setMessage } = useContext(MessageContext);

  useEffect(() => {
    apiClient
      .get<Chat[]>(`chats/${user?.id}`)
      .then((res) => {
        const newChats: Chat[] = [] as Chat[];
        const users = res.data[0].users;

        if (!chatUser) {
          const newChatUser = users.find((u) => u.id !== user?.id);
          console.log(newChatUser);
          if (newChatUser) {
            setChatUser(newChatUser);
          }
        }

        if (chats?.length) {
          for (let chat of chats) {
            for (let c of res.data) {
              if (c.id === chat.id) {
                if (c.messages.length !== chat.messages.length) {
                  c["hasUnread"] = true;
                }
              }
            }
          }
        }

        console.log(res.data);
        res.data.length &&
          res.data.forEach((chat) => {
            const chatee = chat.users.find((u) => u.id !== user?.id);
            // console.log(chatee)
            if (chatee) {
              setChatee(chatee);
              const newChat = {
                ...chat,
                name: chatee.firstName,
                backgroundImage: chatee.backgroundImage,
              };
              newChats.push(newChat);
            }
          });

        newChats.length &&
          newChats.sort(
            (a: any, b: any) =>
              new Date(b?.messages[b.messages.length - 1]?.time) -
              new Date(a?.messages[a.messages.length - 1]?.time)
          );

        setChats(newChats);
      })
      .catch((err) => console.log(err));
  }, [user?.id, message, chatUser]);

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
          <BiPlusCircle
           className="font-normal
           active:opacity-30
           hover:text-purple-600 text-4xl me-6
           text-slate-400"
           
           />
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
                  className={` ps-2 mt-4 h-20  ${
                    chat.users[0].id == chatUser?.id ||
                    chat.users[1].id === chatUser?.id
                      ? "bg-base-300"
                      : "bg-base-100"
                  }
              ${
                isDark ? "hover:bg-[#3f3c72]" : "hover:bg-[#ECECEC]"
              } hover:rounded-md hover:border-b-0

               bg-base-100 flex ${
                 isDark ? " border-b-purple-700" : " border-b-base-300"
               }`}
                >
                  <li
                    
                    className=" ms-3 cursor-pointer my-auto text-base-content w-full flex items-center "
                    onClick={() => {
                      chat.hasUnread = false;
                      const chate = chat.users.find((u) => u.id !== user?.id);
                      setChatUser(chate);
                      // console.log(chate)
                    }}
                  >
                    <div className="flex w-[100%]">
                      <div className="h-[50px] w-[50px] flex me-3  rounded-[50px]">
                        <CldImage
                          src={chat?.backgroundImage}
                          alt="user_Image"
                          width={50}
                          height={50}
                          className="object-cover rounded-full object-center"
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <h1
                            className={`${
                              chat.users[0].id == chatUser?.id ||
                              chat.users[1].id === chatUser?.id
                                ? "text-md"
                                : "text-md"
                            }
                          ${isDark ? "text-slate-400" : "text-slate-700"}`}
                          >
                            {chat?.name}
                          </h1>
                          {
                      
                          chat.hasUnread &&
                            chat.messages[chat.messages.length - 1].senderId !==
                              user?.id &&
                              chatUser?.id!== user?.id &&
                              (
                              <div className="h-3 me-2 my-auto w-3 bg-pink-600 rounded-[400px]" />
                            )}
                        </div>
                        <div className="flex justify-between">
                          <small className="text-blue-500 font-medium">
                            {chat.messages[chat.messages.length - 1]?.body}
                          </small>
                          {
                            <small className="font-medium me-3">
                              {chat?.messages[
                                chat.messages.length - 1
                              ]?.time?.slice(12, 16)}
                            </small>
                          }
                        </div>
                      </div>
                    </div>
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
