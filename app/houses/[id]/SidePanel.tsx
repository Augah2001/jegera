import { List, ListItem, Button, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import Main from "./Main";
import { House } from "@/app/hooks/useHouses";

interface Props {
 
  house: House | undefined
}

interface Amenity {
  name: string
}

const SidePanel = ({ house}: Props) => {

  console.log(house)
  
  return (
    <div className="w-[23%]  flex border-e-2">
      <div className="top-[25%] ">
        <div className="flex mb-4">
          <h1 className="mt-14 text-2xl text-pink-700 ">Amenities</h1>
        </div>

        <div className="">
          {house?.services?.map((amenity, index) => (
            <Main key={index} text={amenity.name} />
          ))}
        </div>
        <div className="flex justify-center">
          <div className="me-3">
            <h1 className="mt-14 text-2xl mb-3 text-pink-700 mx-auto">
              more details
            </h1>
            <div className="flex">
              <p className={` text-base-content "mt-3 me-4"`}>
                {house?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
