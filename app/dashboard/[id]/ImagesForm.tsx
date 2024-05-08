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
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>,
  
  nextStep: ()=> void
  prevStep: ()=> void
}

const AddForm = ({nextStep, currentStep, prevStep }: Props) => {

  const [uploadInputs, setUploadInputs] = useState([1]);
  const [publicId, setPublicId] = useState("");
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
          {<Button onClick={nextStep}>Next</Button>}
          {<Button onClick={prevStep}>Back</Button>}
          <div className="shadow-lg min-h-[500px] py-10">
            <div className="flex justify-center">{renderUpload(`background Image`, publicId, setPublicId)}</div>
            <div className="h-[1px] bg-base-300 w-full"></div>
            <div className="mt-[70px] mx-auto  grid grid-cols-2 gap-4  ">
              {uploadInputs.map((upload) =>
                renderUpload(`display image ${upload}`, publicId, setPublicId)
              )}
              {
                <div className="flex">
                  <BiPlusCircle
                    className="font-normal
                        active:opacity-30 
                        my-auto
                        hover:text-purple-600 text-4xl 
                        text-slate-400"
                    onClick={() =>
                      setUploadInputs([
                        ...uploadInputs,
                        uploadInputs.length + 1,
                      ])
                    }
                  />{" "}
                  <p className="text-slate-500 my-auto ms-3">Add image</p>
                </div>
              }
            </div>
          </div>
          </>
        );
      }}
    </Form>
  );
};

export default AddForm;
