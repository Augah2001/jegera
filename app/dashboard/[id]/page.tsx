"use client";
import { ShowMapContext } from "@/app/contexts/ShowMapContext";
import HouseCardGrid from "@/app/HomeComponents/HouseCardGrid";
import Mainview from "@/app/HomeComponents/Mainview";
import MyMap from "@/app/HomeComponents/Map";
import Slider from "@/app/HomeComponents/Slider";
import useLocations from "@/app/hooks/useLocations";
import useMainView from "@/app/hooks/useMainView";
import { Button } from "@radix-ui/themes";
import { BiPlusCircle } from "react-icons/bi";
import Modal from '../../components/Modal'

import React, { useContext, useState } from "react";

import { FormModalContext } from "@/app/contexts/FormModalContext";
import SignUpForm from "@/app/HomeComponents/SignInForm";
import AddForm from "./AddForm";
import Link from "next/link";
import { HousesContext } from "@/app/contexts/HouseContext";
import { userAgent } from "next/server";
import { UserContext } from "@/app/contexts/UserContext";
import ChartsInterface from "@/app/HomeComponents/chartsInterface";
import CapacityChart from "../CapacityChart";

const Dashboard = () => {
  const { showMap, setShowMap } = useContext(ShowMapContext);
  const { setHasScrolled, hasScrolled } = useMainView();
  const { onOpen, isOpen } = useContext(FormModalContext);
  const { user } = useContext(UserContext);
  console.log(isOpen)
  const [showCharts, setShowCharts] = useState(true)

  const {houses} = useContext(HousesContext)
  const filteredHouses = houses?.filter(house => house.ownerId === user?.id)
  console.log(filteredHouses)

  return (
    <div className=" py-8">

      {showCharts && <ChartsInterface houses={filteredHouses} setShowCharts = {setShowCharts}/> }
     
      {
      }
      <Button
        className="beeping-button cursor-pointer fixed h-14 rounded-3xl z-10 bg-[#2a1d57] text-2xl top-[700px] left-[50%] transform translate(-50%, -50%)"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? "show list" : "show map"}
      </Button>
      <div className="flex justify-between">
        <p className="font-medium mb-10  mx-6 text-slate-400 text-4xl">
          Dashboard
        </p>
        <Link href= "/dashboard/1/add">
          <BiPlusCircle
           className="font-normal
           active:opacity-30
           hover:text-purple-600 text-4xl me-6
           text-slate-400"
           
           />
        </Link>
      </div>

      <div
        className={`mt-30 ms- left-0 ${
          hasScrolled
            ? "w-[80%] transition duration-1000 ease-in-out"
            : "w-[100%] transition duration-1000 ease-in-out"
        } fixed z-10 `}
      >
        <div className="h-[1px] bg-base-300 w-full"></div>
        <Slider  hasScrolled= {hasScrolled}/>
      </div>
      <div className="">
        {showMap ? (
          <MyMap setHasScrolled={setHasScrolled} />
        ) : (
          <HouseCardGrid houses={filteredHouses}/>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
