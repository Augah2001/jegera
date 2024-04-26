import { Input } from "@chakra-ui/react";
import React from "react";

interface Props {
  id: string;
  type: string;
  register: () => { [key: string]: string };
  placeholder: string
}

const Input1 = ({ id, type, register, placeholder }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={id}></label>
      <Input  width={'100%'} type={type} placeholder={placeholder}
      //  {...register()}
        />
    </div>
  );
};

export default Input1;
