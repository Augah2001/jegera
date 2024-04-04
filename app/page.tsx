"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Button } from "@radix-ui/themes";
import { SearchIcon } from "@chakra-ui/icons";
import SearchComponent from "./components/SearchComponent";
import GradientDiv from "./components/GradientDiv";
import Slider from "./Slider";
import HouseCard from "./HouseCard";
import HouseCardGrid from "./HouseCardGrid";
import { useSpring, animated } from "react-spring";
import MyMap from "./Map";
import { ShowMapContext } from "./contexts/ShowMapContext";

export default function Home({}) {
  const { showMap, setShowMap } = useContext(ShowMapContext);
  const { isDark } = useContext(ThemeContext);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollThreshold = 2;

  const springProps = useSpring({
    opacity: hasScrolled ? 0 : 1, // Adjust opacity values for desired fade effect
    from: { opacity: 1 }, // Set initial opacity for smooth transition
    config: { duration: 200 }, // Adjust duration for transition speed (in milliseconds)

    
  });

  

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  return (
    <div className="bg-base-100 ">
      <Button className="beeping-button cursor-pointer fixed h-14 rounded-3xl z-10 bg-[#2a1d57] text-2xl top-[700px] left-[50%] transform translate(-50%, -50%)"
                   onClick={()=> setShowMap(!showMap)}
                  >
                   {showMap? 'show list': 'show map'}
                  </Button>
      <div className="mt-[90px] fixed top-0 left-0 w-full z-10 bg-base-100">
        <GradientDiv />
        {!hasScrolled && (
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
        <Slider />
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
}
