"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

import React, { useContext, useEffect, useRef, useState } from "react";

import Image from "next/image";
import user_image from "../assets/user_placeholder.jpeg";
import { Button } from "@radix-ui/themes";
import { House } from "../hooks/useHouses";
import { HouseContext } from "../contexts/SelectedHouseContext";
import { houseSchema } from "../dashboard/[id]/AddForm";
import { UserContext } from "../contexts/UserContext";
import { BiMessageAltAdd, BiMinus, BiStar } from "react-icons/bi";
import apiClient from "../configs/apiClient";
import { ShowMessageContext } from "../contexts/ShowMessageContext";

type Input = {
  message: string;
};

type Message = {
  sender: number | undefined;
  receiver: number | undefined;
  body: string;

  sentByMe: boolean;
};


function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const {selectedHouse} = useContext(HouseContext)
  const {user} = useContext(UserContext)
  console.log(selectedHouse)
  

  const {setShowMessage} = useContext(ShowMessageContext)


  const { register, handleSubmit, watch, setValue } = useForm<Input>();
  const [isFocused, setIsFocused] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  console.log(user?.id, selectedHouse?.ownerId)

  useEffect(() => {

    socket.emit("joinChat", [user,selectedHouse?.owner]);
    console.log([user,selectedHouse])

    // Listen for chat messages
    socket.on("chatMessages", (messages) => {
      console.log(messages);
      setMessages(messages);
    });

  }, []);

  socket.on("message", (message) => {
  
    setMessages([...messages, message]);
  });

  

  

  const onSend: SubmitHandler<Input> = ({ message }) => {
    console.log(message);
    const newMessage: Message = {
      sender: user?.id,
      receiver: selectedHouse?.ownerId,
      body: message,
      sentByMe: true,
    };
    socket.emit("message", newMessage);
    socket.on('messageSaved', message=> {
        console.log(message)
    })
    setMessages([...messages, newMessage]);

    setValue("message", "");
  };

  const isDisabled = watch("message", "").trim() == "";

  return (
    <div className="flex mx-auto">
      <div
        className="   bg-base-100 left-2 border-solid mx- flex shadow-2xl mt-10 max-w-[26%] "
        
      >
        <header className="flex bg-base-100 items-center p-4 shadow-md">
          <div>
            <Image
              className="w-[12%] rounded-[100px]"
              src={user_image}
              alt="hello"
            />
            <h1 className="text-xl text-base-content ms-3 font-bold">Augah</h1>
          </div>
          <div className="text-3xl font-2xl text-pink-600" onClick={()=> setShowMessage(false)}><BiMinus /></div>
        </header>
        <main
          style={{ backgroundImage: "url('@assets/dheni.jpg)" }}
          className="flex-grow h-[500px] overflow-y-auto mx-4 mt-5"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end mb-6 ${
                message.senderId !== user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-[100px] max-w-[70%]  text-white shadow-md ${
                  message.senderId !== user?.id ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {message.body}
              </div>
            </div>
          ))}
        </main>
        <form
          className=" flex fixed z-10 h-[12%] bg-base-100 min-w-[26%]"
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
}

export default Chat;
