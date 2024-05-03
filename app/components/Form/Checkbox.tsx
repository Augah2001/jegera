import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react'
import { UseFormRegister } from 'react-hook-form';


interface Props {
    id: string;
    type: string;
    register: UseFormRegister<any>;
    placeholder?: string;
    label: string;
    errors: any;
  }

const Checkbox = ({ id, type, register, placeholder, label, errors }: Props) => {
  return (
    <div className="h-full mb-6 mx-4">
      <FormControl>
        <FormLabel  className="ps-2 text-base-content text-xl "
          style={{ fontSize: "18px" }}>
            {label}

        </FormLabel>
        <Input id= {id}
          type= {type}
          placeholder= {placeholder}
          {...register}/>
        </FormControl>  
        {errors && (
        <p className="text-red-600 mx-4 mt-1">{errors[id]?.message}</p>
      )}
    </div>
  )
}

export default Checkbox
