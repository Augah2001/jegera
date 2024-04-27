"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import Input1 from "../../ui/Input1";
import Button1 from "../../ui/Button1";
import Link from "next/link";
import Form from "./Form";

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
  const FormSchema: any = z
    .object({
      email: z.string().min(1, "Email is required").email("Invalid email"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(4, "Password must have more than 4 characters"),
      lastName: z.string().min(1, "Last Name is required"),
      firstName: z.string().min(1, "First Name is required"),
      confirmPassword: z.string().min(1, "Please confirm password"),
      role: z.enum(["tenant", "landlord"]).optional(),
      authorizationKey: z.string().min(1, "Authorization Key is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const initialValues = useState<z.infer<typeof FormSchema>>();

  return (
    <Form
      initialValues={initialValues}
      onSubmit={(data) => console.log(data)}
      FormSchema={FormSchema}
    >
      {(
        renderInput: RenderInput,
        renderSelect: RenderSelect,
        renderButton: RenderButton
      ) => {
        return (
          <>
            <div className="flex">
              {renderInput("firstName", "text", "First Name")}
              {renderInput("lastName", "text", "Last Name")}
            </div>
            {renderInput("email", "text", "Email")}
            {renderInput("password", "text", "Password")}

            {renderInput(
              "confirmPassword",

              "text",
              "Confirm Password"
            )}
            {renderSelect("gender", "Gender", [
              { value: "male", label: "male" },
              { value: "female", label: "female" },
            ])}
            {renderSelect("account", "Account Type", [
              { value: "tenant", label: "tenant" },
              { value: "landlord", label: "landlord" },
            ])}
            {renderInput(
              "authorizationKey",

              "text",
              "Authorization Key"
            )}

            {renderButton("sign up")}
          </>
        );
      }}
    </Form>
  );
};

export default SignUpForm;
