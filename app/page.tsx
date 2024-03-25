"use client";


import Image from "next/image";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Button } from "@radix-ui/themes";
import { SearchIcon } from "@chakra-ui/icons";
import SearchComponent from "./components/SearchComponent";

export default function Home() {
  const { isDark } = useContext(ThemeContext);

  

  return (
    <div className="bg-base-100 ">
      <SearchComponent/>
    </div>
      
    
  );
}
