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

import { number, z } from "zod";

import { Button, useModalContext } from "@chakra-ui/react";

import useLocations from "@/app/hooks/useLocations";

import LocationSelect from "./add/LocationSelect";
import useSelectLocation from "@/app/hooks/useSelectLocation";
import { SelectErrorContext } from "@/app/contexts/SelectErrorContext";
import LocationInput from "./LocationInput";
import { HouseCoordinatesContext } from "@/app/contexts/HouseCoordinatesContext";
import { HouseErrorInputContext } from "@/app/contexts/HouseInputErrorContext";
import { UserContext } from "@/app/contexts/UserContext";
import { House } from "@/app/hooks/useHouses";
import { HouseContext } from "@/app/contexts/SelectedHouseContext";

export const houseSchema = z.object({
  houseNumber: z
    .number({ invalid_type_error: "House Number is required" })
    .positive(), // Enforce positive house number
  street: z.string().optional(), // Enforce non-empty street
  description: z.string().optional(), // Allow optional description
  // price: z.number({ invalid_type_error: "Price is required" }).positive(), // Allow optional price
  minutes: z.number({ invalid_type_error: "Minutes are required" }), // Allow optional minutes (may need adjustment based on usage)
  capacity: z
    .number({ invalid_type_error: "Total Capacity is required" })
    .positive()
    .optional(), // Allow optional capacity
  occupied: z.number({ invalid_type_error: "Occupied slots is required" }), // Allow optional occupied status
  perRoom: z
    .number({ invalid_type_error: "People Per Room is required" })
    .positive(), // Allow optional perRoom value
  // coordinates: z.array(z.number(),z.number()).length(2),
  gender: z.enum(["girls", "boys", "both"], {
    errorMap: () => ({ message: "Gender is required" }),
  }), // Allow optional gender // Allow optional background image URL
  authorizationKey: z.string(),
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

const AddForm = ({ nextStep, setHouseData }: Props) => {
  const { houseCoordinates } = useContext(HouseCoordinatesContext);

  const { location, setLocation } = useSelectLocation();
  const { error, setError } = useContext(SelectErrorContext);
  const { error: errorInput, setError: setErrorInput } = useContext(
    HouseErrorInputContext
  );
  const { user } = useContext(UserContext);
  const { data: locations } = useLocations();

  const handleSubmit = (data: any) => {
    if (
      typeof location === "object" &&
      Object.keys(location).length !== 0 &&
      houseCoordinates.length > 0
    ) {
      const myLocation = locations.find(
        (l) => l.name === location.name
      ) as Location;

      console.log(myLocation);
      console.log(location);
      if (!myLocation) {
        console.log(location);

        apiClient
          .post<Location>("/locations", location)
          .then((res) => {

            
            const newData = {
              ...data,
              coordinates: houseCoordinates,
              ownerId: user?.id,
              locationId: res.data.id,
              location: res.data,
            };

            console.log(newData)

            // console.log(newData);
            // apiClient
            //   .post<House>("/houses", newData)
            //   .then((res) => setHouseData(res.data))
            //   .catch((err) => console.log(err));
            setHouseData(newData)
            nextStep();
          })
          .catch((err) => console.log(err));
      } else {
        const newData = {
          ...data,
          coordinates: houseCoordinates,
          ownerId: user?.id,
          locationId: myLocation.id,
          location: myLocation
        };

        

        setHouseData(newData)
        nextStep()
      }
    } else {
      if (typeof location === "object" && Object.keys(location).length === 0) {
        const newData = data;
        delete newData["location"];
        setHouseData(newData);
        setError("specify location");
      }
    }
    if (houseCoordinates.length === 0) {
      const newData = data;
      delete newData["houseCoordinates"];
      setHouseData(newData);
      setErrorInput("specify coordinates");
    }
  };

  return (
    <Form onSubmit={handleSubmit} FormSchema={houseSchema}>
      {(renderInput: RenderInput, renderSelect: RenderSelect) => {
        return (
          <>
            <div className="flex justify-end">
              {
                <Button
                  className="my-4 mx-4
                 
                "
                  type="submit"
                  bg={"green.500"}
                  color={"white"}
                  _hover={{ opacity: 0.8, bg: "green.500" }}
                >
                  Next
                </Button>
              }
            </div>

            <div className=" mx-auto  grid grid-cols-3 gap-4 ">
              <LocationSelect
                location={location}
                id="location"
                label="Location"
                setLocation={setLocation}
                error={error}
                setError={setError}
              />
              <LocationInput error={errorInput} />
              {renderInput("houseNumber", "number", "House Number")}
              {renderInput("street", "text", "Street")}
              {renderInput("description", "textarea", "Description")}
              {/* {renderInput("price", "number", "Price *")} */}
              {renderInput("minutes", "number", "Minutes to UZ *")}
              {renderInput("capacity", "number", "Capacity *")}
              {renderInput("occupied", "number", "Occupied Slots  (vaapo) *")}
              {renderInput("perRoom", "number", "People per room *")}
              {renderInput("perRoom", "number", "People per room *")}
              {renderInput("authorizationKey", "string", "Auth key *")}
              {renderSelect("gender", "Gender *", [
                { id: "boys", name: "Male" },
                { id: "girls", name: "Female" },
                { id: "both", name: "Both" },
              ])}
              
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default AddForm;
