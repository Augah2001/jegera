"use client";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  type: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  label: string;
  errors: any;
}

const Input1 = ({ id, type, register, placeholder, label, errors }: Props) => {
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const { isDark } = useContext(ThemeContext);
  return (
    <div className="h-full mb-6 mx-4">
      <FormControl>
        <FormLabel
          className="ps-2 text-base-content text-xl "
          style={{ fontSize: "18px" }}
        >
          {label}
        </FormLabel>
        <Input
          width={"100%"}
          type={type}
          placeholder={placeholder}
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
        />
      </FormControl>
      {errors && (
        <p className="text-red-600 mx-4 mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default Input1;
