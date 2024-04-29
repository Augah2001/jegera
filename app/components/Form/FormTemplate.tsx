import React, { ReactNode, useState } from "react";
import Button1 from "./Button";
import Input1 from "./Input";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select1 from "./Select";

type RenderInput = (
  id: string,

  type: string,
  label: string
) => ReactNode;

type RenderButton = (label: string) => ReactNode;

interface FormProps<T> {
  initialValues: T; // Specify the type of initial values for the form
  onSubmit: (data: SubmitHandler<any>) => void; // Enforce the expected data type for the submit function
  children: (
    renderInput: RenderInput,
    renderSelect: RenderSelect,
    renderButton: RenderButton,
    handleInputChange?: (event: {
      target: {
        value: any;
      };
    }) => void
  ) => ReactNode;
  FormSchema: z.ZodObject<any>;
}

type RenderSelect = (
  id: string,
  label: string,
  options: Array<{ value: string; label: string }>,
  handleInputChange?: (event: {
    target: {
      value: any;
    };
  }) => void
) => ReactNode;

const Form = ({
  children,
  initialValues,
  onSubmit,
  FormSchema,
}: FormProps<any>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialValues,
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
      />
    );
  };

  return (
    <form className="rounded-xl" onSubmit={handleSubmit(onSubmit)}>
      {children(renderInput, renderSelect, renderButton)}
    </form>
  );
};

export default Form;
