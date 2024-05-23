import { SimpleGrid, Box, grid } from "@chakra-ui/react";

import React, { useContext } from "react";
import HouseCard from "./HouseCard";
import useHouses from "../hooks/useHouses";
import { HousesContext } from "../contexts/HouseContext";
import { useResponsive } from "../hooks/useResponsive";

const HouseCardGrid = () => {
  const {houses} = useContext(HousesContext)

  const {isSmallDevice} =useResponsive()
  return (
    <div className="flex ">
      <div className={`${isSmallDevice? "mt-[40px]": "mt-[70px]"} mx-auto px-8 grid ${!isSmallDevice? "grid-cols-2": "grid-cols-1"} gap-10 `}>
        {houses?.map(house  => <HouseCard house={house} key={house.id}/>)}
      </div>
    </div>
  );
};

export default HouseCardGrid;
