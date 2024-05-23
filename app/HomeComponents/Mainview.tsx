import { Button } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import GradientDiv from "../components/GradientDiv";
import { usePathname } from "next/navigation";
import { animated, useSpring } from "react-spring";
import useLocations from "../hooks/useLocations";
import SearchComponent from "./SearchComponent";
import Slider from "./Slider";
import HouseCardGrid from "./HouseCardGrid";
import { ShowMapContext } from "../contexts/ShowMapContext";
import { ThemeContext } from "../contexts/ThemeContext";
import useMainView from "../hooks/useMainView";
import MyMap from "./Map";
import Chats from "./Chats";
import { ShowChatsContext } from "../contexts/ShowChatsContext";
import ChatInterace from "./ChatInterace";
import { ShowMessageContext } from "../contexts/ShowMessageContext";
import Chat from "./Chat";
import { useResponsive } from "../hooks/useResponsive";

const Mainview = () => {
  const path = usePathname();
  const { showMap, setShowMap } = useContext(ShowMapContext);
  const { showMessage } = useContext(ShowMessageContext);

  const { isDark } = useContext(ThemeContext);
  const { isSmallDevice } = useResponsive();

  const { hasScrolled, setHasScrolled, springProps } = useMainView();

  const { data: locations, error, isLoading } = useLocations();
  const { showChats } = useContext(ShowChatsContext);
  return (
    <div className="">
      {showChats && (
        <div className="ms-[50%]">
          <ChatInterace />
        </div>
      )}
      {showMessage && (
        <div className="ms-[70%] flex mt-10 fixed z-50 bg-base-300 rounded-2xl shadow-lg">
          <Chat />
        </div>
      )}
      <div className="flex justify-center">
        <Button
          className="beeping-button cursor-pointer fixed h-14 rounded-3xl z-10 bg-[#2a1d57] text-2xl top-[700px] transform translate(-50%, -50%)"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? "show list" : "show map"}
        </Button>
      </div>
      <GradientDiv />
      {!hasScrolled && (
        <div className="mt-[90px] fixed top-2 left-0 w-full z-10 bg-base-100">
          {path === "/" && !hasScrolled && (
            <animated.div style={springProps}>
              {!hasScrolled && <SearchComponent />}
            </animated.div>
          )}
          {!hasScrolled && isDark && (
            <div className="mt-9">
              <GradientDiv />
            </div>
          )}
        </div>
      )}
      <div
        className={` ${
          hasScrolled ? (isLoading ? "" : "mt-[154px]") : "mt-[150px]"
        }  ms- left-0 ${
          hasScrolled
            ? !isSmallDevice
              ? "w-[41%] transition duration-1000 ease-in-out  mt-36 "
              : "w-[100%] transition duration-1000  ease-in-out"
            : "w-[100%] transition duration-1000 ease-in-out  "
        } fixed z-10 `}
      >
        <div className="h-[1px] bg-base-300 w-full"></div>
        {<Slider hasScrolled={hasScrolled} />}
      </div>
      <div className={`${!hasScrolled ? "mt-[235px]" : "mt-[100px]"}`}>
        {showMap ? (
          <MyMap setHasScrolled={setHasScrolled} />
        ) : (
          <HouseCardGrid />
        )}
      </div>
    </div>
  );
};

export default Mainview;
