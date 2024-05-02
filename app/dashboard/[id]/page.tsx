"use client";
import { ShowMapContext } from "@/app/contexts/ShowMapContext";
import HouseCardGrid from "@/app/HomeComponents/HouseCardGrid";
import Mainview from "@/app/HomeComponents/Mainview";
import MyMap from "@/app/HomeComponents/Map";
import Slider from "@/app/HomeComponents/Slider";
import useLocations from "@/app/hooks/useLocations";
import useMainView from "@/app/hooks/useMainView";
import { Button } from "@radix-ui/themes";

import React, { useContext } from "react";

const Dashboard = () => {
  const { showMap, setShowMap } = useContext(ShowMapContext);
  const { setHasScrolled, hasScrolled } = useMainView();

  return (
    <div className=" py-8">
      <Button
        className="beeping-button cursor-pointer fixed h-14 rounded-3xl z-10 bg-[#2a1d57] text-2xl top-[700px] left-[50%] transform translate(-50%, -50%)"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? "show list" : "show map"}
      </Button>
      <p className="font-medium mb-10  mx-6 text-slate-400 text-4xl">
        Dashboard
      </p>

      <div
        className={`mt-30 ms- left-0 ${
          hasScrolled
            ? "w-[80%] transition duration-1000 ease-in-out"
            : "w-[100%] transition duration-1000 ease-in-out"
        } fixed z-10 `}
      >
        <div className="h-[1px] bg-base-300 w-full"></div>
        <Slider />
      </div>
      <div className="">
        {showMap ? (
          <MyMap setHasScrolled={setHasScrolled} />
        ) : (
          <HouseCardGrid />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
