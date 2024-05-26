import { FormModalContext } from "@/app/contexts/FormModalContext";
import { GetCoordinatesContext } from "@/app/contexts/GetCoordinatesContext";
import { HouseCoordinatesContext } from "@/app/contexts/HouseCoordinatesContext";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { BiLocationPlus, BiSolidTrash } from "react-icons/bi";

const LocationInput = ({error}: {error: string}) => {
  const { isDark } = useContext(ThemeContext);
  const { onOpen } = useContext(FormModalContext);
  const { houseCoordinates, setHouseCoordinates } = useContext(HouseCoordinatesContext);
  const { setGetCoordinates } = useContext(
    GetCoordinatesContext
  );

  return (
    <div className="">
      <div >
        <div className="h-full mb-3 flex mx-4">
            <FormControl>
              <FormLabel
                className="ps-2 text-base-content text-xl "
                style={{ fontSize: "18px" }}
              >
                Coordinates
              </FormLabel>
              <div className="flex">
                <Input
                  disabled={true}
                  width={"100%"}
                  type="text"
                  placeholder="Press map"
                  height={12}
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
                  className="text-base-content bg-base-100"
                  value={houseCoordinates.length>0?`${houseCoordinates[0].toString().slice(0,5)}.., ${houseCoordinates[1].toString().slice(0,5)}..`: ''}
                />
                <div className="flex items-center left-0">
                  <BiLocationPlus className=" mt-[6px] text-green-500" />
                  <h1
                    className=" text-green-500 cursor-pointer hover:text-green-600"
                    onClick={() => {
                      onOpen();
                      setGetCoordinates(true);
                    }}
                  >
                    map
                  </h1>
                </div>
              </div>
              {houseCoordinates.length!==0 && <div className="flex mt-3 left-0">
              <p className="text-green-500 font-medium ms-6">
                {`${houseCoordinates[0].toString().slice(0,5)}.., ${houseCoordinates[1].toString().slice(0,5)}..`}
              </p>
              <BiSolidTrash
                className={`text-red-600 ms-5 hover:opacity-60 active:opacity-100
                       my-auto text-md`}
                onClick={() => setHouseCoordinates([])}
              />
            </div>}
            </FormControl>
        </div>
        {error && <p className="text-red-600 mx-4 mt-3 font-medium">{error}</p>}
      </div>
     
     
    </div>
  );
};

export default LocationInput;
