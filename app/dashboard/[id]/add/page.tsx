"use client";
import React, { useContext, useEffect, useState } from "react";
import AddForm from "../AddForm";
import Modal from "@/app/components/Modal";
import { FormModalContext } from "@/app/contexts/FormModalContext";
import MyMap from "@/app/HomeComponents/Map";
import { mapLocationContext } from "@/app/contexts/mapLocationContext";
import { Button } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import ImagesForm from "../ImagesForm";
import ServicesForm from "../ServicesForm";
import StepperComponent from "./Stepper";
import MultiStepForm from "./MultiStepForm";
import { SelectErrorContext } from "@/app/contexts/SelectErrorContext";

const Page = () => {
  const [_, setHasScrolled] = useState(false);
  const {onClose} = useContext(FormModalContext)

  const { mapLocation, setMapLocation } = useContext(mapLocationContext);

  const handleSave = ()=> {
    setError('')
    onClose()
  }
  const handleDelete = ()=> {

    setMapLocation({})
    onClose()
  }

  const [error, setError] = useState('')
  

  return (
    <div className="flex justify-center w-[100%]">
      <Modal
        headerContent={<p>Select Location {"(use search)"}</p>}
        modalBody={
          <>
            {typeof mapLocation === 'object' && Object.keys(mapLocation).length !== 0 && (
              <div className=" w-full">
                <div>
                  <p className="text-slate-700  text-lg font-bold">
                    Verify location
                  </p>
                  {<p className="text-green-600 text-md font-bold">
                    {mapLocation.result?.place_name}
                  </p>}
                  <div className="flex my-2 ">
                    {" "}
                    <Button
                      bg="green.500"
                      className="me-4"
                      size={"sm"}
                      color="white"
                      _hover={{ opacity: 0.7 }}
                      onClick={handleSave}
                    >
                      save
                    </Button>
                    <Button
                      bg="red.500"
                      size={"sm"}
                      color="white"
                      _hover={{ opacity: 0.7 }}
                      onClick={handleDelete}
                    >
                      delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <MyMap
              setHasScrolled={setHasScrolled}
              options={{ marker: false, directions: false, search: true }}
            />
          </>
        }
      />

      <SelectErrorContext.Provider value={{error, setError}}>
        <div className="">
          <MultiStepForm/>
        </div>
      </SelectErrorContext.Provider>
    </div>
  );
};

export default Page;
