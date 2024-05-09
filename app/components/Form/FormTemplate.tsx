import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Button1 from "./Button";
import Input1 from "./Input";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select1 from "./Select";
import Checkbox from "./Checkbox";
import FileUpload from "./FileUpload";


export type RenderInput = (
  id: string,

  type: string,
  label: string
) => ReactNode;

export type RenderCheckbox = (
  id: string,


  label: string
) => ReactNode;

export type RenderButton = (label: string) => ReactNode;

interface FormProps<T> {
  onSubmit: (data: SubmitHandler<any>) => void; // Enforce the expected data type for the submit function
  children: (
    renderInput: RenderInput,
    renderSelect: RenderSelect,
    renderCheckbox: RenderCheckbox,
    renderUpload: RenderUpload,
    renderButton: RenderButton,
    handleInputChange?: (event: {
      target: {
        value: any;
      };
    }) => void
  ) => ReactNode;
  FormSchema: z.ZodObject<any>;
}

export type RenderSelect = (
  id: string,
  label: string,
  options: Array<{ id: string | number; name: string }>,
  handleInputChange?: (event: {
    target: {
      value: any;
    };
  }) => void
) => ReactNode;

export type RenderUpload = (
  label: string,
  publicId: string,
  setPublicId: React.Dispatch<React.SetStateAction<string>>,
  key?: any,
  imageSupplied?: boolean,
  setImageSupplied?: React.Dispatch<React.SetStateAction<boolean>>,
  
) => ReactNode;

const Form = ({
  children,

  onSubmit,
  FormSchema,
}: FormProps<any>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(FormSchema),
  });

  const renderButton: RenderButton = (label) => {
    return <Button1 label="sign in" />;
  };
  const renderInput: RenderInput = (id, type, label) => {
    return (
      <Input1
        id={id}
        register={register}
        errors={errors}
        label={label}
        type={type}
      />
    );
  };

  const renderSelect: RenderSelect = (
    id,
    label,
    options,
    handleInputChange
  ) => {
    return (
      <Select1
        id={id}
        label={label}
        options={options}
        register={register}
        handleInputChange={handleInputChange}
        errors={errors}
      />
    );
  };

  const renderCheckbox: RenderCheckbox = (
    id: string,
    label: string
  ) => {
    return (
      <Checkbox
        id={id}
        register={register}
        errors={errors}
        label={label}
        
      />
    );
  };

  const renderUpload: RenderUpload = (
    label,
    publicId,
    setPublicId,
    key,
    imageSupplied, setImageSupplied, 
  ) => {
    return (
      <FileUpload
        label={label}
        publicId={publicId}
        setPublicId={setPublicId}
        key={key}
        imageSupplied={imageSupplied}
        setImageSupplied={setImageSupplied}
        
      />
    );
  };

  return (
    <form className="rounded-xl" onSubmit={handleSubmit(onSubmit)}>
      {children(
        renderInput,
        renderSelect,
        renderCheckbox,
        renderUpload,
        renderButton
      )}
    </form>
  );
};

export default Form;
