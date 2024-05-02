import { SimpleGrid, Box, grid } from "@chakra-ui/react";

import React from "react";
import HouseCard from "./HouseCard";
import useHouses from "../hooks/useHouses";

const HouseCardGrid = () => {
  const {data: houses, error, isLoading} = useHouses()
  return (
    <div className="flex ">
      <div className="mt-[70px] mx-auto px-8 grid grid-cols-2 gap-24 ">
        {houses.map(house  => <HouseCard house={house} key={house.id}/>)}
      </div>
    </div>
  );
};

export default HouseCardGrid;
