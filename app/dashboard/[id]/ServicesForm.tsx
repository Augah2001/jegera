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

export const houseSchema = z.object({
  locationId: z.number().positive(), // Ensure positive location ID
  houseNumber: z.number().positive(), // Enforce positive house number
  street: z.string().optional(), // Enforce non-empty street
  description: z.string().optional(), // Allow optional description
  price: z.number().nonnegative(), // Allow optional price
  minutes: z.number(), // Allow optional minutes (may need adjustment based on usage)
  capacity: z.number().positive().optional(), // Allow optional capacity
  occupied: z.number(), // Allow optional occupied status
  perRoom: z.number().positive().optional(), // Allow optional perRoom value
  gender: z.enum(["male", "female", "both"]).optional(), // Allow optional gender
  images: z.array(z.string()).optional(), // Allow optional array of image URLs
  backgroundImage: z.string().optional(), // Allow optional background image URL
  curfew: z.number().positive().optional(), // Allow optional curfew time
  ownerId: z.number().positive(), // Ensure positive owner ID
});

interface Location {
  id: number;
  name: string;
  
 
}

interface Props {
  currentStep: number,
  setCurrentStep: Dispatch<SetStateAction<number>>,
  
  prevStep: ()=> void
}

const AddForm = ({currentStep, prevStep}: Props ) => {
  const [locations, setLocations] = useState<Location[]>([] as Location[]);
  const [uploadInputs, setUploadInputs] = useState([1]);
  const [publicId, setPublicId] = useState("");
  const { onOpen, isOpen } = useContext(FormModalContext);
  const [_, setHasScrolled] = useState(true);

  console.log(isOpen);

  useEffect(() => {
    apiClient
      .get<Location[]>("/locations")
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Form onSubmit={() => {}} FormSchema={houseSchema}>
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
          {<Button onClick={prevStep}>Prev</Button>}
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
