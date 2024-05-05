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
      .min(4, "Password must have more than 4 characters"),
    lastName: z.string().min(1, "Last Name is required"),
    firstName: z.string().min(1, "First Name is required"),
    confirmPassword: z.string().min(1, "Please confirm password"),
    accountType: z.enum(["tenant", "landlord"]),
    gender: z.string(),
    authorizationKey: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine(
    (data) => {
      if (data.accountType == "landlord" && !data.authorizationKey) {
        return false;
      } else return true;
    },
    { path: ["authorizationKey"], message: "please supply authorization key" }
  );

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
  const [publicId, setPublicId] = useState("");
  const [imageSupplied, setImageSupplied] = useState(true);

  const [isTenant, setIsTenant] = useState(false);

  const handleSignup = async (data: z.infer<typeof FormSchema>) => {

    if (publicId) {
      data['backgroundImage'] = publicId
    }
    delete data["confirmPassword"];

    try {
      if (data.accountType === "tenant") {
        // Remove authorization_key for tenant signup
        delete data["authorizationKey"];
        const response = await apiClient.post("/users", data);
        console.log(response.data);
        // console.log(response.headers);
        toast({ title: "signup successful", colorScheme: "green" });

        localStorage.setItem("token", response.headers["x-auth-token"]);
        const userLogged: User = jwtDecode(response.headers["x-auth-token"]);
        setUser(userLogged);
      } else {
        console.log(data);
        const authResponse = await apiClient.post("/auth", {
          authorizationKey: data.authorizationKey,
        });


        console.log(authResponse);
        if (!authResponse.data) {
          throw new Error("Invalid authorization key");
        }


        const response = await apiClient.post("/users", data);
        console.log(response.data);
        toast({ title: "signup successful", colorScheme: "green" });

        localStorage.setItem("token", response.headers["x-auth-token"]);
        const userLogged: User = jwtDecode(response.headers["x-auth-token"]);
        setUser(userLogged);
      }
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

  const handleInputChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    newValue == "tenant" ? setIsTenant(false) : setIsTenant(true);
    console.log(newValue);
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
            {renderInput("password", "text", "Password")}

            {renderInput("confirmPassword", "text", "Confirm Password")}
            {renderSelect("gender", "Gender", [
              { value: "male", label: "male" },
              { value: "female", label: "female" },
            ])}
            {renderUpload("background image (optional)", publicId, setPublicId)}
            
            {renderSelect(
              "accountType",
              "Account Type",
              [
                { value: "tenant", label: "tenant" },
                { value: "landlord", label: "landlord" },
              ],
              handleInputChange
            )}
            {isTenant && (
              <>
                {renderInput("authorizationKey", "text", "Authorization Key")}
              </>
            )}

            {renderButton("sign up")}
          </>
        );
      }}
    </Form>
  );
};

export default SignUpForm;
