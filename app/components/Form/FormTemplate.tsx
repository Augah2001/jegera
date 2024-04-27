import React, { ReactNode } from "react";
import Button1 from "./Button1";
import Input1 from "./Input1";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select1 from "./Select";

interface InputProps {
  id: string;
  register: UseFormRegister<{ [key: string]: string }>;
  type: string;
  label: string;
}

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
    renderButton: RenderButton
  ) => ReactNode;
  FormSchema: z.ZodObject<any>;
}

type RenderSelect = (
  id: string,
  label: string,
  options: Array<{ value: string; label: string }>
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

  const renderSelect: RenderSelect = (id, label, options) => {
    return (
      <Select1 id={id} label={label} options={options} register={register} />
    );
  };

  return (
    <form className="rounded-xl" onSubmit={handleSubmit(onSubmit)}>
      {children(renderInput, renderSelect, renderButton)}
    </form>
  );
};

export default Form;
