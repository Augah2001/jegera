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

export const houseSchema = z.object({
  
});

interface Location {
  id: number;
  name: string;
}

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;

  nextStep: () => void;
  prevStep: () => void;
  houseData: any;
  setHouseData: any;
}

const ImagesForm = ({
  nextStep,
  prevStep,
  setHouseData,
  houseData,
}: Props) => {
  const [uploadInputs, setUploadInputs] = useState([1]);
  const [publicId, setPublicId] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const onUpload = (publicId: string) => {
    setImages([...images, publicId]);

    console.log(publicId, images);
  };

  const handleSubmit = (data: any) => {

    const newData = {
      ...houseData,
      images,
      backgroundImage,
    };
    console.log(newData);
    setHouseData(newData);
    console.log(houseData)
    nextStep()
  };

  return (
    <Form onSubmit={handleSubmit} FormSchema={houseSchema}>
      {(
        renderInput: RenderInput,
        renderSelect: RenderSelect,
        renderCheckbox: RenderCheckbox,
        renderUpload: RenderUpload,
        renderButton: RenderButton
      ) => {
        return (
          <>
            <div className="flex justify-end p-4">
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
            <div className="shadow-lg min-h-[500px] py-10">
              <div className="flex justify-center">
                {renderUpload(
                  `background Image`,
                  publicId,
                  setPublicId,
                  (publicId) => {
                    setBackgroundImage(publicId);
                  }
                )}
              </div>
              <div className="h-[1px] bg-base-300 w-full"></div>
              <div className="mt-[70px] mx-auto  grid grid-cols-2 gap-4  ">
                {uploadInputs.map((upload, index) => (
                  <div key={index}>
                    {renderUpload(
                      `display image ${upload}`,
                      publicId,
                      setPublicId,
                      onUpload,
                      index
                    )}
                  </div>
                ))}
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

export default ImagesForm;
