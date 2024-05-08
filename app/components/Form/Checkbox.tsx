import { FormControl, FormLabel, Checkbox as Chk } from '@chakra-ui/react';
import React from 'react'
import { UseFormRegister } from 'react-hook-form';


interface Props {
    id: string;
    register: UseFormRegister<any>;
    placeholder?: string;
    label: string;
    errors: any;
  }

const Checkbox = ({ id, register,  label, errors }: Props) => {
  return (
    <div className="h-full mb-6 mx-4 hover:bg-base-200 rounded-sm px-2">
      <FormControl display= 'flex'>
      <Chk {...register(id, { required: true })} size='lg' id={id} />
        <FormLabel  className="ps-2 text-base-content text-xl "
          style={{ fontSize: "18px" }}>
            {label}

        </FormLabel>

        </FormControl>  
        {errors && (
        <p className="text-red-600 mx-4 mt-1">{errors[id]?.message}</p>
      )}
    </div>
  )
}

export default Checkbox
