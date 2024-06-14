"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";

import { z } from "zod";

import Form, {
  RenderButton,
  RenderInput,
  RenderSelect,
  RenderUpload,
} from "../components/Form/FormTemplate";
import apiClient from "../configs/apiClient";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@chakra-ui/react";

import { UserContext, User } from "../contexts/UserContext";
import { FormModalContext } from "../contexts/FormModalContext";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

const FormSchema: any = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    lastName: z.string().min(1, "Last Name is required"),
    firstName: z.string().min(1, "First Name is required"),
    confirmPassword: z.string().min(1, "Please confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  

const SignUpForm = () => {
  const toast = useToast({
    position: "top",
    title: "signup successful",
    containerStyle: {
      width: "800px",
      maxWidth: "500px",
      color: "green",
      backgroundColor: "pink.green",
    },
  });

  const { setUser } = useContext(UserContext);

  const handleSignup = async (data: z.infer<typeof FormSchema>) => {
   
    delete data["confirmPassword"];


    console.log('augH')

    try {
   
     
      const response = await apiClient.post("/users", data);
       
      toast({ title: "signup successful", colorScheme: "green" });
  

      localStorage.setItem("token", response.headers["x-auth-token"]);
      const userLogged: User = jwtDecode(response.headers["x-auth-token"]);
      setUser(userLogged);
    } catch (error: any) {
      toast({
        title: error.response.data.error
          ? error.response.data.error
          : "signup failed",
        position: "top",
        colorScheme: "red",
      });
      console.error(error);
    }
  };



  return (
    <Form onSubmit={handleSignup} FormSchema={FormSchema}>
      {(
        renderInput: RenderInput,
        renderSelect: RenderSelect,
        _,
        renderUpload: RenderUpload,
        renderButton: RenderButton
      ) => {
        return (
          <>
            <div className="flex">
              {renderInput("firstName", "text", "First Name")}
              {renderInput("lastName", "text", "Last Name")}
            </div>
            {renderInput("email", "text", "Email")}
            {renderInput("password", "password", "Password")}
            {renderInput("confirmPassword", "password", "Confirm password")}
            {renderButton("sign up")}
            
          </>
        );
      }}
    </Form>
  );
};

export default SignUpForm;
