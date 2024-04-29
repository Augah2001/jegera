"use client";

import React, { ReactNode, useState } from "react";

import { z } from "zod";

import Form from "../components/Form/FormTemplate";
import apiClient from "../configs/apiClient";
import {jwtDecode} from 'jwt-decode'
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

type RenderInput = (id: string, type: string, label: string) => ReactNode;

type RenderButton = (label: string) => ReactNode;

type RenderSelect = (
  id: string,
  label: string,
  options: Array<{ value: string; label: string }>
) => ReactNode;

const SignUpForm = () => {

  const toast = useToast({
    position: "top",
    title: "signup successful",
    containerStyle: {
      width: "800px",
      maxWidth: "500px",
      color: "pink.600",
      backgroundColor: "pink.600",
    },
  });

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
      accountType: z.enum(["tenant", "landlord"]),
      gender: z.string(),
      authorizationKey: z.string().min(1, "Authorization Key is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const initialValues = useState<z.infer<typeof FormSchema>>();

  const handleSignup = async (data: z.infer<typeof FormSchema>) => {

    delete data['confirmPassword']
    console.log(data)
    try {
      if (data.accountType === "tenant") {
        // Remove authorization_key for tenant signup
        delete data["authorizationKey"];
        const response = await apiClient.post("/users", data);
        console.log(response.data)
        toast({title: "signup successful"});

        // localStorage.setItem("token", response.headers["x-auth-token"]);
        // const user: z.infer<typeof FormSchema> = jwtDecode(response.headers["x-auth-token"]);
      } else {
        const authResponse = await apiClient.post("/auth", {
          authorization_key: data.authorization_key,
        });
        if (!authResponse.data) {
          throw new Error("Invalid authorization key");
        }

        const userResponse = await apiClient.post("/users", data);
        console.log(userResponse.data)
        toast();

        // localStorage.setItem("token", userResponse.headers["x-auth-token"]);
        // const user: z.infer<typeof FormSchema>  = jwtDecode(userResponse.headers["x-auth-token"]);

        
      }
    } catch (error:any) {
      toast({ title: error.message || "Signup failed", position: "top" });
      console.log(error)
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSignup}
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

            {renderInput("confirmPassword", "text", "Confirm Password")}
            {renderSelect("gender", "Gender", [
              { value: "male", label: "male" },
              { value: "female", label: "female" },
            ])}
            {renderSelect("accountType", "Account Type", [
              { value: "tenant", label: "tenant" },
              { value: "landlord", label: "landlord" },
            ])}
            {renderInput("authorizationKey", "text", "Authorization Key")}

            {renderButton("sign up")}
          </>
        );
      }}
    </Form>
  );
};

export default SignUpForm;
