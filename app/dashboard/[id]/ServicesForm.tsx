"use client";

import Form, {
  RenderButton,
  RenderCheckbox,
  RenderInput,
  RenderSelect,
  RenderUpload,
} from "@/app/components/Form/FormTemplate";
import apiClient from "@/app/configs/apiClient";

import axios from "axios";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { z } from "zod";
import { BiLocationPlus } from "react-icons/bi";
import { useFormContext } from "react-hook-form";
import { Button, useModalContext } from "@chakra-ui/react";
import { FormModalContext } from "@/app/contexts/FormModalContext";
import Modal from "@/app/components/Modal";
import MyMap from "@/app/HomeComponents/Map";
import { steps } from "framer-motion";
import { Step } from "./add/Stepper";
import useServices, { Service } from "@/app/hooks/useServices";
import { House } from "@/app/hooks/useHouses";

export const amenitySchema = z.object({
  wifi: z.boolean().optional(),
  meals: z.boolean().optional(),
  backupPower: z.boolean().optional(),
  stove: z.boolean().optional(),
  fridge: z.boolean().optional(),
  separateKitchen: z.boolean().optional(),
  curfew: z.boolean().optional(),
  visitors: z.boolean().optional(),
  shelves: z.boolean().optional(),
  waterTank: z.boolean().optional(),
  maid: z.boolean().optional(),
  gasStove: z.boolean().optional(),
  gyser: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  beds: z.boolean().optional(),
  security: z.boolean().optional(),
});

interface Location {
  id: number;
  name: string;
  
 
}

interface Props {
  currentStep: number,
  setCurrentStep: Dispatch<SetStateAction<number>>,
  
  prevStep: ()=> void
  houseData: any;
  setHouseData: any;
}

const AddForm = ({currentStep, prevStep, setHouseData, houseData}: Props ) => {
  const [locations, setLocations] = useState<Location[]>([] as Location[]);
  const [uploadInputs, setUploadInputs] = useState([1]);
  const [publicId, setPublicId] = useState("");
  const { onOpen, isOpen } = useContext(FormModalContext);
  const [_, setHasScrolled] = useState(true);


  const handleSubmit = (data: any) => {


    const myServices: Service[] = []
  //   console.log('augah')
    Object.keys(data).forEach(itemKey => {

      if (data[itemKey] !== false){
        const service = {
          name: itemKey,
        }

        myServices.push(service)
      }

      
    }
    
    
  
  )

  const newHouseData = {
    ...houseData, services: myServices
  }
  console.log(newHouseData)
  apiClient.post<House>('/houses', newHouseData ).then(res=> {
    console.log(res.data)
    // setHouseData(res.data)
  }).catch(err=> console.log(err))
    
  }
 
  return (
    <Form onSubmit={handleSubmit} FormSchema={amenitySchema}>
      {(
        renderInput: RenderInput,
        renderSelect: RenderSelect,
        renderCheckbox: RenderCheckbox,
        renderUpload: RenderUpload,
        renderButton: RenderButton
      ) => {


        return (

          <>
          
          {<Button onClick={prevStep}>Prev</Button>}
          {<Button type="submit" >submit</Button>}
          <div className=" rounded-md">

            <div className="mt-[70px] mx-auto  grid grid-cols-3 gap-3 pt-4 ">
              {renderCheckbox("wifi", "Wifi")}
              {renderCheckbox("meals", "Meals")}
              {renderCheckbox("backupPower", "Backup Power")}
              {renderCheckbox("stove", "Stove")}
              {renderCheckbox("fridge", "Fridge")}
              {renderCheckbox("separateKitchen", "Separate Kitchen")}
              {renderCheckbox("curfew", "Curfew")}
              {renderCheckbox("visitors", "Visitors Allowed")}
              {renderCheckbox("shelves", "Shelves")}
              {renderCheckbox("waterTank", "Water Tank")}
              {renderCheckbox("maid", "Maid")}
              {renderCheckbox("gasStove", "Gas Stove")}
              {renderCheckbox("gyser", "Gyser (Water Heater)")}
              {renderCheckbox("swimmingPool", "Swimming Pool")}
              {renderCheckbox("beds", "Beds")}
              {renderCheckbox("security", "Security Features")}
                
            </div>
          </div>
          </>
        );
      }}
    </Form>
  );
};

export default AddForm;
