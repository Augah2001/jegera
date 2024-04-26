"use client";
import { Input, useConst } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Image from "next/image";
import user_image from "../assets/user_placeholder.jpeg";
import { BiHappy } from "react-icons/bi";

const Chats = () => {
  const entities = [
    { name: "Augah", message: "You: hello wazodii wangu....." },
    { name: "Augah", message: "You: hello wazodii wangu....." },
    { name: "Augah", message: "You: hello wazodii wangu....." },
    { name: "Augah", message: "You: hello wazodii wangu....." },
    { name: "Augah", message: "You: hello wazodii wangu....." },
    { name: "Augah", message: "You: hello wazodii wangu....." },
    { name: "Augah", message: "You: hello wazodii wangu....." },
    { name: "Augah", message: "You: hello wazodii wangu....." },
  ];
  const { isDark } = useContext(ThemeContext);
  return (
    <>
    <div className={`max-h-[650px] rounded-lg

    ${isDark?"dark-scroll-cont":'light-scroll-cont'} w-[30%]
     shadow-2xl mt-5 fixed overflow-y-scroll
    
    `


    }>
      <header className={`flex  items-center p-4 shadow-md ${isDark && "border-b-[1px] "}  bg-base-100 ${
              isDark && " border-b-purple-700"
            }`}>
        <h1 className="text-3xl text-base-content ms-3 font-bold">Chats</h1>
      </header >
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
            {entities.map((entity, index) => (
              <div key={index}
                className={` ps-3 mx-3 mt-4 h-20 
              ${
                isDark ? "hover:bg-[#3f3c72]" : "hover:bg-[#ECECEC]"
              } hover:rounded-md hover:border-b-0

               bg-base-100 flex ${
                isDark ? " border-b-purple-700" : " border-b-base-300"
              }`}
              >
                <Image
                  className="w-[50px] h-[50px] my-auto rounded-[100px]"
                  src={user_image}
                  alt="hello"
                />
                <li className=" ms-4 my-auto text-base-content ">
                  <h1>{entity.name}</h1>
                  <small>{entity.message}</small>
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
