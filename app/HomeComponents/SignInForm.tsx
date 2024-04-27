"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useState } from "react";
import { useForm} from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import Form from "../components/Form/FormTemplate";

type RenderInput = (
  id: string,

  type: string,
  label: string
) => ReactNode;

type RenderButton = (label: string) => ReactNode;

type RenderSelect = (
  id: string,
  label: string,
  options: Array<{ value: string; label: string }>
) => ReactNode;

const SignUpForm = () => {
  const FormSchema = z.object({
    email: z.string().min(1, "email is required").email("invalid email"),
    password: z
      .string()
      .min(1, "password is required")
      .min(4, "password must have more than 4 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const initialValues = useState<z.infer<typeof FormSchema>>({
    email: "",
    password: "",
  });

  return (
    <Form
      
      FormSchema={FormSchema}
      onSubmit={(data) => {
        console.log(data);
      }}
      initialValues={initialValues}
    >
      {(
        renderInput: RenderInput,
        renderSelect: RenderSelect,
        renderButton: RenderButton
      ) => {
        return (
          <>
            {renderInput("email", "text", "Email")}
            {renderInput("password", "password", "Password")}
            {renderSelect("gender", "Gender", [
              { value: "male", label: "male" },
              { value: "female", label: "female" },
            ])}
            <Link href="/signup" className="mx-4 text-pink-700">
              forgot password
            </Link>
            {renderButton("sign in")}
          </>
        );
      }}
    </Form>
  );
};

export default SignUpForm;
