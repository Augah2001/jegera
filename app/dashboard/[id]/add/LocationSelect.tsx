"use client";
import { FormModalContext } from "@/app/contexts/FormModalContext";
import { mapLocationContext } from "@/app/contexts/mapLocationContext";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import useLocations, { Location } from "@/app/hooks/useLocations";
import { Select, FormControl, FormLabel, Box } from "@chakra-ui/react";

import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";

interface Props {
  id: string;
  label: string;
  setLocation: Dispatch<SetStateAction<Location | undefined>>
}

const LocationSelect = ({ id, label, setLocation }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const [error, setError] = useState("");
  const { onOpen } = useContext(FormModalContext);
  const { data: locations } = useLocations();

  const handleInputChange = (value: number) => {
    const location = locations.find((location) => (location.id = value));
    setLocation(location);
  };

  return (
    <div className="flex">
      <div className="w-[75%]">
        <Box className="h-full mb-3 ms-4">
          <FormControl>
            <FormLabel
              className="ps-2 text-base-content text-xl"
              style={{ fontSize: "18px" }}
            >
              {label}
            </FormLabel>
            <Select
              height={12}
              id={id}
              focusBorderColor="purple.500"
              borderRadius="6px"
              _focus={{
                borderWidth: "1.5px",
                borderStyle: "solid",
                bg: isDark ? "#302E5E" : "#ECECEC",
              }}
              _hover={{ borderWidth: "1.5px", borderStyle: "solid" }}
              marginX="auto"
              variant="outline"
              borderStyle={"solid"}
              borderWidth={"2px"}
              borderColor="purple.500"
              className="text-slate-400"
              onChange={(e) => handleInputChange(parseInt(e.target.value))}
            >
              <option
                className="text-base-content"
                value=""
              >{`select ${label}`}</option>
              {locations.map((location, index) => (
                <option key={index} value={location.id}>
                  {location.name}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* <p className="text-red-600 mx-4 mt-1 font-medium">{errors[id]?.message}</p> */}
        </Box>
      </div>
      <div className="flex my-auto">
        <BiLocationPlus className=" mt-[6px]  text-green-500" />
        <h1
          className=" text-green-500 cursor-pointer hover:text-green-600"
          onClick={onOpen}
        >
          map
        </h1>
      </div>
    </div>
  );
};

export default LocationSelect;
