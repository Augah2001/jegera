"use client";
import { Button, FormLabel, Input, Select } from "@chakra-ui/react";
import { FieldErrors, FieldValues, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import apiClient from "../configs/apiClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTable from "./AuthTable";
import useAuth from "../hooks/useAuth";
import AuthOwnerPage from "./AuthOwnerPage";
import data from "../mapbox-gl-directions/src/reducers";
import { useRouter } from "next/navigation";
import { UserContext } from "../contexts/UserContext";
import P from "../fobbiden/page";

export interface Auth {
  fullName: string;
  authorizationKey: string;
}

const fullNameSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter a name"),
});



const Page = () => {
  const [route, setRoute] = useState('/auth')
  const [deleteFlag, setDeleteFlag] = useState(0)
  const {onSubmit, handleSubmit, errors, register, token, data} = useAuth<Auth>(fullNameSchema, route,deleteFlag )
  

  const router = useRouter()
  const {user} = useContext(UserContext)

  if (!user || user?.accountType !== 'authorizer') {
    
    return <P/>
  }
  
 
  

  return (
    <div className="flex justify-center w-full mt-16" >
      <div>
        <Select onChange={(e)=> {
          setRoute(e.currentTarget.value)
          }}>
          <option value="/auth">House Tokens</option>
          <option value="houseAuth">User Tokens</option>
        </Select>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
           <AuthOwnerPage setDeleteFlag = {setDeleteFlag} route= {route} data={data} errors={errors} register={register} token={token}/>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
