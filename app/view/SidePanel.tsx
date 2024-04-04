import { List, ListItem, Button, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import Main from "./Main";
import { ThemeContext } from "../contexts/ThemeContext";


const SidePanel = () => {

    
  const amenities = [
    "gas",
    "wifi",
    "beds",
    "gyser",
    "stove",
    "solar",
    "meals",
    "curfew",
    " 3/room",
  ];
  return (
    <div className="w-[23%] justify-center flex border-e-2">
      <div className="top-[25%] ">
        <div className="flex mb-4">
          <h1 className="mt-14 text-2xl text-pink-700 ">Amenities</h1>
        </div>

        <div className="mx-auto  grid grid-cols-3">
          {amenities.map((amenity, index) => (
            <Main text={amenity} />
          ))}
        </div>
        <div className="flex justify-center">
          <div className="me-3">
              <h1 className="mt-14 text-2xl mb-3 text-pink-700 mx-auto">more details</h1>
              <div className="flex">
                  <p className={` text-base-content "mt-3 me-4"`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur
                  </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
