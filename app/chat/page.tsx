"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import user_image from "../assets/user_placeholder.jpeg";
import { Button } from "@radix-ui/themes";


type Input = {
  message: string;
};

type Message = {
  sender: number;
  receiver: number;
  body: string;

  sentByMe: boolean;
};

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([1,2]);
  const [chatId, setChatId] = useState("");

  const { register, handleSubmit, watch, setValue } = useForm<Input>();
  const [isFocused, setIsFocused] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {

    socket.emit("joinChat", [1,2])

    

    // Listen for chat messages
    socket.on("chatMessages", (messages) => {
      console.log(messages)
      setMessages(messages);
    });

    
    // Clean up the''; socket connection on unmount
    
   
  }, []);

  socket.on("message", (message) => {
    console.log(messages)
    setMessages([...messages, message]);
   
  });

  // console.log(messages[0])
  

  const onSend: SubmitHandler<Input> = ({ message }) => {
    console.log(message)
    const newMessage: Message = {
      sender: selectedUsers[0],
      receiver: selectedUsers[1],
      body: message,
      sentByMe: true,
    };
    socket.emit("message", newMessage);
    setMessages([...messages, newMessage]);

    setValue("message", "");
  };

  const isDisabled = watch("message", "").trim() == "";

  return (
    <div
      className=" bg-base-100  border-solid border-red-200 flex shadow-2xl mt-10 flex-col justify-end max-w-[26%] "
      style={{ backgroundImage: "url('../assets/dheni.jpg)" }}
    >
      <header className="flex bg-base-100 items-center p-4 shadow-md">
        <Image
          className="w-[12%] rounded-[100px]"
          src={user_image}
          alt="hello"
        />

        <h1 className="text-xl text-base-content ms-3 font-bold">Augah</h1>
      </header>
      <main
        style={{ backgroundImage: "url('@assets/dheni.jpg)" }}
        className="flex-grow h-[500px] overflow-y-auto mx-4 mt-5"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end mb-6 ${
              message.senderId ==1 ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-[100px] max-w-[70%]  text-white shadow-md ${
                message.senderId ==1 ? "bg-blue-500" : "bg-gray-300"
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
          className=" shadow-md focus:border-orange-100 rounded-[200px] bg-neutral-content m-auto h-[60%] w-[80%] px-6"
          placeholder="message"
          //   ref={inputRef}
          autoFocus
        />
        <Button disabled={isDisabled} className="m-auto">
          send
        </Button>
      </form>
    </div>
  );
}

export default Chat;
