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
import { ReactNode, useContext, useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { z } from "zod";
import { BiLocationPlus } from "react-icons/bi";
import { useFormContext } from "react-hook-form";
import { useModalContext } from "@chakra-ui/react";
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

const AddForm = () => {
  const [locations, setLocations] = useState<Location[]>([] as Location[]);
  const [uploadInputs, setUploadInputs] = useState([1]);
  const [publicId, setPublicId] = useState("");
  const {onOpen, isOpen} = useContext(FormModalContext)
  const [_, setHasScrolled] = useState(true)

  console.log(isOpen)

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
            
            <div className="mt-[70px] mx-auto  grid grid-cols-3 gap-4 ">
              <div className="flex">
                <div className="w-[75%]">
                  {renderSelect("location", "Location", locations)}
                </div>
                <div className="flex my-auto">
                  <BiLocationPlus className=" mt-[6px]  text-green-500" />
                  <h1 className=" text-green-500 cursor-pointer hover:text-green-600"
                      onClick={onOpen}
                  >
                    map
                  </h1>
                </div>
              </div>
              {renderInput(
                "houseNumber",
                "number",
                "House Number (Positive number)"
              )}
              {renderInput("street", "text", "Street")}
              {renderInput("description", "textarea", "Description (Optional)")}
              {renderInput("price", "number", "Price")}
              {renderInput("minutes", "number", "Minutes to UZ")}
              {renderInput("capacity", "number", "Capacity")}
              {renderInput("occupied", "number", "slots remaining (vasara)")}
              {renderInput("perRoom", "number", "People per room")}
              {renderSelect("gender", "Gender", [
                { id: "male", name: "Male" },
                { id: "female", name: "Female" },
                { id: "both", name: "Both" },
              ])}
              {renderInput("curfew", "number", "Curfew Time (Optional)")}

              {renderInput(
                "backgroundImage",
                "text",
                "Background Image URL (Optional)"
              )}

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
          </>
        );
      }}
    </Form>
  );
};

export default AddForm;
