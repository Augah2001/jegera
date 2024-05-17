"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

import React, { useContext, useEffect, useRef, useState } from "react";

import { Button } from "@radix-ui/themes";

import { HouseContext } from "../contexts/SelectedHouseContext";

import { UserContext } from "../contexts/UserContext";

import { ShowMessageContext } from "../contexts/ShowMessageContext";
import { ShowChatsContext } from "../contexts/ShowChatsContext";
import { ChatContext } from "../contexts/SelectedChatContext";
import { BiMinus } from "react-icons/bi";
type Input = {
  message: string;
};

export type Message = {
  sender: number | undefined;
  receiver: number | undefined;
  body: string;
  senderId?: number;
  receiverId?: number;

  sentByMe: boolean;
};


const Chat = () => {

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([]);
  const { selectedHouse } = useContext(HouseContext);
  const { user } = useContext(UserContext);
  const { setShowMessage } = useContext(ShowMessageContext);
  

  const { setShowChats } = useContext(ShowChatsContext);
  const { chatUser } = useContext(ChatContext);
  

  const { register, handleSubmit, watch, setValue } = useForm<Input>();

  


  useEffect(() => {

    if (chatUser) {socket.emit("joinChat", [user, chatUser]);
    console.log([user, chatUser]);
  }
    // Listen for chat messages
    socket.on("chatMessages", (messages) => {
      console.log(messages);
      setMessages(messages);
    });

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatUser, user]);

  socket.on("message", (message) => {
    setMessages([...messages, message]);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 10000;
    }
  });

  const onSend: SubmitHandler<Input> = ({ message }) => {
    console.log(message);
    const newMessage: Message = {
      sender: user?.id,
      receiver: chatUser?.id,
      body: message,
      sentByMe: true,
    };
    socket.emit("message", newMessage);

    setValue("message", "");
  };

  const isDisabled = watch("message", "").trim() == "";

  return (
    <div className="">
      <div className=" bg-base-200 rounded-2xl ">
        <header className="flex bg-base-100 justify-between items-center p-4 ">
          <div>
            {/* <Image
                className="w-[12%] rounded-[100px]"
                src={user_image}
                alt="hello"
              /> */}
            <h1 className="text-xl text-base-content ms-3 font-bold">{chatUser?.firstName}</h1>
          </div>
          <div
            className="text-3xl font-2xl text-pink-600"
            onClick={() => {
              setShowMessage(false);
              setShowChats(false);
            }}
          >
            <BiMinus />
          </div>
        </header>
        <div className="bg-base-300 h-[2px] w-[100%]"></div>
        <main
        ref={chatContainerRef}
          // style={{ backgroundImage: "url('@assets/dheni.jpg)" }}
          className=" max-h-[450px] min-h-[450px] overflow-y-auto message-area  mt-5"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end mb-6 mx-4  ${
                message.senderId === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-[100px] max-w-[70%]  text-white shadow-md ${
                  message.senderId === user?.id ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {message.body}
              </div>
            </div>
          ))}
        </main>
        <div className="bg-base-300 h-[2px] w-[100%]"></div>
        <form
          className=" message-input relative bottom-0 left-0 w-full h-20  bg-base-100 px-4 py-2 flex items-center"
          onSubmit={handleSubmit(onSend)}
        >
          <input
            type="text"
            {...register("message")}
            className=" shadow-md focus:border-orange-100 rounded-[200px] bg-neutral-content m-auto h-[60%] w-[60%] px-6"
            placeholder="message"
            //   ref={inputRef}
            autoFocus
          />
          <Button disabled={isDisabled} className="m-auto">
            send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
