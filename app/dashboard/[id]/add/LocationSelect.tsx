"use client";
import { FormModalContext } from "@/app/contexts/FormModalContext";
import { mapLocationContext } from "@/app/contexts/mapLocationContext";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import useLocations, { Location } from "@/app/hooks/useLocations";
import { Select, FormControl, FormLabel, Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { BiLocationPlus, BiSolidTrash } from "react-icons/bi";

interface Props {
  id: string;
  label: string;
  setLocation: Dispatch<SetStateAction<Location | undefined>>;
  location: Location | undefined;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const LocationSelect = ({
  id,
  label,
  setLocation,
  error,
  setError,
  location,
}: Props) => {
  const { isDark } = useContext(ThemeContext);
  const path = usePathname()
  const { onOpen } = useContext(FormModalContext);
  const { data: locations } = useLocations();

  const handleInputChange = (value: number) => {
    const location = locations.find((location) => location.id === value);
    setLocation(location);
    setError("");
  };

  return (
    <div>
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
              <div className="flex">
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
                { path !== '/predict' && <div className="flex my-auto min-[100%]">
                    <BiLocationPlus className=" mt-[6px]  text-green-500" />
                  <h1
                    className=" text-green-500 cursor-pointer hover:text-green-600"
                    onClick={onOpen}
                  >
                    map
                  </h1>
                </div>}
              </div>
            </FormControl>
            {/* <p className="text-red-600 mx-4 mt-1 font-medium">{errors[id]?.message}</p> */}
          </Box>
        </div>
      </div>
      {typeof location == "object" && Object.keys(location).length != 0 && (
        <div className="flex">
          <p className="text-green-500 font-medium top-0 ms-6">
            {location?.name}
          </p>
          <BiSolidTrash
            className={`text-red-600 ms-5 hover:opacity-60 active:opacity-100
                   my-auto text-md`}
            onClick={() => setLocation({} as Location)}
          />
        </div>
      )}
      {error && <p className="text-red-600 mx-4 mt-1 font-medium">{error}</p>}
    </div>
  );
};

export default LocationSelect;
