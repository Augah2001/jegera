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
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
  Stove: z.boolean().optional(),
  Fridge: z.boolean().optional(),
  separate_kitchen: z.boolean().optional(),
  curfew: z.boolean().optional(),
  visitors: z.boolean().optional(),
  Shelves: z.boolean().optional(),
  Water_tank: z.boolean().optional(),
  maid: z.boolean().optional(),
  gas_stove: z.boolean().optional(),
  gyser: z.boolean().optional(),
  swimming_pool: z.boolean().optional(),
  beds: z.boolean().optional(),
  security: z.boolean().optional(),
});

interface Location {
  id: number;
  name: string;
}

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;

  prevStep: () => void;
  houseData: any;
  setHouseData: any;
  nextStep: ()=> void
}

const AddForm = ({ prevStep, setHouseData, houseData, nextStep }: Props) => {
  const { onClose } = useContext(FormModalContext);
  


  const handleSubmit = (data: any) => {
  
    

    const myServices: Service[] = [];
   
    Object.keys(data).forEach((itemKey) => {
      if (data[itemKey] !== false) {
        const service = {
          name: itemKey,
        };

        myServices.push(service);
      }
    });

    const newHouseData = {
      ...houseData,
      services: myServices,
    };
    console.log(newHouseData)
    setHouseData(newHouseData)
    nextStep()
    // apiClient
    //   .post<House>("/houses", newHouseData)
    //   .then((res) => {
    //     console.log(res.data);
    //     setHouseData(res.data);
    //     onClose()
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={handleSubmit} FormSchema={amenitySchema}>
      {(
        _: RenderInput,
        __: RenderSelect,
        renderCheckbox: RenderCheckbox,
        
      ) => {
        return (
          <>
          <div className="flex justify-between mt-8">
        {
          <Button
            bg="yellow.400"
            color="white"
            marginX={3}
            onClick={prevStep}
            _hover={{ opacity: 0.8 }}
          >
            Back
          </Button>
        }
        {
          <Button
            bg="green.500"
            color="white"
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            Next
          </Button>
        }
      </div>
            <div className=" rounded-md">
              <div className="mt-[70px] mx-auto  grid grid-cols-3 gap-3 pt-4 ">
                {renderCheckbox("wifi", "Wifi")}
                {renderCheckbox("meals", "Meals")}
                {renderCheckbox("backupPower", "Backup Power")}
                {renderCheckbox("Stove", "Stove")}
                {renderCheckbox("Fridge", "Fridge")}
                {renderCheckbox("separate_kitchen", "Separate Kitchen")}
                {renderCheckbox("curfew", "Curfew")}
                {renderCheckbox("visitors", "Visitors Allowed")}
                {renderCheckbox("Shelves", "Shelves")}
                {renderCheckbox("Water_tank", "Water Tank")}
                {renderCheckbox("maid", "Maid")}
                {renderCheckbox("gas_stove", "Gas Stove")}
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
