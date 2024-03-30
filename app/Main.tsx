"use client";

import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { ThemeContext } from "./contexts/ThemeContext";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { useSpring } from "react-spring";
import { createContext } from "vm";
import { SearchContext } from "./contexts/SearchContext";

interface Props {
  childrenNode: ReactNode;
}


const inter = Inter({ subsets: ["latin"] });

const Main = ({ childrenNode }: Props) => {
  const [isDark, setIsDark] = useState(false);

  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollThreshold = 5;

  const [searchValue, setSearchValue] = useState("");
 

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);
  return (
    <html lang="en" data-theme="pastel" onScroll={() => console.log("augah")}>
      <body
        className="min-h-full bg-base-100  "
        onScroll={() => console.log("augah")}
      >
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <Theme>
              <button className="bg-blue-400">augah</button>
              <Navbar hasScrolled={hasScrolled} />
              {childrenNode}
            </Theme>
          </SearchContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
};

export default Main;
