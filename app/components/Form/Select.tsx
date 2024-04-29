"use client";
import { Select, FormControl, FormLabel, Box } from "@chakra-ui/react";

import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

interface Props {
  id: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  register: (...args: any) => any; // Update to match your React Hook Form setup
}

const Select1 = ({ id, label, options, register }: Props) => {

  console.log(id)
  const { isDark } = useContext(ThemeContext);
  return (
    <Box className="h-full mb-6 mx-4">
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
          className="text-base-content"
          {...register(id)}
        >
          <option  value=''>{''}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Select1;
