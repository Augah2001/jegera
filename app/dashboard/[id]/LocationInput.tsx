import { FormModalContext } from "@/app/contexts/FormModalContext";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useContext } from "react";
import { BiLocationPlus } from "react-icons/bi";

const LocationInput = () => {
  const { isDark } = useContext(ThemeContext);
  const {onOpen} = useContext(FormModalContext)
  return (
    <div className="flex my-auto">
      <div className="h-full mb-4 flex mx-4">
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
              />
              <div className="flex items-center">
            <BiLocationPlus className=" mt-[6px] text-green-500" />
                  <h1
            className=" text-green-500 cursor-pointer hover:text-green-600"
            onClick={onOpen}
                  >
            map
                  </h1>
        </div>
          </div>
        </FormControl>
        {/* {errors && (
          <p className="text-red-600 mx-4 mt-1 font-medium">
            {errors[id]?.message}
          </p>
        )} */}
        
      </div>
      
    </div>
  );
};

export default LocationInput;
