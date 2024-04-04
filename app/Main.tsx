"use client";

import { Inter } from "next/font/google";
import { Button, Theme } from "@radix-ui/themes";
import { ThemeContext } from "./contexts/ThemeContext";
import './beepingButton.css'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Navbar from "./Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { useSpring } from "react-spring";
import { createContext } from "vm";
import { SearchContext } from "./contexts/SearchContext";
import { ShowMapContext } from "./contexts/ShowMapContext";
import theme from "./configs/theme";

interface Props {
  childrenNode: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const Main = ({ childrenNode }: Props) => {
  const [isDark, setIsDark] = useState(false);

  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollThreshold = 5;

  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [showMap, setShowMap] = useState(false)

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
        className= {` ${inter.className} min-h-full bg-base-100`}
        
      >
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          <SearchContext.Provider value={{ searchValue, setSearchValue, selectValue, setSelectValue }}>
            <ShowMapContext.Provider value = {{showMap, setShowMap}}>
              <ChakraProvider theme= {theme}>
                <Theme>
                
                  
                  <Navbar hasScrolled={hasScrolled} />
                  {childrenNode}
                </Theme>
              </ChakraProvider>
            </ShowMapContext.Provider>
          </SearchContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
};

export default Main;
