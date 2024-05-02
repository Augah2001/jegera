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
  const {hasScrolled, setHasScrolled, springProps} = useMainView()

  const {data:locations, error, isLoading} = useLocations()
  return (
    <div>
        <Button
          className="beeping-button cursor-pointer fixed h-14 rounded-3xl z-10 bg-[#2a1d57] text-2xl top-[700px] left-[50%] transform translate(-50%, -50%)"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? "show list" : "show map"}
        </Button>
      <div className="mt-[90px] fixed top-0 left-0 w-full z-10 bg-base-100">
        <GradientDiv />
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
        
        {!isDark && (
          <div className={` bg-base-300  h-[1px] min-w-[100%] mt-9`}></div>
        )}
        {<Slider />}
      </div>
      <div className="mt-[208px]">
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
