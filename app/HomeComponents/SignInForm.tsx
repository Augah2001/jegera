"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import Form, {
  RenderButton,
  RenderInput,
} from "../components/Form/FormTemplate";
import axios from "axios";

import { User } from "@prisma/client";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../contexts/UserContext";
import { FormModalContext } from "../contexts/FormModalContext";
import apiClient from "../configs/apiClient";

const SignUpForm = () => {
  const toast = useToast({
    position: "top",
    title: "signup successful",
   
  });

  const { onClose } = useContext(FormModalContext);

  const { setUser } = useContext(UserContext);
  const FormSchema = z.object({
    email: z.string().min(1, "email is required").email("invalid email"),
    password: z
      .string()
      .min(1, "password is required")
      .min(4, "password must have more than 4 characters"),
 
  });

  const onSubmit = (data: SubmitHandler<any>) => {

    console.log(data)
    apiClient
      .post<z.infer<typeof FormSchema>>("/login", data)
      .then((res) => {
        const jwt = res.headers["x-auth-token"];
        localStorage.setItem("token", jwt);
        const user: User = jwtDecode(jwt);
        setUser(user);
        console.log(user);
        onClose();
        toast({ title: "signup successful", colorScheme: "green" });
      }).catch((error => {
        toast({
          title: error.response.data.error
            ? error.response.data.error
            : "signup failed",
          position: "top",
          colorScheme: "red",
        });
        console.error(error);
      }));
  };

  return (
    <Form FormSchema={FormSchema} onSubmit={onSubmit}>
      {(renderInput, _, renderCheckbox, ___, renderButton) => {
        return (
          <>
            
            {renderInput("email", "text", "Email")}
            {renderInput("password", "password", "Password")}

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
