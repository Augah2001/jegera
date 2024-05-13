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

const Mainview = () => {
  const path = usePathname();
  const { showMap, setShowMap } = useContext(ShowMapContext);

  const { isDark } = useContext(ThemeContext);
  const { hasScrolled, setHasScrolled, springProps } = useMainView();

  const { data: locations, error, isLoading } = useLocations();
  return (
    <div>
      <Button
        className="beeping-button cursor-pointer fixed h-14 rounded-3xl z-10 bg-[#2a1d57] text-2xl top-[700px] left-[50%] transform translate(-50%, -50%)"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? "show list" : "show map"}
      </Button>
      <GradientDiv />
      {!hasScrolled && <div className="mt-[90px] fixed top-2 left-0 w-full z-10 bg-base-100">
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

        
        
      </div>}
      <div
        className={` ${hasScrolled? 'mt-[124px]': 'mt-[150px]'}  ms- left-0 ${
          hasScrolled
            ? "w-[80%] transition duration-1000 ease-in-out"
            : "w-[100%] transition duration-1000 ease-in-out"
        } fixed z-10 `}
      >
        <div className="h-[1px] bg-base-300 w-full"></div>
        <Slider />
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
