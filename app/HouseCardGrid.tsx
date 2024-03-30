import { SimpleGrid, Box, grid } from "@chakra-ui/react";

import React from "react";
import HouseCard from "./HouseCard";

const HouseCardGrid = () => {
  const houses = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="flex">
      <div className="mt-[70px] px-8 grid grid-cols-2 gap-12 ">
        {houses.map(house  => <HouseCard key={house}/>)}
      </div>
    </div>
  );
};

export default HouseCardGrid;
